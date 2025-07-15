<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <!--<FastDate v-model:modelValue="fastDateParam" />-->
          <a-col :lg="5">
            <a-form-item name="name">
              <template #label><span title="登录账号">账号</span></template>
              <a-input placeholder="请输入登录账号" v-model:value="queryParam.userid" allow-clear></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="5">
            <a-form-item name="name">
              <template #label><span title="用户名称">名称</span></template>
              <a-input placeholder="请输入用户名称" v-model:value="queryParam.username" allow-clear></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="tenantName">
              <template #label><span title="手机号">企业名称</span></template>
              <a-input placeholder="请输入企业名称" v-model:value="queryParam.tenantName" allow-clear></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
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
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="log-loginlog" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable } from '/src/components/Table';
  import { useListPage } from '/src/hooks/system/useListPage';
  import { columns } from './LoginLog.data';
  import { loginList } from './LoginLog.api';
  import FastDate from "@/components/FastDate.vue";

  const formRef = ref();
  const queryParam = reactive<any>({});
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '登录台账',
      api: loginList,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
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
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }
    .ant-form-item:not(.ant-form-item-with-help){
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),:deep(.ant-input-number){
      width: 100%;
    }
  }
</style>
