<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit"
              width="800px" :showCancelBtn="false" :showOkBtn="false">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
    </BasicTable>
  </BasicModal>

</template>
<script lang="ts" setup name="SysTenantPackRecordListModal">
import {computed,  ref, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {columns} from '../SysTenantPackRecord.data';
import {list} from '../SysTenantPackRecord.api';
import {useListPage} from '/@/hooks/system/useListPage';
import {BasicTable} from '/@/components/Table';
const packId = ref<number>('');
const tenantId = ref<number>(0);
const tenantName = ref<string>(0);

// 列表页面公共参数、方法
const {prefixCls, tableContext} = useListPage({
  designScope: 'tenant-template',
  tableProps: {
    api: list,
    columns: columns,
    immediate: false,
    beforeFetch: (params) => {
      return Object.assign(params, {packId: unref(packId) });
    },
  },
});
const [registerTable, {reload}, {rowSelection, selectedRowKeys, selectedRows}] = tableContext;
// Emits声明
const emit = defineEmits(['register', 'success']);

//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  packId.value = data.record.id;
  tenantId.value = data.tenantId;
  tenantName.value = data.tenantName;
  success();
});
//设置标题
const title = computed(() => `企业【${unref(tenantName)}】套餐购买历史`);


//表单提交事件
async function handleSubmit(v) {
  closeModal();
}

/**
 * 成功
 */
function success() {
  (selectedRowKeys.value = []) && reload();
}

</script>
