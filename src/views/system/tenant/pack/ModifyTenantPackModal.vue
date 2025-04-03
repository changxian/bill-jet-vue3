<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="800px" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup name="tenant-pack-modify-modal">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { tenantPackExpansion } from '../tenant.api';

  const isUpdate = ref<boolean>(false);
  // Emits声明
  const emit = defineEmits(['register', 'success']);

  //系统首次给企业绑定套餐表单数据项
  const packModifyFormSchema: FormSchema[] = [
    {
      field: 'accountNum',
      label: '支持账号数',
      component: 'InputNumber',
    },
    {
      field: 'orgNum',
      label: '支持机构数',
      component: 'InputNumber',
    },
    {
      field: 'goodsNum',
      label: '支持商品数',
      component: 'InputNumber',
    },
    {
      field: 'price',
      label: '交易价格',
      component: 'InputNumber',
    },
    {
      field: 'remarks',
      label: '备注',
      component: 'InputTextArea',
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
    if (data.record.price) {
      data.record.price = 0;
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
  const title = computed(() => (unref(isUpdate) ? '企业套餐扩容' : '新增企业套餐'));
  //表单提交事件
  async function handleSubmit(v) {
    const values = await validate();
    // debugger;
    setModalProps({ confirmLoading: true });
    values.id = unref(tenantPackId);
    if (unref(isUpdate)) {
      await tenantPackExpansion(values);
    }
    emit('success');
    setModalProps({ confirmLoading: false });
    closeModal();
  }
</script>
