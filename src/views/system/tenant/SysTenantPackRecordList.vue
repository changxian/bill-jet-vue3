<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="system-sysTenantPackRecord" setup>
import {ref, reactive} from 'vue';
import {BasicTable, TableAction} from '/@/components/Table';
import {useModal} from '/@/components/Modal';
import {useListPage} from '/@/hooks/system/useListPage'
import SysTenantPackRecordModal from './components/SysTenantPackRecordModal.vue'
import {columns} from './SysTenantPackRecord.data';
import {list, getExportUrl} from './SysTenantPackRecord.api';
import {useUserStore} from '/@/store/modules/user';

const queryParam = reactive<any>({});
const checkedKeys = ref<Array<string | number>>([]);
const userStore = useUserStore();
//注册model
const [registerModal, {openModal}] = useModal();
//注册table数据
const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: '套餐菜单关系表',
    api: list,
    columns,
    canResize: false,

    actionColumn: {
      width: 120,
      fixed: 'right'
    },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam);
    },
  },
  exportConfig: {
    name: "套餐菜单关系表",
    url: getExportUrl,
    params: queryParam,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, {reload}, {rowSelection, selectedRowKeys}] = tableContext

/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}
</script>

<style lang="less" scoped>
:deep(.ant-picker), :deep(.ant-input-number) {
  width: 100%;
}
</style>
