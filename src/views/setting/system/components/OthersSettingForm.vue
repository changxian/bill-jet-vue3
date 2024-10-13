<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="OthersSettingForm">

          <a-row>
            <a-col :span="24">
              <p class="label-p">商品：</p>
            </a-col>
          </a-row>
          <a-row v-if="formData">
            <a-col v-for="(item, index) in formData['2']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px"><label class="underLine-label">{{item.fieldDesc}}：</label><input class="underLine-text" v-model="item.fieldTitle" ></input></p>
             </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <p class="label-p">单据：</p>
            </a-col>
          </a-row>
          <a-row v-if="formData" >
            <a-col v-for="(item, index) in formData['6']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px"><label class="underLine-label">{{item.fieldDesc}}：</label><input class="underLine-text" v-model="item.fieldTitle" ></input></p>
             </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <p class="label-p">客户：</p>
            </a-col>
          </a-row>
          <a-row v-if="formData" >
            <a-col v-for="(item, index) in formData['4']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px"><label class="underLine-label">{{item.fieldDesc}}：</label><input class="underLine-text" v-model="item.fieldTitle" ></input></p>
             </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <p class="label-p">公司：</p>
            </a-col>
          </a-row>
          <a-row v-if="formData" >
            <a-col v-for="(item, index) in formData['3']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px"><label class="underLine-label">{{item.fieldDesc}}：</label><input class="underLine-text" v-model="item.fieldTitle" ></input></p>
             </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <p class="label-p">供应商：</p>
            </a-col>
          </a-row>
          <a-row v-if="formData" >
            <a-col v-for="(item, index) in formData['5']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px"><label class="underLine-label">{{item.fieldDesc}}：</label><input class="underLine-text" v-model="item.fieldTitle" ></input></p>
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
                <a-button type="primary" html-type="submit"  @click="submitForm">保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import {
    ref,
    reactive,
    defineExpose,
    defineProps,
    computed,
  } from "vue";
  import { useMessage } from '/@/hooks/web/useMessage';
  import { fieldsList, saveOrUpdateOthers } from "../index.api";
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    // formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref()
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
  });
  const { resetFields, validate, validateInfos } = useForm( validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
    }
    return props.formDisabled;
  });

  const formData = ref<Record<any>>({});
  fieldsList({ "category": 1, "match": "0" }).then(res => {
    formData.value = res;
  });

  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 触发表单验证
      await validate();
    } catch ({ errorFields }) {
      // if (errorFields) {
      //   const firstField = errorFields[0];
      //   if (firstField) {
      //     formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
      //   }
      // }
      // return Promise.reject(errorFields);
    }
    // confirmLoading.value = true;
    // const isUpdate = ref<boolean>(false);
    // //时间格式化
    let model = formData.value;
    console.log(model, "=========model=model==========")
    // if (model.id) {
    //   isUpdate.value = true;
    // }
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
    await saveOrUpdateOthers(model)
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
    formData,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
  .label-p {
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .underLine-label{
    width: 30%;
    text-align: right;
    display: inline-block;
  }
  .underLine-text {
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #bdacac; /* 设置下划线 */
    outline: none; /* 移除点击输入框时的默认轮廓 */
    margin-left: 10px;
    width: 40%;
  }
</style>
