<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TemplateCustomizedForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="企业名称" v-bind="validateInfos.custmerName" id="TemplateCustomizedForm-customerName" name="customerName">
								<a-input v-model:value="formData.customerName" placeholder="请输入企业名称" disabled allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="模板名称" v-bind="validateInfos.name" id="TemplateCustomizedForm-name" name="name">
								<a-select v-model:value="formData.name" @change="handleChange" placeholder="请选择模板名称">
                  <a-select-option v-for="temp in templates" :key="temp.id" :value="temp.id">
                    {{ temp.name }}
                  </a-select-option>
                </a-select>
							</a-form-item>
						</a-col>
            <!--<a-col :span="24">
              <a-form-item label="模板类型" v-bind="validateInfos.category" id="TemplateCustomizedForm-category" name="category">
                <j-dict-select-tag v-model:value="formData.category" dictCode="jxc_template_category" placeholder="请选择模板类型" allow-clear />
              </a-form-item>
            </a-col>-->
						<a-col :span="24">
							<a-form-item label="定制日期" v-bind="validateInfos.customizedDate" id="TemplateCustomizedForm-customizedDate" name="customizedDate">
								<a-date-picker placeholder="请选择定制日期" v-model:value="formData.customizedDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="定制价格" v-bind="validateInfos.customizedPrice" id="TemplateCustomizedForm-customizedPrice" name="customizedPrice">
								<a-input-number v-model:value="formData.customizedPrice" placeholder="请输入定制价格" style="width: 100%" />
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
  import { saveOrUpdate } from '../customized/TemplateCustomized.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { allCustomizedTemp } from '@/views/template/Template.api';
  import { integer } from 'vue-types';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
    tenantCustomerId: { type: integer, default: 0 },
    tenantCustomerName: { type: String, default: '' },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const tenantCustomerId = computed(() => {
    return props.tenantCustomerId;
  });
  const customerName = computed(() => {
    return props.tenantCustomerName;
  });
  const formData = reactive<Record<string, any>>({
    id: '',
    tenantId: '',
    tenantCustomerId: tenantCustomerId.value,
    customerName: customerName.value,
    templateId: '',
    category: '',
    name: '',
    customizedDate: '',
    customizedPrice: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    customerName: [{ required: true, message: '请输入企业名称!' }],
    name: [{ required: true, message: '请输入模板名称!' }],
    customizedDate: [{ required: true, message: '请输入定制日期!' }],
    customizedPrice: [{ required: true, message: '请输入定制价格!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  const templates = ref([]);
  onMounted(async () => {
    await allCustomizedTemp({ tenantCustomerId: tenantCustomerId.value }).then((res) => {
      if (res && res.length > 0) {
        templates.value = res;
      }
    });
  });
  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      return props.formData.disabled !== false;
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
   * 编辑
   */
  function handleChange(e) {
    if (e) {
      allCustomizedTemp({ tenantCustomerId: tenantCustomerId.value }).then((res) => {
        if (res && res.length > 0) {
          res.forEach((item) => {
            if (item.id === e) {
              formData.templateId = item.id;
              formData.category = item.category;
              formData.name = item.name;
            }
          });
        } else {
          createMessage.warn('获取模板信息失败！');
        }
      });
    }
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
