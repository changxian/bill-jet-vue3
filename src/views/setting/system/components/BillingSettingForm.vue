<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-divider orientation="left"> 开单 </a-divider>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="BillingSettingForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="单号生成方式" v-bind="validateInfos.billNoGenerateMethod" id="BillingSettingForm-billNoGenerateMethod" name="billNoGenerateMethod">
                <j-dict-select-tag @change="change" v-model:value="formData.billNoGenerateMethod" dictCode="billNoGenMethod" placeholder="请选择单号生成方式" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-input v-model:value="billNoGeneMethodExamp" :bordered="false" class="underLine-text" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item v-bind="validateInfos.repeatedAutoGenerate" id="BillingSettingForm-repeatedAutoGenerate" name="repeatedAutoGenerate">
                <a-checkbox type="checkbox" v-model:checked="formData.repeatedAutoGenerate">重复时自动生成（保存单据时如果单号重复，系统将自动生成单号）</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="小数位数" v-bind="validateInfos.decimalPlaces" id="BillingSettingForm-decimalPlaces" name="decimalPlaces">
                <a-input-number v-model:value="formData.decimalPlaces" placeholder="请输入小数位数" min="0" max="6" :precision="0" style="width: 100%" class="underLine-text" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="金额小计小数位数" v-bind="validateInfos.subtotalDecimalPlaces" id="BillingSettingForm-subtotalDecimalPlaces" name="subtotalDecimalPlaces">
                <a-input-number v-model:value="formData.subtotalDecimalPlaces" placeholder="请输入金额小计小数位数" min="0" max="6" :precision="0"  style="width: 100%" class="underLine-text" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <p style="margin-bottom: 20px; color: red">提示：小数点位数最多支持6位。</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.autoCustPrice" id="BillingSettingForm-autoCustPrice" name="autoCustPrice">
                <a-checkbox type="checkbox" value="1" v-model:checked="formData.autoCustPrice" @change="updateBillingEditPrice"> 自动记录客户价</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.singleCustPrice" id="BillingSettingForm-singleCustPrice" name="singleCustPrice">
                <a-checkbox type="checkbox" value="1" v-model:checked="formData.singleCustPrice" @change="updateBillingEditPrice"> 启用一客一价</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item v-bind="validateInfos.billingEditPrice" id="BillingSettingForm-billingEditPrice" name="billingEditPrice">
                <a-checkbox type="checkbox" v-model:checked="formData.billingEditPrice" @change="updateCustPrice"> 开单保存更新售价</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item v-bind="validateInfos.billingEditBuyPrice" id="BillingSettingForm-billingEditBuyPrice" name="billingEditBuyPrice">
                <a-checkbox type="checkbox" v-model:checked="formData.billingEditBuyPrice">开单保存更新进货价(勾选后 进货价计算方式选项 无效)</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showGoodsCodeCol" id="BillingSettingForm-showGoodsCodeCol" name="showGoodsCodeCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showGoodsCodeCol"> 显示产品编号列</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showWeightCol" id="BillingSettingForm-showWeightCol" name="showWeightCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showWeightCol" @change="updateWeightParams"> 显示重量列</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showAreaCol" id="BillingSettingForm-showAreaCol" name="showAreaCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showAreaCol" @change="updateAreaParams"> 显示面积列</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showVolumeCol" id="BillingSettingForm-showVolumeCol" name="showVolumeCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showVolumeCol" @change="updateVolumeParams"> 显示体积列</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.showWeightCol">
            <a-col :span="4" style="margin-left: 50px">
              <a-form-item v-bind="validateInfos.showTotalWeight" id="BillingSettingForm-showTotalWeight" name="showTotalWeight">
                <a-checkbox type="checkbox" v-model:checked="formData.showTotalWeight"> 显示重量小计</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.showAreaCol">
            <a-col :span="4" style="margin-left: 50px">
              <a-form-item v-bind="validateInfos.showTotalArea" id="BillingSettingForm-showTotalArea" name="showTotalArea">
                <a-checkbox type="checkbox" v-model:checked="formData.showTotalArea"> 显示面积小计</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showLengthWidthCol" id="BillingSettingForm-showLengthWidthCol" name="showLengthWidthCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showLengthWidthCol"> 显示长宽列</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.autoComputeArea" id="BillingSettingForm-autoComputeArea" name="autoComputeArea">
                <a-checkbox type="checkbox" v-model:checked="formData.autoComputeArea"> 自动计算面积</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.showVolumeCol">
            <a-col :span="4" style="margin-left: 50px">
              <a-form-item v-bind="validateInfos.showTotalVolume" id="BillingSettingForm-showTotalVolume" name="showTotalVolume">
                <a-checkbox type="checkbox" v-model:checked="formData.showTotalVolume"> 显示体积小计</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.showLengthWidthHeightCol" id="BillingSettingForm-showLengthWidthHeightCol" name="showLengthWidthHeightCol">
                <a-checkbox type="checkbox" v-model:checked="formData.showLengthWidthHeightCol"> 显示长宽高列</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.autoComputeVolume" id="BillingSettingForm-autoComputeVolume" name="autoComputeVolume">
                <a-checkbox type="checkbox" v-model:checked="formData.autoComputeVolume"> 自动计算体积</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <p style="margin-bottom: 20px; color: red">提示：选中显示小计列后，小计列=属性*数量，比如：重量小计= 重量*数量。</p>
            </a-col>
          </a-row>
          <a-row v-if="formData?.dynaFieldsGroup">
            <a-col v-for="(item, index) in formData.dynaFieldsGroup['1']"
                    :key="item.fieldName"
                    class="option-item" :span="6">
              <p style="margin-bottom: 10px">
                <label class="underLine-label">{{item.fieldDesc}}列名:</label>
                <input class="underLine-text" v-model="item.fieldTitle" />
              </p>
            </a-col>
          </a-row>

          <a-row style="margin-top: 25px">
            <a-col :span="10">
              <a-form-item label="金额计算方式" v-bind="validateInfos.amountComputeMethod" id="BillingSettingForm-amountComputeMethod" name="amountComputeMethod">
                <j-dict-select-tag v-model:value="formData.amountComputeMethod" dictCode="amountComputedMethod" placeholder="请选择金额计算方式" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-bind="validateInfos.editAmountEditPrice" id="BillingSettingForm-editAmountEditPrice" name="editAmountEditPrice">
                <a-checkbox type="checkbox" v-model:checked="formData.editAmountEditPrice"> 修改金额单价变动</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <p style="margin-bottom: 20px; color: red">提示：金额计算方式选择后，请保持不变，否则将导致成本及金额计算结果不一致。</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="进货价计算方式" v-bind="validateInfos.buyPriceComputeMethod" id="BillingSettingForm-buyPriceComputeMethod" name="buyPriceComputeMethod">
                <j-dict-select-tag v-model:value="formData.buyPriceComputeMethod" dictCode="buyPriceComputeMethod" placeholder="请选择进货价计算方式"  allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item v-bind="validateInfos.goodsNameRepeat" id="BillingSettingForm-goodsNameRepeat" name="goodsNameRepeat">
                <a-checkbox type="checkbox" v-model:checked="formData.goodsNameRepeat"> 不允许商品名重复</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="" v-bind="validateInfos.notAutoSaveCustomer" id="BillingSettingForm-notAutoSaveCustomer" name="notAutoSaveCustomer">
                <a-checkbox type="checkbox" v-model:checked="formData.notAutoSaveCustomer"> 不自动保存客户</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item v-bind="validateInfos.notAutoSaveGoods" id="BillingSettingForm-notAutoSaveGoods" name="notAutoSaveGoods">
                <a-checkbox type="checkbox" v-model:checked="formData.notAutoSaveGoods"> 不自动保存商品</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item v-bind="validateInfos.notAutoSaveGoodsRmk" id="BillingSettingForm-notAutoSaveGoodsRmk" name="notAutoSaveGoodsRmk">
                <a-checkbox type="checkbox" v-model:checked="formData.notAutoSaveGoodsRmk"> 不自动保存商品备注</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item v-bind="validateInfos.notAutoSaveSupplier" id="BillingSettingForm-notAutoSaveSupplier" name="notAutoSaveSupplier">
                <a-checkbox type="checkbox" v-model:checked="formData.notAutoSaveSupplier"> 不自动保存供应商</a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6">
              <a-form-item v-bind="validateInfos.onlyChooseGoods" id="BillingSettingForm-onlyChooseGoods" name="onlyChooseGoods">
                <a-checkbox type="checkbox" v-model:checked="formData.onlyChooseGoods"> 只允许选择商品开单</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="16">
              <a-form-item v-bind="validateInfos.notLessZeroStock" id="BillingSettingForm-notLessZeroStock" name="notLessZeroStock">
                <a-checkbox type="checkbox" v-model:checked="formData.notLessZeroStock"> 库存不允许小于零（必须同时勾选 只允许选择商品开单，否则无效）</a-checkbox>
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
                <a-button type="primary" html-type="submit" @click="submitForm">保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getMyBillSetting, saveOrUpdateBilling } from '../index.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { formatToDateS, formatToDateTimeSSS, formatToMonthS } from '@/utils/dateUtil';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();

  const formData = ref<Record<any>>({});
  function init() {
    getMyBillSetting().then((res) => {
      formData.value = res;
    });
  }
  init();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const billNoGeneMethodExamp = ref('');
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    subtotalDecimalPlaces: [{ required: true, message: '金额小计小数位数不能为空', trigger: 'change' }],
    decimalPlaces: [{ required: true, message: '小数位数不能为空', trigger: 'change' }]
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      return props.formData.disabled !== false;
    }
    return props.formDisabled;
  });
  // 单号生成方式改变
  function change(value) {
    if (value == 'YYYYMMDDHHmmssSSS'){
      billNoGeneMethodExamp.value = formatToDateTimeSSS(new Date());
    } else if (value == 'YYYYMMDD_SERIAL') {
      billNoGeneMethodExamp.value = formatToDateS() + "0001";
    } else if (value == 'YYYYMM_SERIAL') {
      billNoGeneMethodExamp.value = formatToMonthS() + "00001";
    } else if (value == '8_SERIAL') {
      billNoGeneMethodExamp.value = '00000001';
    }
  }

  // 设置客户价-一客一价
  function updateBillingEditPrice() {
    if (formData.value.autoCustPrice) {
      formData.value.billingEditPrice = !formData.value.autoCustPrice;
    }
    if (formData.value.singleCustPrice) {
      formData.value.billingEditPrice = !formData.value.singleCustPrice;
    }
  }
  // 设置开单保存更新售价
  function updateCustPrice() {
    if (formData.value.billingEditPrice) {
      formData.value.autoCustPrice = !formData.value.billingEditPrice;
      formData.value.singleCustPrice = !formData.value.billingEditPrice;
    }
  }
  // 设置重量参数
  function updateWeightParams() {
    formData.value.showWeightCol = !!formData.value.showWeightCol;
    formData.value.showTotalWeight = formData.value.showWeightCol;
  }
  // 设置面积参数
  function updateAreaParams() {
    formData.value.showAreaCol = !!formData.value.showAreaCol;
    formData.value.showTotalArea = formData.value.showAreaCol;
    formData.value.showLengthWidthCol = formData.value.showAreaCol;
    formData.value.autoComputeArea = formData.value.showAreaCol;
  }
  // 设置体积参数
  function updateVolumeParams() {
    formData.value.showVolumeCol = !!formData.value.showVolumeCol;
    formData.value.showTotalVolume = formData.value.showVolumeCol;
    formData.value.showLengthWidthHeightCol = formData.value.showVolumeCol;
    formData.value.autoComputeVolume = formData.value.showVolumeCol;
  }
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
    let model = formData.value;
    if (model.id) {
      isUpdate.value = true;
    }
    await saveOrUpdateBilling(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        init();
        confirmLoading.value = false;
      });
  }

  defineExpose({
    add,
    edit,
    formData,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
  .underLine-label{
    width: 35%;
    text-align: right;
    display: inline-block;
  }
  .underLine-text {
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #bdacac; /* 设置下划线 */
    outline: none; /* 移除点击输入框时的默认轮廓 */
    margin-left: 10px;
    width: 30%;
  }
</style>
