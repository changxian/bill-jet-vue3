<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="rowClick">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 拷贝新增</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 修改</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleDel" preIcon="ant-design:plus-outlined"> 删除</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('status')" preIcon="ant-design:plus-outlined"> 改状态</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('billStatus')" preIcon="ant-design:plus-outlined"> 改开票</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('info')" preIcon="ant-design:plus-outlined"> 改信息</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 打印预览</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 打印</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 还款明细</a-button>
        <a-button  type="primary" v-auth="'purchase.bill:jxc_purchase_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button  type="primary" v-auth="'purchase.bill:jxc_purchase_bill:importExcel'"  preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'purchase.bill:jxc_purchase_bill:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
        <!-- 高级查询 -->
        <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <PurchaseBillModal ref="registerModal" @success="handleSuccess"></PurchaseBillModal>
    <ModifyModal ref="modifyModalRef" @refresh="handleSuccess"></ModifyModal>
    <div class="tbl-wrap">
       <a-spin :spinning="detailLoading">
         <BasicTable  @register="registerTableDetail" :dataSource="dataSourceDetail">
        </BasicTable>
       </a-spin>
    </div>
  </div>
</template>

<script lang="ts" name="purchase.bill-purchaseBill" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema, detailColumns } from './PurchaseBill.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl,billDetail } from './PurchaseBill.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import PurchaseBillModal from './components/PurchaseBillModal.vue'
  import ModifyModal from './components/ModifyModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JSelectUser from '/@/components/Form/src/jeecg/components/JSelectUser.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage, createConfirm } = useMessage();

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const modifyModalRef = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '进货开单',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      clickToRowSelect: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
      rowSelection: { type: 'checkbox'}, 
    },
    exportConfig: {
      name: "进货开单",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  function handleDel() {
      if(selectedRowKeys.value.length === 0){
        return createMessage.warning('请先选择数据');
      }
      batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
  function handleModify(type) {
      if(selectedRowKeys.value.length === 0){
        return createMessage.warning('请先选择数据');
      }
      const row = selectedRows.value[0]
      if(type === 'status' && row.status === 5){
        return createMessage.warning('已经审核了，就不能修改了');
      }
      modifyModalRef.value.show(type, row)
  }
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

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
    if(selectedRowKeys.value.length === 0){
        return createMessage.warning('请先选择数据');
    }
    registerModal.value.disableSubmit = false;
    const row = selectedRows.value[0]
    registerModal.value.copyAdd(row);
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
        auth: 'purchase.bill:jxc_purchase_bill:edit'
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
        auth: 'purchase.bill:jxc_purchase_bill:delete'
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
  

  /**
   * form点击事件(以逗号分割)
   * @param key
   * @param value
   */
  function handleFormJoinChange(key, value) {
    if (typeof value != 'string') {
      queryParam[key] = value.join(',');
    }
  }

const dataSourceDetail:any = ref([])
    const { tableContext: tableContextDetail } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '商品详情',
      columns: detailColumns,
      rowkey: 'id',
      pagination: false
    },
  });


/**BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
selectedRows选中的行信息、selectedRowKeys 选中的行rowkey */
  const [registerTableDetail, ] = tableContextDetail;
  const currentRowId = ref('')
  const detailLoading = ref(false)
function rowClick(record){
  detailLoading.value = true
  currentRowId.value = record.id
  billDetail({billId: record.id}).then(res=>{
    dataSourceDetail.value = [...res]
  }).finally(()=>{
    detailLoading.value = false
  })
}

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
