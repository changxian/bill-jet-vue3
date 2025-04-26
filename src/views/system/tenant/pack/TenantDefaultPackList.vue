<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button type="primary" :disabled="selectedRowKeys.length != 1"  v-auth="'system:sys_tenant_pack_record:add'" @click="handleModify" preIcon="ant-design:edit-outlined">套餐扩容</a-button>
        <a-button type="primary"  :disabled="selectedRowKeys.length != 1" v-auth="'activate:activate:activateCodeList'" @click="renewByCode" preIcon="ant-design:edit-outlined">套餐续费</a-button>
        <!--<a-button type="primary"  v-if="false" :disabled="selectedRowKeys.length != 1"  v-auth="'system:sys_tenant_pack_record:add'" @click="renew" preIcon="ant-design:edit-outlined">续费</a-button>-->
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
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <!--  绑定激活套餐  -->
    <TenantPackMenuModal @register="registerPackMenuModal" @success="handleSuccess" />
    <!--套餐菜单授权抽屉-->
    <PackPermissionDrawer @register="packPermissionDrawer" />
    <!-- 套餐续费--未使用 -->
    <TenantPackReNewModel @register="registerRenewModal" />
    <!-- 激活或续费 -->
    <TenantPackReNewByCodeModel @register="registerRenewByCodeModal" @success="handleSuccess" />
    <!--  套餐记录 -->
    <SysTenantPackRecordListModal @register="registerSysTenantPackRecordListModal" @success="handleSuccess" />
    <!--  套餐扩容 -->
    <ModifyTenantPackModal @register="registerModifyTenantPackModal" @success="handleSuccess" />
  </div>
</template>
<!-- 该页面是【企业套餐管理页面】 -->
<script lang="ts" name="tenant-default-pack" setup>
  import { unref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { deleteTenantPack, packList } from '../tenant.api';
  import { packColumns, packFormSchema } from '../tenant.data';
  import TenantPackMenuModal from './TenantPackMenuModal.vue';
  import ModifyTenantPackModal from './ModifyTenantPackModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { Modal } from 'ant-design-vue';

  import { useDrawer } from '/@/components/Drawer';
  import PackPermissionDrawer from '../components/PackPermissionDrawer.vue';
  import TenantPackReNewModel from '../components/TenantPackReNewModal.vue';
  import TenantPackReNewByCodeModel from '../components/TenantPackReNewByCodeModal.vue';
  import SysTenantPackRecordListModal from '@/views/system/tenant/pack/SysTenantPackRecordListModal.vue';
  import { myActivateCodeList } from '@/views/activate/ActivateCode.api';

  const [packPermissionDrawer, { openDrawer: openPackPermissionDrawer }] = useDrawer();

  const [registerSysTenantPackRecordListModal, { openModal: sysTenantPackRecordListModal }] = useModal();
  const [registerRenewModal, { openModal: renewModal }] = useModal();
  const [registerRenewByCodeModal, { openModal: renewByCodeModal }] = useModal();
  const [registerModifyTenantPackModal, { openModal: modifyTenantPackModal }] = useModal();

  const { createMessage } = useMessage();
  // const [registerModal, { openModal }] = useModal();
  const [registerPackMenuModal, { openModal: packModal }] = useModal();
  // const userStore = useUserStore();

  // const modifyModalRef = ref();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      api: packList,
      columns: packColumns,
      clickToRowSelect: true,
      showIndexColumn: true,
      rowSelection: { type: 'radio' },
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
  const [registerTable, { reload }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;

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
      // {
      //   label: '续费',
      //   onClick: renew.bind(null, record),
      // },
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
  function renew( ) {
    if (selectedRowKeys.value.length != 1) {
      return createMessage.warning('请先选择一条数据');
    }
    const record = selectedRows.value[0];
    const data = {
      tenantPackId: record.id,
      packCode: record.packCode,
      packName: record.packName,
      packType: record.packType,
      accountNum: record.accountNum,
      orgNum: record.orgNum,
      goodsNum: record.goodsNum,
      price: record.price,
      packNum: 1,
      packUnit: '2',
      tenantId: record.tenantId,
    };
    renewModal(true, {
      record: data,
      packId: record.id,
      isUpdate: true,
      showFooter: true,
    });
  }

  // 套餐续费
  function renewByCode() {
    if (selectedRowKeys.value.length != 1) {
      return createMessage.warning('请先选择一条数据');
    }
    const record = selectedRows.value[0];
    // 判断是否代理商套餐
    if (record.packType == 3) {
      return createMessage.warning('代理商企业套餐不需要续费！');
    }
    // 判断是否单机版套餐
    if (record.packCategory == '1') {
      return createMessage.warning('单机版企业套餐不需要续费！');
    }
    myActivateCodeList({
      status: '1',
      packType: record.packType,
      packCategory: record.packCategory,
    }).then((res) => {
      // debugger;
      let catCode = res[0].activateCode;
      record.activateCode = catCode;
      renewByCodeModal(true, {
        record: record,
        tenantPackId: record.id,
        actTenantId: record.tenantId,
        isUpdate: true,
        showFooter: true,
      });
    });
    // const data = {
    //   tenantPackId: record.id,
    //   actTenantId: record.tenantId,
    //   actTenantName: record.tenantName,
    // };
    // renewByCodeModal(true, {
    //   record: record,
    //   tenantPackId: record.id,
    //   actTenantId: record.tenantId,
    //   isUpdate: true,
    //   showFooter: true,
    // });
  }
  // 修改企业套餐扩容信息
  function handleModify() {
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选择数据');
    }
    const row = selectedRows.value[0];
    // modifyModalRef.value.show(row);
    modifyTenantPackModal(true, {
      record: row,
      tenantPackId: row.id,
      isUpdate: true,
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
