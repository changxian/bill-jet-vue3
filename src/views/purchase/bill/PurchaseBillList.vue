<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item name="billNo" label="单号">
              <JInput v-model:value="queryParam.billNo" class="query-group-cust" allow-clear></JInput>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="supplierName" label="供应商">
                <JInput v-model:value="queryParam.supplierName" class="query-group-cust" allow-clear></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="supplierContact" label="联系人">
                <JInput v-model:value="queryParam.supplierContact" class="query-group-cust" allow-clear></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="operatorName" label="制单员">
                <JInput v-model:value="queryParam.operatorName" class="query-group-cust" allow-clear></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="状态" name="status">
                <a-select v-model:value="queryParam.status" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">未打印</a-select-option>
                  <a-select-option value="2">已打印</a-select-option>
                  <a-select-option value="3">签回</a-select-option>
                  <a-select-option value="4">过账</a-select-option>
                  <a-select-option value="5">审核</a-select-option>
                  <a-select-option value="6">已开票</a-select-option>
                  <a-select-option value="9">作废</a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="欠款" name="hasDebt">
                <a-radio-group v-model:value="queryParam.hasDebt" name="radioGroup">
                  <a-radio value="">所有</a-radio>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="开票" name="invoiceStatus">
                <a-select v-model:value="queryParam.invoiceStatus" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">未开</a-select-option>
                  <a-select-option value="2">不开</a-select-option>
                  <a-select-option value="3">已开</a-select-option>
                  <a-select-option value="4">无信息</a-select-option>
                  <a-select-option value="9">作废</a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="类型" name="type">
                <a-select v-model:value="queryParam.type" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">进货还款</a-select-option>
                  <a-select-option value="2">退货还款</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId"   allow-clear />
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
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="rowClick">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:copy-outlined"> 拷贝新增</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:edit-outlined"> 修改</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleDel" preIcon="ant-design:delete-outlined"> 删除</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('status')" preIcon="ant-design:edit-outlined"> 改状态</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('invoiceStatus')" preIcon="ant-design:edit-outlined"> 改开票</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleModify('info')" preIcon="ant-design:edit-outlined"> 改信息</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:printer-outlined"> 打印预览</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="handleAdd" preIcon="ant-design:printer-outlined"> 打印</a-button>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"  @click="debtDetailHandle" preIcon="ant-design:ordered-list-outlined"> 还款明细</a-button>
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
    <div style="position: relative;height: 20px;padding: 0 0 0 18px">
      <p :class="{'p_san': hasPan}" >总计
        <span class="total_span">数量：{{totalCount}}</span>
        <span class="total_span">金额：{{totalAmount}}</span>
        <span class="total_span">已付款：{{totalPaymentAmount}}</span>
        <span class="total_span">优惠：{{totalDiscountAmount}}</span>
        <span class="total_span">未付款：{{totalDebtAmount}}</span>
      </p>
    </div>

    <!-- 表单区域 -->
    <PurchaseBillModal ref="registerModal" @success="handleSuccess"></PurchaseBillModal>
    <ModifyModal ref="modifyModalRef" @refresh="handleSuccess"></ModifyModal>
    <div class="tbl-wrap">
       <a-spin :spinning="detailLoading">
         <BasicTable  @register="registerTableDetail" :dataSource="dataSourceDetail">
        </BasicTable>
       </a-spin>
    </div>

    <RepayDetailDialog ref="repayDetailDialogRef"/>
  </div>
</template>

<script lang="ts" name="purchase.bill-purchaseBill" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns,   detailColumns } from './PurchaseBill.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl,billDetail } from './PurchaseBill.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import PurchaseBillModal from './components/PurchaseBillModal.vue'
  import ModifyModal from './components/ModifyModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import RepayDetailDialog from "@/views/purchase/debt/components/RepayDetailDialog.vue";
  import {JInput} from "@/components/Form";
  import FastDate from "@/components/FastDate.vue";
  import JSelectCompany from "@/components/Form/src/jeecg/components/JSelectCompany.vue";
  const fastDateParam = reactive<any>({startDate: '', endDate: ''});
  const { createMessage, createConfirm } = useMessage();
  const repayDetailDialogRef = ref()
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const modifyModalRef = ref();
  const totalCount = ref(0);
  const totalAmount = ref(0);
  const totalPaymentAmount = ref(0);
  const totalDiscountAmount = ref(0);
  const totalDebtAmount = ref(0);

  const hasPan = ref(true);
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
        return Object.assign(params, queryParam, fastDateParam);
      },
      summaryFunc:summaryFunc,
      afterFetch: async (resultItems) => {
        hasPan.value= resultItems.length>0;
        totalCount.value=0;
        totalAmount.value=0;
        totalPaymentAmount.value=0;
        totalDiscountAmount.value=0;
        totalDebtAmount.value=0;
        resultItems.forEach((item)=>{
          totalCount.value+=item.count;
          totalAmount.value+=item.amount;
          totalPaymentAmount.value+=item.paymentAmount;
          totalDiscountAmount.value+=item.discountAmount;
          totalDebtAmount.value+=item.debtAmount;

        });
      },

      rowSelection: { type: 'radio'}, 
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
  function summaryFunc(resultItems)  {
    return [{
      _row:"合计",
      _index:"合计",
      count:totalCount.value,
      amount:totalAmount.value,
      paymentAmount:totalPaymentAmount.value,
      discountAmount:totalDiscountAmount.value,
      debtAmount:totalDebtAmount.value,
    }]

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


  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }
  function debtDetailHandle() {
    if(selectedRows.value.length === 0) {
      repayDetailDialogRef.value.show()
    }else{
      repayDetailDialogRef.value.show()
    }
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
  .total_span{margin: 0 5px}
  .p_san{
     position: absolute;
    top: -50px;
  }
</style>
