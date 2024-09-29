<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    destroyOnClose
    :title="title"
    :width="1411"
    :canFullscreen="true"
    :defaultFullscreen="true"
    :showCancelBtn="false"
    :useWrapper="true"
    @ok="handleSubmit"
    :closeFunc="closeFunction"
  >
    <TemplateForm ref="registerForm" @ok="submitCallback" name="TemplateForm" :formData="formData" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import TemplateForm from './TemplateForm.vue';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isDetail = ref(false);
  const registerForm = ref();
  const isNew = ref(false);

  let _d = {};
  const formData = computed(() => {
    if (unref(isUpdate)) {
      // 结合（两种表单）使用传数据，带来的弊端，后做的处理
      // 第一次编辑时 isUpdate 值为true
      // 第二次编辑时 isUpdate 的默认值是 true, 编辑的逻辑显示为上一条的数据
      // 修改为 false，才不影响其它数据编辑(在computed中修改isUpdate的值不触发重新计算)
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

  // 表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.showFooter;
    if (!!data?.isUpdate) {
      _d = {
        ...data.record,
        disabled: !data?.showFooter, // 表单禁用
      };
      isUpdate.value = !!data?.isUpdate;
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(isDetail) ? '详情' : '编辑'));
  // 表单提交事件
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

  const closeFunction = () => {
    console.log('关闭前处理函数');
    return true;
  };
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
