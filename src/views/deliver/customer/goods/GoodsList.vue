<template>
  <BasicModal v-bind="$attrs" @register="registerGoodsModal" title="搜索商品" @ok="handleGoodsSubmit" width="1100px" :showCancelBtn="true" :showOkBtn="true">
    <!--引用表格-->
    <BasicTable @register="registerGoodsTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts" name="bill-goods" setup>
  import { reactive, computed, watch, ref } from "vue";
  import { BasicTable, BasicColumn } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './goods.data';
  import { goodsList } from './goods.api';
  import { useUserStore } from '/@/store/modules/user';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { saveInitCustPrice } from '../custprice/GoodsCustPrice.api';

  const queryParam = reactive<any>({});
  const userStore = useUserStore();
  const custId = ref<number>(0);
  const custName = ref<string>('');

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
  });

  const [registerGoodsModal, { closeModal }] = useModalInner(async (data) => {
    custId.value = data.custId;
    custName.value = data.custName;
    success();
  });

  // 当前选中的部门ID，可能会为空，代表未选择部门
  const categoryId = computed(() => props.data?.id);

  // 注册table数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tableContext } = useListPage({
    tableProps: {
      title: '商品信息',
      api: goodsList,
      columns,
      // cols: userStore.getCols, // 添加列备注信息
      // dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      canResize: false,
      showTableSetting: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      beforeFetch: (params) => {
        params['categoryId'] = categoryId.value;
        params['custId'] = custId.value
        return Object.assign(params, queryParam);
      },
    },
  });

  watch(
    () => props.data,
    () => reload()
  );

  const [registerGoodsTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const confirmLoading = ref<boolean>(false);
  const isUpdate = ref(false);
  //表单提交事件
  // const reloadCustPrice = inject('reloadCustPrice',()=>{});
  async function handleGoodsSubmit() {
    const data: any = {};
    if (!data.custId) {
      data.custId = custId.value;
    }
    if (!data.custName) {
      data.custName = custName.value;
    }
    if (!data.goodsIds) {
      data.goodsIds = rowSelection.selectedRowKeys;
    }
    confirmLoading.value = true;
    await saveInitCustPrice(data, isUpdate.value);
    confirmLoading.value = false;
    emit('success');
    // reloadCustPrice();
    closeModal();
  }

  /**
   * 成功
   */
  function success() {
    (selectedRowKeys.value = []) && reload();
  }

</script>

<style lang="less" scoped>
  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
