<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    destroyOnClose
    :title="title"
    :width="1411"
    :canFullscreen="true"
    :defaultFullscreen="false"
    :showCancelBtn="false"
    :useWrapper="true"
    @ok="handleSubmit"
    :closeFunc="closeFunction"
  >
    <TemplateDesignForm ref="registerDesignForm" @ok="submitCallback" name="TemplateDesignForm" :formData="formData" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import TemplateDesignForm from './TemplateDesignForm.vue';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isNew = ref(false);
  const isUpdate = ref(false);
  const isDetail = ref(false);
  const registerDesignForm = ref();

  let _d = ref({});
  const formData = computed(() => {
    if (unref(isUpdate)) {
      return {
        ..._d.value,
      };
    } else if (unref(isNew)) {
      return {
        ..._d.value,
      };
    }
    return {};
  });

  // 表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isDetail.value = !!data?.showFooter;
    if (!!data?.isUpdate) {
      _d.value = {
        ...data.record,
        disabled: !data?.showFooter, // 表单禁用
      };
      isUpdate.value = true;
      isNew.value = false;
    } else {
      _d.value = {};
      isUpdate.value = false;
      isNew.value = true;
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(isDetail) ? '详情' : '编辑'));
  // 表单提交事件
  async function handleSubmit() {
    registerDesignForm.value.submitForm();
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
