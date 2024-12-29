<template>
  <j-modal :title="title" width="1000px" :fullscreen="true" maxHeight="800px" :visible="visible"
           @cancel="handleCancel">
    <div style="padding: 20px 30px">
      <div class="p-2">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam"
                  :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
              <FastDate v-model:modelValue="fastDateParam"/>
              <a-col :lg="6">
                <a-form-item name="goodsName" label="商品名称">
                  <AInput v-model:value="queryParam.goodsName" class="query-group-cust"></AInput>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :lg="6">
                  <a-form-item label="单类型" name="type">
                    <a-select v-model:value="queryParam.type">
                      <a-select-option value="">所有</a-select-option>
                      <a-select-option value="1">进货开单</a-select-option>
                      <a-select-option value="2">退货开单</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item name="goodsCode" label="商品编号">
                    <JInput v-model:value="queryParam.goodsCode" class="query-group-cust"></JInput>
                  </a-form-item>
                </a-col>
                <a-col :lg="6">
                  <a-form-item name="goodsType" label="规格">
                    <JInput v-model:value="queryParam.goodsType" class="query-group-cust"></JInput>
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
                      <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'"/>
                    </a>
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
            <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:exportXls'"
                      preIcon="ant-design:export-outlined" @click="onExportXls"> 导出
            </a-button>
          </template>
          <template #type_dictText="{ record }">
            <span v-if="2 == record.type" style="color: red">{{ record.type_dictText }}</span><span v-else  >{{ record.type_dictText }}</span>
          </template>
        </BasicTable>
        <div style="position: relative; height: 20px; padding: 0 0 0 18px">
          <p :class="{'p_san': hasPan}" >总计
            <span class="total_span">数量：{{ countTotal }}</span>
            <span class="total_span" v-if="showWeightCol">重量<span v-if="weightColTitle">({{ weightColTitle }})</span>：{{ weightTotal }}</span>
            <span class="total_span" v-if="showAreaCol">面积<span v-if="areaColTitle">({{ areaColTitle }})</span>：{{ areaTotal }}</span>
            <span class="total_span" v-if="showVolumeCol">体积<span v-if="volumeColTitle">({{ volumeColTitle }})</span>：{{ volumeTotal }}</span>
            <span class="total_span">金额：{{ amountTotal }}</span>
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
  import { columns, userCol, careNoCol } from './DetailDialog.data';
  import { detailsExportXls } from '../PurchaseStatistics.api';
  import { JInput } from '@/components/Form';
  import FastDate from '/@/components/FastDate.vue';
  import { detailsList } from '@/views/purchase/statistics/PurchaseStatistics.api';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const billSetting = userStore.getBillSetting;

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
  const fastDateParam = reactive<any>({ timeType:'', startDate: '', endDate: ''});
  const formRef = ref();

  const titleObj = {
    goodsCountColumns: '进货统计明细-商品',
    typeCountColumns: '进货统计明细-类别',
    supplierCountColumns: '进货统计明细-供应商',
    operatorCountColumns: '进货统计明细-用户',
    careNoCountColumns: '进货统计明细-车号',
  };
  const title = ref('');
  const columnList = ref(columns);
  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
    tableProps: {
      title: '进货开单',
      api: detailsList,
      canResize: false,
      cols: userStore.getCols, // 添加列备注信息
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
        countTotal.value = 0;
        weightTotal.value = 0;
        areaTotal.value = 0;
        volumeTotal.value = 0;
        amountTotal.value = 0;
        if (hasPan.value) {
          countTotal.value = resultItems[0].countTotal;
          weightTotal.value = resultItems[0].weightTotal;
          areaTotal.value = resultItems[0].areaTotal;
          volumeTotal.value = resultItems[0].volumeTotal;
          amountTotal.value = resultItems[0].amountTotal;
        }
      },
      rowSelection: {type: 'radio'},
    },
    exportConfig: {
      name: '进货统计明细',
      url: detailsExportXls,
      params: queryParam,
    },
  });
  const [registerTable, {reload}, {rowSelection, selectedRows, selectedRowKeys}] = tableContext;
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
  if (billSetting) {
    showWeightCol.value = !!billSetting.showWeightCol;
    showAreaCol.value = !!billSetting.showAreaCol;
    showVolumeCol.value = !!billSetting.showVolumeCol;
    if (billSetting.decimalPlaces === 0 || billSetting.decimalPlaces) {
      decimalPlaces.value = billSetting.decimalPlaces;
    }
    if (billSetting.dynaFieldsGroup['1']) {
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
    fastDateParam.startDate = ''
    fastDateParam.endDate = ''
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }

  function handleEdit() {
  }

  const visible = ref(false);

  function show(_queryParam, _fastDateParam, _record) {
    Object.keys(_queryParam).forEach(key => {
      queryParam[key] = _queryParam[key];
    });
    Object.keys(_fastDateParam).forEach(key => {
      fastDateParam[key] = _fastDateParam[key];
    });

    let queryType = queryParam.queryType;
    title.value = titleObj[queryType] || '统计明细';
    if (queryType === 'operatorCountColumns') {
      const tmp = [...columnList.value];
      tmp.splice(3, 1, userCol);
      columnList.value = tmp;
    } else if (queryType === 'careNoCountColumns') {
      const tmp = [...columnList.value];
      tmp.splice(3, 1, careNoCol);
      columnList.value = tmp;
    } else {
      columnList.value = columns;
    }
    visible.value = true;
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
