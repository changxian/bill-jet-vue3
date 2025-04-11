<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="PurchaseBillForm" style="background: #ffffff">
          <a-row>
            <a-col :span="span">
              <a-form-item label="公司名称" v-bind="validateInfos.companyId" id="PurchaseBillForm-companyId" name="companyId">
                <j-select-company v-model:value="formData.companyId" @change="changeCompany" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商名称" v-bind="validateInfos.supplierId" id="PurchaseBillForm-supplierId" name="supplierId">
                <j-select-input-supplier v-model:value="formData.supplierId" @change="changeSupplier" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商地址" v-bind="validateInfos.supplierAddress" id="PurchaseBillForm-supplierAddress" name="supplierAddress">
                <a-input v-model:value="formData.supplierAddress" placeholder="请输入供应商地址" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
							<a-form-item label="单号" v-bind="validateInfos.billNo" id="PurchaseBillForm-billNo" name="billNo">
								<a-input :disabled="true" v-model:value="formData.billNo" placeholder="请输入单号" allow-clear ></a-input>
							</a-form-item>
						</a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="联系人名" v-bind="validateInfos.supplierContact" id="PurchaseBillForm-supplierContact" name="supplierContact">
                <a-input v-model:value="formData.supplierContact" placeholder="请输入供应商联系人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="联系人电话" v-bind="validateInfos.supplierPhone" id="PurchaseBillForm-supplierPhone" name="supplierPhone">
                <a-input v-model:value="formData.supplierPhone" placeholder="请输入供应商电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="开单日期" v-bind="validateInfos.billDate" id="PurchaseBillForm-billDate" name="billDate">
                <a-date-picker placeholder="请选择开单日期" v-model:value="formData.billDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="送货车号" v-bind="validateInfos.careNo" id="PurchaseBillForm-careNo" name="careNo">
                <a-input v-model:value="formData.careNo" placeholder="请输入送货车号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="送货人姓名" v-bind="validateInfos.careNo" id="DeliverBillForm-careNo" name="careNo">
                <a-input v-model:value="formData.deliveryBy" placeholder="请输入送货人姓名" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="送货人电话" v-bind="validateInfos.careNo" id="DeliverBillForm-careNo" name="careNo">
                <a-input v-model:value="formData.deliveryTel" placeholder="请输入送货人电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="合同号" v-bind="validateInfos.contractCode" id="PurchaseBillForm-contractCode" name="contractCode">
                <a-input v-model:value="formData.contractCode" placeholder="请输入合同号" allow-clear></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.dynamicSupFields && 0 < formData.dynamicSupFields.length" :gutter="10">
            <a-col v-for="(item, index) in formData.dynamicSupFields" :key="item.id" :span="span">
              <a-form-item
                v-if="item.fieldTitle"
                :label="item.fieldTitle"
                :id="'dynamicSupFields-' + item.fieldName"
                :name="'dynamicSupFields.' + item.fieldName"
              >
                <a-input v-model:value="formData.dynamicSupFields[index].fieldValue" :placeholder="'请输入' + item.fieldTitle" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <goods ref="goodsRef" @change-goods="changeGoods"></goods>
          <a-row>
            <a-col :span="span">
              <a-form-item label="开单类型" v-bind="validateInfos.type" id="PurchaseBillForm-type" name="type">
                <j-dict-select-tag v-model:value="formData.type" dictCode="" :options="typeOptions" placeholder="请选择开单类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="已付款" v-bind="validateInfos.paymentAmount" id="PurchaseBillForm-paymentAmount" name="paymentAmount">
                <a-input-number @change="changeMoney" v-model:value="formData.paymentAmount" placeholder="请输入已付款" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="优惠金额" v-bind="validateInfos.discountAmount" id="PurchaseBillForm-discountAmount" name="discountAmount">
                <a-input-number @change="changeMoney" v-model:value="formData.discountAmount" placeholder="请输入优惠金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="未付款" v-bind="validateInfos.debtAmount" id="PurchaseBillForm-debtAmount" name="debtAmount">
                <a-input-number disabled v-model:value="formData.debtAmount" placeholder="请输入未付款" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="往期欠款" id="PurchaseBillForm-hisDebtAmount" name="hisDebtAmount">
                <a-input-number v-model:value="formData.hisDebtAmount" placeholder="请输入往期欠款" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="制单人" v-bind="validateInfos.operatorName" id="PurchaseBillForm-operatorName" name="operatorName">
                <a-input v-model:value="formData.operatorName" placeholder="请输入制单人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" id="PurchaseBillForm-remark" name="remark">
                <SelectInput v-model="formData.remark" style="width: 100%" />
                <!--<a-textarea v-model:value="formData.remark" placeholder="请输入备注" allow-clear></a-textarea>-->
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.dynamicFields && 0 < formData.dynamicFields.length" :gutter="10">
            <a-col v-for="(item, index) in formData.dynamicFields" :key="item.id" :span="span">
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
          <a-row class="btns-wrap" v-if="showBtn">
            <a-button type="primary" @click="clickSave">保存</a-button>
            <a-button style="margin: 0 30px 0 10px" @click="clickSave">保存并打印</a-button>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, defineExpose, defineProps, nextTick, reactive, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import JSelectInputSupplier from '/@/components/Form/src/jeecg/components/JSelectInputSupplier.vue';
  import goods from './goods.vue';
  import { getValueType } from '/@/utils';
  import { billDetail, saveOrUpdate } from '../PurchaseBill.api';
  import { statusList } from '../PurchaseBill.data';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { defaultCom, queryNewNo } from '@/views/deliver/bill/DeliverBill.api';
  import { fieldsList, getDynamicFieldsAndValue } from '@/views/setting/system/index.api';
  import { byPurchaseId } from '@/views/purchase/debt/PurchaseDebt.api';
  import { useUserStore } from '@/store/modules/user';
  import SelectInput from '@/views/statistics/statistics/SelectInput.vue';

  const userStore = useUserStore();
  // 小数位数
  const decimalPlaces = userStore.getBillSetting.decimalPlaces;
  const span = 6;
  // 1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
  const statusOptions = ref(statusList);
  const typeOptions = ref([
    { value: 1, label: '进货开单' },
    { value: 2, label: '退货开单' },
  ]);

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
    showBtn: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive({
    id: '',
    billNo: '',
    type: 1,
    billDate: '',
    companyName: '',
    companyId: '',
    supplierId: '',
    supplierName: '',
    supplierPhone: '',
    supplierAddress: '',
    supplierContact: '',
    count: 0,
    weight: 0,
    area: 0,
    volume: 0,
    amount: 0,
    paymentAmount: 0,
    discountAmount: 0,
    debtAmount: 0.0,
    hisDebtAmount: 0,
    careNo: '',
    deliveryBy: '',
    deliveryTel: '',
    contractCode: '',
    status: 1,
    invoiceStatus: 1,
    userName: '',
    operatorId: userStore.getUserInfo.id,
    operatorName: userStore.getUserInfo.realname,
    createName: userStore.getUserInfo.realname,
    remark: '',
    version: 0,
    dynamicSupFields: undefined,
    dynamicFields: undefined,
  });
  // 给开单类型设置默认值
  if (typeOptions.value.length > 0) {
    formData.type = typeOptions.value[0].value;
  }

  const rules: Record<string, Rule[]> = {
    companyId: [{ required: true, message: '必填', trigger: 'blur' }],
    supplierId: [{ required: true, message: '必填', trigger: 'blur' }],
    //  remark:  [{ required: true, message: '必填', trigger: 'change' }],
    // hisDebtAmount: [{ required: true, message: '必填', trigger: 'change' }],
  };
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  const goodsRef = ref(null);
  const hasInit = ref(false);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      return props.formData.disabled !== false;
    }
    return props.formDisabled;
  });

  function init() {
    if (hasInit.value) {
      return;
    }
    hasInit.value = true;
    fieldsList({ category: 1, match: '0' }).then((res) => {
      formData.dynamicSupFields = res['5'].filter((item) => item.id != null);
      formData.dynamicFields = res['6'].filter((item) => item.id != null);
    });
    queryNewNo({ category: 1 }).then((res) => {
      if (formData.billNo == '') {
        formData.billNo = res.newNo;
      }
    });
    defaultCom().then((res) => {
      if (formData.companyId == '') {
        formData.companyId = res.id;
        formData.companyName = res.compName;
      }
    });
  }
  init();
  // 选择开单公司信息
  function changeCompany(val, selectRows) {
    console.log(' changeCompany val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      formData.companyId = selectRows[0].id;
      formData.companyName = selectRows[0].compName;
    }
  }
  const supplierId = ref<string>('');
  function changeSupplier(val, selectRows) {
    console.log(' changeSupplier val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      supplierId.value = selectRows[0].id;
      // debugger;
      // 获取供应商往期欠款金额
      if (formData.hisDebtAmount == 0 || formData.supplierId != selectRows[0].id) {
        byPurchaseId({ supplierId: selectRows[0].id }).then((res) => {
          if (res) {
            formData.hisDebtAmount = res.purchaseDebtAmount;
          }
        });
      }
      formData.supplierId = selectRows[0].id;
      formData.supplierName = selectRows[0].orgName;
      formData.supplierPhone = selectRows[0].phone;
      formData.supplierContact = selectRows[0].contact;
      formData.supplierAddress = selectRows[0].address;
      if (selectRows[0].dynamicFields) {
        formData.dynamicSupFields = selectRows[0].dynamicFields;
      }
    }
  }
  let amount: number = 0.0;
  function changeGoods(goods) {
    // 先将金额置为0
    amount = 0.0;
    // let num = 0.0;
    goods.forEach((item) => {
      // 计算重量、面积、体积小计
      item.weightSubtotal = 0;
      if (item.weight) {
        item.weightSubtotal = (item.weight * item.count).toFixed(decimalPlaces);
      }
      item.areaSubtotal = 0;
      if (item.area) {
        item.areaSubtotal = (item.area * item.count).toFixed(decimalPlaces);
      }
      item.volumeSubtotal = 0;
      if (item.volume) {
        item.volumeSubtotal = (item.volume * item.count).toFixed(decimalPlaces);
      }
      // num = parseFloat(num) + parseFloat(item.costAmount);
      amount += parseFloat(item.costAmount);
    });
    // amount = (num).toFixed(decimalPlaces);
    // amount = num;
    calcDebtAmount();
  }

  function changeMoney() {
    calcDebtAmount();
  }
  function calcDebtAmount() {
    if (amount && (formData.paymentAmount || formData.paymentAmount == 0) && (formData.discountAmount || formData.discountAmount == 0)) {
      let debtAmount = (amount - formData.paymentAmount - formData.discountAmount).toFixed(decimalPlaces);
      formData.debtAmount = parseFloat(debtAmount);
    }
  }
  /**
   * 新增
   */
  function add() {
    init();
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
      formData.status = record.status + '';
      getGoods(formData.id);
      if (record.hasCopy) {
        formData.status = '';
        formData.invoiceStatus= undefined;
        formData.id = '';
        formData.billNo = '';
        formData.createBy = '';
        formData.createTime = '';
        formData.updateTime = '';
        formData.updateBy = '';
      }
      hasInit.value = true;
      getDynamicFieldsAndValue({ category: 5, id: tmpData.supplierId }).then((res) => {
        formData.dynamicSupFields = res;
      });
    });
  }

  function getGoods(id) {
    billDetail({ billId: id }).then((res) => {
      // dataSourceDetail.value = [...res]
      nextTick(() => {
        goodsRef.value.setValue([...res]);
      });
      changeGoods(res);
    });
  }

  function validateForm() {
    if (!formData.supplierId) {
      createMessage.warning('请选择供应商');
      return false;
    }
    if (!formData.companyId) {
      createMessage.warning('请选择公司');
      return false;
    }
    const goods = goodsRef.value.getData().details;
    if (goods.length === 0) {
      createMessage.warning('请选择商品');
      return false;
    }
    return true;
  }
  function resetForm() {
    formData.id = '';
    formData.type = undefined;
    formData.billNo = '';
    formData.billDate = '';
    formData.companyName = '';
    formData.companyId = '';
    formData.supplierId = '';
    formData.supplierName = '';
    formData.supplierPhone = '';
    formData.supplierAddress = '';
    formData.supplierContact = '';
    formData.count = 0;
    formData.weight = 0;
    formData.area = 0;
    formData.volume = 0;
    formData.amount = 0;
    formData.paymentAmount = 0;
    formData.discountAmount = 0;
    formData.debtAmount = 0.0;
    formData.hisDebtAmount = 0;
    formData.status = '';
    formData.invoiceStatus = undefined;
    formData.careNo = '';
    formData.deliveryBy = '';
    formData.deliveryTel = '';
    formData.contractCode = '';
    formData.remark = '';
    formData.createName = '';
    formData.userName = '';
    formData.dynamicSupFields = undefined;
    formData.dynamicFields = undefined;
    goodsRef.value.setValue([]);
    hasInit.value = false;
    init();
  }
  function clickSave() {
    // console.log('goodsRef:', goodsRef.value.getData());
    if (!validateForm()) {
      return;
    }
    console.log('formData:', formData);
    const params = {
      ...formData,
      ...goodsRef.value.getData(),
    };
    if(params.details){
      params.details.forEach(obj => {
        if (obj.cancelCbs){
          delete obj.age;
        }
        if (obj.editValueRefs){
          delete obj.editValueRefs;
        }
      });
    }
    confirmLoading.value = true;
    saveOrUpdate(params)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          resetForm();
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
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
    clickSave,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;

    .ant-form-item {
      margin-bottom: 10px !important;
    }
  }
  .btns-wrap {
    display: flex;
    justify-content: end;
  }
</style>
