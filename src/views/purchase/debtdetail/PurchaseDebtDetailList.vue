<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="billNo">
              <template #label><span title="单号">单号</span></template>
              <a-input placeholder="请输入单号" v-model:value="queryParam.billNo" allow-clear ></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="billDate">
              <template #label><span title="日期">日期</span></template>
              <a-range-picker showTime value-format="YYYY-MM-DD HH:mm:ss" v-model:value="queryParam.billDate" class="query-group-cust"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="type">
                <template #label><span title="欠款类型（1：进货欠款，2：退货欠款）">欠款类型</span></template>
                <a-input placeholder="请输入欠款类型（1：进货欠款，2：退货欠款）" v-model:value="queryParam.type" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="userName">
                <template #label><span title="业务员">业务员</span></template>
                <a-input placeholder="请输入业务员" v-model:value="queryParam.userName" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="createName">
                <template #label><span title="制单人">制单人</span></template>
                <a-input placeholder="请输入制单人" v-model:value="queryParam.createName" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="remark">
                <template #label><span title="备注">备注</span></template>
                <a-input placeholder="请输入备注" v-model:value="queryParam.remark" allow-clear ></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <!--<template #tableTitle>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'purchase.debtdetail:jxc_purchase_debt_detail:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>-->
      <!--操作栏-->
      <!--<template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <PurchaseDebtDetailModal ref="registerModal" @success="handleSuccess"></PurchaseDebtDetailModal>
  </div>
</template>

<script lang="ts" name="purchase.debtdetail-purchaseDebtDetail" setup>
  import { ref, reactive,defineExpose } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './PurchaseDebtDetail.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './PurchaseDebtDetail.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import PurchaseDebtDetailModal from './components/PurchaseDebtDetailModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from "lodash-es";

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  const supplierId = ref('')
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '供应商欠款明细',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      showActionColumn:false,
      clickToRowSelect: true,
      clearSelectOnPageChange:true,
      clearSelection:true,
      // rowSelection: {
      //   type: 'radio'
      // },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        selectedRowKeys.value = []
        selectedRows.value=[]
        let rangerQuery = await setRangeQuery();
        return Object.assign(params, rangerQuery, {supplierId: supplierId.value});
      },
    },
    exportConfig: {
      name: "供应商欠款明细",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });


  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }
  
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
   
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }
   
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
   
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
   
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'purchase.debtdetail:jxc_purchase_debt_detail:edit'
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'purchase.debtdetail:jxc_purchase_debt_detail:delete'
      }
    ]
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }
  
  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
  



  
  let rangeField = 'billDate,'
  
  /**
   * 设置范围查询条件
   */
  async function setRangeQuery(){
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach(item => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item+'_begin'] = range[0];
          queryParamClone[item+'_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item+'_begin'] = '';
          queryParamClone[item+'_end'] = '';
        }
      })
    }
    return queryParamClone;
  }
  function searchBySupplierId(id){
    supplierId.value = id
    reload()
  }
  function getSelectedData(){
    return {
      selectedRowKeys: selectedRowKeys.value, 
      selectedRows: selectedRows.value
    }
  }
  defineExpose({
    searchBySupplierId,
    getSelectedData
  })
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
    .ant-form-item:not(.ant-form-item-with-help){
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),:deep(.ant-input-number){
      width: 100%;
    }
  }
</style>
