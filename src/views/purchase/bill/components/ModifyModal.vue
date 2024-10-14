<template>
  <j-modal :title="title" :width="width" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel"
           cancelText="关闭">
    <div style="padding:20px 30px">
      <!-- 改状态 -->
      <div v-if="modifyType === 'status'">
        <p>1.签收代表您已经收到货物并签字。</p>
        <p>2.过账代表账结清。</p>
        <p>3.审核代表已经审核了，就不能修改了，只能删除。</p>
        <p>4.作废单据不参与统计、对账、还款。</p>
        <p style="margin:40px 0 20px 10px">状态：<j-dict-select-tag
                  style="width:300px"
                  v-model:value="status"
                  :options="statusOptions"
                  dictCode=""
                  placeholder="请选择状态"
                  allow-clear
                /> </p>
      </div>

       <div v-if="modifyType === 'billStatus'">
        <p style="margin:40px 0 20px 10px">状态：<j-dict-select-tag
                  style="width:300px"
                  v-model:value="billStatus"
                  :options="billStatusOptions"
                  dictCode=""
                  placeholder="请选择状态"
                  allow-clear
                /> </p>
        </div>
    </div>
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { statusList, billStatusList } from '../PurchaseBill.data';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';

  const title = ref<string>('');
  const width = ref<number>(600);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['refresh']);

const status = ref('')
const billStatus = ref('')
const statusOptions = ref(statusList);
const billStatusOptions = ref(billStatusList)

  const titleObj = {
    status: '改状态',
    billStatus: '改开票',
    info: '改信息'
  }
  const modifyType = ref('')
  let row = {}
  function show(type, data){
     title.value = titleObj[type]
     modifyType.value = type
     status.value = data.status
     row = data
     visible.value = true;
  }

  /**
   * 确定按钮点击事件
   */
  function handleOk() {

     emit('refresh')
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
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
