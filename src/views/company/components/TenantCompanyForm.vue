<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="TenantCompanyForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="企业全称" v-bind="validateInfos.compName" id="TenantCompanyForm-compName" name="compName">
								<a-input v-model:value="formData.compName" placeholder="请输入企业全称" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="简称" v-bind="validateInfos.shortName" id="TenantCompanyForm-shortName" name="shortName">
								<a-input v-model:value="formData.shortName" placeholder="请输入简称" allow-clear ></a-input>
							</a-form-item>
						</a-col>
            <a-col :span="24">
              <a-form-item label="开户行" v-bind="validateInfos.bankBelong" id="TenantCompanyForm-bankBelong" name="bankBelong">
                <a-input v-model:value="formData.bankBelong" placeholder="请输入开户行" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="开户行账号" v-bind="validateInfos.bankAccount" id="TenantCompanyForm-bankAccount" name="bankAccount">
                <a-input v-model:value="formData.bankAccount" placeholder="请输入开户行账号" allow-clear ></a-input>
              </a-form-item>
            </a-col>
						<a-col :span="24">
							<a-form-item label="英文名称" v-bind="validateInfos.enName" id="TenantCompanyForm-enName" name="enName">
								<a-input v-model:value="formData.enName" placeholder="请输入英文名称" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="地址" v-bind="validateInfos.address" id="TenantCompanyForm-address" name="address">
								<a-input v-model:value="formData.address" placeholder="请输入地址" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="网站" v-bind="validateInfos.webSite" id="TenantCompanyForm-webSite" name="webSite">
								<a-input v-model:value="formData.webSite" placeholder="请输入网站" allow-clear ></a-input>
							</a-form-item>
						</a-col>
            <a-col :span="24">
              <a-form-item label="联系人" v-bind="validateInfos.contact" id="TenantCompanyForm-phone" name="phone">
                <a-input v-model:value="formData.contact" placeholder="请输入联系人" allow-clear ></a-input>
              </a-form-item>
            </a-col>
						<a-col :span="24">
							<a-form-item label="联系人电话" v-bind="validateInfos.phone" id="TenantCompanyForm-phone" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入联系人电话" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="传真" v-bind="validateInfos.fax" id="TenantCompanyForm-fax" name="fax">
								<a-input v-model:value="formData.fax" placeholder="请输入传真" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="QQ" v-bind="validateInfos.qq" id="TenantCompanyForm-qq" name="qq">
								<a-input v-model:value="formData.qq" placeholder="请输入QQ" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="微信" v-bind="validateInfos.wechat" id="TenantCompanyForm-wechat" name="wechat">
								<a-input v-model:value="formData.wechat" placeholder="请输入微信" allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="邮箱" v-bind="validateInfos.email" id="TenantCompanyForm-email" name="email">
								<a-input v-model:value="formData.email" placeholder="请输入邮箱" allow-clear ></a-input>
							</a-form-item>
						</a-col>

            <a-col
              v-for="(item, index) in formData.dynamicFields"
              :key="item.id"
              :span="24"
            >
              <a-form-item
                v-if="item.fieldTitle"
                :label="item.fieldTitle"
                :id="'GoodsForm-' + item.fieldName"
                :name="'dynamicFields.' + item.fieldName"
              >
                <a-input v-model:value="formData.dynamicFields[index].fieldValue" :placeholder="'请输入' + item.fieldTitle" allow-clear />
              </a-form-item>
            </a-col>

						<a-col :span="24">
							<a-form-item label="默认公司" v-bind="validateInfos.isDefault" id="TenantCompanyForm-isDefault" name="isDefault">
                <a-radio-group v-model:value="formData.isDefault" button-style="solid">
                  <a-radio-button value="1">是</a-radio-button>
                  <a-radio-button value="0">否</a-radio-button>
                </a-radio-group>
							</a-form-item>
						</a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed, watch } from "vue";
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../TenantCompany.api';
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
    compName: '',
    shortName: '',
    bankBelong: '',
    bankAccount: '',
    enName: '',
    address: '',
    webSite: '',
    phone: '',
    fax: '',
    qq: '',
    wechat: '',
    email: '',
    isDefault: '0',
    contact: '',
    dynamicFields: undefined,
  });

  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    compName: [{ required: true, message: '请输入企业全称!'},],
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
          if (key === 'isDefault') {
            tmpData[key] = record[key].toString();
          } else {
            tmpData[key] = record[key];
          }
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
