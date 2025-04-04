<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="packName">
              <template #label><span title="产品名称">产品名称</span></template>
              <a-input placeholder="请输入产品名称" v-model:value="queryParam.packName" allow-clear ></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="packCode">
              <template #label><span title="产品编码">产品编码</span></template>
              <a-input placeholder="请输入产品编码" v-model:value="queryParam.packCode" allow-clear ></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="category">
              <template #label><span title="产品类别">产品类别</span></template>
              <j-dict-select-tag v-model:value="queryParam.category" dictCode="sys_pack_category" placeholder="请选择产品类别" allow-clear />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="type">
                <template #label><span title="产品类型">产品类型</span></template>
                <j-dict-select-tag v-model:value="queryParam.packType" dictCode="sys_pack_pack_type" placeholder="请选择产品类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="orgNum">
                <template #label><span title="支持企业数">支持企业</span></template>
                <a-input-number placeholder="请输入支持企业数" v-model:value="queryParam.orgNum"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="customerNum">
                <template #label><span title="支持客户数">支持客户</span></template>
                <a-input-number placeholder="请输入支持客户数" v-model:value="queryParam.customerNum"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="accountNum">
                <template #label><span title="支持账号数">支持账号</span></template>
                <a-input-number placeholder="请输入支持账号数" v-model:value="queryParam.accountNum"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="goodsNum">
                <template #label><span title="支持商品数量()">支持商品</span></template>
                <a-input-number placeholder="请输入支持商品数量" v-model:value="queryParam.goodsNum"></a-input-number>
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
        <a-button type="primary" v-auth="'syspack:sys_pack:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增套餐</a-button>
        <!--<a-button type="primary" v-auth="'syspack:sys_pack:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>-->
        <!--<j-upload-button type="primary" v-auth="'syspack:sys_pack:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>-->
        <a-dropdown v-if="false">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-auth="'syspack:sys_pack:deleteBatch'">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <SysPackModal ref="registerModal" @success="handleSuccess"></SysPackModal>
    <!--套餐菜单授权抽屉-->
    <PackPermissionDrawer @register="packPermissionDrawer" />
  </div>
</template>

<script lang="ts" name="syspack-sysPack" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './SysPack.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './SysPack.api';
  import SysPackModal from './components/SysPackModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useDrawer } from '/@/components/Drawer';
  import PackPermissionDrawer from './components/PackPermissionDrawer.vue';
  import JDictSelectTag from '@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  const [packPermissionDrawer, { openDrawer: openPackPermissionDrawer }] = useDrawer();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '系统套餐信息',
      api: list,
      columns,
      showIndexColumn: true,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 180,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '系统套餐信息',
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
        auth: 'syspack:sys_pack:edit'
      },{
        label: '授权',
        onClick: handlePerssion.bind(null, record),
      },
    ];
  }
      /**
   * 套餐授权弹窗
   */
  function handlePerssion(record) {
    openPackPermissionDrawer(true, { packId: record.id });
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
        auth: 'syspack:sys_pack:delete',
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
