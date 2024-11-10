<template>
  <j-modal title="还款明细" :width="1000" :fullscreen="true" :maxHeight="800" :visible="visible"
           @cancel="handleCancel">
    <div style="padding:20px 30px">
      <div class="p-2">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam"
                  :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
              <FastDate v-model:modelValue="fastDateParam" startDateKey="repayDate_begin"
                        endDateKey="repayDate_end"/>
              <a-col :lg="6">
                <a-form-item name="supplierName">
                  <template #label><span title="供应商名称">供应商名</span></template>
                  <JInput v-model:value="queryParam.supplierName" class="query-group-cust"></JInput>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :lg="6">
                  <a-form-item label="类型" name="type">
                    <a-select v-model:value="queryParam.type">
                      <a-select-option value="">所有</a-select-option>
                      <a-select-option value="1">进货还款</a-select-option>
                      <a-select-option value="2">退货还款</a-select-option>
                    </a-select>
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
        <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="rowClick">
          <!--插槽:table标题-->
          <template #tableTitle>
            <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"
                      @click="handleEdit" preIcon="ant-design:edit-outlined"> 修改
            </a-button>
            <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:add'"
                      @click="handleRevoke" preIcon="ant-design:edit-outlined"> 撤回
            </a-button>

            <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:exportXls'"
                      preIcon="ant-design:export-outlined" @click="onExportXls"> 导出
            </a-button>

            <!-- 高级查询 -->
            <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
          </template>
        </BasicTable>
        <!-- 表单区域 -->
        <div class="tbl-wrap">
          <a-spin :spinning="detailLoading">
            <BasicTable @register="registerTableDetail" :dataSource="dataSourceDetail">
            </BasicTable>
          </a-spin>

        </div>
      </div>
    </div>
    <template #footer></template>
  </j-modal>
  <RepayEditDialog ref="epayEditDialogRef"/>
</template>
<script lang="ts" setup>
import {ref, defineExpose, reactive, defineEmits} from 'vue'
import JModal from '/@/components/Modal/src/JModal/JModal.vue';
import {BasicTable, useTable} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage';
import {columns, detailColumns} from './RepayDetailDialog.data';
import {getExportUrl, repayDetailList, purchaseRepayList, repayRevoke} from '../PurchaseDebt.api'
import {JInput} from "@/components/Form";
import FastDate from '/@/components/FastDate.vue';

import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

const queryParam = reactive<any>({});
const fastDateParam = reactive<any>({repayDate_begin: '', repayDate_end: ''});
const formRef = ref()
const epayEditDialogRef = ref()
const detailLoading = ref(false)
const toggleSearchStatus = ref<boolean>(false);
//注册table数据
const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: '还款明细',
    api: purchaseRepayList,
    columns,
    canResize: false,
    useSearchForm: false,
    showActionColumn: false,
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
    name: "进货开单",
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


const dataSourceDetail: any = ref([])
const {tableContext: tableContextDetail} = useListPage({
  designScope: 'basic-table-demo',
  tableProps: {
    title: '',
    columns: detailColumns,
    showActionColumn: false,
    rowkey: 'id',
    pagination: false
  },
});
const [registerTableDetail,] = tableContextDetail;


/**
 * 查询
 */
function searchQuery() {
  reload();
}

function rowClick(record) {
  detailLoading.value = true
  repayDetailList({repayId: record.id}).then(res => {
    dataSourceDetail.value = [...res]
  }).finally(() => {
    detailLoading.value = false
  })

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
  if (selectedRows.value.length === 0) {
    return createMessage.warning('请选择一条数据')
  }

  const params = {
    ...selectedRows.value[0]
  }
  epayEditDialogRef.value.show(params, false)
}

function handleRevoke() {

  createConfirm({
    iconType: 'warning',
    title: '确认还款撤回',
    content: '是否还款撤回选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      repayRevoke({ids: selectedRowKeys.value}).then(() => {
        reload();
      });
    }
  });
}

const visible = ref(false)

function show(record) {
  visible.value = true
  if (record?.supplierName) {
    queryParam.supplierName = record.supplierName
    reload();
  }
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
