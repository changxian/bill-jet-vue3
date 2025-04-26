<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="800px" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup name="tenant-pack-menu-modal">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { addPackPermission, editPackPermission, getAllSysPackList } from '../tenant.api';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const isUpdate = ref<boolean>(false);
  // Emits声明
  const emit = defineEmits(['register', 'success']);

  //企业ID
  const tenantId = ref<number>();
  //套餐类别
  const packCategory = ref<string>('');
  //企业类别
  const tenantCategory = ref<number>(0);
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (data.tenantId) {
      tenantId.value = data.tenantId;
    }
    if (data.tenantCategory) {
      tenantCategory.value = data.tenantCategory;
    }
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({ ...data.record });
    }
    //update-begin---author:wangshuai ---date:20230705  for：【QQYUN-5685】2 套餐增加一个查看：添加底部有没有按钮及表单禁用------------
    setModalProps({ confirmLoading: false, showCancelBtn:!!data?.showFooter, showOkBtn:!!data?.showFooter });
    // 隐藏底部时禁用整个表单

    setProps({ disabled: !data?.showFooter, schemas: packMenuFormSchema });

    //update-end---author:wangshuai ---date:20230705  for：【QQYUN-5685】2 套餐增加一个查看：添加底部有没有按钮及表单禁用------------
  });

  //系统首次给企业绑定套餐表单数据项
  const packMenuFormSchema: FormSchema[] = [
    {
      field: 'sysPackId',
      label: '系统套餐',
      dynamicDisabled: isUpdate,
      component: 'ApiSelect',
      componentProps: {
        api: getAllSysPackList,
        labelField: 'packName',
        valueField: 'id',
        resultField: 'list',
        onChange: function (e) {
          getAllSysPackList({}).then((res) => {
            console.log('res', res);
            res.forEach((item) => {
              if (item.id === e) {
                // debugger;
                packCategory.value = item.category;
                // 代理商分配运营版套餐
                if ((item.packType == 3 && tenantCategory.value == 5) || (item.packType != 3 && tenantCategory.value == 0)) {
                  setFieldsValue({ ...item });
                } else {
                  createMessage.warn('当前套餐与企业类型不匹配，请重新选择！');
                }
              }
            });
          });
        },
      },
    },
    {
      field: 'price',
      label: '交易价格',
      dynamicDisabled: !isUpdate,
      component: 'InputNumber',
      componentProps: {
        min: 0,
      },
    },
    {
      field: 'accountNum',
      label: '账号数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'orgNum',
      label: '机构数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'customerNum',
      label: '客户数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      field: 'goodsNum',
      label: '商品数',
      dynamicDisabled: true,
      component: 'InputNumber',
    },
    {
      label: '激活码',
      field: 'activateCode',
      dynamicDisabled: true,
      component: 'InputTextArea',
    },
    {
      field: 'packNum',
      label: '购买周期',
      dynamicDisabled: !isUpdate,
      component: 'InputNumber',
      dynamicDisabled: true,
      defaultValue: 1,
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
      defaultValue: '2',
    },
    // {
    //   field: 'beginDate',
    //   label: '开始时间',
    //   dynamicDisabled: !isUpdate,
    //   component: 'DatePicker',
    //   componentProps: {
    //     showTime: true,
    //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
    //     getPopupContainer: getAutoScrollContainer,
    //   },
    // },
    {
      field: 'remarks',
      label: '备注',
      dynamicDisabled: !isUpdate,
      component: 'InputTextArea',
    },
    {
      field: 'status',
      label: '开启状态',
      component: 'Switch',
      componentProps: {
        checkedValue: '1',
        checkedChildren: '开启',
        unCheckedValue: '0',
        unCheckedChildren: '关闭',
      },
      defaultValue: '1',
    },
    {
      field: 'id',
      label: '开启状态',
      component: 'Input',
      show: false,
    },
  ];

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
    schemas: packMenuFormSchema,
    showActionButtonGroup: false,
  });

  //设置标题
  const title = computed(() => (unref(isUpdate) ? '编辑企业套餐' : '绑定并激活企业套餐'));
  //表单提交事件
  async function handleSubmit(v) {
    const values = await validate();
    // debugger;
    // console.log(packCategory);
    if (values.activateCode == null) {
      if (packCategory.value == '2') {
        if (tenantCategory.value != 5) {
          createMessage.warning('当前类型套餐的激活码已使用完，请先获取激活码后再来给企业激活');
          return;
        }
      } else {
        values.packNum = 99;
      }
    }
    setModalProps({ confirmLoading: true });
    values.tenantId = unref(tenantId);
    // values.packType = unref(tenantId);
    // 新增套餐绑定，ID为空
    values.id = '';
    if (!unref(isUpdate)) {
      await addPackPermission(values);
    } else {
      await editPackPermission(values);
    }
    emit('success');
    setModalProps({ confirmLoading: false });
    closeModal();
  }
</script>
