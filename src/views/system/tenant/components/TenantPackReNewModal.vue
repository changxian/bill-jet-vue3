<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="TenantPackReNewForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  // import {formSchema} from '../SysTenantPackRecord.data';
  import { saveOrUpdate } from '../SysTenantPackRecord.api';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isDetail = ref(false);

  //表单数据
  const formSchema: FormSchema[] = [
    {
      label: '套餐编码',
      field: 'packCode',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: '续费套餐名',
      field: 'packName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'orgNum',
      label: '支持机构数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'customerNum',
      label: '支持客户数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'accountNum',
      label: '支持账号数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'goodsNum',
      label: '支持商品数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      label: '续费周期',
      field: 'packNum',
      component: 'InputNumber',
    },
    {
      label: '周期单位',
      field: 'packUnit',
      component: 'JDictSelectTag',
      dynamicDisabled: true,
      componentProps: {
        dictCode: '',
        options: [{value:"1",label:"月"}, {value:"2",label:"年"}]
      },
    },
    {
      label: '续费时间',
      field: 'buyDate',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      field: 'price',
      label: '续费价格',
      component: 'InputNumber',
    },
    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
    },
  ];

  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate, scrollToField }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const formData = ref({});
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({confirmLoading: false,showCancelBtn:!!data?.showFooter,showOkBtn:!!data?.showFooter});
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.showFooter;
    if (unref(isUpdate)) {
      formData.value = data.record;
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(isDetail) ? '详情' : '编辑'));
  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(Object.assign(formData.value, values));
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
    } finally {
      setModalProps({ confirmLoading: false });
    }
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
