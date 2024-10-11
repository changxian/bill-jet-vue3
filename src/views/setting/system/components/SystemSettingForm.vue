<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="SystemSettingForm">
          <a-row>
						<a-col :span="24">
							<a-form-item v-bind="validateInfos.autoLogin" id="SystemSettingForm-autoLogin" name="autoLogin">
                <a-checkbox type="checkbox" v-model:value="formData.autoLogin"> 启动软件时自动登录</a-checkbox>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.noAutoTips" id="SystemSettingForm-noAutoTips" name="noAutoTips">
                <a-checkbox type="checkbox" v-model:value="formData.noAutoTips"> 开单禁用智能提示</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.tipsShowBuyPrice" id="SystemSettingForm-tipsShowBuyPrice" name="tipsShowBuyPrice">
                <a-checkbox type="checkbox" v-model:value="formData.tipsShowBuyPrice"> 提示显示进货价</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.tipsShowPrice" id="SystemSettingForm-tipsShowPrice" name="tipsShowPrice">
                <a-checkbox type="checkbox" v-model:value="formData.tipsShowPrice"> 提示显示销售价</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.billlistDbclickShowWin" id="SystemSettingForm-billlistDbclickShowWin" name="billlistDbclickShowWin">
                <a-checkbox type="checkbox" v-model:value="formData.billlistDbclickShowWin"> 开单列表双击弹出选择窗口</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.billIgnoreAddedGoods" id="SystemSettingForm-billIgnoreAddedGoods" name="billIgnoreAddedGoods">
                <a-checkbox type="checkbox" v-model:value="formData.billIgnoreAddedGoods"> 开单过滤已添加商品</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.noQuickInfoPrompts" id="SystemSettingForm-noQuickInfoPrompts" name="noQuickInfoPrompts">
                <a-checkbox type="checkbox" v-model:value="formData.noQuickInfoPrompts"> 禁用快捷信息提示</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.noAutoSaveQuickInfo" id="SystemSettingForm-noAutoSaveQuickInfo" name="noAutoSaveQuickInfo">
                <a-checkbox type="checkbox" v-model:value="formData.noAutoSaveQuickInfo"> 禁止自动保存快捷信息</a-checkbox>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <p style="margin-bottom: 30px">&nbsp;</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" >保存</a-button>
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
  import JCheckbox from "/@/components/Form/src/jeecg/components/JCheckbox.vue";
  import { getValueType } from '/@/utils';
  import { saveOrUpdateSystem } from '../index.api';
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
    autoLogin: undefined,
    noAutoTips: undefined,
    tipsShowBuyPrice: undefined,
    tipsShowPrice: undefined,
    billlistDbclickShowWin: undefined,
    billIgnoreAddedGoods: undefined,
    noQuickInfoPrompts: undefined,
    noAutoSaveQuickInfo: '',   
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
    await saveOrUpdateSystem(model, isUpdate.value)
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
