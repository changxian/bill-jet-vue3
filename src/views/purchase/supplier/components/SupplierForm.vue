<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="SupplierForm">
          <a-row>
						<a-col :span="12">
							<a-form-item label="供应商名称" v-bind="validateInfos.orgName" id="SupplierForm-orgName" name="orgName">
                <a-input v-model:value="formData.orgName" placeholder="请输入供应商名称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="手机" v-bind="validateInfos.cellPhone" id="SupplierForm-cellPhone" name="cellPhone">
								<a-input v-model:value="formData.cellPhone" placeholder="请输入手机"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="电话" v-bind="validateInfos.phone" id="SupplierForm-phone" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入电话"  allow-clear ></a-input>
							</a-form-item>
						</a-col>

						<a-col :span="12">
							<a-form-item label="联系人" v-bind="validateInfos.contact" id="SupplierForm-contact" name="contact">
								<a-input v-model:value="formData.contact" placeholder="请输入联系人"  allow-clear ></a-input>
							</a-form-item>
						</a-col>

          
						<a-col :span="12">
							<a-form-item label="地址" v-bind="validateInfos.address" id="SupplierForm-address" name="address">
								<a-input v-model:value="formData.address" placeholder="请输入地址"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="传真" v-bind="validateInfos.faxes" id="SupplierForm-faxes" name="faxes">
								<a-input v-model:value="formData.faxes" placeholder="请输入传真"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="QQ" v-bind="validateInfos.qq" id="SupplierForm-qq" name="qq">
								<a-input v-model:value="formData.qq" placeholder="请输入QQ"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="微信" v-bind="validateInfos.wechat" id="SupplierForm-wechat" name="wechat">
								<a-input v-model:value="formData.wechat" placeholder="请输入微信"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="邮箱" v-bind="validateInfos.email" id="SupplierForm-email" name="email">
								<a-input v-model:value="formData.email" placeholder="请输入邮箱"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
            <a-col :span="12">
              <a-form-item label="折扣率" v-bind="validateInfos.discount" id="SupplierForm-discount" name="discount">
                <a-input-number v-model:value="formData.discount" placeholder="请输入折扣率" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="CustomerForm-remark" name="remark">
                <a-textarea v-model:value="formData.remark" :rows="4" placeholder="请输入备注" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <span style="position: relative; margin-bottom: 20px; margin-left: 5.1%">更多信息（在系统参数中配置）</span>
          </a-row>
          <a-row v-if="formData.dynamicFields && 0 < formData.dynamicFields.length" :gutter="10">
            <a-col v-for="(item, index) in formData.dynamicFields" :key="item.id" :span="12">
              <a-form-item
                v-if="item.fieldTitle"
                :label="item.fieldTitle"
                :id="'SupplierForm-' + item.fieldName"
                :name="'dynamicFields.' + item.fieldName"
              >
                <a-input v-model:value="formData.dynamicFields[index].fieldValue" :placeholder="'请输入' + item.fieldTitle" allow-clear />
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
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../Supplier.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import {JInput} from "@/components/Form";
  import { listTenantUser } from '@/views/system/user/user.api';
  import JDictSelectTag from "../../../../components/Form/src/jeecg/components/JDictSelectTag.vue";

  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const dynamicFields= userStore.getDynamicCols['jxc_supplier'];
  const formData = reactive<Record<string, any>>({
    id: '',
    orgName: '',   
    cellPhone: '',   
    phone: '',   
    discount: undefined,
    contact: '',   
    address: '',   
    faxes: '',   
    qq: '',   
    wechat: '',   
    email: '',   
    userId: '',   
    userName: '',   
    remark: '',
    dynamicFields: dynamicFields,

  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    orgName: [{ required: true, message: '请输入供应商名称!'},],
    // cellPhone: [{ required: false}, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!'},],
    // qq: [{ required: false}, { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!'},],
    // email: [{ required: false}, { pattern: /^([\w]+\.*)([\w]+)@[\w]+\.\w{3}(\.\w{2}|)$/, message: '请输入正确的电子邮件!'},],
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
    // //循环数据
    // for (let data in model) {
    //   //如果该数据是数组并且是字符串类型
    //   if (model[data] instanceof Array) {
    //     let valueType = getValueType(formRef.value.getProps, data);
    //     //如果是字符串类型的需要变成以逗号分割的字符串
    //     if (valueType === 'string') {
    //       model[data] = model[data].join(',');
    //     }
    //   }
    // }
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
