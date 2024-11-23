<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="width" @ok="handleOk" cancelText="关闭">
    <QuickInfoForm ref="registerForm" @ok="submitCallback" :formData="formData"></QuickInfoForm>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose, computed, unref } from 'vue';
  import QuickInfoForm from './QuickInfoForm.vue';
  // import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { BasicModal, useModalInner } from '@/components/Modal';

  // const title = ref<string>('');
  const width = ref<number>(800);
  // const visible = ref<boolean>(false);
  // const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  let _d = {};
  const isNew = ref(false);
  const isUpdate = ref(false);
  const isDetail = ref(false);
  const formData = computed(() => {
    if (unref(isUpdate)) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      isUpdate.value = false;
      return {
        ..._d,
      };
    } else if (unref(isNew)) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      isNew.value = false;
      return {
        ..._d,
      };
    }
    return {};
  });

  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(isDetail) ? '详情' : '编辑'));
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isDetail.value = !!data?.showFooter;
    if (!!data?.isUpdate) {
      _d = {
        ...data.record,
        disabled: !data?.showFooter, // 表单禁用
      };
      isUpdate.value = !!data?.isUpdate;
    } else {
      // 新增时，商品类型默认为选中的类型
      _d = {
        ...data.record,
        categoryId: data?.categoryId,
      };
      isNew.value = true;
    }
  });

  /**
   * 新增
   */
  function add() {
    nextTick(() => {
      registerForm.value.add();
    });
  }
  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }
  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    // handleCancel();
    closeModal();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  // function handleCancel() {
  //   visible.value = false;
  // }

  defineExpose({
    add,
    edit,
  });
</script>

<style lang="less">
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
<style lang="less" scoped></style>
