<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item label="单类型" name="type">
              <a-select v-model:value="queryParam.type" allow-clear placeholder="请选择">
                <a-select-option value="">所有</a-select-option>
                <a-select-option value="3">销售开单</a-select-option>
                <a-select-option value="2">退货开单</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item label="欠款单" name="hasDebt">
                <a-radio-group v-model:value="queryParam.hasDebt" name="radioGroup">
                  <a-radio value="">所有</a-radio>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="0">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId" @change="changeCompany" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="客户名" id="DeliverBillForm-custId" name="custId">
                <j-select-cust v-model:value="queryParam.custId" @change="changeCust" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="手机" id="DeliverBillForm-custPhone" name="custPhone">
                <a-input v-model:value="queryParam.custPhone" placeholder="请输入客户手机" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="联系人" id="DeliverBillForm-custContact" name="custContact">
                <a-input v-model:value="queryParam.custContact" placeholder="请输入客户联系人" allow-clear />
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
      <template #tableTitle>
        <a-button
          type="primary"
          v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'"
          @click="printPreview"
          preIcon="ant-design:printer-outlined"
          >打印预览</a-button
        >
        <a-button type="primary" v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'" @click="print" preIcon="ant-design:printer-outlined"
          >打印</a-button
        >
        <a-button
          type="primary"
          v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'"
          @click="onExportXls"
          preIcon="ant-design:export-outlined"
          >导出</a-button
        >
      </template>
      <template #type_dictText="{ record }">
        <span v-if="2 == record.type" style="color: red">{{ record.type_dictText }}</span
        ><span v-else>{{ record.type_dictText }}</span>
      </template>
    </BasicTable>
    <div style="position: relative; height: 20px; padding: 0 0 0 18px">
      <p :class="{ p_san: hasPan }"
        >总计
        <span class="total_span">数量：{{ countTotal }}</span>
        <span class="total_span" v-if="showWeightCol"
          >重量<span v-if="weightColTitle">({{ weightColTitle }})</span>：{{ weightTotal }}</span
        >
        <span class="total_span" v-if="showAreaCol"
          >面积<span v-if="areaColTitle">({{ areaColTitle }})</span>：{{ areaTotal }}</span
        >
        <span class="total_span" v-if="showVolumeCol"
          >体积<span v-if="volumeColTitle">({{ volumeColTitle }})</span>：{{ volumeTotal }}</span
        >
        <span class="total_span">金额：{{ amountTotal }}</span>
        <span class="total_span">已付款：{{ paymentAmountTotal }}</span>
        <span class="total_span">优惠：{{ discountAmountTotal }}</span>
        <span class="total_span">未付款：{{ debtAmountTotal }}</span>
      </p>
    </div>
    <!-- 预览 -->
    <PrintPreview ref="preView" />
  </div>
</template>

<script lang="ts" name="deliver.checkbill-DeliverCheckBill" setup>
  import { ref, defineExpose, reactive } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './DeliverCheckBill.data';
  import FastDate from '/@/components/FastDate.vue';
  import JSelectCust from '/@/components/Form/src/jeecg/components/JSelectCustomer.vue';
  import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import { getExportUrl, list } from '@/views/deliver/checkbill/DeliverCheckBill.api';
  import { useUserStore } from '@/store/modules/user';
  import PrintPreview from '@/views/template/components/TemplatePreview.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { getTemplateData2, roil } from '@/views/template/view/index.api';

  const queryParam = reactive<any>({ companyId: '', companyName: '' });
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', startDate: '', endDate: '' });
  const formRef = ref();
  const preView = ref();

  const userStore = useUserStore();
  // 总计：数量
  const countTotal = ref(0);
  // 总计：重量
  const weightTotal = ref(0);
  // 总计：面积
  const areaTotal = ref(0);
  // 总计：体积
  const volumeTotal = ref(0);
  // 总计：金额
  const amountTotal = ref(0);
  // 总计：已付款
  const paymentAmountTotal = ref(0);
  // 总计：优惠
  const discountAmountTotal = ref(0);
  // 总计：未付款
  const debtAmountTotal = ref(0);
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

  function changeCompany(val, selectRows) {
    if (selectRows?.length > 0) {
      queryParam.companyName = selectRows[0].compName;
    }
  }
  function changeCust(val, selectRows) {
    if (selectRows?.length > 0) {
      queryParam.custId = selectRows[0].id;
      queryParam.custName = selectRows[0].orgName;
      queryParam.custPhone = selectRows[0].cellPhone;
      queryParam.custContact = selectRows[0].contact;
    }
  }

  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '销售对账单',
      api: list,
      canResize: false,
      columns,
      useSearchForm: false,
      showActionColumn: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      cols: userStore.getCols,
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
      afterFetch: async (resultItems, extraInfo) => {
        hasPan.value = resultItems.length > 0;
        listTotalCount(extraInfo);
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '销售对账单',
      url: getExportUrl,
      params: () => {
        return Object.assign(queryParam, fastDateParam);
      },
    },
  });
  const billSetting = userStore.getBillSetting;
  // 加载系统开单设置
  if (billSetting) {
    showWeightCol.value = !!billSetting.showWeightCol;
    showAreaCol.value = !!billSetting.showAreaCol;
    showVolumeCol.value = !!billSetting.showVolumeCol;
    if (billSetting.decimalPlaces === 0 || billSetting.decimalPlaces) {
      decimalPlaces.value = billSetting.decimalPlaces;
    }
    // 循环数据
    if (billSetting.dynaFieldsGroup['1']) {
      billSetting.dynaFieldsGroup['1'].forEach((item) => {
        // 重量小计
        if (item.fieldName === 'weightSubtotal') {
          weightColTitle.value = item.fieldTitle || '';
        }
        // 面积小计
        if (item.fieldName === 'areaSubtotal') {
          areaColTitle.value = item.fieldTitle || '';
        }
        // 体积小计
        if (item.fieldName === 'volumeSubtotal') {
          volumeColTitle.value = item.fieldTitle || '';
        }
      });
    }
  }
  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs: 24,
    sm: 5,
    xl: 6,
    xxl: 5,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 19,
  });

  /**
   * 列表合计
   */
  function listTotalCount(extraInfo) {
    countTotal.value = extraInfo.count || 0;
    if (showWeightCol.value) {
      weightTotal.value = extraInfo.weight || 0;
    }
    if (showAreaCol.value) {
      areaTotal.value = extraInfo.area || 0;
    }
    if (showVolumeCol.value) {
      volumeTotal.value = extraInfo.volume || 0;
    }
    amountTotal.value = extraInfo.amount || 0;
    paymentAmountTotal.value = extraInfo.paymentAmount || 0;
    discountAmountTotal.value = extraInfo.discountAmount || 0;
    debtAmountTotal.value = extraInfo.debtAmount || 0;
  }

  const printData = ref();
  const tempData = ref();

  function doOperationWhenClientConnected(operation) {
    if (window['hiwebSocket'] && window['hiwebSocket'].opened) {
      operation?.();
      return;
    }
    createMessage.error({
      content: '客户端未连接',
      duration: 2,
    });
  }

  let printTemplate;
  async function init(tempData) {
    window.hiprint.setConfig();

    printTemplate = new hiprint.PrintTemplate({
      template: {
        ...tempData,
      },
    });
  }

  async function initPrint() {
    // 获取模板信息 和 获取打印预览的数据信息
    const loadData = await getTemplateData2({ category: 1 });
    let template = loadData['template'];
    printData.value = loadData['printData'];

    if (null != template) {
      tempData.value = template['data'];
      if ('string' == typeof tempData.value) {
        tempData.value = JSON.parse(tempData.value);
      }

      // 处理表格信息：多个表的列名不同，但取值为同一属性，对这些数据进行处理。多属性配置在 roil.config.ts 中
      if (printData.value['table']) {
        roil(printData.value['table']['table'], 1);
        // 初始化打印预览插件
        await init(tempData.value);
      }
    }
  }

  /**
   * 打印预览
   */
  async function printPreview() {
    await initPrint();
    preView.value.show(printTemplate, printData.value);
  }

  /**
   * 打印
   */
  async function print() {
    if (null == printTemplate) {
      await initPrint();
    }

    doOperationWhenClientConnected(() => {
      const printerList = printTemplate.getPrinterList();
      console.log(printerList);
      if (0 == printerList) {
        console.log('未连接上打印机');
        createMessage.error({
          content: '未连接上打印机',
          duration: 5,
        });
        return;
      }
      printTemplate.print2(printData.value, { printer: '', title: '测试打印' });
    });
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
    fastDateParam.startDate = '';
    fastDateParam.endDate = '';
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }

  defineExpose({});
</script>

<style lang="less" scoped>
  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
  .total_span {
    margin: 0 5px;
  }
  .p_san {
    position: absolute;
    top: -50px;
  }
</style>
