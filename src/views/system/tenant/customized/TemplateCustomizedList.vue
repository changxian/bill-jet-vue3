<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="1200px" :showCancelBtn="false" :showOkBtn="false">
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'org.jeecg.modules.system:jxc_template_customized:add'" v-if="showTemplateAddAndEdit" @click="handleAdd" preIcon="ant-design:plus-outlined"> 选择定制模板</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
  </BasicModal>
  <!-- 表单区域 -->
  <TemplateCustomizedModal ref="registerCustomizedModal" @success="handleSuccess" />
</template>

<script lang="ts" name="org.jeecg.modules.system-templateCustomized" setup>
  import { ref, reactive, unref, computed } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './TemplateCustomized.data';
  import {
    list,
    deleteOne,
    getImportUrl,
    getExportUrl,
    recycleOne
  } from "./TemplateCustomized.api";
  import TemplateCustomizedModal from '../components/TemplateCustomizedModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { allCustomizedTemp } from '@/views/template/Template.api';
  import { useMessage } from '@/hooks/web/useMessage';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const tenantCustomerId = ref<number>(0);
  const customizedTemp = ref<number>(0);
  const tenantCustomerName = ref<string>('0');
  const { createMessage } = useMessage();
  //是否显示新增和编辑套餐
  const showTemplateAddAndEdit = ref<boolean>(false);
  // const [registerCustomizedModal, { openModal: customizedModal }] = useModal();
  const registerCustomizedModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '模板定制记录表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      rowSelection: { type: 'radio' },
      actionColumn: {
        width: 180,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, { tenantCustomerId: unref(tenantCustomerId), tenantCustomerName: unref(tenantCustomerName) });
      },
      // afterFetch: async (resultItems) => {
      //   showTemplateAddAndEdit.value = resultItems.length <= 0;
      // },
    },
    exportConfig: {
      name: '模板定制记录表',
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

  //表单赋值
  const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
    tenantCustomerId.value = data.tenantId;
    tenantCustomerName.value = data.tenantName;
    customizedTemp.value = data.customizedTemp;
    showTemplateAddAndEdit.value = data.showTemplateAddAndEdit;
    success();
  });
  //设置标题
  const title = computed(() => `企业【${unref(tenantCustomerName)}】定制模板列表`);

  //表单提交事件
  async function handleSubmit(v) {
    closeModal();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    if (customizedTemp.value === 1) {
      allCustomizedTemp({ tenantCustomerId: tenantCustomerId.value }).then((res) => {
        debugger;
        if (res && res.length > 0) {
          registerCustomizedModal.value.disableSubmit = false;
          // 客户租户标识
          registerCustomizedModal.value.tenantCustomerId = tenantCustomerId.value;
          // 客户租户名称
          registerCustomizedModal.value.tenantCustomerName = tenantCustomerName.value;
          registerCustomizedModal.value.add();
        } else {
          createMessage.warn('没有定制模板可以选择，请先去创建该企业需要的定制模板');
        }
      });
    } else {
      createMessage.warn('该企业没有定制模板的需求！');
    }
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerCustomizedModal.value.disableSubmit = false;
    // 客户租户标识
    registerCustomizedModal.value.tenantCustomerId = tenantCustomerId.value;
    // 客户租户名称
    registerCustomizedModal.value.tenantCustomerName = tenantCustomerName.value;
    registerCustomizedModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerCustomizedModal.value.disableSubmit = true;
    // 客户租户标识
    registerCustomizedModal.value.tenantCustomerId = tenantCustomerId.value;
    // 客户租户名称
    registerCustomizedModal.value.tenantCustomerName = tenantCustomerName.value;
    registerCustomizedModal.value.edit(record);
  }

  /**
   * 收回定制模板事件
   */
  async function handleRecycleOne(record) {
    await recycleOne({ id: record.id, templateId: record.templateId }, handleSuccess);
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 成功
   */
  function success() {
    (selectedRowKeys.value = []) && reload();
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
        auth: 'org.jeecg.modules.system:jxc_template_customized:edit',
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '收回',
        popConfirm: {
          title: '是否确认收回该模板？',
          confirm: handleRecycleOne.bind(null, record),
          // placement: 'topLeft',
        },
        // auth: 'org.jeecg.modules.system:jxc_template_customized:delete',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      // {
      //   label: '删除',
      //   popConfirm: {
      //     title: '是否确认删除',
      //     confirm: handleDelete.bind(null, record),
      //     placement: 'topLeft',
      //   },
      //   auth: 'org.jeecg.modules.system:jxc_template_customized:delete',
      // },
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

  defineExpose({
    tenantCustomerId,
    tenantCustomerName,
  });
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
