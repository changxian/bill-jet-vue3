<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="orgName">
              <template #label><span title="客户名称">客户名称</span></template>
              <j-input placeholder="请输入客户名称" v-model:value="queryParam.orgName" allow-clear></j-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="cellPhone">
              <template #label><span title="手机">手机</span></template>
              <j-input placeholder="请输入手机" v-model:value="queryParam.cellPhone" allow-clear></j-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="phone">
                <template #label><span title="电话">电话</span></template>
                <j-input placeholder="请输入电话" v-model:value="queryParam.phone" allow-clear></j-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="contact">
                <template #label><span title="联系人">联系人</span></template>
                <j-input placeholder="请输入联系人" v-model:value="queryParam.contact" allow-clear></j-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="qq">
                <template #label><span title="QQ">QQ</span></template>
                <j-input placeholder="请输入QQ" v-model:value="queryParam.qq" allow-clear></j-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="wechat">
                <template #label><span title="微信">微信</span></template>
                <j-input placeholder="请输入微信" v-model:value="queryParam.wechat" allow-clear></j-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="email">
                <template #label><span title="邮箱">邮箱</span></template>
                <j-input placeholder="请输入邮箱" v-model:value="queryParam.email" allow-clear></j-input>
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
        <a-button type="primary" v-auth="'deliver.customer:jxc_customer:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'deliver.customer:jxc_customer:custPrice'" :disabled="selectedRowKeys.length != 1" @click="handleCustPrice" preIcon="ant-design:account-book-outlined"> 客户价</a-button>
        <a-button type="primary" v-auth="'deliver.customer:jxc_customer:debt'" :disabled="selectedRowKeys.length != 1" @click="handleAdd" preIcon="ant-design:switcher-outlined"> 还款明细</a-button>
        <a-button type="primary" v-auth="'deliver.customer:jxc_customer:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'deliver.customer:jxc_customer:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"> 导入</j-upload-button>
        <a-button type="link" preIcon="ant-design:export-outlined" target="_blank" style="margin-left: 20px; padding-top: 5px" @click="onTemplateXls"> 客户信息导入模板下载</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'deliver.customer:jxc_customer:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
        <!-- 高级查询
        <super-query :config="superQueryConfig" @search="handleSuperQuery" />
        -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
     </BasicTable>
    <!-- 表单区域 -->
    <CustomerModal @register="registerModal" @success="handleSuccess"></CustomerModal>
    <!-- 客户价列表区域 -->
    <CustPriceList @register="registerCustPriceModal" />
  </div>
</template>

<script lang="ts" name="deliver.customer-customer" setup>
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './Customer.data';
  import {
    batchDelete,
    customerNum,
    deleteOne,
    getExportUrl,
    getImportUrl,
    list
  } from "./Customer.api";
  import CustPriceList from './custprice/GoodsCustPriceList.vue';
  import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
  import CustomerModal from './components/CustomerModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const [registerCustPriceModal, { openModal: custPriceModal }] = useModal();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const [registerModal, { openModal }] = useModal();
  const userStore = useUserStore();
  // 客户个数
  const total = ref(0);
  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
  });

  // 当前选中的客户ID，可能会为空，代表未选择客户
  const categoryId = computed(() => props.data?.id);

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '客户管理',
      api: list,
      columns,
      dynamicCols: userStore.getDynamicCols['jxc_customer'], // 添加扩展列信息
      canResize: false,
      useSearchForm: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
      rowSelection: { type: 'radio' },
    },
    exportConfig: {
      name: '客户管理',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;
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

  watch(
    () => props.data,
    () => reload()
  );

  /**
   * 客户信息导入模板下载事件
   */
  function onTemplateXls() {
    // 创建隐藏的下载链接
    const link = document.createElement('a');
    link.href = '/templates/customerTemplate.xls?t=${Date.now()}'; // 文件路径
    link.download = '客户信息导入模板.xlsx'; // 自定义下载文件名
    link.style.display = 'none';

    // 触发点击下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    createMessage.success('模板文件正在下载中！');
  }

  // 租户套餐信息
  const tenantPack = userStore.getTenantPack;
  /**
   * 新增事件
   */
  function handleAdd() {
    customerNum().then((res) => {
      total.value = res.total;
    });
    // 如果公司数量小于套餐内规定数量，则可以继续添加
    if (tenantPack.customerNum == null || tenantPack.customerNum > total.value) {
      openModal(true, {
        isUpdate: false,
        showFooter: true,
        categoryId: categoryId.value,
      });
    } else {
      createMessage.warning('客户数量已达上限！如果还想添加更多客户，请联系运营商扩容！');
    }
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
      categoryId: categoryId.value,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 新增客户价
   */
  function handleCustPrice() {
    if (unref(selectedRowKeys).length != 1) {
      createMessage.warn('请选择一个客户');
      return;
    }
    custPriceModal(true, {
      custId: unref(selectedRowKeys.value[0]),
      custName: unref(selectedRows.value[0].orgName),
    });
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
        auth: 'deliver.customer:jxc_customer:edit',
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
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'deliver.customer:jxc_customer:delete',
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
