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
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="category">
                <template #label><span title="产品类别(单机版/云端版)">产品类别</span></template>
                <a-input placeholder="请输入产品类别(单机版/云端版)" v-model:value="queryParam.category" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="type">
                <template #label><span title="产品类型(送货单版/进销存版)">产品类型</span></template>
                <a-input placeholder="请输入产品类型(送货单版/进销存版)" v-model:value="queryParam.packType" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="orgNum">
                <template #label><span title="支持企业数(单机1个公司、云端版支持4家公司切换开单)">支持企业</span></template>
                <a-input-number placeholder="请输入支持企业数(单机1个公司、云端版支持4家公司切换开单)" v-model:value="queryParam.orgNum"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="accountNum">
                <template #label><span title="支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)">支持账号</span></template>
                <a-input-number placeholder="请输入支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)" v-model:value="queryParam.accountNum"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="goodsNum">
                <template #label><span title="支持商品数量()">支持商品</span></template>
                <a-input-number placeholder="请输入支持商品数量()" v-model:value="queryParam.goodsNum"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="price">
                <template #label><span title="产品标准价格">产品标准</span></template>
                <a-input-number placeholder="请输入产品标准价格" v-model:value="queryParam.price"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="discounted">
                <template #label><span title="产品折扣">产品折扣</span></template>
                <a-input-number placeholder="请输入产品折扣" v-model:value="queryParam.discounted"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="discountedPrice">
                <template #label><span title="产品折扣价">产品折扣</span></template>
                <a-input-number placeholder="请输入产品折扣价" v-model:value="queryParam.discountedPrice"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="specification">
                <template #label><span title="规格">规格</span></template>
                <a-input-number placeholder="请输入规格" v-model:value="queryParam.specification"></a-input-number>           
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="specificationUnit">
                <template #label><span title="规格单位">规格单位</span></template>
                <a-input placeholder="请输入规格单位" v-model:value="queryParam.specificationUnit" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="status">
                <template #label><span title="产品启用状态(1 启用, 0 停用)">产品启用</span></template>
                <a-input placeholder="请输入产品启用状态(1 启用, 0 停用)" v-model:value="queryParam.status" allow-clear ></a-input>
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
        <a-button type="primary" v-auth="'syspack:sys_pack:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button  type="primary" v-auth="'syspack:sys_pack:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button  type="primary" v-auth="'syspack:sys_pack:importExcel'"  preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-auth="'syspack:sys_pack:deleteBatch'">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'syspack:sys_pack:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
        <!-- 高级查询 -->
        <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
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
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './SysPack.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './SysPack.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import SysPackModal from './components/SysPackModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import { useDrawer } from '/@/components/Drawer';
  import PackPermissionDrawer from './components/PackPermissionDrawer.vue';
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
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "系统套餐信息",
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
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

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
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'syspack:sys_pack:delete'
      }
    ]
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
