<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'bill:jxc_goods:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"
          >导入</j-upload-button
        >
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'bill:jxc_goods:deleteBatch'"
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>

      <!-- 动态字段回显插槽-->
      <template #dynamic1="{ record }">
        {{ record.dynamicField.dynamic1 }}
      </template>
      <template #dynamic2="{ record }">
        {{ record.dynamicField.dynamic2 }}
      </template>
      <template #dynamic3="{ record }">
        {{ record.dynamicField.dynamic3 }}
      </template>
      <template #dynamic4="{ record }">
        {{ record.dynamicField.dynamic4 }}
      </template>
      <template #dynamic5="{ record }">
        {{ record.dynamicField.dynamic5 }}
      </template>
      <template #dynamic6="{ record }">
        {{ record.dynamicField.dynamic6 }}
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <GoodsModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="bill-goods" setup>
  import { reactive, computed, watch } from 'vue';
  import { BasicTable, TableAction, BasicColumn } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import GoodsModal from './GoodsModal.vue';
  import { columns, searchFormSchema } from './goods.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './goods.api';
  import { useUserStore } from '/@/store/modules/user';
  const queryParam = reactive<any>({});
  const userStore = useUserStore();
  //注册model
  const [registerModal, { openModal }] = useModal();

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
  });

  // 当前选中的部门ID，可能会为空，代表未选择部门
  const categoryId = computed(() => props.data?.id);

  // 注册table数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '商品信息',
      api: list,
      columns,
      cols: userStore.getCols, // 添加列备注信息
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      canResize: false,
      showTableSetting: false,
      clickToRowSelect: false,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      } as BasicColumn,
      beforeFetch: (params) => {
        params['categoryId'] = categoryId.value;
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '商品信息',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  watch(
    () => props.data,
    () => reload()
  );

  /**
   * 新增事件
   */
  function handleAdd() {
    let record = {
      dynamicFields: userStore.getDynamicCols['jxc_goods'],
    };
    openModal(true, {
      record,
      isUpdate: false,
      showFooter: true,
      categoryId: categoryId.value,
    });
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
        auth: 'bill:jxc_goods:edit', // 权限控制
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
        auth: 'bill:jxc_goods:delete', // 权限控制
      },
    ];
  }
</script>

<style lang="less" scoped>
  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
