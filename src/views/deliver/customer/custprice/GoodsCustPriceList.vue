<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="1000px" :showCancelBtn="false" :showOkBtn="false">
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @edit-end="handleEditEnd" @edit-cancel="handleEditCancel" :beforeEditSubmit="beforeEditSubmit" :change="handleChange">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px">新增 </a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
  <!--商品抽屉-->
  <GoodsList @register="registerGoodsModal" @success="reload" />
</template>
<script lang="ts" setup name="goods-cust-price-list-modal">
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { custPriceColumns, custPriceFormSchema } from './GoodsCustPrice.data';
  import { list, deleteOne, updatePrice } from './GoodsCustPrice.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/@/components/Table';
  import GoodsList from '../goods/GoodsList.vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  //注册modal
  const [registerGoodsModal, { openModal: goodsOpenModal }] = useModal();

  const custId = ref<number>(0);
  const custName = ref<string>('');
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'cust-price-template',
    tableProps: {
      api: list,
      columns: custPriceColumns,
      showIndexColumn: true,
      immediate: false,
      formConfig: {
        schemas: custPriceFormSchema,
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
        return Object.assign(params, { custId: unref(custId), custName: unref(custName) });
      },
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  // provide('reloadCustPrice', reload);
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    custId.value = data.custId;
    custName.value = data.custName;
    success();
  });
  //设置标题
  const title = computed(() => ( unref(custName) + ' 客户价管理'));
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

  function handleChange(value, key, column) {
    console.log(value, key, column, '=========================');
    // const newData = [...this.data];
    // const target = newData.find(item => key === item.key);
    // if (target) {
    //   target[column] = value;
    //   this.data = newData;
    // }
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
    // createMessage.loading({
    //   content: `正在保存${key}`,
    //   key: '_save_fake_data',
    //   duration: 0,
    // });
    await updatePrice({ id: id, price: value }, reload());
    // createMessage.success({
    //   content: `记录${id}的${key}已保存`,
    //   key: '_save_fake_data',
    //   duration: 2,
    // });
  }

  async function beforeEditSubmit({ record, index, key, value }) {
    console.log('单元格数据正在准备提交------------', record, record.id, index, key, value );
    return await feakSave({ id: record.id, key, value });
  }

  function handleEditCancel() {
    console.log('cancel');
  }

  /**
   *
   * 新增表单
   */
  function handleAdd() {
    goodsOpenModal(true, {
      isUpdate: false,
      custId: unref(custId),
      custName: unref(custName),
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
        auth: 'deliver.customer:jxc_customer:delete'
      },
    ];
  }
</script>
