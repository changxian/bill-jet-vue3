<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" :fastDateType="fastDateType" />
          <a-col :lg="6">
            <a-form-item label="单类型" name="type">
              <a-select v-model:value="queryParam.type" allow-clear>
                <a-select-option value="">所有</a-select-option>
                <a-select-option value="3">送货开单</a-select-option>
                <a-select-option value="2">退货开单</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :lg="6">
            <a-form-item label="公司" name="companyId">
              <j-select-company v-model:value="queryParam.companyId" @change="changeCompany" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="padding: 0 0 10px 20px">
          <a-radio-group v-model:value="queryParam.queryType" @change="changeType">
            <a-radio value="goodsCountColumns">按商品</a-radio>
            <a-radio value="typeCountColumns">按类别</a-radio>
            <a-radio value="custCountColumns">按客户</a-radio>
            <a-radio value="userNameCountColumns">按业务员</a-radio>
            <a-radio value="operatorCountColumns">按用户</a-radio>
            <a-radio value="careNoCountColumns">按车号</a-radio>
          </a-radio-group>
        </a-row>
        <a-row>
          <a-col :lg="6">
            <a-form-item name="name" label="筛选">
              <JInput v-model:value="queryParam.name" class="query-group-cust" allow-clear></JInput>
            </a-form-item>
          </a-col>
          <!--<template v-if="toggleSearchStatus">
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; margin-left: 20px; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <!--<a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>-->
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :columns="columns">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
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
      <p :class="{'p_san': hasPan}" >总计
        <span class="total_span">数量：{{countSubtotal}}</span>
        <span class="total_span" v-if="showWeightCol">重量({{weightColTitle}})：{{weightSubtotal}}</span>
        <span class="total_span" v-if="showAreaCol">面积({{areaColTitle}})：{{areaSubtotal}}</span>
        <span class="total_span" v-if="showVolumeCol">体积({{volumeColTitle}})：{{volumeSubtotal}}</span>
        <span class="total_span">金额：{{amountSubtotal}}</span>
        <span class="total_span">成本：{{costSubtotal}}</span>
        <span class="total_span">利润：{{profitSubtotal}}</span>
      </p>
    </div>
    <DetailDialog ref="detailDialogRef" :fastDateType="fastDateType" />
    <TotalDialog ref="totalDialogRef" :fastDateType="fastDateType" />
  </div>
</template>

<script lang="ts" name="deliver.statistics-DeliverStatistics" setup>
  import { ref, defineExpose, reactive, defineEmits } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { goodsCountColumns, typeCountColumns, custCountColumns, userNameCountColumns, operatorCountColumns, careNoCountColumns } from './DeliverStatistics.data';
  import { list, getExportUrl } from './DeliverStatistics.api';
  import { JInput } from '@/components/Form';
  import FastDate from '/@/components/FastDate.vue';
  import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import DetailDialog from './components/DetailDialog.vue';
  import TotalDialog from './components/TotalDialog.vue';
  import { useUserStore } from '@/store/modules/user';
  import { getMyBillSetting } from '@/views/setting/system/index.api';

  const uStore = useUserStore();
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
  // 总计：成本
  const costSubtotal = ref(0);
  // 总计：利润
  const profitSubtotal = ref(0);
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
  const queryParam = reactive<any>({ queryType: 'goodsCountColumns', companyId: '', companyName: '', custId: '', goodsId: '', categoryId: '', operatorId: '', userId: '', careNo: '' });
  const fastDateParam = reactive<any>({ startDate: '', endDate: '' });
  // 快速日期默认类型
  const fastDateType = ref('month');
  const formRef = ref();
  const columnObj = { goodsCountColumns, typeCountColumns, custCountColumns, userNameCountColumns, operatorCountColumns, careNoCountColumns };
  // function getColumns() {
  //   return columnObj[queryParam.queryType];
  // }

  function changeCompany(val, selectRows) {
    console.log(' changeCompany val', val, 'selectRows:', selectRows);
    // if (selectRows?.length > 0) {
    //   queryParam.companyName = selectRows[0].compName;
    // }
  }

  const columns = ref(goodsCountColumns);
  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls } = useListPage({
    tableProps: {
      title: '送货开单',
      api: list,
      // columns: typeCountColumns,
      cols: uStore.getCols, // 添加列备注信息
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
      summaryFunc: summaryFunc,
      afterFetch: async (resultItems) => {
        hasPan.value = resultItems.length > 0;
        countSubtotal.value = 0;
        weightSubtotal.value = 0;
        areaSubtotal.value = 0;
        volumeSubtotal.value = 0;
        amountSubtotal.value = 0;
        costSubtotal.value = 0;
        profitSubtotal.value = 0;
        resultItems.forEach((item) => {
          countSubtotal.value += item.countSubtotal;
          weightSubtotal.value += item.weightSubtotal;
          areaSubtotal.value += item.areaSubtotal;
          volumeSubtotal.value += item.volumeSubtotal;
          amountSubtotal.value += item.amountSubtotal;
          costSubtotal.value += item.costSubtotal;
          profitSubtotal.value += item.profitSubtotal;
        });
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '送货开单',
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

  function changeType() {
    queryParam.goodsId = '';
    queryParam.categoryId = '';
    queryParam.custId = '';
    queryParam.userId = '';
    queryParam.operatorId = '';
    queryParam.careNo = '';
    columns.value = columnObj[queryParam.queryType];
    reload();
  }

  // 加载系统开单设置
  getMyBillSetting().then((res) => {
    debugger;
    showWeightCol.value = !!res.showWeightCol;
    showAreaCol.value = !!res.showAreaCol;
    showVolumeCol.value = !!res.showVolumeCol;
    if (res.decimalPlaces === 0 || res.decimalPlaces) {
      decimalPlaces.value = res.decimalPlaces;
    }
    // 循环数据
    res.dynaFieldsGroup['1'].forEach(item => {
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
  });
  // 增加合计行
  function summaryFunc(resultItems) {
    return [
      {
        _row: '合计',
        _index: '合计',
        countSubtotal: countSubtotal.value,
        weightSubtotal: weightSubtotal.value,
        areaSubtotal: areaSubtotal.value,
        volumeSubtotal: volumeSubtotal.value,
        amountSubtotal: amountSubtotal.value,
        costSubtotal: costSubtotal.value,
        profitSubtotal: profitSubtotal.value,
      },
    ];
  }

  const detailDialogRef = ref();
  function lookDetail(record) {
    debugger;
    if (queryParam.queryType === 'goodsCountColumns') {
      queryParam.goodsId = record.id;
    }
    if (queryParam.queryType === 'typeCountColumns') {
      queryParam.categoryId = record.id;
    }
    if (queryParam.queryType === 'custCountColumns') {
      queryParam.custId = record.id;
    }
    if (queryParam.queryType === 'userNameCountColumns') {
      queryParam.userId = record.id;
    }
    if (queryParam.queryType === 'operatorCountColumns') {
      queryParam.operatorId = record.id;
    }
    if (queryParam.queryType === 'careNoCountColumns') {
      queryParam.careNo = record.id;
    }
    detailDialogRef.value.show(queryParam, record);
  }
  const totalDialogRef = ref();
  function lookTotal(record) {
    totalDialogRef.value.show(record);
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

  defineExpose({

  });

</script>

<style lang="less" scoped>
  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
</style>
