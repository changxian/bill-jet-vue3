<template>
  <div class="p-2">
    <div class="btns-wrap">
      <a-button type="primary" preIcon="ant-design:search-outlined" @click="debtHandle">还款</a-button>
      <a-button type="primary" preIcon="ant-design:search-outlined" @click="oneKeyDebt">一键还款</a-button>
      <a-button type="primary" preIcon="ant-design:search-outlined" @click="debtDetailHandle">还款明细</a-button>
      <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">导出欠款</a-button>
    </div>
    <div class="purchase-debt-List">
      <div class="left-tbl">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
            <div class="query-wrap">
              <a-input placeholder="请输入手机/名称/联系人" v-model:value="queryTypeValue" allow-clear></a-input>
              <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
            </div>
          </a-form>
        </div>
        <!--引用表格-->
        <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="rowClick">
          <template v-slot:bodyCell="{ column, record, index, text }">
          </template>
        </BasicTable>
        <!-- 表单区域 -->
        <PurchaseDebtModal ref="registerModal" @success="handleSuccess"></PurchaseDebtModal>
      </div>
      <div class="right-tbl">
        <PurchaseDebtDetailList ref="purchaseDebtDetailListRef" />
      </div>
    </div>
    <DeptDialog ref="deptDialogRef" />
    <OneKeyDeptDialog ref="oneKeyDeptDialogRef" />
    <RepayDetailDialog ref="repayDetailDialogRef" />
  </div>
</template>

<script lang="ts" name="purchase.debt-purchaseDebt" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './PurchaseDebt.data';
  import { list, listCount, getExportUrl } from './PurchaseDebt.api';
  import PurchaseDebtModal from './components/PurchaseDebtModal.vue';
  import DeptDialog from './components/DeptDialog.vue';
  import OneKeyDeptDialog from './components/OneKeyDeptDialog.vue';
  import RepayDetailDialog from './components/RepayDetailDialog.vue';
  import PurchaseDebtDetailList from '/@/views/purchase/debtdetail/PurchaseDebtDetailList.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const queryTypeValue = ref('');
  const purchaseDebtDetailListRef = ref('purchaseDebtDetailListRef');
  const { createMessage } = useMessage();
  const deptDialogRef = ref();
  const oneKeyDeptDialogRef = ref();
  const repayDetailDialogRef = ref();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();

  // 送货总欠款
  const debtTotalAmount = ref(0);
  // 退货总欠款
  const backDebtTotalAmount = ref(0);
  const hasPan = ref(true);

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '欠款供应商',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showActionColumn: false,
      clickToRowSelect: true,
      clearSelectOnPageChange: true,
      rowSelection: {
        type: 'radio',
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        const queryVal = {
          // [queryType.value]: queryTypeValue.value,
          queryType: queryTypeValue.value,
        };
        return Object.assign(params, queryVal);
      },
      summaryFunc: summaryFunc,
      afterFetch: async (resultItems) => {
        debugger;
        hasPan.value = resultItems.length > 0;
        if (resultItems.length > 0) rowClick(resultItems[0]);
        listTotalCount();
      },
    },
    exportConfig: {
      name: '供应商欠款',
      url: getExportUrl,
      params: queryParam,
    },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;
  const labelCol = reactive({
    xs: 24,
    sm: 4,
    xl: 6,
    xxl: 4,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 增加合计行
  function summaryFunc(resultItems) {
    return [
      {
        _row: '合计',
        _index: '合计',
        purchaseDebtAmount: debtTotalAmount.value,
        returnDebtAmount: backDebtTotalAmount.value,
      },
    ];
  }
  function rowClick(record) {
    debugger;
    console.log('record:');
    purchaseDebtDetailListRef.value.searchBySupplierId(record.id);
  }

  /**
   * 列表合计
   */
  function listTotalCount() {
    debtTotalAmount.value = 0;
    backDebtTotalAmount.value = 0;
    listCount({ queryType: queryTypeValue.value }).then((res) => {
      debtTotalAmount.value = res.purchaseDebtAmount;
      backDebtTotalAmount.value = res.returnDebtAmount;
    });
  }
  function debtHandle() {
    if (selectedRows.value.length === 0) {
      return createMessage.warning('请选择供应商');
    }
    const selectedBillData = purchaseDebtDetailListRef.value.getSelectedData().selectedRows;
    if (selectedBillData.length === 0) {
      return createMessage.warning('请选择相关单');
    }
    const params = {
      ...selectedRows.value[0],
    };
    params.bills = selectedBillData;
    params.id = '';
    deptDialogRef.value.show(params, true);
  }
  function oneKeyDebt() {
    if (selectedRows.value.length === 0) {
      return createMessage.warning('请选择供应商');
    }
    const params = {
      ...selectedRows.value[0],
    };
    params.id = '';
    oneKeyDeptDialogRef.value.show(params, true);
  }
  function debtDetailHandle() {
    if (selectedRows.value.length === 0) {
      repayDetailDialogRef.value.show();
    } else {
      repayDetailDialogRef.value.show({
        ...selectedRows.value[0],
      });
    }
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
    listTotalCount();
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
    listTotalCount();
  }
</script>

<style lang="less" scoped>
  .ant-spin-container {
    ul {
      margin-top: 40px;
    }
  }
  .p-2 {
    background-color: #fff;
    button {
      margin: 0 10px;
    }
  }
  .purchase-debt-List {
    display: flex;
    .left-tbl {
      width: 500px;
    }
    .right-tbl {
      flex: 1;
      overflow-x: auto;
    }
  }
  .total_span {
    margin: 0 5px;
  }
  .p_san {
    position: absolute;
    top: -75px;
  }
  .jeecg-basic-table-form-container {
    padding: 0;
    .query-wrap {
      display: flex;
      padding-top: 10px;
      padding-bottom: 15px;
    }
    .ant-form-item:not(.ant-form-item-with-help) {
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),
    :deep(.ant-input-number) {
      width: 100%;
    }
  }
</style>
