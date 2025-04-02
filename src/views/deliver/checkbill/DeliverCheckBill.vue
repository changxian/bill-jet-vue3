<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item label="单类型" name="type">
              <a-select v-model:value="queryParam.type" allow-clear placeholder="请选择" >
                <a-select-option value="">所有</a-select-option>
                <a-select-option value="3">送货开单</a-select-option>
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
                <a-input v-model:value="queryParam.custPhone" placeholder="请输入客户手机" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="联系人" id="DeliverBillForm-custContact" name="custContact">
                <a-input v-model:value="queryParam.custContact" placeholder="请输入客户联系人" allow-clear></a-input>
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
    <BasicTable @register="registerTable" :columns="columns">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'" @click="printPreview" preIcon="ant-design:printer-outlined">打印预览</a-button>
        <a-button type="primary" v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'" @click="print" preIcon="ant-design:printer-outlined">打印</a-button>
        <a-button type="primary" v-auth="'deliver.checkBill:jxc_deliver_checkBill:exportXls'" @click="onExportXls" preIcon="ant-design:export-outlined">导出</a-button>
      </template>
      <template #type_dictText="{ record }">
        <span v-if="2 == record.type" style="color: red">{{ record.type_dictText }}</span><span v-else >{{ record.type_dictText }}</span>
      </template>
    </BasicTable>
    <div style="position: relative; height: 20px; padding: 0 0 0 18px">
      <p :class="{'p_san': hasPan}" >总计
        <span class="total_span">数量：{{ countTotal }}</span>
        <span class="total_span" v-if="showWeightCol">重量<span v-if="weightColTitle">({{ weightColTitle }})</span>：{{ weightTotal }}</span>
        <span class="total_span" v-if="showAreaCol">面积<span v-if="areaColTitle">({{ areaColTitle }})</span>：{{ areaTotal }}</span>
        <span class="total_span" v-if="showVolumeCol">体积<span v-if="volumeColTitle">({{ volumeColTitle }})</span>：{{ volumeTotal }}</span>
        <span class="total_span">金额：{{ amountTotal }}</span>
        <span class="total_span">已付款：{{ paymentAmountTotal }}</span>
        <span class="total_span">优惠：{{ discountAmountTotal }}</span>
        <span class="total_span">未付款：{{ debtAmountTotal }}</span>
      </p>
    </div>
    <!-- 预览 -->
    <div id="PrintElementOptionSetting" style="display: none"></div>
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
  import printData from '@/views/template/components/print-data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const queryParam = reactive<any>({ companyId: '', companyName: '' });
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', startDate: '', endDate: '' });
  const formRef = ref();

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

  // vuePluginHiprint.disAutoConnect();
  var hiprint, defaultElementTypeProvider;
  let hiprintTemplate;

  function init() {
    hiprint.init({
      providers: [new defaultElementTypeProvider()],
      lang: 'cn',
    });
    // 还原配置
    hiprint.setConfig();

    // this.form = {
    //   ...this.formData,
    // };
    // this.form.customized = this.form.type === 1;
    let panels;
    // if (this.form && this.form.data) {
    //   panels = JSON.parse(this.form.data);
    // } else {
    //   panels = panel;
    // }
    hiprintTemplate = new hiprint.PrintTemplate({
      template: panels,
      // 图片选择功能
      onImageChooseClick: (target) => {
        // 测试 3秒后修改图片地址值
        setTimeout(() => {
          target.refresh(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAIIAQMAAAB99EudAAAABlBMVEUmf8vG2O41LStnAAABD0lEQVR42u3XQQqCQBSAYcWFS4/QUTpaHa2jdISWLUJjjMpclJoPGvq+1WsYfiJCZ4oCAAAAAAAAAAAAAAAAAHin6pL9c6H/fOzHbRrP0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0u/SY9LS0tLS0tLS0tLS0n+edm+UlpaWlpaWlpaWlpaW/tl0Ndyzbno7/+tPTJdd1wal69dNa6abx+Lq6TSeYtK7BX/Diek0XULSZZrakPRtV0i6Hu/KIt30q4fM0pvBqvR9mvsQkZaW9gyJT+f5lsnzjR54xAk8mAUeJyMPwYFH98ALx5Jr0kRLLndT7b64UX9QR/0eAAAAAAAAAAAAAAAAAAD/4gpryzr/bja4QgAAAABJRU5ErkJggg==',
            {
              real: true, // 根据图片实际尺寸调整(转pt)
            }
          );
        }, 1000);
      },
      // 自定义可选字体
      // 或者使用 hiprintTemplate.setFontList([])
      // 或元素中 options.fontList: []
      fontList: [
        { title: '微软雅黑', value: 'Microsoft YaHei' },
        { title: '黑体', value: 'STHeitiSC-Light' },
        { title: '思源黑体', value: 'SourceHanSansCN-Normal' },
        { title: '王羲之书法体', value: '王羲之书法体' },
        { title: '宋体', value: 'SimSun' },
        { title: '华为楷体', value: 'STKaiti' },
        { title: 'cursive', value: 'cursive' },
      ],
      dataMode: 1, // 1:getJson 其他：getJsonTid 默认1
      history: true, // 是否需要 撤销重做功能
      willOutOfBounds: false, // 是否允许组件内的控件超出范围
      qtDesigner: true, // 是否开启类似QT Designer的唯一field生成模式
      onDataChanged: (type, json) => {
        console.log(type); // 新增、移动、删除、修改(参数调整)、大小、旋转
        console.log(json); // 返回 template
      },
      onUpdateError: (e) => {
        console.log(e);
      },
      settingContainer: '#PrintElementOptionSetting',
      paginationContainer: '.hiprint-printPagination',
    });
  }

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
      title: '送货对账单',
      api: list,
      canResize: false,
      columns,
      useSearchForm: false,
      showActionColumn: false,
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
      afterFetch: async (resultItems, extraInfo) => {
        hasPan.value = resultItems.length > 0;
        listTotalCount(extraInfo);
      },
    },
    exportConfig: {
      name: '送货对账单',
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
  /**
   * 打印预览
   */
  function printPreview() {

  }

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
  /**
   * 打印
   */
  function print() {
    doOperationWhenClientConnected(() => {
      const printerList = hiprintTemplate.getPrinterList();
      console.log(printerList);
      hiprintTemplate.print2(printData, { printer: '', title: 'hiprint测试打印' });
    });
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

  defineExpose({

  })

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
