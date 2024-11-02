<template>
  <div class="p-2">
    <div class="btns-wrap">
        <a-button type="primary" preIcon="ant-design:search-outlined" @click="debtHandle">还款</a-button>
        <a-button type="primary" preIcon="ant-design:search-outlined" @click="oneKeyDebt">一键还款</a-button>
        <a-button type="primary" preIcon="ant-design:search-outlined" @click="debtDetailHandle">还款明细</a-button>
        <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">导出欠款</a-button>
    </div>
    <div class="deliver-debt-List">
    <div class="left-tbl">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <div class="query-wrap">
            <a-select
              ref="select"
              v-model:value="queryType"
              style="width:120px"
            >
              <a-select-option value="supplierName">名称</a-select-option>
              <a-select-option value="supplierPhone">手机</a-select-option>
              <a-select-option value="supplierContact">联系人</a-select-option>
          </a-select>
          <a-input placeholder="请输入" v-model:value="queryTypeValue" allow-clear ></a-input>
          <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
        </div>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="rowClick">
      <!--插槽:table标题-->
      <!-- <template #tableTitle>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'deliver.debt:jxc_deliver_debt:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template> -->
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <DeliverDebtModal ref="registerModal" @success="handleSuccess"></DeliverDebtModal>
  </div>
    <div class="right-tbl">
    <DeliverDebtDetailList ref="deliverDebtDetailListRef"/>
  </div>
  </div>
  <DeptDialog ref="deptDialogRef"/>
  <OneKeyDeptDialog ref="oneKeyDeptDialogRef"/>
  <RepayDetailDialog ref="repayDetailDialogRef"/>
  </div>
</template>

<script lang="ts" name="deliver.debt-deliverDebt" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './DeliverDebt.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './DeliverDebt.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import DeliverDebtModal from './components/DeliverDebtModal.vue'
  import DeptDialog from './components/DeptDialog.vue'
  import OneKeyDeptDialog from './components/OneKeyDeptDialog.vue'
  import RepayDetailDialog from './components/RepayDetailDialog.vue'
  import { useUserStore } from '/@/store/modules/user';
  import DeliverDebtDetailList from '/@/views/deliver/debtdetail/DeliverDebtDetailList.vue'
  import { useMessage } from '/@/hooks/web/useMessage';

  const queryType = ref('supplierName')
  const queryTypeValue = ref('')

  const { createMessage } = useMessage();
  const deptDialogRef = ref() 
  const oneKeyDeptDialogRef = ref()
  const repayDetailDialogRef = ref()
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '欠款供应商',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      showActionColumn:false,
      clickToRowSelect: true,
      rowSelection: {
        type: 'radio'
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        const queryVal = {
          [queryType.value]: queryTypeValue.value
        }
        return Object.assign(params, queryVal);
      },
    },
    exportConfig: {
      name: "供应商欠款",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys,selectedRows }] = tableContext;
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
const deliverDebtDetailListRef = ref('deliverDebtDetailListRef')
function rowClick(record){
  console.log('record:')
  deliverDebtDetailListRef.value.searchByCustId(record.id)
}

function debtHandle(){
  if(selectedRows.value.length === 0) {
    return createMessage.warning('请选择供应商')
  }
  const selectedBillData = deliverDebtDetailListRef.value.getSelectedData().selectedRows
  if(selectedBillData.length === 0) {
    return createMessage.warning('请选择相关单')
  }
  const params = {
    ...selectedRows.value[0]
  }
  params.bills=selectedBillData;
  params.id="";
  deptDialogRef.value.show(params,true)
}
function oneKeyDebt() {
  if(selectedRows.value.length === 0) {
    return createMessage.warning('请选择供应商')
  }
  const params = {
    ...selectedRows.value[0],
  }
  params.id="";
  oneKeyDeptDialogRef.value.show(params,true)
}
function debtDetailHandle() {
  if(selectedRows.value.length === 0) {
    repayDetailDialogRef.value.show()
  }else{
    repayDetailDialogRef.value.show({
    ...selectedRows.value[0],
  })
  }
  
}
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
        auth: 'deliver.debt:jxc_deliver_debt:edit'
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
        auth: 'deliver.debt:jxc_deliver_debt:delete'
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
  



</script>

<style lang="less" scoped>
.p-2{
  background-color: #fff;
  button{
    margin: 0 10px;
  }
}
.deliver-debt-List{
  
  display: flex;
  .left-tbl{
    width:550px
  }
  .right-tbl{
    flex:1;
    overflow-x:auto;
  }
}
  .jeecg-basic-table-form-container {
    padding: 0;
    .query-wrap{
      display:flex;
      padding-top:10px;
      padding-bottom:15px;
    }
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
