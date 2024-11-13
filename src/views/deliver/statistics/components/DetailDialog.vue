<template>
  <j-modal :title="title" :width="1000" :fullscreen="true" :maxHeight="800" :visible="visible" @cancel="handleCancel">
    <div style="padding: 20px 30px">
      <div class="p-2">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
              <FastDate v-model:modelValue="fastDateParam" :fastDateType="fastDateType" />
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
        <!-- 表单区域 -->
      </div>
    </div>
    <template #footer></template>
  </j-modal>
</template>
<script lang="ts" setup>
  import { ref, defineExpose, reactive, defineProps, computed } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, userCol, careNoCol } from './DetailDialog.data';
  import { detailsList, getExportUrl } from '../DeliverStatistics.api';
  import { JInput } from '@/components/Form';
  import FastDate from '/@/components/FastDate.vue';
  import { useUserStore } from '@/store/modules/user';

  const uStore = useUserStore();
  const queryParam = reactive<any>({});
  const fastDateParam = reactive<any>({ startDate: '', endDate: '' });
  const formRef = ref();

  const props = defineProps({
    fastDateType: {
      type: String,
      default: '',
    },
  });
  // 快速日期默认选项
  const fastDateType = computed(() => {
    if (props.fastDateType != '') {
      return props.fastDateType;
    }
  });
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
      cols: uStore.getCols, // 添加列备注信息
      dynamicCols: uStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
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

  function show(param, record) {
    debugger;
    queryParam['goodsId'] = param.goodsId;
    queryParam['categoryId'] = param.categoryId;
    queryParam['custId'] = param.custId;
    queryParam['userId'] = param.userId;
    queryParam['operatorId'] = param.operatorId;
    queryParam['careNo'] = param.careNo;
    let type = param.queryType;
    title.value = titleObj[type] || '统计明细';
    if (type === 'operatorCountColumns') {
      const tmp = [...columnList.value];
      tmp.splice(3,1, userCol);
      columnList.value = tmp;
    } else if (type === 'careNoCountColumns') {
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
</style>
