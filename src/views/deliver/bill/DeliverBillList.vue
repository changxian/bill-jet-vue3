<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" startDateKey="billDate_begin" endDateKey="billDate_end" />
          <a-col :lg="4">
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
          <template v-if="toggleSearchStatus">
            <a-col :lg="4">
              <a-form-item label="欠款" name="hasDebt">
                <a-radio-group v-model:value="queryParam.hasDebt" name="radioGroup">
                  <a-radio value="">所有</a-radio>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="0">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="4">
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
            <a-col :lg="5">
              <a-form-item label="单类型" name="type">
                <a-select v-model:value="queryParam.type" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="3">送货开单</a-select-option>
                  <a-select-option value="2">退货开单</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId" class="query-group-cust" @change="changeCompany" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="客户" name="custId">
                <j-select-customer v-model:value="queryParam.custId" class="query-group-cust" @change="changeCustomer" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="业务员" v-bind="queryParam.realname" name="realname">
                <j-select-user v-model:value="queryParam.realname" @change="changeUser" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="5">
              <a-form-item name="billNo" label="单号">
                <JInput v-model:value="queryParam.billNo" class="query-group-cust" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="5">
              <a-form-item name="custContact" label="联系人">
                <JInput v-model:value="queryParam.custContact" class="query-group-cust" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="5">
              <a-form-item name="operatorName" label="制单员">
                <JInput v-model:value="queryParam.operatorName" class="query-group-cust" allow-clear />
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
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="copyAdd" preIcon="ant-design:plus-outlined"> 拷贝新增</a-button>
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="handleEdit" preIcon="ant-design:edit-outlined"> 修改</a-button>
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="handleDel" preIcon="ant-design:delete-outlined"> 删除</a-button>
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="handleModify('status')" preIcon="ant-design:edit-outlined">
          改状态</a-button
        >
        <a-button
          type="primary"
          v-auth="'deliver.bill:jxc_deliver_bill:add'"
          @click="handleModify('invoiceStatus')"
          preIcon="ant-design:edit-outlined"
        >
          改开票</a-button
        >
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="handleModify('info')" preIcon="ant-design:edit-outlined">
          改信息</a-button
        >
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="printPreview" preIcon="ant-design:printer-outlined">
          打印预览</a-button
        >
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="print" preIcon="ant-design:printer-outlined"> 打印</a-button>
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:add'" @click="debtDetailHandle" preIcon="ant-design:ordered-list-outlined">
          还款明细</a-button
        >
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">
          导出</a-button
        >
        <j-upload-button
          type="primary"
          v-auth="'deliver.bill:jxc_deliver_bill:importExcel'"
          preIcon="ant-design:import-outlined"
          @click="onImportXls"
        >
          导入</j-upload-button
        >
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'deliver.bill:jxc_deliver_bill:deleteBatch'"
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <template #bodyCell="{ column, record, index, text }"> </template>
    </BasicTable>
    <div style="position: relative; height: 20px; padding: 0 0 0 18px">
      <p :class="{ p_san: hasPan }"
        >总计
        <span class="total_span">数量：{{ totalCount }}</span>
        <span class="total_span" v-if="showWeightCol">重量({{ weightColTitle }})：{{ totalWeight }}</span>
        <span class="total_span" v-if="showAreaCol">面积({{ areaColTitle }})：{{ totalArea }}</span>
        <span class="total_span" v-if="showVolumeCol">体积({{ volumeColTitle }})：{{ totalVolume }}</span>
        <span class="total_span">金额：{{ totalAmount }}</span>
        <span class="total_span">已付款：{{ totalPaymentAmount }}</span>
        <span class="total_span">优惠：{{ totalDiscountAmount }}</span>
        <span class="total_span">未付款：{{ totalDebtAmount }}</span>
      </p>
    </div>

    <!-- 表单区域 -->
    <DeliverBillModal ref="registerModal2" @success="handleSuccess" />
    <ModifyModal ref="modifyModalRef" @refresh="handleSuccess" />
    <div class="tbl-wrap">
      <a-spin :spinning="detailLoading">
        <BasicTable @register="registerTableDetail" :dataSource="dataSourceDetail" />
      </a-spin>
    </div>
    <RepayDetailDialog ref="repayDetailDialogRef" />

    <!-- 选择模板窗口 -->
    <ViewModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="deliver.bill-deliverBill" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, detailColumns } from './DeliverBill.data';
  import { list, billDetail, deleteOne, batchDelete, getImportUrl, getExportUrl } from './DeliverBill.api';
  import DeliverBillModal from './components/DeliverBillModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import RepayDetailDialog from '@/views/deliver/debt/components/RepayDetailDialog.vue';
  import ModifyModal from './components/ModifyModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getMyBillSetting } from '@/views/setting/system/index.api';

  import { useRoute } from 'vue-router';
  import JSelectCompany from '@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import { JInput } from '@/components/Form';
  import FastDate from '@/components/FastDate.vue';
  import JSelectCustomer from '@/components/Form/src/jeecg/components/JSelectCustomer.vue';
  import JSelectUser from '@/components/Form/src/jeecg/components/JSelectUser.vue';

  import { useModal } from '/@/components/Modal';
  import ViewModal from '@/views/template/view/ViewModal.vue';
  const [registerModal, { openModal }] = useModal();

  const route = useRoute();
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', billDate_begin: '', billDate_end: '' });
  if (route.query) {
    fastDateParam.startDate = route.query.startDate;
    fastDateParam.endDate = route.query.endDate;
  }
  const { createMessage } = useMessage();
  const repayDetailDialogRef = ref();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal2 = ref();
  const modifyModalRef = ref();
  const userStore = useUserStore();
  // 总计：数量
  const totalCount = ref(0);
  // 总计：重量
  const totalWeight = ref(0);
  // 总计：面积
  const totalArea = ref(0);
  // 总计：体积
  const totalVolume = ref(0);
  // 总计：金额
  const totalAmount = ref(0);
  // 总计：已付款
  const totalPaymentAmount = ref(0);
  // 总计：优惠
  const totalDiscountAmount = ref(0);
  // 总计：未付款
  const totalDebtAmount = ref(0);
  // 总计：历史未付款
  const totalHisDebtAmount = ref(0);
  // 总计：成本
  const totalCostAmount = ref(0);
  // 总计：利润
  const totalProfitAmount = ref(0);
  const hasPan = ref(true);

  // 小数位数
  const decimalPlaces = ref(2);
  // 显示重量列【合计 和 列表皆显示，0不显示，1显示】
  const showWeightCol = ref(false);
  const weightColTitle = ref('');
  // 显示面积列【合计 和 列表皆显示】
  const showAreaCol = ref(false);
  const areaColTitle = ref('');
  // 显示体积列【合计 和 列表皆显示】
  const showVolumeCol = ref(false);
  const volumeColTitle = ref('');

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '送货开单',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      dynamicCols: userStore.getDynamicCols['jxc_billing'], // 添加扩展列信息
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
      summaryFunc: summaryFunc,
      afterFetch: async (resultItems) => {
        hasPan.value = resultItems.length > 0;
        totalCount.value = 0;
        totalWeight.value = 0;
        totalArea.value = 0;
        totalVolume.value = 0;
        totalAmount.value = 0;
        totalPaymentAmount.value = 0;
        totalDiscountAmount.value = 0;
        totalDebtAmount.value = 0;
        totalHisDebtAmount.value = 0;
        totalCostAmount.value = 0;
        totalProfitAmount.value = 0;
        resultItems.forEach((item) => {
          totalCount.value += item.count;
          totalWeight.value += item.weight;
          totalArea.value += item.area;
          totalVolume.value += item.volume;
          totalAmount.value += item.amount;
          totalPaymentAmount.value += item.paymentAmount;
          totalDiscountAmount.value += item.discountAmount;
          totalDebtAmount.value += item.debtAmount;
          totalHisDebtAmount.value += item.hisDebtAmount;
          totalCostAmount.value += item.costAmount;
          totalProfitAmount.value += item.profitAmount;
        });
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '送货开单',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [
    registerTable,
    { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource },
    { rowSelection, selectedRows, selectedRowKeys },
  ] = tableContext;
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

  // 加载系统开单设置
  getMyBillSetting().then((res) => {
    showWeightCol.value = !!res.showWeightCol;
    showAreaCol.value = !!res.showAreaCol;
    showVolumeCol.value = !!res.showVolumeCol;
    if (res.decimalPlaces === 0 || res.decimalPlaces) {
      decimalPlaces.value = res.decimalPlaces;
    }
    // 循环数据
    if (res.dynaFieldsGroup['1']) {
      res.dynaFieldsGroup['1'].forEach((item) => {
        // 重量小计
        if (item.fieldName === 'weightSubtotal') {
          weightColTitle.value = item.fieldTitle;
        }
        // 面积小计
        if (item.fieldName === 'areaSubtotal') {
          areaColTitle.value = item.fieldTitle;
        }
        // 体积小计
        if (item.fieldName === 'volumeSubtotal') {
          volumeColTitle.value = item.fieldTitle;
        }
      });
    }
  });
  // 增加合计行
  function summaryFunc(resultItems) {
    return [
      {
        _row: '合计',
        _index: '合计',
        count: totalCount.value,
        weight: totalWeight.value,
        area: totalArea.value,
        volume: totalVolume.value,
        amount: totalAmount.value,
        paymentAmount: totalPaymentAmount.value,
        discountAmount: totalDiscountAmount.value,
        debtAmount: totalDebtAmount.value,
        costAmount: totalCostAmount.value,
        hisDebtAmount: totalHisDebtAmount.value,
        profitAmount: totalProfitAmount.value,
      },
    ];
  }
  // 删除数据
  function handleDel() {
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选择数据');
    }
    batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
  // 修改状态、开票、信息
  function handleModify(type) {
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选择数据');
    }
    const row = selectedRows.value[0];
    if (type === 'status' && row.status === 5) {
      return createMessage.warning('已经审核了，就不能修改了');
    }
    modifyModalRef.value.show(type, row);
  }

  /**
   * 欠款明细事件
   */
  function debtDetailHandle() {
    if (selectedRows.value.length === 0) {
      repayDetailDialogRef.value.show();
    } else {
      repayDetailDialogRef.value.show();
    }
  }
  /**
   * 新增事件
   */
  function copyAdd() {
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选择数据');
    }
    registerModal2.value.disableSubmit = false;
    const row = selectedRows.value[0];
    registerModal2.value.copyAdd(row);
  }
  /**
   * 打印预览
   */
  function printPreview() {
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选中一条数据');
    }

    openModal(true, {
      // record: formData,
      record: { id: selectedRowKeys.value[0] },
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 打印
   */
  function print() {
    printPreview();
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    if (!record.id) {
      if (selectedRowKeys.value.length === 0) {
        return createMessage.warning('请先选择数据');
      }
      record = selectedRows.value[0];
    }
    registerModal2.value.disableSubmit = false;
    registerModal2.value.edit(record);
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal2.value.disableSubmit = true;
    registerModal2.value.edit(record);
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
        auth: 'deliver.bill:jxc_deliver_bill:edit',
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
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'deliver.bill:jxc_deliver_bill:delete',
      },
    ];
  }
  // 选择开单公司信息
  function changeCompany(val, selectRows) {
    console.log(' changeCompany val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      queryParam.companyId = selectRows[0].id;
      queryParam.companyName = selectRows[0].compName;
    }
  }
  // 选择客户
  function changeCustomer(val, selectRows) {
    if (selectRows?.length > 0) {
      queryParam.custId = selectRows[0].id;
      queryParam.custName = selectRows[0].orgName;
    }
  }
  // 选择业务员信息【返回的val数据是username，不是ID值】
  function changeUser(val, selectRows) {
    if (selectRows?.length > 0) {
      queryParam.userId = selectRows[0].id;
      queryParam.realname = selectRows[0].realname;
    }
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

  const dataSourceDetail: any = ref([]);
  const { tableContext: tableContextDetail } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '商品详情',
      columns: detailColumns,
      showIndexColumn: true,
      rowkey: 'id',
      pagination: false,
    },
  });

  /**
   * BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
   * selectedRows选中的行信息、selectedRowKeys 选中的行rowkey
   */
  const [registerTableDetail] = tableContextDetail;
  const currentRowId = ref('');
  const detailLoading = ref(false);
  function rowClick(record) {
    detailLoading.value = true;
    currentRowId.value = record.id;
    billDetail({ billId: record.id })
      .then((res) => {
        dataSourceDetail.value = [...res];
      })
      .finally(() => {
        detailLoading.value = false;
      });
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
