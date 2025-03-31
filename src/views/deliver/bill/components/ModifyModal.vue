<template>
  <j-modal :title="title" :width="width" :maxHeight="400" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel"
           cancelText="关闭">
    <div style="padding:20px 30px">
      <!-- 改状态 -->
      <div v-if="modifyType === 'status'">
        <p>1.签收代表您已经收到货物并签字。</p>
        <p>2.过账代表账结清。</p>
        <p>3.审核代表已经审核了，就不能修改了，只能删除。</p>
        <p>4.作废单据不参与统计、对账、还款。</p>
        <p style="margin:40px 0 20px 10px">单号： {{billNo}}</p>
        <p style="margin:0 0 0 10px">状态：<j-dict-select-tag
                  style="width:300px"
                  v-model:value="status"
                  :options="statusOptions"
                  dictCode=""
                  placeholder="请选择状态"
                  allow-clear
                /> </p>
      </div>

      <!-- 改开票 -->
      <div v-if="modifyType === 'invoiceStatus'">
        <p style="margin:40px 0 20px 10px">单号： {{billNo}}</p>
        <p style="margin:0 0 0 10px">状态：<j-dict-select-tag
                  style="width:300px"
                  v-model:value="invoiceStatus"
                  :options="billStatusOptions"
                  dictCode=""
                  placeholder="请选择状态"
                  allow-clear
                /> </p>
      </div>
      <!-- 改信息 -->
      <div v-if="modifyType === 'info'">
        <p style="margin:40px 0 10px 10px"><span style="text-align:right;display:inline-block;width:80px">单号：</span> {{billNo}}</p>
        <p style="margin:0 0 10px 10px">  <span style="text-align:right;display:inline-block;width:80px">送货车号：</span> <a-input  style="width:400px" v-model:value="careNo" placeholder="请输入送货车号" allow-clear></a-input></p>
        <p style="margin:0 0 10px 10px"> <span style="text-align:right;display:inline-block;width:80px">合同号：</span><a-input  style="width:400px" v-model:value="contractCode" placeholder="请输入合同号" allow-clear></a-input></p>
        <p style="margin:0 0 10px 10px"> <span style="text-align:right;display:inline-block;width:80px">备注：</span><a-textarea  style="width:400px" v-model:value="remark" placeholder="请输入备注" allow-clear></a-textarea></p>
      </div>
    </div>
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { statusList, billStatusList } from '../DeliverBill.data';
  import { editStatus, editInvoiceStatus, editInfo } from '../DeliverBill.api';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const title = ref<string>('');
  const width = ref<number>(600);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['refresh']);

  const status = ref('');
  const billNo = ref('');
  const invoiceStatus = ref('');
  const statusOptions = ref(statusList);
  const billStatusOptions = ref(billStatusList);

  const contractCode = ref('');
  const careNo = ref('');
  const remark = ref('');

  const titleObj = {
    status: '改状态',
    invoiceStatus: '改开票',
    info: '改信息',
  }
  const modifyType = ref('');
  let row = {
    id: '',
  };
  function show(type, data) {
    title.value = titleObj[type];
    modifyType.value = type;
    billNo.value = data.billNo;
    status.value = data.status + '';
    invoiceStatus.value = data.invoiceStatus + '';
    careNo.value = data.careNo;
    contractCode.value = data.contractCode;
    remark.value = data.remark;
    row = data;
    visible.value = true;
  }

  /**
   * 确定按钮点击事件
   */
  async function handleOk() {
    let res: any;
    if (modifyType.value === 'status') {
      res = await editStatus({ id: row.id, status: status.value });
    } else if (modifyType.value === 'invoiceStatus') {
      res = await editInvoiceStatus({ id: row.id, invoiceStatus: invoiceStatus.value });
    } else if (modifyType.value === 'info') {
      const params = { id: row.id,
      careNo:careNo.value,contractCode:contractCode.value,remark:remark.value};
      res = await editInfo(params);
    }
    createMessage.success(res.message);
    handleCancel();
    emit('refresh');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    modifyType.value = '';
    visible.value = false;
  }

  defineExpose({
    show,
  });
</script>

<style lang="less">
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
<style lang="less" scoped></style>
