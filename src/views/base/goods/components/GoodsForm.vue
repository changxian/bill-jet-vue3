<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="GoodsForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="商品类型id" v-bind="validateInfos.categoryId" id="GoodsForm-categoryId" name="categoryId">
                <a-input v-model:value="formData.categoryId" placeholder="请输入商品类型id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="商品编号" v-bind="validateInfos.code" id="GoodsForm-code" name="code">
                <a-input v-model:value="formData.code" placeholder="请输入商品编号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="商品名称" v-bind="validateInfos.name" id="GoodsForm-name" name="name">
                <a-input v-model:value="formData.name" placeholder="请输入商品名称" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="规格型号" v-bind="validateInfos.type" id="GoodsForm-type" name="type">
                <a-input v-model:value="formData.type" placeholder="请输入规格型号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="面积" v-bind="validateInfos.area" id="GoodsForm-area" name="area">
                <a-input-number v-model:value="formData.area" placeholder="请输入面积" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="单位" v-bind="validateInfos.unit" id="GoodsForm-unit" name="unit">
                <a-input v-model:value="formData.unit" placeholder="请输入单位" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="进价（成本）" v-bind="validateInfos.cost" id="GoodsForm-cost" name="cost">
                <a-input-number v-model:value="formData.cost" placeholder="请输入进价（成本）" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="售价" v-bind="validateInfos.price" id="GoodsForm-price" name="price">
                <a-input-number v-model:value="formData.price" placeholder="请输入售价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="当前库存数量" v-bind="validateInfos.stock" id="GoodsForm-stock" name="stock">
                <a-input-number v-model:value="formData.stock" placeholder="请输入当前库存数量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="状态(1：正常，2：下架）" v-bind="validateInfos.status" id="GoodsForm-status" name="status">
                <a-input v-model:value="formData.status" placeholder="请输入状态(1：正常，2：下架）" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="GoodsForm-remark" name="remark">
                <a-input v-model:value="formData.remark" placeholder="请输入备注" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from './goods.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
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
    categoryId: '',
    code: '',
    name: '',
    type: '',
    area: undefined,
    unit: '',
    cost: undefined,
    price: undefined,
    stock: undefined,
    status: '',
    remark: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    code: [{ required: true, message: '请输入商品编号!' }],
    name: [{ required: true, message: '请输入商品名称!' }],
    type: [{ required: true, message: '请输入规格型号!' }],
    unit: [{ required: true, message: '请输入单位!' }],
    cost: [{ required: true, message: '请输入进价（成本）!' }],
    price: [{ required: true, message: '请输入售价!' }],
    stock: [{ required: true, message: '请输入当前库存数量!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });

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
