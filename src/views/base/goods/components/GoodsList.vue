<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @dblclick="handleOk">
      <!--插槽:table标题-->
      <template v-if="billType != 'deliver'" #tableTitle>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleCustPrice" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:account-book-outlined"> 客户价</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:edit'" @click="handleModify('category')" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:edit-outlined"> 改类别</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleModify('updateCost')" :disabled="selectedRowKeys.length > 1" preIcon="ant-design:edit-outlined"> 更新成本</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleModify('updateStocks')" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:edit-outlined"> 变动库存</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleStockDetail" :disabled="selectedRowKeys.length > 1" preIcon="ant-design:plus-outlined"> 库存明细</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'bill:jxc_goods:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"> 导入</j-upload-button>
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
      <template v-if="billType != 'deliver'" #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <GoodsModal @register="registerModal" @success="handleSuccess" />
    <!-- 客户价表单 -->
    <CustPriceList @register="registerCustPriceModal" />
    <!-- 商品信息修改 -->
    <ModifyModal ref="modifyModalRef" @refresh="handleSuccess" />
    <!-- 商品库存明细 -->
    <GoodsInventoryRecordList @register="registerRecordModal" />
  </div>
</template>

<script lang="ts" name="bill-goods" setup>
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { BasicColumn, BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import GoodsModal from './GoodsModal.vue';
  import { getGoodsColumns, searchFormSchema } from './goods.data';
  import { batchDelete, deleteOne, getExportUrl, getImportUrl, list } from './goods.api';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import CustPriceList from './CustPriceList.vue';
  import ModifyModal from './ModifyModal.vue';
  import GoodsInventoryRecordList from '../GoodsInventoryRecordList.vue';

  const queryParam = reactive<any>({});
  const userStore = useUserStore();
  const { createMessage } = useMessage();
  const modifyModalRef = ref();
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerCustPriceModal, { openModal: custPriceModal }] = useModal();
  const [registerRecordModal, { openModal: recordModal }] = useModal();

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
    billType: { type: String, default: '' },
    searchGoodsName:{ type: String, default: '' },
    customerId: { type: String, default: '' },
  });
  // 开单类型【送货开单：deliver】
  const billType = computed(() => props?.billType);
  const searchGoodsName = computed(() => props?.searchGoodsName);
  // 开单时选择的客户
  const customerId = computed(() => props?.customerId);
  // 当前选中的部门ID，可能会为空，代表未选择部门
  const categoryId = computed(() => props.data?.id);
  console.log('billType is:' + billType.value, '   customerId is:' + customerId.value);
  const emits = defineEmits(['get-select', 'db-ok']);
  queryParam.name = '';
  const columns = getGoodsColumns(billType.value);

  //列表数据
  // const columns: BasicColumn[] =
  // 注册table数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tableContext, onExportXls, onImportXls } = useListPage( reactive({
    tableProps: {
      title: '商品信息',
      api: list,
      columns,
      cols: userStore.getCols, // 添加列备注信息
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      canResize: false,
      showTableSetting: false,
      clickToRowSelect: false,
      showIndexColumn: true,
      formConfig: {
        labelWidth: 120,
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
        params['billType'] = billType.value;
        params['custId'] = customerId.value;
        return Object.assign(params, queryParam);
      },
      rowSelection: {
        type: 'checkbox',
        onChange: function (ids, rows) {
          emits('get-select', rows, ids);
        },
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
  }));

  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;

  function handleOk() {
    console.log('=======', 'get-select', selectedRows.value, selectedRowKeys.value);
    if (selectedRowKeys.value.length > 0) {
      emits('get-select', selectedRows.value, selectedRowKeys.value);
      emits('db-ok');
    }
  }
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
   * 新增客户价
   */
  function handleCustPrice() {
    if (unref(selectedRowKeys).length != 1) {
      createMessage.warn('请选择一个商品');
      return;
    }
    console.log(selectedRowKeys.value, selectedRows.value[0]);
    custPriceModal(true, {
      goodsName: unref(selectedRows.value[0].name),
      row: selectedRows.value[0],
    });
  }
  /**
   * 编辑类别
   */
  function handleModify(type) {
    let row: Recordable = {};
    if (unref(selectedRowKeys).length > 0) {
      row = selectedRows.value[0];
    }
    modifyModalRef.value.show(type, row);
  }
  /**
   * 库存明细[可以选择一个商品 或者 不选商品]
   */
  function handleStockDetail() {
    let goodsName = '';
    if (unref(selectedRowKeys).length > 0) {
      goodsName = selectedRows.value[0].name;
    }
    recordModal(true, {
      goodsName: unref(goodsName),
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
