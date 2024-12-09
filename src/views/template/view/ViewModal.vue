<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" width="1200px" @ok="handleSubmit">
    <Index ref="registerForm" @ok="submitCallback" :formData="formData" />
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
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isNew = ref(false);
  const isUpdate = ref(false);
  const isDetail = ref(false);
  const registerForm = ref();

  let _d = {};
  const formData = computed(() => {
    debugger;
    if (unref(isUpdate)) {
      // 结合（两种表单）使用传数据，带来的弊端，后做的处理
      // 第一次编辑时 isUpdate 值为true
      // 第二次编辑时 isUpdate 的默认值是 true, 编辑的逻辑显示为上一条的数据
      // 修改为 false，才不影响其它数据编辑(在computed中修改isUpdate的值不触发重新计算)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      isUpdate.value = false;
    } else if (unref(isNew)) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      isNew.value = false;
    }
    return {
      ..._d,
    };
  });

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isDetail.value = !!data?.showFooter;
    if (!!data?.isUpdate) {
      _d = {
        ..._d,
        ...data.record,
        disabled: !data?.showFooter, // 表单禁用
      };
      isUpdate.value = !!data?.isUpdate;
    } else {
      // 新增时，商品类型默认为选中的类型
      _d = {
        ..._d,
        ...data.record,
        categoryId: data?.categoryId,
      };
      isNew.value = true;
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '' : !unref(isDetail) ? '' : ''));
  //表单提交事件
  async function handleSubmit() {
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    closeModal();
    emit('success');
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
