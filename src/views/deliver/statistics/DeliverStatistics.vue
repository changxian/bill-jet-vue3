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

  const uStore = useUserStore();
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
