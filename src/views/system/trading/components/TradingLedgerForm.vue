<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="JxcTradingLedgerForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="付款方/客户名称" v-bind="validateInfos.payerName" id="JxcTradingLedgerForm-payerName" name="payerName">
								<a-input disabled v-model:value="formData.payerName" placeholder="请输入付款方/客户名称" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="交易类别" v-bind="validateInfos.category" id="JxcTradingLedgerForm-category" name="category">
                <j-dict-select-tag disabled v-model:value="formData.category" dictCode="object_category" placeholder="请选择交易类别" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="套餐类别" v-bind="validateInfos.packCategory" id="JxcTradingLedgerForm-packCategory" name="packCategory">
                <j-dict-select-tag disabled v-model:value="formData.packCategory" dictCode="sys_pack_category" placeholder="请选择套餐类别" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="套餐类型" v-bind="validateInfos.packType" id="JxcTradingLedgerForm-packType" name="packType">
								<j-dict-select-tag disabled v-model:value="formData.packType" dictCode="sys_pack_pack_type" placeholder="请选择套餐类型" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="套餐/模板编码" v-bind="validateInfos.objectCode" id="JxcTradingLedgerForm-objectCode" name="objectCode">
								<a-input disabled v-model:value="formData.objectCode" placeholder="请输入套餐/模板编码" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="套餐/模板名称" v-bind="validateInfos.objectName" id="JxcTradingLedgerForm-objectName" name="objectName">
								<a-input disabled v-model:value="formData.objectName" placeholder="请输入套餐/模板名称" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="交易时间" v-bind="validateInfos.tradeDate" id="JxcTradingLedgerForm-tradeDate" name="tradeDate">
								<a-date-picker disabled placeholder="请选择交易时间" v-model:value="formData.tradeDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="交易金额" v-bind="validateInfos.price" id="JxcTradingLedgerForm-price" name="price">
								<a-input-number disabled v-model:value="formData.price" placeholder="请输入交易金额" style="width: 100%" />
							</a-form-item>
						</a-col>
            <a-col :span="24">
              <a-form-item label="开票状态" v-bind="validateInfos.invoiceStatus" id="JxcTradingLedgerForm-invoiceStatus" name="invoiceStatus">
                <j-dict-select-tag v-model:value="formData.invoiceStatus" dictCode="jxc_bill_invoice_status" placeholder="请选择开票状态" allow-clear />
              </a-form-item>
            </a-col>
						<a-col :span="24">
							<a-form-item label="开票日期" v-bind="validateInfos.invoiceTime" id="JxcTradingLedgerForm-invoiceTime" name="invoiceTime">
								<a-date-picker placeholder="请选择开票日期" v-model:value="formData.invoiceTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"  allow-clear />
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
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../TradingLedger.api';
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
    payerName: '',
    category: undefined,
    packCategory: '',
    packType: '',
    objectCode: '',
    objectName: '',
    tradeDate: '',
    price: undefined,
    invoiceTime: '',
    invoiceStatus: undefined,
    delFlag: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    payerName: [{ required: true, message: '请输入付款方/客户名称!' }],
    category: [{ required: true, message: '请输入交易类别!' }],
    objectName: [{ required: true, message: '请输入套餐/模板名称!' }],
    tradeDate: [{ required: true, message: '请输入交易时间!' }],
    price: [{ required: true, message: '请输入交易金额!' }],
    invoiceStatus: [{ required: true, message: '请选择开票状态!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

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
