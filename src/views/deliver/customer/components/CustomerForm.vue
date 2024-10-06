<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="CustomerForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="客户名称" v-bind="validateInfos.orgName" id="CustomerForm-orgName" name="orgName">
								<a-input v-model:value="formData.orgName" placeholder="请输入客户名称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="折扣率" v-bind="validateInfos.discount" id="CustomerForm-discount" name="discount">
								<a-input-number v-model:value="formData.discount" placeholder="请输入折扣率" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="手机" v-bind="validateInfos.cellPhone" id="CustomerForm-cellPhone" name="cellPhone">
								<a-input v-model:value="formData.cellPhone" placeholder="请输入手机"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="电话" v-bind="validateInfos.phone" id="CustomerForm-phone" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入电话"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="联系人" v-bind="validateInfos.contact" id="CustomerForm-contact" name="contact">
								<a-input v-model:value="formData.contact" placeholder="请输入联系人"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="传真" v-bind="validateInfos.faxes" id="CustomerForm-faxes" name="faxes">
								<a-input v-model:value="formData.faxes" placeholder="请输入传真"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="地址" v-bind="validateInfos.address" id="CustomerForm-address" name="address">
								<a-input v-model:value="formData.address" placeholder="请输入地址"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="QQ" v-bind="validateInfos.qq" id="CustomerForm-qq" name="qq">
								<a-input v-model:value="formData.qq" placeholder="请输入QQ"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="微信" v-bind="validateInfos.wechat" id="CustomerForm-wechat" name="wechat">
								<a-input v-model:value="formData.wechat" placeholder="请输入微信"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="邮箱" v-bind="validateInfos.email" id="CustomerForm-email" name="email">
								<a-input v-model:value="formData.email" placeholder="请输入邮箱"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="业务员" v-bind="validateInfos.salesmanName" id="CustomerForm-salesmanName" name="salesmanName">
								<j-dict-select-tag v-model:value="formData.salesmanName" :url="getAllSalesmanList" value-field="name" placeholder="请选择业务员"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="CustomerForm-remark" name="remark">
								<a-textarea v-model:value="formData.remark" :rows="4" placeholder="请输入备注" />
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
  import { saveOrUpdate } from '../Customer.api';
  import { getAllSalesmanList } from '../../../salesman/Salesman.api';
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
    orgName: '',   
    discount: undefined,
    cellPhone: '',   
    phone: '',   
    contact: '',   
    faxes: '',   
    address: '',   
    qq: '',   
    wechat: '',   
    email: '',   
    userName: '',   
    remark: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    orgName: [{ required: true, message: '请输入客户名称!'},],
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
