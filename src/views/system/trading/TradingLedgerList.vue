<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item name="payerName">
              <template #label><span title="客户名称">客户名称</span></template>
              <JInput v-model:value="queryParam.payerName" />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="name">
                <template #label><span title="费用名称">费用名称</span></template>
                <JInput v-model:value="queryParam.objectName" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="category">
                <template #label><span title="交易类别">交易类别</span></template>
                <a-select v-model:value="queryParam.category" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">套餐开户</a-select-option>
                  <a-select-option value="2">套餐续费</a-select-option>
                  <a-select-option value="3">定制模板</a-select-option>
                  <a-select-option value="4">购买激活码</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="packCategory">
                <template #label><span title="套餐类别">套餐类别</span></template>
                <a-select v-model:value="queryParam.packCategory" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">单机版</a-select-option>
                  <a-select-option value="2">云端版</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="packType">
                <template #label><span title="套餐类型">套餐类型</span></template>
                <a-select v-model:value="queryParam.packType" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">送货单版</a-select-option>
                  <a-select-option value="2">进销存版</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="invoiceStatus">
                <template #label><span title="开票状态">开票状态</span></template>
                <a-select v-model:value="queryParam.invoiceStatus" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">未开</a-select-option>
                  <a-select-option value="2">不开</a-select-option>
                  <a-select-option value="3">已开</a-select-option>
                  <a-select-option value="4">无信息</a-select-option>
                  <a-select-option value="9">作废</a-select-option>
                </a-select>
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
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <TradingLedgerModal ref="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="org.jeecg.modules.trading-jxcTradingLedger" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './TradingLedger.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TradingLedger.api';
  import TradingLedgerModal from './components/TradingLedgerModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
  import FastDate from '@/components/FastDate.vue';
  import { useRoute } from 'vue-router';

  const formRef = ref();
  const route = useRoute();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', startDate: '', endDate: '' });
  if (route.query) {
    fastDateParam.startDate = route.query.startDate;
    fastDateParam.endDate = route.query.endDate;
  }
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '交易台账记录表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
    },
    exportConfig: {
      name: '交易台账记录表',
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
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
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        // auth: 'org.jeecg.modules.trading:jxc_trading_ledger:edit',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'org.jeecg.modules.trading:jxc_trading_ledger:delete',
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
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust {
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }
    .ant-form-item:not(.ant-form-item-with-help) {
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),:deep(.ant-input-number) {
      width: 100%;
    }
  }
</style>
