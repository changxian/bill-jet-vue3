<template>
  <BasicModal v-bind="$attrs" title="库存明细" @register="registerModal" width="1400px" :showCancelBtn="false" :showOkBtn="false">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item label="名称" name="goodsName">
              <a-input v-model:value="queryParam.goodsName" placeholder="请输入商品名称" allow-clear></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item label="方式" name="mode1">
                <a-select v-model:value="queryParam.mode1" @change="handleMode1Change" allow-clear placeholder="请选择">
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option v-for="mode in stockOptions.mode1" :key="mode.code" :value="mode.code">
                    {{ mode.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="类型" name="mode2">
                <a-select v-model:value="queryParam.mode2" allow-clear placeholder="请选择">
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option v-for="mode in stockOptions.mode2" :key="mode.code" :value="mode.code">
                    {{ mode.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-popconfirm
          title="确定撤销选定的库存变动吗？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="handleRollBackStock"
          @cancel="handleCancel"
        >
          <a-button type="primary" v-auth="'system:jxc_goods_inventory_record:add'" @click="" preIcon="ant-design:plus-outlined"> 撤销</a-button>
        </a-popconfirm>
      </template>
       <!--操作栏-->
<!--      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>-->
      <!--字段回显插槽-->
<!--      <template v-slot:bodyCell="{ column, record, index, text }">-->
<!--      </template>-->
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts" name="system-goodsInventoryRecord" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './GoodsInventoryRecord.data';
  import { list, getExportUrl, rollBack } from './GoodsInventoryRecord.api';
  import FastDate from '@/components/FastDate.vue';
  import { stockOptions } from './GoodsInventoryRecord.data';
  import { useMessage } from '@/hooks/web/useMessage';
  const queryParam = reactive<any>({ goodsName: '' });
  const fastDateParam = reactive<any>({ timeType: 'thisMonth', startDate: '', endDate: '' });
  const formRef = ref();
  const { createMessage } = useMessage();
  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'jxc_goods_inventory_record',
      api: list,
      columns,
      canResize: false,
      showIndexColumn: true,
      beforeFetch: (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
    },
    exportConfig: {
      name: '库存明细',
      url: getExportUrl,
      params: queryParam,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
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
  // const goodsName = ref<string>('');
  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    queryParam.goodsName = data.goodsName;
    searchQuery();
  });

  function handleMode1Change(value) {
    stockOptions.mode2 = stockOptions.mode1Map[value] || [];
  }

  /**
   * 撤销事件
   */
  async function handleRollBackStock(record: Recordable) {
    console.log(record);
    if (selectedRowKeys.value.length === 0) {
      return createMessage.warning('请先选择一条数据');
    }
    record = selectedRows.value[0];
    console.log(record);
    // 只能撤销非开单库存记录
    if (record.billId != null) {
      return createMessage.warning('送货开单、进货开单的库存明细请到单据管理里面进行删除操作！');
    }
    await rollBack({ id: record.id }).then((data) => {
      createMessage.success(data);
      reload();
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
    fastDateParam.startDate = '';
    fastDateParam.endDate = '';
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
</script>

<style lang="less" scoped>
  :deep(.ant-picker),:deep(.ant-input-number){
    width: 100%;
  }
  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
</style>
