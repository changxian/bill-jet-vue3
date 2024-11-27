<template>
  <j-modal :title="title" :width="1000" :fullscreen="true" :maxHeight="800" :visible="visible" @cancel="handleCancel">
    <div style="padding: 20px 30px">
      <div class="p-2">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
              <FastDate v-model:modelValue="fastDateParam" />
              <a-col :lg="5">
                <a-form-item label="单类型" name="type">
                  <a-select v-model:value="queryParam.type">
                    <a-select-option value="">所有</a-select-option>
                    <a-select-option value="3">送货开单</a-select-option>
                    <a-select-option value="2">退货开单</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col v-if="queryParam.goodsId != ''" :lg="6">
                <a-form-item name="custName" label="客户名称">
                  <JInput v-model:value="queryParam.custName" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <a-col v-if="queryParam.goodsId == ''" :lg="6">
                <a-form-item name="goodsName" label="商品名称">
                  <JInput v-model:value="queryParam.goodsName" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <a-col v-if="queryParam.goodsId == ''" :lg="5">
                <a-form-item name="goodsCode" label="编号">
                  <JInput v-model:value="queryParam.goodsCode" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <a-col v-if="queryParam.goodsId == ''" :lg="5">
                <a-form-item name="goodsType" label="规格">
                  <JInput v-model:value="queryParam.goodsType" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <span style="float: left; margin-left: 20px; overflow: hidden" class="table-page-search-submitButtons">
                  <a-col :lg="6">
                    <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                    <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                  </a-col>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!--引用表格-->
        <BasicTable @register="registerTable" :rowSelection="rowSelection" :columns="columnList">
          <!--插槽:table标题-->
          <template #tableTitle>
            <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          </template>
        </BasicTable>
        <div style="position: relative; height: 20px; padding: 0 0 0 18px">
          <p :class="{'p_san': hasPan}" >总计
            <span class="total_span">数量：{{ countTotal }}</span>
            <span class="total_span" v-if="showWeightCol">重量({{ weightColTitle }})：{{ weightTotal }}</span>
            <span class="total_span" v-if="showAreaCol">面积({{ areaColTitle }})：{{ areaTotal }}</span>
            <span class="total_span" v-if="showVolumeCol">体积({{ volumeColTitle }})：{{ volumeTotal }}</span>
            <span class="total_span">金额：{{ amountTotal }}</span>
            <span class="total_span">成本：{{ costAmountTotal }}</span>
            <span class="total_span">利润：{{ profitAmountTotal }}</span>
          </p>
        </div>
        <!-- 表单区域 -->
      </div>
    </div>
    <template #footer></template>
  </j-modal>
</template>
<script lang="ts" setup>
  import { ref, defineExpose, reactive } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, userCol, careNoCol, custCol, operatorCol, categoryCol } from './DetailDialog.data';
  import { detailsList, getExportUrl } from '../DeliverStatistics.api';
  import { JInput } from '@/components/Form';
  import FastDate from '/@/components/FastDate.vue';
  import { getMyBillSetting } from '@/views/setting/system/index.api';

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
  // 总计：成本
  const costAmountTotal = ref(0);
  // 总计：利润
  const profitAmountTotal = ref(0);
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

  const hasPan = ref(true);
  const queryParam = reactive<any>({});
  const fastDateParam = reactive<any>({ timeType: '', startDate: '', endDate: '' });
  const formRef = ref();
  const titleObj = {
    goodsCountColumns: '送货统计明细-商品',
    typeCountColumns: '送货统计明细-类别',
    custCountColumns: '送货统计明细-客户',
    userNameCountColumns: '送货统计明细-业务员',
    operatorCountColumns: '送货统计明细-用户',
    careNoCountColumns: '送货统计明细-车号',
  };
  const title = ref('');
  const columnList = ref(columns);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '送货开单',
      api: detailsList,
      canResize: false,
      useSearchForm: false,
      showActionColumn: false,
      showIndexColumn: true,
      clickToRowSelect: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
      // summaryFunc: summaryFunc,
      afterFetch: async (resultItems) => {
        hasPan.value = resultItems.length > 0;
        countTotal.value = resultItems[0].countTotal;
        weightTotal.value = resultItems[0].weightTotal;
        areaTotal.value = resultItems[0].areaTotal;
        volumeTotal.value = resultItems[0].volumeTotal;
        amountTotal.value = resultItems[0].amountTotal;
        costAmountTotal.value = resultItems[0].costAmountTotal;
        profitAmountTotal.value = resultItems[0].profitAmountTotal;
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '送货明细',
      url: getExportUrl,
      params: queryParam,
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
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
    if(res.dynaFieldsGroup['1']){
        // 循环数据
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
        countTotal: countTotal.value,
        weightTotal: weightTotal.value,
        areaTotal: areaTotal.value,
        volumeTotal: volumeTotal.value,
        amountTotal: amountTotal.value,
        costAmountTotal: costAmountTotal.value,
        profitAmountTotal: profitAmountTotal.value,
      },
    ];
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

  const visible = ref(false);

  function show(_queryParam, _fastDateParam, _record) {
    Object.keys(_queryParam).forEach((key) => {
      queryParam[key] = _queryParam[key];
    });
    Object.keys(_fastDateParam).forEach((key) => {
      fastDateParam[key] = _fastDateParam[key];
    });
    let type = queryParam.queryType;
    title.value = titleObj[type] || '统计明细';
    const tmp = [...columnList.value];
    if (type === 'operatorCountColumns') {
      tmp.splice(3, 1, operatorCol);
      columnList.value = tmp;
    } else if (type === 'careNoCountColumns') {
      tmp.splice(3, 1, careNoCol);
      columnList.value = tmp;
    } else if (type === 'custCountColumns') {
      tmp.splice(3, 1, custCol);
      columnList.value = tmp;
    } else if (type === 'userNameCountColumns') {
      tmp.splice(3, 1, userCol);
      columnList.value = tmp;
    } else if (type === 'typeCountColumns') {
      tmp.splice(3, 1, categoryCol);
      columnList.value = tmp;
    } else {
      columnList.value = columns;
    }
    visible.value = true;
    reload();
  }
  function handleCancel() {
    visible.value = false;
  }
  defineExpose({
    show,
  });
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
