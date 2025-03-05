<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <!--         <a-button preIcon="ant-design:user-add-outlined" type="primary" @click="handleAdd">新增</a-button>-->
        <!--        <a-button
                  v-if="selectedRowKeys.length > 0"
                  preIcon="ant-design:delete-outlined"
                  type="primary"
                  @click="handlePackBatch"
                  style="margin-right: 5px"
                >批量删除
                </a-button>-->
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!--  套餐  -->
    <TenantPackMenuModal @register="registerPackMenuModal" @success="handleSuccess" />
    <!--套餐菜单授权抽屉-->
    <PackPermissionDrawer @register="packPermissionDrawer" />
    <!--续费-->
    <TenantPackReNewModel @register="registerRenewModal" />
    <!--  套餐记录 -->
    <SysTenantPackRecordListModal @register="registerSysTenantPackRecordListModal" />
  </div>
</template>
<!-- 该页面是【企业套餐管理页面】 -->
<script lang="ts" name="tenant-default-pack" setup>
  import {ref, unref} from 'vue';
  import {BasicTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import {deleteTenantPack, packList} from '../tenant.api';
  import {packColumns, packFormSchema} from '../tenant.data';
  import TenantPackMenuModal from './TenantPackMenuModal.vue';
  import {useMessage} from '/@/hooks/web/useMessage';
  import {useListPage} from '/@/hooks/system/useListPage';
  import {useUserStore} from '/@/store/modules/user';
  import {Modal} from "ant-design-vue";

  import {useDrawer} from '/@/components/Drawer';
  import PackPermissionDrawer from '../components/PackPermissionDrawer.vue';
  import TenantPackReNewModel from '../components/TenantPackReNewModal.vue';
  import SysTenantPackRecordListModal from '@/views/system/tenant/pack/SysTenantPackRecordListModal.vue';

  const [packPermissionDrawer, {openDrawer: openPackPermissionDrawer}] = useDrawer();

  const [registerSysTenantPackRecordListModal, { openModal: sysTenantPackRecordListModal }] = useModal();
  const [registerRenewModal, {openModal: renewModal}] = useModal();

  const {createMessage} = useMessage();
  const [registerModal, {openModal}] = useModal();
  const [registerPackMenuModal, {openModal: packModal}] = useModal();
  const userStore = useUserStore();

  // 列表页面公共参数、方法
  const {prefixCls, tableContext} = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      api: packList,
      columns: packColumns,
      showIndexColumn: true,
      formConfig: {
        schemas: packFormSchema,
      },
      beforeFetch: (params) => {
        return Object.assign(params, { packType: '' });
      },
      //自定义默认排序
      defSort: {
        column: 'tenantId,packCode',
        order: 'desc',
      },
    },
  });
  const [registerTable, {reload}, {rowSelection, selectedRowKeys, selectedRows}] = tableContext;

  /**
   * 操作列定义
   * @param record
   */
  function getActions(record) {
    return [
      // {
      //   label: '编辑',
      //   onClick: handleEdit.bind(null, record),
      // },
      {
        label: '授权',
        onClick: handlePerssion.bind(null, record),
      },
      {
        label: '续费',
        onClick: renew.bind(null, record),
      },
      // {
      //   label: '删除',
      //   popConfirm: {
      //     title: '是否确认删除企业套餐',
      //     confirm: handleDelete.bind(null, record.id),
      //   },
      // },
    ];
  }

  /**
   * 更多
   * @param record
   */
  function getDropDownAction(record) {
    return [
      // {
      //   label: '详情',
      //   onClick: handleDetail.bind(null, record),
      // },
      // {
      //   label: '删除',
      //   popConfirm: {
      //     title: '是否确认删除企业套餐',
      //     confirm: handleDelete.bind(null, record),
      //   },
      // },
      // {
      //   label: '购买详情',
      //   onClick: buyRecord.bind(null, record),
      // },
    ];
  }

  /**
   * 编辑
   * @param record
   */
  async function buyRecord(record) {
    sysTenantPackRecordListModal(true, {
      isUpdate: true,
      record: record,
      tenantId: unref(record.tenantId),
      tenantName: unref(record.tenantIdName),
      showFooter: true,
    });
  }
  /**
   * 套餐授权弹窗
   */
  function handlePerssion(record) {
    openPackPermissionDrawer(true, {packId: record.id});
  }
  function renew(record) {
    const data = {
      packId: record.id,
      packCode: record.packCode,
      packName: record.packName,
      packType: record.packType,
      packNum: 1,
      packUnit: '2',
      tenantId: record.tenantId,
    };
    renewModal(true, {
      record: data, packId: record.id, isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 新增套餐
   */
  function handleAdd() {
    packModal(true, {
      isUpdate: false,
      packType: '',
      showFooter: true,
    });
  }

  /**
   * 删除默认套餐
   */
  async function handleDelete(id) {
    await deleteTenantPack({ids: id}, handleSuccess);
  }

  /**
   * 编辑
   */
  function handleEdit(record) {
    packModal(true, {
      isUpdate: true,
      record: record,
      packType: '',
      showFooter: true,
    });
  }

  /**
   * 新增套餐
   */
  async function handlePack() {
    if (unref(selectedRowKeys).length > 1) {
      createMessage.warn('请选择一个');
      return;
    }
    packModal(true, {
      tenantId: unref(selectedRowKeys.value.join(',')),
    });
  }

  /**
   * 删除成功之后回调事件
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 批量删除套餐
   */
  async function handlePackBatch() {
    Modal.confirm({
      title: '删除企业套餐',
      content: '是否删除企业套餐',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await deleteTenantPack({ids: selectedRowKeys.value.join(',')}, handleSuccess);
      }
    })
  }
</script>
