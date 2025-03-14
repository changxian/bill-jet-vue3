<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="formData.disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="GoodsForm">
          <a-row>
            <a-col :span="8">
              <a-form-item label="商品类别" v-bind="validateInfos.categoryId" id="GoodsForm-categoryId" name="categoryId">
                <JDictSelectTag
                  v-model:value="formData.categoryId"
                  placeholder="请选择商品类别"
                  dictCode="jxc_goods_category,name,id,status=1 order by sort desc"
                  :showChooseOption="false"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="商品名称" v-bind="validateInfos.name" id="GoodsForm-name" name="name">
                <a-input v-model:value="formData.name" placeholder="请输入商品名称" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!--
              添加stringToNumber=true，可以解决因字典是字符串，而本表为int，导致string和int不匹配而反显不正常问题
              添加stringToNumber=true后String转int 与本表int匹配，反显正常
              -->
              <a-form-item label="状态" v-bind="validateInfos.status" id="GoodsForm-status" name="status">
                <JDictSelectTag
                  v-model:value="formData.status"
                  placeholder="请选择状态"
                  dictCode="jxc_goods_status"
                  :stringToNumber="true"
                  :showChooseOption="false"
                  :defaultValue="0"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="编号条码" v-bind="validateInfos.code" id="GoodsForm-code" name="code">
                <a-input v-model:value="formData.code" placeholder="请输入商品编号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="规格型号" v-bind="validateInfos.type" id="GoodsForm-type" name="type">
                <a-input v-model:value="formData.type" placeholder="请输入规格型号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="初始库存" v-bind="validateInfos.stock" id="GoodsForm-stock" name="stock">
                <a-input-number v-model:value="formData.stock" placeholder="请输入初始库存" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="进货价" v-bind="validateInfos.cost" id="GoodsForm-cost" name="cost">
                <a-input-number v-model:value="formData.cost" placeholder="请输入进货价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="售货价" v-bind="validateInfos.price" id="GoodsForm-price" name="price">
                <a-input-number v-model:value="formData.price" placeholder="请输入售货价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="单位" v-bind="validateInfos.unit" id="GoodsForm-unit" name="unit">
                <j-dict-select-tag v-model:value="formData.unit" placeholder="请选择商品单位" :url="getAllGoodsUnitsList" value-field="name" :showChooseOption="false" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol">
            <a-col :span="8" v-if="billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol">
              <a-form-item label="长" v-bind="validateInfos.length" id="GoodsForm-length" name="length">
                <a-input-number v-model:value="formData.length" @change="computeAreaVolume" placeholder="请输入长" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8" v-if="billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol">
              <a-form-item label="宽" v-bind="validateInfos.width" id="GoodsForm-width" name="width">
                <a-input-number v-model:value="formData.width" @change="computeAreaVolume" placeholder="请输入宽" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8" v-if="billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol">
              <a-form-item label="高" v-bind="validateInfos.height" id="GoodsForm-height" name="height">
                <a-input-number v-model:value="formData.height" @change="computeAreaVolume" placeholder="请输入高" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="billSetting.showWeightCol || billSetting.showAreaCol || billSetting.showVolumeCol">
            <a-col :span="8" v-if="billSetting.showWeightCol">
              <a-form-item label="重量" v-bind="validateInfos.weight" id="GoodsForm-weight" name="weight">
                <a-input-number v-model:value="formData.weight" placeholder="请输入重量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8" v-if="billSetting.showAreaCol">
              <a-form-item label="面积" v-bind="validateInfos.area" id="GoodsForm-area" name="area">
                <a-input-number v-model:value="formData.area" placeholder="请输入面积" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8" v-if="billSetting.showVolumeCol">
              <a-form-item label="体积" v-bind="validateInfos.volume" id="GoodsForm-volume" name="volume">
                <a-input-number v-model:value="formData.volume" placeholder="请输入体积" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="剂型" id="GoodsForm-spec2" name="spec2">
                <a-input v-model:value="formData.spec2" placeholder="请输入重量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="生产日期" id="GoodsForm-productDate" name="productDate">
                <a-input v-model:value="formData.productDate" placeholder="请输入面积" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="有效期" id="GoodsForm-validity" name="validity">
                <a-input v-model:value="formData.validity" placeholder="请输入体积" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="生产厂商" id="GoodsForm-firm" name="firm">
                <a-input v-model:value="formData.firm" placeholder="请输入重量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="生产地址" id="GoodsForm-firmAddress" name="firmAddress">
                <a-input v-model:value="formData.firmAddress" placeholder="请输入面积" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="生产批号" id="GoodsForm-batchNum" name="batchNum">
                <a-input v-model:value="formData.batchNum" placeholder="请输入体积" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="批准文号" id="GoodsForm-approvalNo" name="approvalNo">
                <a-input v-model:value="formData.approvalNo" placeholder="请输入重量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="注册证号" id="GoodsForm-certificateNo" name="certificateNo">
                <a-input v-model:value="formData.certificateNo" placeholder="请输入面积" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="生产许可证号" id="GoodsForm-productApprovalNo" name="productApprovalNo">
                <a-input v-model:value="formData.productApprovalNo" placeholder="请输入体积" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="width: 100%">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="GoodsForm-remark" name="remark">
                <a-textarea v-model:value="formData.remark" placeholder="请输入备注" allow-clear />
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
                :id="'GoodsForm-' + item.fieldName"
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
  import { ref, reactive, defineExpose, nextTick, defineProps, watch } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { saveOrUpdate, tenantGoodsNameNum } from './goods.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getAllGoodsUnitsList } from '@/views/units/GoodsUnits.api';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const billSetting = userStore.getBillSetting;
  const props = defineProps({
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  // eslint-disable-next-line vue/no-dupe-keys
  const formData = reactive<Record<string, any>>({
    id: '',
    categoryId: '',
    code: '',
    name: '',
    type: '',
    unit: '',
    cost: 0,
    price: 0,
    weight: 0,
    area: 0,
    volume: 0,
    length: 0,
    width: 0,
    height: 0,
    stock: 0,
    status: 0,
    remark: '',
    disabled: false,
    dynamicFields: undefined,

    firm: '',
    firmAddress: '',
    batchNum: '',

    spec2: '',
    productDate: '',
    validity: '',

    approvalNo: '',
    certificateNo: '',
    productApprovalNo: '',
  });

  watch(
    () => props.formData,
    () => {
      Object.keys(props.formData).forEach((key) => {
        formData[key] = props.formData[key];
      });
    },
    {
      immediate: true,
    }
  );

  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    code: [{ required: true, message: '请输入商品编号!' }],
    name: [{ required: true, message: '请输入商品名称!' }],
    type: [{ required: true, message: '请输入规格型号!' }],
    unit: [{ required: true, message: '请输入单位!' }],
    cost: [{ required: true, message: '请输入进价（成本）!' }],
    price: [{ required: true, message: '请输入售价!' }],
    stock: [{ required: true, message: '请输入当前库存数量!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 计算商品面积和体积
  function computeAreaVolume() {
    // 计算面积
    if (billSetting.autoComputeArea) {
      formData.area = (formData.length * formData.width).toFixed(billSetting.decimalPlaces);
    }
    // 计算体积
    if (billSetting.autoComputeVolume) {
      formData.volume = (formData.length * formData.width * formData.height).toFixed(billSetting.decimalPlaces);
    }
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

  // 商品总条数
  const total = ref(0);
  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 商品名称重复判断
      if (billSetting.goodsNameRepeat) {
        await tenantGoodsNameNum({ goodsName: formData.name }).then((res) => {
          total.value = res.total;
        });
      }
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
    if (total.value > 0) {
      createMessage.warning('商品名重复，添加失败！');
      confirmLoading.value = false;
    } else {
      saveOrUpdate(model, isUpdate.value)
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
