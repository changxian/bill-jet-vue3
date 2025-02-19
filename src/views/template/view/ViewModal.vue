<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" width="1200px" :height="760" @ok="handleSubmit">
    <Index ref="registerForm" @ok="selected" :formData="formData" />
  </BasicModal>
</template>
<!--
  本模块：
    Modal：用封装表单(BasicForm)的Modal
    Form：用原生表单(a-form)的form，form需要动态添加数据项，用原生表单比较容易扩展
    （这里是尝试结合使用）
    （请单位使用 “封装表单”，或单独使用 “原生表单”）
 -->

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import Index from './components/index.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const isDetail = ref(false);
  const registerForm = ref();

  const formData = ref();
  const template = ref(null);

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isDetail.value = !!data?.showFooter;
    template.value = null;

    formData.value = {
      ...data.record,
      disabled: !data?.showFooter, // 表单禁用
    };
    isUpdate.value = !!data?.isUpdate;
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '预览' : !unref(isDetail) ? '预览' : '预览'));

  //表单提交事件
  async function handleSubmit() {
    if (null == template.value) {
      return createMessage.warning('请先选择模板');
    }
    emit('success', template.value);
    closeModal();
    // registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function selected(o) {
    template.value = o;
    console.log('ViewModal.selected');
    console.info(o);
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
