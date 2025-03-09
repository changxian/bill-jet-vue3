<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'company:sys_tenant_company:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'company:sys_tenant_company:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'company:sys_tenant_company:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <TenantCompanyModal ref="registerModal" @success="handleSuccess"></TenantCompanyModal>
  </div>
</template>

<script lang="ts" name="company-tenantCompany" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './TenantCompany.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, tenantCompanyNum } from './TenantCompany.api';
  import TenantCompanyModal from './components/TenantCompanyModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();
  const userStore = useUserStore();
  // 公司个数
  const total = ref(0);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '公司管理',
      api: list,
      columns,
      canResize: false,
      dynamicCols: userStore.getDynamicCols['sys_tenant_company'], // 添加扩展列信息
      useSearchForm: false,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        let rangerQuery = await setRangeQuery();
        return Object.assign(params, rangerQuery);
      },
    },
    exportConfig: {
      name: '公司管理',
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
  // 租户套餐信息
  const tenantPack = userStore.getTenantPack;
  /**
   * 新增事件
   */
  function handleAdd() {
    tenantCompanyNum().then((res) => {
      total.value = res.total;
    });
    // 如果公司数量小于套餐内规定数量，则可以继续添加
    if (tenantPack.orgNum != null && tenantPack.orgNum > total.value) {
      registerModal.value.disableSubmit = false;
      registerModal.value.add();
    } else {
      createMessage.warning('公司数量已达上限！如果还想添加更多公司，请联系运营商扩容！');
    }
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
    if (record.isDefault) {
      return createMessage.warning('默认公司数据不能删除！');
    } else {
      await deleteOne({ id: record.id }, handleSuccess);
    }
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
        auth: 'company:sys_tenant_company:edit'
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
        auth: 'company:sys_tenant_company:delete',
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

  let rangeField = '';

  /**
   * 设置范围查询条件
   */
  async function setRangeQuery() {
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach(item => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item+'_begin'] = range[0];
          queryParamClone[item+'_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item+'_begin'] = '';
          queryParamClone[item+'_end'] = '';
        }
      });
    }
    return queryParamClone;
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
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
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
