<template>
  <j-modal :title="title" width="80%" :maxHeight="750" :visible="visible" @cancel="handleCancel">
    <div style="padding:20px 30px">
      <div class="p-2">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam"
                  :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
              <FastDate v-model:modelValue="fastDateParam"/>
              <a-col :lg="6">
                <a-form-item name="goodsName" label="商品名称">
                  <JInput v-model:value="queryParam.goodsName" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :lg="6">
                  <a-form-item label="类型" name="type">
                    <a-select v-model:value="queryParam.type">
                      <a-select-option value="">所有</a-select-option>
                      <a-select-option value="1">送货还款</a-select-option>
                      <a-select-option value="2">退货还款</a-select-option>
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
                  <Icon
                    :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'"/>
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
            <a-button type="primary" v-auth="'deliver.bill:jxc_deliver_bill:exportXls'"
                      preIcon="ant-design:export-outlined" @click="onExportXls"> 导出
            </a-button>

            <!-- 高级查询 -->
            <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
          </template>
        </BasicTable>
        <!-- 表单区域 -->
      </div>
    </div>
    <template #footer></template>
  </j-modal>
</template>
<script lang="ts" setup>
import {ref, defineExpose, reactive, defineEmits} from 'vue'
import JModal from '/@/components/Modal/src/JModal/JModal.vue';
import {BasicTable, useTable} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage';
import {totalColumns} from './DetailDialog.data';
import {list, getExportUrl} from '../../debt/DeliverDebt.api'
import {JInput} from "@/components/Form";
import FastDate from '/@/components/FastDate.vue';
import dayjs from 'dayjs';

const queryParam = reactive<any>({});
const fastDateParam = reactive<any>({startDate: '', endDate: ''});
const formRef = ref()

const title = ref('送货统计明细-汇总')
const columnList = ref(totalColumns)
const toggleSearchStatus = ref<boolean>(false);
//注册table数据
const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: '送货开单',
    api: list,
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
    rowSelection: {type: 'radio'},
  },
  exportConfig: {
    name: "送货开单",
    url: getExportUrl,
    params: queryParam,
  },

});
const [registerTable, {reload}, {rowSelection, selectedRows, selectedRowKeys}] = tableContext;
const labelCol = reactive({
  xs: 24,
  sm: 4,
  xl: 6,
  xxl: 4
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
  fastDateParam.startDate = ''
  fastDateParam.endDate = ''
  selectedRowKeys.value = [];
  //刷新数据
  reload();
}

function handleEdit() {
}

const visible = ref(false)

function show(_queryParam, _fastDateParam, _record) {

  Object.keys(_queryParam).forEach(key => {
    queryParam[key] = _queryParam[key];
  });
  Object.keys(_fastDateParam).forEach(key => {
    fastDateParam[key] = _fastDateParam[key];
  });
  visible.value = true
}

function handleCancel() {
  visible.value = false
}

defineExpose({
  show
})

</script>


<style lang="less" scoped>
.table-page-search-submitButtons {
  display: block;
  margin-bottom: 24px;
  white-space: nowrap;
}
</style>
