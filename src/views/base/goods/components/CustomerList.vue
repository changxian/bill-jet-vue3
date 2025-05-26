<template>
  <div class="p-2">
    <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleGoodsSubmit" destroyOnClose title="客户搜索" width="1100px">
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
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
              </a-col>
            </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!--引用表格-->
      <BasicTable @register="registerTable" :rowSelection="rowSelection">
      </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts" name="deliver.customer-customer" setup>
  import { BasicTable } from '/@/components/Table';
  import { reactive, ref, watch, defineEmits } from 'vue';
  import { useListPage } from '/src/hooks/system/useListPage';
  import { columns } from '../Customer.data';
  import { list } from '../Customer.api';
  import { saveInitCustPrice2 } from '../CustPrice.api';
  import JInput from '/src/components/Form/src/jeecg/components/JInput.vue';
  import { useUserStore } from '/src/store/modules/user';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success']);
  const { createMessage } = useMessage();
  const formRef = ref();
  const queryParam = reactive<any>({});
  let row;
  const [registerModal, { openModal, closeModal }] = useModalInner(async (data) => {
    row = data.row;
  });
  const userStore = useUserStore();
  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
  });

  // 当前选中的客户ID，可能会为空，代表未选择客户
  // const categoryId = computed(() => props.data?.id);

  //注册table数据
  const { prefixCls, tableContext } = useListPage({
    tableProps: {
      title: '客户搜索',
      api: list,
      columns,
      dynamicCols: userStore.getDynamicCols['jxc_customer'], // 添加扩展列信息
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        params['goodsId'] = row.id;
        return Object.assign(params, queryParam);
      },
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

  // 确定
  async function handleGoodsSubmit() {
    // console.log('selectedRowKeys, selectedRows:', selectedRowKeys, selectedRows.value[0].orgName);
    // console.log('row:', row);
    const data: any = {};
    if (!data.goodsId) {
      data.goodsId = row.id;
    }
    if (!data.goodsName) {
      data.goodsName = row.goodsName;
    }
    if (!data.goodsType) {
      data.goodsType = row.goodsType;
    }
    if (!data.price) {
      data.price = row.price;
    }
    if (!data.custIds) {
      data.custIds = selectedRowKeys.value;
    }
    console.log('data:', data);
    await saveInitCustPrice2(data, false).then((res) => {
      if (res.success) {
        emit('success');
        closeModal();
      } else {
        createMessage.warning(res.message);
      }
    });
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
