<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="BillingSettingForm">
          <a-row>
						<a-col :span="12">
							<a-form-item label="单号生成方式" v-bind="validateInfos.billNoGenerateMethod" id="BillingSettingForm-billNoGenerateMethod" name="billNoGenerateMethod">
                <j-dict-select-tag v-model:value="formData.printer" dictCode="" placeholder="请选择单号生成方式" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="比如" v-bind="validateInfos.billNoGenerateMethod" id="BillingSettingForm-billNoGenerateMethod" name="billNoGenerateMethod">
                <a-input v-model:value="validateInfos.billNoGeneMethodExamp" :bordered="false" class="underLine-text" />
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
						<a-col :span="24">
							<a-form-item v-bind="validateInfos.repeatedAutoGenerate" id="BillingSettingForm-repeatedAutoGenerate" name="repeatedAutoGenerate">
                <a-checkbox type="checkbox" v-model:value="formData.repeatedAutoGenerate">重复时自动生成（保存单据时如果单号重复，系统将自动生成单号）</a-checkbox>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
						<a-col :span="12">
							<a-form-item label="小数位数" v-bind="validateInfos.decimalPlaces" id="BillingSettingForm-decimalPlaces" name="decimalPlaces">
								<a-input-number v-model:value="formData.decimalPlaces" placeholder="请输入小数位数" style="width: 100%" class="underLine-text" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="金额小计小数位数" v-bind="validateInfos.subtotalDecimalPlaces" id="BillingSettingForm-subtotalDecimalPlaces" name="subtotalDecimalPlaces">
								<a-input-number v-model:value="formData.subtotalDecimalPlaces" placeholder="请输入金额小计小数位数" style="width: 100%" class="underLine-text" />
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
                <a-checkbox type="checkbox" v-model:value="formData.autoCustPrice"> 自动记录客户价</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.singleCustPrice" id="BillingSettingForm-singleCustPrice" name="singleCustPrice">
                <a-checkbox type="checkbox" v-model:value="formData.singleCustPrice"> 启用一客一价</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<a-form-item v-bind="validateInfos.billingEditPrice" id="BillingSettingForm-billingEditPrice" name="billingEditPrice">
                <a-checkbox type="checkbox" v-model:value="formData.billingEditPrice"> 开单保存更新售价</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="11">
							<a-form-item v-bind="validateInfos.billingEditBuyPrice" id="BillingSettingForm-billingEditBuyPrice" name="billingEditBuyPrice">
                <a-checkbox type="checkbox" v-model:value="formData.billingEditBuyPrice">开单保存更新进货价(勾选后 进货价计算方式选项 无效)</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.showGoodsCodeCol" id="BillingSettingForm-showGoodsCodeCol" name="showGoodsCodeCol">
                <a-checkbox type="checkbox" v-model:value="formData.showGoodsCodeCol"> 显示产品编号列</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.showWeightCol" id="BillingSettingForm-showWeightCol" name="showWeightCol">
                <a-checkbox type="checkbox" v-model:value="formData.showWeightCol"> 显示重量列</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.showAreaCol" id="BillingSettingForm-showAreaCol" name="showAreaCol">
                <a-checkbox type="checkbox" v-model:value="formData.showAreaCol"> 显示面积列</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.showVolumeCol" id="BillingSettingForm-showVolumeCol" name="showVolumeCol">
                <a-checkbox type="checkbox" v-model:value="formData.showVolumeCol"> 显示体积列</a-checkbox>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <p style="margin-bottom: 20px; color: red">提示：选中显示小计列后，小计列=属性*数量，比如：重量小计= 重量*数量。</p>
            </a-col>
          </a-row>
          <a-row>
            <a-col  v-for="(item, index) in getMoreCols"
                    :key="item.fieldName"
                    class="option-item"  :span="8">
              <p style="margin-bottom: 10px">
                <label class="underLine-label">{{item.fieldDesc}}:</label>
                <input class="underLine-text" v-model="item.fieldTitle" /></p>
             </a-col>
          </a-row>


          <a-row style="margin-top: 20px;">
            <a-col :span="24">
              <p style="margin-bottom: 20px">***************** 加载配置的动态列 *****************</p>
            </a-col>
            <a-col :span="24">
              <p style="margin-bottom: 20px">***************** 加载配置的动态列 *****************</p>
            </a-col>
          </a-row>
          <a-row>
						<a-col :span="10">
							<a-form-item label="金额计算方式" v-bind="validateInfos.amountComputeMethod" id="BillingSettingForm-amountComputeMethod" name="amountComputeMethod">
								<j-dict-select-tag v-model:value="formData.amountComputeMethod" dictCode="" placeholder="请选择金额计算方式" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item v-bind="validateInfos.editAmountEditPrice" id="BillingSettingForm-editAmountEditPrice" name="editAmountEditPrice">
                <a-checkbox type="checkbox" v-model:value="formData.editAmountEditPrice"> 修改金额单价变动</a-checkbox>
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
								<j-dict-select-tag v-model:value="formData.buyPriceComputeMethod" dictCode="" placeholder="请选择进货价计算方式"  allow-clear />
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
						<a-col :span="24">
							<a-form-item v-bind="validateInfos.goodsNameRepeat" id="BillingSettingForm-goodsNameRepeat" name="goodsNameRepeat">
                <a-checkbox type="checkbox" v-model:value="formData.goodsNameRepeat"> 不允许商品名重复</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="" v-bind="validateInfos.notAutoSaveCustomer" id="BillingSettingForm-notAutoSaveCustomer" name="notAutoSaveCustomer">
                <a-checkbox type="checkbox" v-model:value="formData.notAutoSaveCustomer"> 不自动保存客户</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item v-bind="validateInfos.notAutoSaveGoods" id="BillingSettingForm-notAutoSaveGoods" name="notAutoSaveGoods">
                <a-checkbox type="checkbox" v-model:value="formData.notAutoSaveGoods"> 不自动保存商品</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.notAutoSaveGoodsRmk" id="BillingSettingForm-notAutoSaveGoodsRmk" name="notAutoSaveGoodsRmk">
                <a-checkbox type="checkbox" v-model:value="formData.notAutoSaveGoodsRmk"> 不自动保存商品备注</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.notAutoSaveSupplier" id="BillingSettingForm-notAutoSaveSupplier" name="notAutoSaveSupplier">
                <a-checkbox type="checkbox" v-model:value="formData.notAutoSaveSupplier"> 不自动保存供应商</a-checkbox>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
						<a-col :span="6">
							<a-form-item v-bind="validateInfos.onlyChooseGoods" id="BillingSettingForm-onlyChooseGoods" name="onlyChooseGoods">
                <a-checkbox type="checkbox" v-model:value="formData.onlyChooseGoods"> 只允许选择商品开单</a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="16">
							<a-form-item v-bind="validateInfos.notLessZeroStock" id="BillingSettingForm-notLessZeroStock" name="notLessZeroStock">
                <a-checkbox type="checkbox" v-model:value="formData.notLessZeroStock"> 库存不允许小于零（必须同时勾选 只允许选择商品开单，否则无效）</a-checkbox>
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
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JCheckbox from "/@/components/Form/src/jeecg/components/JCheckbox.vue";
  import { getValueType } from '/@/utils';
  import { saveOrUpdateBilling } from '../index.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref()
  const getMoreCols = ref([
    {"tableName":"jxc_goods","fieldName":"name","fieldDesc":"名称","fieldTitle":""},
    {"tableName":"jxc_goods","fieldName":"type","fieldDesc":"规是格","fieldTitle":""},
    {"tableName":"jxc_goods","fieldName":"price","fieldDesc":"单撒旦价","fieldTitle":""},
     {"tableName":"jxc_goods","fieldName":"remark","fieldDesc":"备是多少注","fieldTitle":""}]);
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    billNoGenerateMethod: '',   
    repeatedAutoGenerate: undefined,
    decimalPlaces: undefined,
    subtotalDecimalPlaces: undefined,
    autoCustPrice: undefined,
    singleCustPrice: undefined,
    billingEditPrice: undefined,
    billingEditBuyPrice: undefined,
    showGoodsCodeCol: undefined,
    showWeightCol: undefined,
    showAreaCol: undefined,
    showVolumeCol: undefined,
    amountComputeMethod: '',   
    editAmountEditPrice: undefined,
    buyPriceComputeMethod: '',   
    goodsNameRepeat: undefined,
    notAutoSaveCustomer: undefined,
    notAutoSaveGoods: undefined,
    notAutoSaveGoodsRmk: undefined,
    notAutoSaveSupplier: undefined,
    onlyChooseGoods: undefined,
    notLessZeroStock: undefined,
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
      console.log(getMoreCols,"====================")
      // 触发表单验证
      // await validate();
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
    // let model = formData;
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
    // await saveOrUpdateBilling(model, isUpdate.value)
    //   .then((res) => {
    //     if (res.success) {
    //       createMessage.success(res.message);
    //       emit('ok');
    //     } else {
    //       createMessage.warning(res.message);
    //     }
    //   })
    //   .finally(() => {
    //     confirmLoading.value = false;
    //   });
  }


  defineExpose({
    add,
    edit,
    getMoreCols,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
  .underLine-label{
    width: 25%;
    text-align: right;
    display: inline-block;
  }
  .underLine-text {
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #bdacac; /* 设置下划线 */
    outline: none; /* 移除点击输入框时的默认轮廓 */
    margin-left: 10px;
    width: 60%;
  }
</style>
