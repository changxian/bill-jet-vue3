<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="SysPackForm">
          <a-row>
						<a-col :span="12">
							<a-form-item label="产品名称" v-bind="validateInfos.packName" id="SysPackForm-packName" name="packName">
								<a-input v-model:value="formData.packName" placeholder="请输入产品名称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品类别(单机版/云端版)" v-bind="validateInfos.category" id="SysPackForm-category" name="category">
								<j-dict-select-tag v-model:value="formData.category" dictCode="" placeholder="请选择产品类别(单机版/云端版)"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品类型(送货单版/进销存版)" v-bind="validateInfos.packType" id="SysPackForm-packType" name="packType">
								<j-dict-select-tag v-model:value="formData.packType" dictCode="" placeholder="请选择产品类型(送货单版/进销存版)"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="支持企业数(单机1个公司、云端版支持4家公司切换开单)" v-bind="validateInfos.orgNum" id="SysPackForm-orgNum" name="orgNum">
								<a-input-number v-model:value="formData.orgNum" placeholder="请输入支持企业数(单机1个公司、云端版支持4家公司切换开单)" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)" v-bind="validateInfos.accountNum" id="SysPackForm-accountNum" name="accountNum">
								<a-input-number v-model:value="formData.accountNum" placeholder="请输入支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="支持商品数量()" v-bind="validateInfos.goodsNum" id="SysPackForm-goodsNum" name="goodsNum">
								<a-input-number v-model:value="formData.goodsNum" placeholder="请输入支持商品数量()" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品标准价格" v-bind="validateInfos.price" id="SysPackForm-price" name="price">
								<a-input-number v-model:value="formData.price" placeholder="请输入产品标准价格" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品折扣" v-bind="validateInfos.discounted" id="SysPackForm-discounted" name="discounted">
								<a-input-number v-model:value="formData.discounted" placeholder="请输入产品折扣" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品折扣价" v-bind="validateInfos.discountedPrice" id="SysPackForm-discountedPrice" name="discountedPrice">
								<a-input-number v-model:value="formData.discountedPrice" placeholder="请输入产品折扣价" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="规格" v-bind="validateInfos.specification" id="SysPackForm-specification" name="specification">
								<a-input-number v-model:value="formData.specification" placeholder="请输入规格" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="规格单位" v-bind="validateInfos.specificationUnit" id="SysPackForm-specificationUnit" name="specificationUnit">
								<a-input v-model:value="formData.specificationUnit" placeholder="请输入规格单位"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="产品描述" v-bind="validateInfos.discription" id="SysPackForm-discription" name="discription">
								<a-textarea v-model:value="formData.discription" :rows="4" placeholder="请输入产品描述" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="备注说明" v-bind="validateInfos.remarks" id="SysPackForm-remarks" name="remarks">
								<a-textarea v-model:value="formData.remarks" :rows="4" placeholder="请输入备注说明" />
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
  import { saveOrUpdate } from '../SysPack.api';
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
    packName: '',   
    category: '',   
    packType: '',   
    orgNum: undefined,
    accountNum: undefined,
    goodsNum: undefined,
    price: undefined,
    discounted: undefined,
    discountedPrice: undefined,
    specification: undefined,
    specificationUnit: '',   
    discription: '',   
    remarks: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    packName: [{ required: true, message: '请输入产品名称!'},],
    discription: [{ required: true, message: '请输入产品描述!'},],
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
