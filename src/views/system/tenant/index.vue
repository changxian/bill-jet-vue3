<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px">新增企业信息</a-button>
        <a-dropdown v-if="selectedRowKeys.length < 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>批量操作<Icon icon="mdi:chevron-down"></Icon></a-button>
        </a-dropdown>
        <a-button v-if="false" preIcon="ant-design:user-add-outlined" type="primary" @click="handleInvitation" style="margin-right: 5px" :disabled="selectedRowKeys.length != 1">邀请用户加入</a-button>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handlePack" style="margin-right: 5px" :disabled="selectedRowKeys.length != 1">绑定套餐</a-button>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleTemplate" style="margin-right: 5px" :disabled="selectedRowKeys.length != 1">定制模板</a-button>
        <a-button v-if="false" type="primary" @click="recycleBinClick" preIcon="ant-design:hdd-outlined">回收站</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
      <template #category_dictText="{ record }">
        <span v-if="9 == record.category" style="color: red"><b>运营商</b></span><span v-else-if="5 == record.category" style="color: red">代理商</span><span v-else>客户</span>
      </template>
      <template #customizedTemp_dictText="{ record }">
        <span v-if="1 == record.customizedTemp" style="color: red">需要</span><span v-else>不需要</span>
      </template>
    </BasicTable>
    <!--  租户信息添加、编辑页面  -->
    <TenantModal @register="registerModal" @success="reload" />
    <TenantInviteUserModal @register="registerSelUserModal" @inviteOk="handleInviteUserOk" />
    <TenantUserModal @register="registerTenUserModal" />
    <!--  租户绑定的套餐列表页面  -->
    <TenantPackList @register="registerPackModal" />
    <!--  租户定制的模板列表页面  -->
    <TemplateCustomizedList @register="registerCustomizedListModal" />
    <!--  企业回收站  -->
    <TenantRecycleBinModal @register="registerRecycleBinModal" @success="reload" />
  </div>
</template>
<!-- 该页面是【企业管理】主页面 -->
<script lang="ts" name="system-tenant" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getTenantList, deleteTenant, batchDeleteTenant, invitationUserJoin } from './tenant.api';
  import { columns, searchFormSchema } from './tenant.data';
  import TenantModal from './components/TenantModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TenantInviteUserModal from './components/TenantInviteUserModal.vue';
  import TenantUserModal from './components/TenantUserList.vue';
  import TenantPackList from './pack/TenantPackList.vue';
  import TenantRecycleBinModal from './components/TenantRecycleBinModal.vue';
  import TemplateCustomizedList from '@/views/system/tenant/customized/TemplateCustomizedList.vue';
  // import { getTenantId } from '@/utils/auth';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerSelUserModal, { openModal: userOpenModal }] = useModal();
  const [registerTenUserModal, { openModal: tenUserOpenModal }] = useModal();
  const [registerPackModal, { openModal: packModal }] = useModal();
  const [registerCustomizedListModal, { openModal: customizedModal }] = useModal();
  const [registerRecycleBinModal, { openModal: recycleBinModal }] = useModal();

  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      title: '企业列表',
      api: getTenantList,
      columns: columns,
      clickToRowSelect: true,
      showIndexColumn: true,
      rowSelection: { type: 'radio' },
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
      },
      actionColumn: {
        width: 150,
        fixed: 'right',
      },
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;

  /**
   * 操作列定义
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: '用户',
        onClick: handleSeeUser.bind(null, record),
      },
    ];
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      // tenantId: getTenantId(),
    });
  }

  /**
   * 编辑事件
   */
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    if (record.status === 1) {
      createMessage.warn('状态正常的企业不能被删除！');
      return;
    }
    await deleteTenant({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteTenant({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 邀请用户加入企业
   */
  function handleInvitation() {
    userOpenModal(true, {});
  }

  /**
   * 用户选择回调事件
   * @param options
   * @param value
   */
  async function handleInviteUserOk(value) {
    //update-begin---author:wangshuai ---date:20230314  for：【QQYUN-4605】后台的邀请谁加入企业，没办法选不是企业下的用户------------
    if (value) {
      await invitationUserJoin({ ids: selectedRowKeys.value.join(','), phone: value });
    }
    //update-end---author:wangshuai ---date:20230314  for：【QQYUN-4605】后台的邀请谁加入企业，没办法选不是企业下的用户------------
  }

  /**
   * 查看用户
   * @param id
   */
  function handleSeeUser(record) {
    tenUserOpenModal(true, {
      id: record.id,
      tenantName: unref(record.name),
    });
  }

  /**
   * 新增套餐
   */
  function handlePack() {
    if (unref(selectedRowKeys).length > 1) {
      createMessage.warn('请选择一个企业');
      return;
    }
    packModal(true, {
      tenantId: unref(selectedRowKeys.value.join(',')),
      tenantName: unref(selectedRows.value[0].name),
      tenantCategory: unref(selectedRows.value[0].category),
      //我的企业显示新增和编辑套餐
      showPackAddAndEdit: true,
    });
  }

  /**
   * 新增定制模板
   */
  function handleTemplate() {
    if (unref(selectedRowKeys).length > 1) {
      createMessage.warn('请选择一个企业');
      return;
    // } else if (unref(selectedRowKeys).length == 1) {
    //   if (unref(selectedRows.value[0].customizedTemp) !== 1) {
    //     createMessage.warn('该企业没有定制模板的需求！');
    //     return;
    //   }
    }
    customizedModal(true, {
      tenantId: unref(selectedRowKeys.value.join(',')),
      tenantName: unref(selectedRows.value[0].name),
      customizedTemp: unref(selectedRows.value[0].customizedTemp),
      //我的企业显示新增和编辑模板
      showTemplateAddAndEdit: true,
    });
  }

  /**
   * 回收站
   */
  function recycleBinClick() {
    recycleBinModal(true, {});
  }

  /**
   * 删除成功之后回调事件
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
</script>
