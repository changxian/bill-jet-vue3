<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="1000px" :showCancelBtn="false" :showOkBtn="false">
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @edit-end="handleEditEnd" @edit-cancel="handleEditCancel" :beforeEditSubmit="beforeEditSubmit" >
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAddCust" style="margin-right: 5px">新增 </a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
  <!--客户抽屉-->
  <CustomerList @register="registerCustModal" @success="reload" />
</template>
<script lang="ts" setup name="goods-cust-price-list-modal">
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { custPriceColumns, custPriceFormSchema } from '../CustPrice.data';
  import { list, deleteOne, updatePrice } from '../CustPrice.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/@/components/Table';
  import CustomerList from './CustomerList.vue';

  //注册modal
  const [registerCustModal, { openModal: custPriceOpenModal }] = useModal();

  const goodsId = ref<number>(0);
  const goodsName = ref<string>('');
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'customer-price-template',
    tableProps: {
      api: list,
      columns: custPriceColumns,
      showIndexColumn: true,
      immediate: false,
      formConfig: {
        schemas: custPriceFormSchema,
        labelWidth: 120,
        autoSubmitOnEnter: true,
        showAdvancedButton: false,
        fieldMapToNumber: [],
        fieldMapToTime: [],
        labelCol: {
          xxl: 8,
        },
        actionColOptions: {
          xs: 24,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 8,
          xxl: 8,
        },
      },
      beforeFetch: (params) => {
        return Object.assign(params, { goodsId: unref(goodsId), goodsName: unref(goodsName) });
      },
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  // provide('reloadCustPrice', reload);
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    goodsId.value = data.goodsId;
    goodsName.value = data.goodsName;
    success();
  });
  //设置标题
  const title = computed(() => ( unref(goodsName) + ' 商品的客户价'));
  //表单提交事件
  async function handleSubmit() {
    closeModal();
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 成功
   */
  function success() {
    (selectedRowKeys.value = []) && reload();
  }

  function handleEditEnd({ record, index, key, value }: Recordable) {
    console.log(record, index, key, value);
    return false;
  }

  // 模拟将指定数据保存
  async function feakSave({ value, key, id }) {
    await updatePrice({ id: id, price: value });
    reload()
  }

  async function beforeEditSubmit({ record, index, key, value }) {
    return await feakSave({ id: record.id, key, value });
  }

  function handleEditCancel() {
    console.log('cancel');
  }

  /**
   * 新增表单
   */
  function handleAddCust() {
    custPriceOpenModal(true, {
      isUpdate: false,
      goodsId: unref(goodsId),
      goodsName: unref(goodsName),
      showFooter: true,
    });
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
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
</script>
