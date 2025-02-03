<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam"
              :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam"/>
          <a-col :lg="6">
            <a-form-item name="name" label="筛选">
              <JInput v-model:value="queryParam.supplierName" class="query-group-cust"
                      allow-clear></JInput>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item label="单类型" name="type">
                <a-select v-model:value="queryParam.type" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">进货开单</a-select-option>
                  <a-select-option value="2">退货开单</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId" @change="changeCompany"
                                  allow-clear/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset"
                          style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon
                    :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'"/>
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="padding: 0 0 10px 20px">
          <a-radio-group v-model:value="queryParam.queryType" @change="changeType">
            <a-radio value="goodsCountColumns">按商品</a-radio>
            <a-radio value="typeCountColumns">按类别</a-radio>
            <a-radio value="supplierCountColumns">按供应商</a-radio>
            <a-radio value="operatorCountColumns">按用户</a-radio>
            <a-radio value="careNoCountColumns">按车号</a-radio>
          </a-radio-group>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :columns="columns">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
      </template>
      <!-- 明细 -->
      <template #detail="{ record }">
        <a-button @click="lookDetail(record)" preIcon="ant-design:container-outlined"></a-button>
      </template>
      <template #count="{ record }">
        <a-button @click="lookTotal(record)" preIcon="ant-design:credit-card-outlined"></a-button>
      </template>
    </BasicTable>
    <div style="position: relative; height: 20px; padding: 0 0 0 18px">
      <p :class="{'p_san': hasPan}">总计
        <span class="total_span">数量：{{ countSubtotal }}</span>
        <span class="total_span" v-if="showWeightCol">重量<span v-if="weightColTitle">({{ weightColTitle }})</span>：{{ weightSubtotal }}</span>
        <span class="total_span" v-if="showAreaCol">面积<span v-if="areaColTitle">({{ areaColTitle }})</span>：{{ areaSubtotal }}</span>
        <span class="total_span" v-if="showVolumeCol">体积<span v-if="volumeColTitle">({{ volumeColTitle }})</span>：{{ volumeSubtotal }}</span>
        <span class="total_span">金额：{{ amountSubtotal }}</span>
      </p>
    </div>
    <DetailDialog ref="detailDialogRef" />
    <TotalDialog ref="totalDialogRef" />
  </div>
</template>

<script lang="ts" name="purchase.statistics-PurchaseStatistics" setup>
  import { ref, defineExpose, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { goodsCountColumns, typeCountColumns, supplierCountColumns, operatorCountColumns, careNoCountColumns } from './PurchaseStatistics.data';
  import { list, getExportUrl } from './PurchaseStatistics.api';
  import { JInput } from '@/components/Form';
  import FastDate from '/@/components/FastDate.vue';
  import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import DetailDialog from './components/DetailDialog.vue';
  import TotalDialog from './components/TotalDialog.vue';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const billSetting = userStore.getBillSetting;
  const hasPan = ref(true);
  // 总计：数量
  const countSubtotal = ref(0);
  // 总计：重量
  const weightSubtotal = ref(0);
  // 总计：面积
  const areaSubtotal = ref(0);
  // 总计：体积
  const volumeSubtotal = ref(0);
  // 总计：金额
  const amountSubtotal = ref(0);

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

  const queryParam = reactive<any>({ queryType: 'goodsCountColumns', companyId: '', companyName: '' });
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', startDate: '', endDate: '' });
  const formRef = ref();
  const columnObj = { goodsCountColumns, typeCountColumns, supplierCountColumns, operatorCountColumns, careNoCountColumns };

  function getColumns() {
    columns.value = columnObj[queryParam.queryType];
    return columns.value;
  }
  // 加载系统开单设置
  if (billSetting) {
    showWeightCol.value = !!billSetting.showWeightCol;
    showAreaCol.value = !!billSetting.showAreaCol;
    showVolumeCol.value = !!billSetting.showVolumeCol;
    if (billSetting.decimalPlaces === 0 || billSetting.decimalPlaces) {
      decimalPlaces.value = billSetting.decimalPlaces;
    }
    if (billSetting.dynaFieldsGroup['1']){
      // 循环数据
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
  function changeCompany(val, selectRows) {
    console.log(' changeCompany val', val, 'selectRows:', selectRows);
    // if (selectRows?.length > 0) {
    //   queryParam.companyName = selectRows[0].compName;
    // }
  }

  const columns = ref(goodsCountColumns);
  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
    tableProps: {
      title: '进货统计',
      api: list,
      // columns: typeCountColumns,
      canResize: false,
      useSearchForm: false,
      showActionColumn: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
      afterFetch: async (resultItems) => {
        hasPan.value = resultItems.length > 0;
        countSubtotal.value = 0;
        weightSubtotal.value = 0;
        areaSubtotal.value = 0;
        volumeSubtotal.value = 0;
        amountSubtotal.value = 0;
        if (hasPan.value) {
          countSubtotal.value = resultItems[0].countTotal;
          weightSubtotal.value = resultItems[0].weightTotal;
          areaSubtotal.value = resultItems[0].areaTotal;
          volumeSubtotal.value = resultItems[0].volumeTotal;
          amountSubtotal.value = resultItems[0].amountTotal;
        }
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '进货统计',
      url: getExportUrl,
      params: queryParam,
    },
  });
  const [registerTable, { reload }, {rowSelection, selectedRows, selectedRowKeys}] = tableContext;
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

  function changeType() {
    getColumns();
    reload();
  }

  const detailDialogRef = ref();

  function lookDetail(record) {
    setParam(record);
    detailDialogRef.value.show(queryParam, fastDateParam, record);
  }

  const totalDialogRef = ref();

  function lookTotal(record) {
    setParam(record);
    totalDialogRef.value.show(queryParam, fastDateParam, record);
  }
  const queryTypeColumnObj = {
    'goodsCountColumns':'goodsId',
    'typeCountColumns':'categoryId',
    'supplierCountColumns':'supplierId',
    'operatorCountColumns':'operatorId',
    'careNoCountColumns':'careNo',
  };
  function setParam(record) {
    Object.keys(queryTypeColumnObj).forEach(key => {
      if (key === queryParam.queryType) {
        queryParam[queryTypeColumnObj[key]] = record.id;
      } else {
        queryParam[queryTypeColumnObj[key]] = '';
      }
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
