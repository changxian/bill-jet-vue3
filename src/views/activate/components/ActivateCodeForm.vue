<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ActivateCodeForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="运营商户" v-bind="validateInfos.belongTenantId" id="ActivateCodeForm-belongTenantId" name="belongTenantId">
                <JDictSelectTag
                  v-model:value="formData.belongTenantId"
                  placeholder="请选择运营商户"
                  dictCode="sys_tenant,name,id,del_flag='0' and  category >0  order by create_time desc"
                  :showChooseOption="false"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="产品类别" v-bind="validateInfos.packCategory" id="ActivateCodeForm-category" name="packCategory">
                <j-dict-select-tag v-model:value="formData.packCategory" dictCode="sys_pack_category" placeholder="请选择产品类别" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="产品类型" v-bind="validateInfos.packType" id="ActivateCodeForm-packType" name="packType">
                <j-dict-select-tag v-model:value="formData.packType" dictCode="sys_pack_pack_type" placeholder="请选择产品类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="激活码数量" v-bind="validateInfos.actNum" id="ActivateCodeForm-actNum" name="actNum">
                <a-input-number v-model:value="formData.actNum" :min="0" @change="changeAmount" placeholder="请输入激活码数量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="激活码销售单价" v-bind="validateInfos.price" id="ActivateCodeForm-price" name="price">
                <a-input-number v-model:value="formData.price" :min="0" @change="changeAmount" style="width: 100%" allow-clear></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="总交易额" v-bind="validateInfos.amount" id="ActivateCodeForm-price" name="amount">
                <a-input-number v-model:value="formData.amount" style="width: 100%" disabled></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="ActivateCodeForm-remark" name="remark">
                <a-input v-model:value="formData.remark" placeholder="请输入备注" allow-clear></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ActivateCode.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    actNum: 1,
    belongTenantId: undefined,
    actTenantId: undefined,
    activateCode: '',
    status: '1',
    activateDateTime: '',
    packType: undefined,
    packCategory: '',
    delFlag: undefined,
    remark: '',
    price: 0,
    amount: 0,
    version: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      return props.formData.disabled !== false;
    }
    return props.formDisabled;
  });

  // 修改单价时计算总金额
  function changeAmount() {
    formData.amount = (formData.price * formData.actNum).toFixed(2);
  }

  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if (record.hasOwnProperty(key)) {
          tmpData[key] = record[key];
        }
      });
      //赋值
      Object.assign(formData, tmpData);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 触发表单验证
      await validate();
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
    }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
</style>
