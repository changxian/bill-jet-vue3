<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="DeliverDebtForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="欠款类型（1：销售欠款,2： 退货欠款）" v-bind="validateInfos.type" id="DeliverDebtForm-type" name="type">
								<j-dict-select-tag v-model:value="formData.type" dictCode="" placeholder="请选择欠款类型（1：销售欠款,2： 退货欠款）"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户id" v-bind="validateInfos.custId" id="DeliverDebtForm-custId" name="custId">
								<a-input v-model:value="formData.custId" placeholder="请输入客户id"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户名" v-bind="validateInfos.custName" id="DeliverDebtForm-custName" name="custName">
								<a-input v-model:value="formData.custName" placeholder="请输入客户名"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户手机" v-bind="validateInfos.custPhone" id="DeliverDebtForm-custPhone" name="custPhone">
								<a-input v-model:value="formData.custPhone" placeholder="请输入客户手机"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户联系人" v-bind="validateInfos.custContact" id="DeliverDebtForm-custContact" name="custContact">
								<a-input v-model:value="formData.custContact" placeholder="请输入客户联系人"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户地址" v-bind="validateInfos.custAddress" id="DeliverDebtForm-custAddress" name="custAddress">
								<a-input v-model:value="formData.custAddress" placeholder="请输入客户地址"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="销售欠款金额" v-bind="validateInfos.deliverDebtAmount" id="DeliverDebtForm-deliverDebtAmount" name="deliverDebtAmount">
								<a-input-number v-model:value="formData.deliverDebtAmount" placeholder="请输入销售欠款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="退货欠款金额" v-bind="validateInfos.returnDebtAmount" id="DeliverDebtForm-returnDebtAmount" name="returnDebtAmount">
								<a-input-number v-model:value="formData.returnDebtAmount" placeholder="请输入退货欠款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="DeliverDebtForm-remark" name="remark">
								<a-input v-model:value="formData.remark" placeholder="请输入备注"  allow-clear ></a-input>
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
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../DeliverDebt.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    type: undefined,
    custId: '',   
    custName: '',   
    custPhone: '',   
    custContact: '',   
    custAddress: '',   
    deliverDebtAmount: undefined,
    returnDebtAmount: undefined,
    remark: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    custId: [{ required: true, message: '请输入客户id!'},],
    custName: [{ required: true, message: '请输入客户名!'},],
    custPhone: [{ required: true, message: '请输入客户手机!'},],
    custContact: [{ required: true, message: '请输入客户联系人!'},],
    deliverDebtAmount: [{ required: true, message: '请输入销售欠款金额!'},],
    returnDebtAmount: [{ required: true, message: '请输入退货欠款金额!'},],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
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
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key]
        }
      })
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
