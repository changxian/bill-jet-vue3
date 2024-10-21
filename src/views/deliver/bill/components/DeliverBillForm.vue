<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="DeliverBillForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="单号" v-bind="validateInfos.billNo" id="DeliverBillForm-billNo" name="billNo">
								<a-input v-model:value="formData.billNo" placeholder="请输入单号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="交易类型（1：送货，2：退货）" v-bind="validateInfos.type" id="DeliverBillForm-type" name="type">
								<j-dict-select-tag v-model:value="formData.type" dictCode="" placeholder="请选择交易类型（1：送货，2：退货）"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="开单日期" v-bind="validateInfos.billDate" id="DeliverBillForm-billDate" name="billDate">
								<a-date-picker placeholder="请选择开单日期"  v-model:value="formData.billDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="公司名称(记录开票时的公司名称）" v-bind="validateInfos.companyName" id="DeliverBillForm-companyName" name="companyName">
						<j-select-user v-model:value="formData.companyName"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户名称" v-bind="validateInfos.custName" id="DeliverBillForm-custName" name="custName">
						<j-select-user v-model:value="formData.custName"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户电话" v-bind="validateInfos.custPhone" id="DeliverBillForm-custPhone" name="custPhone">
								<a-input v-model:value="formData.custPhone" placeholder="请输入客户电话"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户联系人" v-bind="validateInfos.custContact" id="DeliverBillForm-custContact" name="custContact">
								<a-input v-model:value="formData.custContact" placeholder="请输入客户联系人"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="客户地址" v-bind="validateInfos.custAddress" id="DeliverBillForm-custAddress" name="custAddress">
								<a-input v-model:value="formData.custAddress" placeholder="请输入客户地址"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="数量（本单商品数量）" v-bind="validateInfos.count" id="DeliverBillForm-count" name="count">
								<a-input-number v-model:value="formData.count" placeholder="请输入数量（本单商品数量）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="本单金额" v-bind="validateInfos.amount" id="DeliverBillForm-amount" name="amount">
								<a-input-number v-model:value="formData.amount" placeholder="请输入本单金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="已付款金额" v-bind="validateInfos.paymentAmount" id="DeliverBillForm-paymentAmount" name="paymentAmount">
								<a-input-number v-model:value="formData.paymentAmount" placeholder="请输入已付款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="优惠金额" v-bind="validateInfos.discountAmount" id="DeliverBillForm-discountAmount" name="discountAmount">
								<a-input-number v-model:value="formData.discountAmount" placeholder="请输入优惠金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="未付款（欠款）金额" v-bind="validateInfos.debtAmount" id="DeliverBillForm-debtAmount" name="debtAmount">
								<a-input-number v-model:value="formData.debtAmount" placeholder="请输入未付款（欠款）金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="往期欠款金额" v-bind="validateInfos.hisDebtAmount" id="DeliverBillForm-hisDebtAmount" name="hisDebtAmount">
								<a-input-number v-model:value="formData.hisDebtAmount" placeholder="请输入往期欠款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="送货车号" v-bind="validateInfos.careNo" id="DeliverBillForm-careNo" name="careNo">
								<a-input v-model:value="formData.careNo" placeholder="请输入送货车号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="合同号" v-bind="validateInfos.contractCode" id="DeliverBillForm-contractCode" name="contractCode">
								<a-input v-model:value="formData.contractCode" placeholder="请输入合同号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="状态（未打印、已打印、签回、过账、审核、已开票、作废）" v-bind="validateInfos.status" id="DeliverBillForm-status" name="status">
								<a-input-number v-model:value="formData.status" placeholder="请输入状态（未打印、已打印、签回、过账、审核、已开票、作废）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="开票状态（未开、不开、已开、无信息、其他）" v-bind="validateInfos.invoiceStatus" id="DeliverBillForm-invoiceStatus" name="invoiceStatus">
								<a-input-number v-model:value="formData.invoiceStatus" placeholder="请输入开票状态（未开、不开、已开、无信息、其他）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="成本" v-bind="validateInfos.costAmount" id="DeliverBillForm-costAmount" name="costAmount">
								<a-input-number v-model:value="formData.costAmount" placeholder="请输入成本" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="利润" v-bind="validateInfos.profitAmount" id="DeliverBillForm-profitAmount" name="profitAmount">
								<a-input-number v-model:value="formData.profitAmount" placeholder="请输入利润" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="业务员" v-bind="validateInfos.userName" id="DeliverBillForm-userName" name="userName">
						<j-select-user v-model:value="formData.userName"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="DeliverBillForm-remark" name="remark">
								<a-input v-model:value="formData.remark" placeholder="请输入备注"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="版本" v-bind="validateInfos.version" id="DeliverBillForm-version" name="version">
								<a-input-number v-model:value="formData.version" placeholder="请输入版本" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="制单人" v-bind="validateInfos.createName" id="DeliverBillForm-createName" name="createName">
								<a-input v-model:value="formData.createName" placeholder="请输入制单人"  allow-clear ></a-input>
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
  import JSelectUser from '/@/components/Form/src/jeecg/components/JSelectUser.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../DeliverBill.api';
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
    billNo: '',   
    type: undefined,
    billDate: '',   
    companyName: '',   
    custName: '',   
    custPhone: '',   
    custContact: '',   
    custAddress: '',   
    count: undefined,
    amount: undefined,
    paymentAmount: undefined,
    discountAmount: undefined,
    debtAmount: undefined,
    hisDebtAmount: undefined,
    careNo: '',   
    contractCode: '',   
    status: undefined,
    invoiceStatus: undefined,
    costAmount: undefined,
    profitAmount: undefined,
    userName: '',   
    remark: '',   
    delFlag: undefined,
    version: undefined,
    createName: '',   
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
