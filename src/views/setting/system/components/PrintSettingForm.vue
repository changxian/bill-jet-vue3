<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-divider orientation="left"> 打印 </a-divider>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="PrintSettingForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="单据打印机" v-bind="validateInfos.printer" id="PrintSettingForm-printer" name="printer">
                <j-dict-select-tag v-model:value="formData.printer" :options="printerOptions" placeholder="请选择单据打印机" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="销售单模板" v-bind="validateInfos.deliveryBillTemp" id="PrintSettingForm-deliveryBillTemp" name="deliveryBillTemp">
                <a-input v-model:value="formData.deliveryBillTemp" class="full-input" placeholder="请选择销售单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('deliveryBillTemp', 10)">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="销售退货单模板"
                v-bind="validateInfos.deliveryReturnTemp"
                id="PrintSettingForm-deliveryReturnTemp"
                name="deliveryReturnTemp"
              >
                <a-input v-model:value="formData.deliveryReturnTemp" class="full-input" placeholder="请选择销售退货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('deliveryReturnTemp', 10)">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="对账单模板" v-bind="validateInfos.accountTemp" id="PrintSettingForm-accountTemp" name="accountTemp">
                <a-input v-model:value="formData.accountTemp" class="full-input" placeholder="请选择对账单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('accountTemp', 30)">选模板</a-button>
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
                <a-input v-model:value="formData.repayReceiptTemp" class="full-input" placeholder="请选择还款收据模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('repayReceiptTemp', 70)">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="进货单模板" v-bind="validateInfos.stockBillTemp" id="PrintSettingForm-stockBillTemp" name="stockBillTemp">
                <a-input v-model:value="formData.stockBillTemp" class="full-input" placeholder="请输入进货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockBillTemp', 40)">选模板</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="进货退货单模板" v-bind="validateInfos.stockReturnTemp" id="PrintSettingForm-stockReturnTemp" name="stockReturnTemp">
                <a-input v-model:value="formData.stockReturnTemp" class="full-input" placeholder="请选择进货退货单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockReturnTemp', 50)">选模板</a-button>
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
                <a-input v-model:value="formData.stockAccountTemp" class="full-input" placeholder="请选择进货对账单模板" :bordered="false" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-button :icon="h(SearchOutlined)" type="dashed" @click="selectTemplate('stockAccountTemp', 60)">选模板</a-button>
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
  import { getMyPrintSetting, saveOrUpdatePrint } from '../index.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { SearchOutlined } from '@ant-design/icons-vue';

  import { useModal } from '/@/components/Modal';
  import ViewModal from '@/views/template/view/ViewModal.vue';
  import { useUserStore } from '@/store/modules/user';
  import * as vuePluginHiprint from '@/views/template/components';
  const [registerModal, { openModal }] = useModal();
  const { createMessage } = useMessage();

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
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  const userStore = useUserStore();
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  const printerOptions = ref<Recordable[]>([]);
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
  function selectTemplate(name, category) {
    openModal(true, {
      // record: formData,
      record: { templateId: formData.value[name + 'Id'], name: name, category: category },
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
      formData.value.num = 1;
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

  var defaultElementTypeProvider;

  function init() {
    let hiprint = vuePluginHiprint.hiprint;
    defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;

    hiprint.init({
      providers: [new defaultElementTypeProvider()],
      lang: 'cn',
    });
    // 还原配置
    hiprint.setConfig();

    return new hiprint.PrintTemplate({
      template: {},
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
        // 重新获取用户信息和菜单
        userStore.getUserInfoAction();
      });

    let printTemplate = init();
    let timer = setInterval(function () {
      const printerList1 = printTemplate.getPrinterList();

      console.log('尝试获取打印机列表');
      if (0 != printerList1) {
        console.info(printerList1);
        window.clearInterval(timer);
        printerList1.forEach((item: any) => {
          if (item) {
            printerOptions.value.push({ label: item.name, value: item.name });
          }
        });
      }
    }, 500);
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

    .full-input {
      color: #1a1a1a;
    }
  }
</style>
