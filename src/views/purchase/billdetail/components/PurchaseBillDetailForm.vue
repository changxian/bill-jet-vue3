<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="PurchaseBillDetailForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="开单单号" v-bind="validateInfos.billNo" id="PurchaseBillDetailForm-billNo" name="billNo">
								<a-input v-model:value="formData.billNo" placeholder="请输入开单单号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="供应商id" v-bind="validateInfos.supplierId" id="PurchaseBillDetailForm-supplierId" name="supplierId">
								<j-dict-select-tag v-model:value="formData.supplierId" dictCode="" placeholder="请选择供应商id"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="商品类型" v-bind="validateInfos.categoryName" id="PurchaseBillDetailForm-categoryName" name="categoryName">
								<a-input v-model:value="formData.categoryName" placeholder="请输入商品类型"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="商品编号" v-bind="validateInfos.doogsCode" id="PurchaseBillDetailForm-doogsCode" name="doogsCode">
								<a-input v-model:value="formData.doogsCode" placeholder="请输入商品编号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="商品名称" v-bind="validateInfos.doogsName" id="PurchaseBillDetailForm-doogsName" name="doogsName">
								<a-input v-model:value="formData.doogsName" placeholder="请输入商品名称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="规格型号" v-bind="validateInfos.doogsType" id="PurchaseBillDetailForm-doogsType" name="doogsType">
								<a-input v-model:value="formData.doogsType" placeholder="请输入规格型号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="单位" v-bind="validateInfos.doogsUnit" id="PurchaseBillDetailForm-doogsUnit" name="doogsUnit">
								<a-input v-model:value="formData.doogsUnit" placeholder="请输入单位"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="进货价" v-bind="validateInfos.costAmount" id="PurchaseBillDetailForm-costAmount" name="costAmount">
								<a-input-number v-model:value="formData.costAmount" placeholder="请输入进货价" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="金额" v-bind="validateInfos.amount" id="PurchaseBillDetailForm-amount" name="amount">
								<a-input-number v-model:value="formData.amount" placeholder="请输入金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="数量" v-bind="validateInfos.count" id="PurchaseBillDetailForm-count" name="count">
								<a-input-number v-model:value="formData.count" placeholder="请输入数量" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="业务员id" v-bind="validateInfos.userId" id="PurchaseBillDetailForm-userId" name="userId">
								<a-input v-model:value="formData.userId" placeholder="请输入业务员id"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="业务员" v-bind="validateInfos.userName" id="PurchaseBillDetailForm-userName" name="userName">
								<a-input v-model:value="formData.userName" placeholder="请输入业务员"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="送货车号" v-bind="validateInfos.careNo" id="PurchaseBillDetailForm-careNo" name="careNo">
								<a-input v-model:value="formData.careNo" placeholder="请输入送货车号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="版本" v-bind="validateInfos.version" id="PurchaseBillDetailForm-version" name="version">
								<a-input-number v-model:value="formData.version" placeholder="请输入版本" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="PurchaseBillDetailForm-remark" name="remark">
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
  import { saveOrUpdate } from '../PurchaseBillDetail.api';
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
    billNo: '',   
    supplierId: '',   
    categoryName: '',   
    doogsCode: '',   
    doogsName: '',   
    doogsType: '',   
    doogsUnit: '',   
    costAmount: undefined,
    amount: undefined,
    count: undefined,
    userId: '',   
    userName: '',   
    careNo: '',   
    delFlag: undefined,
    version: undefined,
    remark: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
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
