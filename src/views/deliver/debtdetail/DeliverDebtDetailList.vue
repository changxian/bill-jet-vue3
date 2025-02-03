<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <template v-if="toggleSearchStatus">
            <a-col :lg="5">
              <a-form-item name="type">
                <template #label><span title="类型">类型</span></template>
                <a-select v-model:value="queryParam.type">
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="3">送货欠款</a-select-option>
                  <a-select-option value="2">退货欠款</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="5">
              <a-form-item name="billNo">
                <template #label><span title="单号">单号</span></template>
                <a-input placeholder="请输入单号" v-model:value="queryParam.blNo" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="7">
              <a-form-item name="operatorName">
                <template #label><span title="制单人">制单人</span></template>
                <a-input placeholder="请输入制单人" v-model:value="queryParam.opName" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="7">
              <a-form-item name="userName">
                <template #label><span title="业务员">业务员</span></template>
                <a-input placeholder="请输入业务员" v-model:value="queryParam.uName" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="remark">
                <template #label><span title="备注">备注</span></template>
                <a-input placeholder="请输入备注" v-model:value="queryParam.rmk" allow-clear></a-input>
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
      <template #type_dictText="{ record }">
        <span v-if="2 == record.type" style="color: red">{{ record.type_dictText }}</span><span v-else>{{ record.type_dictText }}</span>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <div style="position: relative; height: 20px; padding: 0 0 0 18px">
      <p :class="{'p_san': hasPan}" >总计
        <span class="total_span">金额：{{ totalAmount }}</span>
        <span class="total_span">已付款：{{ totalPaymentAmount }}</span>
        <span class="total_span">优惠：{{ totalDiscountAmount }}</span>
        <span class="total_span">未付款：{{ totalDebtAmount }}</span>
      </p>
    </div>
    <!-- 表单区域 -->
    <DeliverDebtDetailModal ref="registerModal" @success="handleSuccess"></DeliverDebtDetailModal>
  </div>
</template>

<script lang="ts" name="deliver.debtdetail-deliverDebtDetail" setup>
  import { ref, reactive, defineExpose } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './DeliverDebtDetail.data';
  import { list, listCount, getExportUrl } from './DeliverDebtDetail.api';
  import DeliverDebtDetailModal from './components/DeliverDebtDetailModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from 'lodash-es';
  import FastDate from '@/components/FastDate.vue';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const fastDateParam = reactive<any>({ timeType: 'month3', startDate: '', endDate: '' });
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  const custId = ref('');

  // 总计：金额
  const totalAmount = ref(0);
  // 总计：已付款
  const totalPaymentAmount = ref(0);
  // 总计：优惠
  const totalDiscountAmount = ref(0);
  // 总计：未付款
  const totalDebtAmount = ref(0);
  const hasPan = ref(true);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '客户欠款明细',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showActionColumn: false,
      clickToRowSelect: true,
      clearSelectOnPageChange: true,
      clearSelection: true,
      dynamicCols: userStore.getDynamicCols['jxc_billing'], // 添加扩展列信息
      // rowSelection: {
      //   type: 'radio'
      // },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        selectedRowKeys.value = [];
        selectedRows.value = [];
        //let rangerQuery = await setRangeQuery();
        //return Object.assign(params, rangerQuery, {custId: custId.value});
        return Object.assign(params, queryParam, fastDateParam, { custId: custId.value });
      },
      afterFetch: async (resultItems) => {
        hasPan.value = resultItems.length > 0;
        listTotalCount();
      },
    },
    exportConfig: {
      name: '客户欠款明细',
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

  /**
   * 列表合计
   */
  function listTotalCount() {
    totalAmount.value = 0;
    totalPaymentAmount.value = 0;
    totalDiscountAmount.value = 0;
    totalDebtAmount.value = 0;
    if (custId.value != '') {
      listCount(Object.assign(queryParam, fastDateParam, { custId: custId.value })).then((res) => {
        totalAmount.value = res.amount;
        totalPaymentAmount.value = res.paymentAmount;
        totalDiscountAmount.value = res.discountAmount;
        totalDebtAmount.value = res.debtAmount;
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

  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    fastDateParam.startDate = '';
    fastDateParam.endDate = '';
    selectedRowKeys.value = [];
    //刷新数据
    reload();
    listTotalCount();
  }

  let rangeField = 'billDate,';

  /**
   * 设置范围查询条件
   */
  async function setRangeQuery() {
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach((item) => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item + '_begin'] = range[0];
          queryParamClone[item + '_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item + '_begin'] = '';
          queryParamClone[item + '_end'] = '';
        }
      });
    }
    return queryParamClone;
  }
  function searchByCustId(id) {
    custId.value = id;
    reload();
    listTotalCount();
  }
  function getSelectedData() {
    return {
      selectedRowKeys: selectedRowKeys.value,
      selectedRows: selectedRows.value,
    };
  }
  defineExpose({
    searchByCustId,
    getSelectedData,
  });
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust {
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
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
  .total_span {
    margin: 0 5px;
  }
  .p_san {
    position: absolute;
    top: -50px;
  }
</style>
