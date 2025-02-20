<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-divider orientation="left"> 打印 </a-divider>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="PrintSettingForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="单据打印机" v-bind="validateInfos.printer" id="PrintSettingForm-printer" name="printer">
                <j-dict-select-tag v-model:value="formData.printer" dictCode="" placeholder="请选择单据打印机" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="打印份数" v-bind="validateInfos.num" id="PrintSettingForm-num" name="num">
                <j-dict-select-tag v-model:value="formData.num" dictCode="" :options="numOptions" placeholder="请选择打印份数" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="送货单模板" v-bind="validateInfos.deliveryBillTemp" id="PrintSettingForm-deliveryBillTemp" name="deliveryBillTemp">
                <a-input v-model:value="formData.deliveryBillTemp" placeholder="请选择送货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('deliveryBillTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="送货退货单模板"
                v-bind="validateInfos.deliveryReturnTemp"
                id="PrintSettingForm-deliveryReturnTemp"
                name="deliveryReturnTemp"
              >
                <a-input v-model:value="formData.deliveryReturnTemp" placeholder="请选择送货退货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('deliveryReturnTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="对账单模板" v-bind="validateInfos.accountTemp" id="PrintSettingForm-accountTemp" name="accountTemp">
                <a-input v-model:value="formData.accountTemp" placeholder="请选择对账单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('accountTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="还款收据模板"
                v-bind="validateInfos.repayReceiptTemp"
                id="PrintSettingForm-repayReceiptTemp"
                name="repayReceiptTemp"
              >
                <a-input v-model:value="formData.repayReceiptTemp" placeholder="请选择还款收据模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('repayReceiptTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="进货单模板" v-bind="validateInfos.stockBillTemp" id="PrintSettingForm-stockBillTemp" name="stockBillTemp">
                <a-input v-model:value="formData.stockBillTemp" placeholder="请输入进货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockBillTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="进货退货单模板" v-bind="validateInfos.stockReturnTemp" id="PrintSettingForm-stockReturnTemp" name="stockReturnTemp">
                <a-input v-model:value="formData.stockReturnTemp" placeholder="请选择进货退货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockReturnTemp')">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="进货对账单模板"
                v-bind="validateInfos.stockAccountTemp"
                id="PrintSettingForm-stockAccountTemp"
                name="stockAccountTemp"
              >
                <a-input v-model:value="formData.stockAccountTemp" placeholder="请选择进货对账单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockAccountTemp')">选模板</a-button>
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
                <a-button type="primary" html-type="submit" @click="submitForm">保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>

    <!-- 选择模板窗口 -->
    <ViewModal @register="registerModal" @success="handleSuccess" />
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, h, onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { getMyPrintSetting, saveOrUpdatePrint } from '../index.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { SearchOutlined } from '@ant-design/icons-vue';

  import { useModal } from '/@/components/Modal';
  import ViewModal from '@/views/template/view/ViewModal.vue';
  const [registerModal, { openModal }] = useModal();

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  // eslint-disable-next-line vue/no-dupe-keys
  const formData = ref({
    id: '',
    printer: '',
    num: 1,
    deliveryBillTempId: '',
    deliveryBillTemp: '',
    deliveryReturnTempId: '',
    deliveryReturnTemp: '',
    accountTemp: '',
    repayReceiptTemp: '',
    stockBillTemp: '',
    stockReturnTemp: '',
    stockAccountTemp: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  const numOptions = ref([
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
  ]);
  // 给开单类型设置默认值
  if (formData.value.num == undefined && numOptions.value.length > 0) {
    formData.value.num = numOptions.value[0].value;
  }
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
  function selectTemplate(name) {
    openModal(true, {
      // record: formData,
      record: { templateId: formData.value[name + 'Id'], name: name },
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 成功回调
   */
  function handleSuccess(o, name) {
    console.info('Success!');
    console.info(o);
    console.info(name);
    formData.value[name] = o.name;
    formData.value[name + 'Id'] = o.id;
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
    if (model.value.id) {
      isUpdate.value = true;
    }
    await saveOrUpdatePrint(model.value, isUpdate.value)
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

  function fetchPrintSettingData() {
    confirmLoading.value = true;
    getMyPrintSetting()
      .then((res) => {
        formData.value = {
          ...res,
        };
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  onMounted(fetchPrintSettingData);

  defineExpose({
    selectTemplate,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
</style>
