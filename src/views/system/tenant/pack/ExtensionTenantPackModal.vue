<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="800px" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup name="tenant-pack-extension-modal">
  import { ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { tenantPackExtension } from '../tenant.api';

  const isUpdate = ref<boolean>(false);
  // Emits声明
  const emit = defineEmits(['register', 'success']);

  // 给企业套餐奖励延期表单数据项
  const packModifyFormSchema: FormSchema[] = [
    {
      field: 'extensionNum',
      label: '套餐奖励天数',
      component: 'JDictSelectTag',
      dynamicDisabled: false,
      componentProps: {
        dictCode: '',
        options: [{value:"7",label:"奖励 7 天"}, {value:"15",label:"奖励 15 天"}, {value:"1",label:"奖励 1 月"}, {value:"2",label:"奖励 2 月"}, {value:"3",label:"奖励 3 月"}]
      },
      defaultValue: '7',
    },
    {
      field: 'remarks',
      label: '备注',
      component: 'InputTextArea',
      defaultValue: '7',
    },
  ];

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
    schemas: packModifyFormSchema,
    showActionButtonGroup: false,
  });
  //企业
  const tenantId = ref<number>();
  const tenantPackId = ref<String>();
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (data.tenantId) {
      tenantId.value = data.tenantId;
    }
    if (data.tenantPackId) {
      tenantPackId.value = data.tenantPackId;
    }
    if (data.record.remarks) {
      data.record.remarks = '';
    }
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({ ...data.record });
    }
    //update-begin---author:wangshuai ---date:20230705  for：【QQYUN-5685】2 套餐增加一个查看：添加底部有没有按钮及表单禁用------------
    setModalProps({ confirmLoading: false, showCancelBtn:!!data?.showFooter, showOkBtn:!!data?.showFooter });
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter, schemas: packModifyFormSchema });
  });
  //设置标题
  const title = '企业套餐延期奖励';
  //表单提交事件
  async function handleSubmit(v) {
    const values = await validate();
    // debugger;
    setModalProps({ confirmLoading: true });
    values.id = unref(tenantPackId);
    // 借用activateCode字段来向后传递参数
    values.activateCode = values.extensionNum;
    if (unref(isUpdate)) {
      await tenantPackExtension(values);
    }
    emit('success');
    setModalProps({ confirmLoading: false });
    closeModal();
  }
</script>
