<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="DeliverBillForm" style="background: #ffffff">
          <a-row>
            <a-col :span="6">
              <a-form-item label="公司名称" v-bind="validateInfos.companyId" id="DeliverBillForm-companyId" name="companyId">
                <j-select-company v-model:value="formData.companyId" @change="changeCompany" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="客户名称" v-bind="validateInfos.custId" id="DeliverBillForm-custId" name="custId">
                <j-select-customer v-model:value="formData.custId" @change="changeCustomer" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="客户电话" v-bind="validateInfos.custPhone" id="DeliverBillForm-custPhone" name="custPhone">
                <a-input v-model:value="formData.custPhone" placeholder="请输入客户电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="单号" v-bind="validateInfos.billNo" id="DeliverBillForm-billNo" name="billNo">
                <a-input v-model:value="formData.billNo" placeholder="请输入单号" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="客户地址" v-bind="validateInfos.custAddress" id="DeliverBillForm-custAddress" name="custAddress">
                <a-input v-model:value="formData.custAddress" placeholder="请输入客户地址" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="业务员" v-bind="validateInfos.userId" id="DeliverBillForm-userId" name="userId">
                <j-select-user v-model:value="formData.userId" @change="changeUser" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="开单日期" v-bind="validateInfos.billDate" id="DeliverBillForm-billDate" name="billDate">
                <a-date-picker placeholder="请选择开单日期" v-model:value="formData.billDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="客户联系人" v-bind="validateInfos.custContact" id="DeliverBillForm-custContact" name="custContact">
                <a-input v-model:value="formData.custContact" placeholder="请输入客户联系人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="送货车号" v-bind="validateInfos.careNo" id="DeliverBillForm-careNo" name="careNo">
                <a-input v-model:value="formData.careNo" placeholder="请输入送货车号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="合同号" v-bind="validateInfos.contractCode" id="DeliverBillForm-contractCode" name="contractCode">
                <a-input v-model:value="formData.contractCode" placeholder="请输入合同号" allow-clear></a-input>
              </a-form-item>
            </a-col>

<!--
						<a-col :span="span">
							<a-form-item label="交易类型（1：送货，2：退货）" v-bind="validateInfos.type" id="DeliverBillForm-type" name="type">
								<j-dict-select-tag v-model:value="formData.type" dictCode="" placeholder="请选择交易类型（1：送货，2：退货）"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="公司名称(记录开票时的公司名称）" v-bind="validateInfos.companyName" id="DeliverBillForm-companyName" name="companyName">
						<j-select-user v-model:value="formData.companyName"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="数量（本单商品数量）" v-bind="validateInfos.count" id="DeliverBillForm-count" name="count">
								<a-input-number v-model:value="formData.count" placeholder="请输入数量（本单商品数量）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="本单金额" v-bind="validateInfos.amount" id="DeliverBillForm-amount" name="amount">
								<a-input-number v-model:value="formData.amount" placeholder="请输入本单金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="已付款金额" v-bind="validateInfos.paymentAmount" id="DeliverBillForm-paymentAmount" name="paymentAmount">
								<a-input-number v-model:value="formData.paymentAmount" placeholder="请输入已付款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="优惠金额" v-bind="validateInfos.discountAmount" id="DeliverBillForm-discountAmount" name="discountAmount">
								<a-input-number v-model:value="formData.discountAmount" placeholder="请输入优惠金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="未付款（欠款）金额" v-bind="validateInfos.debtAmount" id="DeliverBillForm-debtAmount" name="debtAmount">
								<a-input-number v-model:value="formData.debtAmount" placeholder="请输入未付款（欠款）金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="往期欠款金额" v-bind="validateInfos.hisDebtAmount" id="DeliverBillForm-hisDebtAmount" name="hisDebtAmount">
								<a-input-number v-model:value="formData.hisDebtAmount" placeholder="请输入往期欠款金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="状态（未打印、已打印、签回、过账、审核、已开票、作废）" v-bind="validateInfos.status" id="DeliverBillForm-status" name="status">
								<a-input-number v-model:value="formData.status" placeholder="请输入状态（未打印、已打印、签回、过账、审核、已开票、作废）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="开票状态（未开、不开、已开、无信息、其他）" v-bind="validateInfos.invoiceStatus" id="DeliverBillForm-invoiceStatus" name="invoiceStatus">
								<a-input-number v-model:value="formData.invoiceStatus" placeholder="请输入开票状态（未开、不开、已开、无信息、其他）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="成本" v-bind="validateInfos.costAmount" id="DeliverBillForm-costAmount" name="costAmount">
								<a-input-number v-model:value="formData.costAmount" placeholder="请输入成本" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="利润" v-bind="validateInfos.profitAmount" id="DeliverBillForm-profitAmount" name="profitAmount">
								<a-input-number v-model:value="formData.profitAmount" placeholder="请输入利润" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="DeliverBillForm-remark" name="remark">
								<a-input v-model:value="formData.remark" placeholder="请输入备注"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="版本" v-bind="validateInfos.version" id="DeliverBillForm-version" name="version">
								<a-input-number v-model:value="formData.version" placeholder="请输入版本" style="width: 100%" />
							</a-form-item>
						</a-col>
						-->
          </a-row>
          <BillGoodsList ref="goodsRef" :customerId="customerId" @change-goods="changeGoods"></BillGoodsList>
          <a-row>
            <a-col :span="span">
              <a-form-item label="开单类型" v-bind="validateInfos.type" id="DeliverBillForm-type" name="type">
                <j-dict-select-tag v-model:value="formData.type" dictCode="" :options="typeOptions" placeholder="请选择开单类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="已付款" v-bind="validateInfos.paymentAmount" id="DeliverBillForm-paymentAmount" name="paymentAmount">
                <a-input-number @change="changeMoney" v-model:value="formData.paymentAmount" placeholder="请输入已付款" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="优惠金额" v-bind="validateInfos.discountAmount" id="DeliverBillForm-discountAmount" name="discountAmount">
                <a-input-number @change="changeMoney" v-model:value="formData.discountAmount" placeholder="请输入优惠" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="未付款" v-bind="validateInfos.debtAmount" id="DeliverBillForm-debtAmount" name="debtAmount">
                <a-input-number disabled v-model:value="formData.debtAmount" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="往期欠款" id="DeliverBillForm-hisDebtAmount" name="hisDebtAmount">
                <a-input-number v-model:value="formData.hisDebtAmount" placeholder="请输入往期欠款金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="制单人" v-bind="validateInfos.operatorName" id="DeliverBillForm-operatorName" name="operatorName">
                <a-input v-model:value="formData.operatorName" placeholder="请输入制单人" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="span">
              <a-form-item
                label="状态"
                v-bind="validateInfos.status"
                id="DeliverBillForm-status"
                name="status"
              >
                <j-dict-select-tag
                  v-model:value="formData.status"
                  :options="statusOptions"
                  dictCode=""
                  placeholder="请选择状态"
                  allow-clear
                />
              </a-form-item>
            </a-col>-->
            <a-col :span="8">
              <a-form-item label="备注" id="DeliverBillForm-remark" name="remark">
                <a-textarea v-model:value="formData.remark" placeholder="请输入备注" allow-clear></a-textarea>
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
  import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectUser from '/@/components/Form/src/jeecg/components/JSelectUser.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../DeliverBill.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JSelectCompany from '@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import JSelectCustomer from '@/components/Form/src/jeecg/components/JSelectCustomer.vue';
  import { statusList } from '@/views/deliver/bill/DeliverBill.data';
  import type { Rule } from 'ant-design-vue/es/form';
  import { billDetail } from '@/views/deliver/bill/DeliverBill.api';
  import BillGoodsList from './BillGoodsList.vue';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  // 小数位数
  const decimalPlaces = userStore.getBillSetting.decimalPlaces;
  const span = 6;
  // 1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
  const statusOptions = ref(statusList);
  const typeOptions = ref([
    { value: 3, label: '送货开单' },
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
    amount: 0,
    paymentAmount: 0,
    discountAmount: 0,
    debtAmount: 0,
    hisDebtAmount: 0,
    careNo: '',
    contractCode: '',
    status: undefined,
    invoiceStatus: undefined,
    costAmount: undefined,
    profitAmount: undefined,
    userId: '',
    userName: '',
    remark: '',
    delFlag: undefined,
    version: undefined,
    createName: userStore.getUserInfo.realname,
    operatorId: userStore.getUserInfo.id,
    operatorName: userStore.getUserInfo.realname,
  });

  const rules: Record<string, Rule[]> = {
    companyId: [{ required: true, message: '必填', trigger: 'blur' }],
    custId: [{ required: true, message: '必填', trigger: 'blur' }],
    //  remark:  [{ required: true, message: '必填', trigger: 'change' }],
    // hisDebtAmount: [{ required: true, message: '必填', trigger: 'change' }],
  };

  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  const goodsRef = ref(null);
  //表单验证
  const validatorRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });
  // 选择开单公司信息
  function changeCompany(val, selectRows) {
    console.log(' changeCompany val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      formData.companyId = selectRows[0].id;
      formData.companyName = selectRows[0].compName;
    }
  }
  // 选择业务员信息
  function changeUser(val, selectRows) {
    console.log(' changeUser val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      formData.userId = selectRows[0].id;
      formData.userName = selectRows[0].realname;
    }
  }
  // 传递给商品选择页面的参数
  const customerId = ref<string>('');
  // 选择开单客户
  function changeCustomer(val, selectRows) {
    console.log(' changeCustomer val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      formData.custId = selectRows[0].id;
      formData.custName = selectRows[0].orgName;
      formData.custPhone = selectRows[0].phone;
      formData.custContact = selectRows[0].contact;
      formData.custAddress = selectRows[0].address;
      customerId.value = selectRows[0].id;
      console.log(' customerId val', customerId.value);
      // 如果已经选择了商品，则根据客户ID去查询商品是否有客户价，如果有则更新列表里的客户价
    }
  }
  // 计算金额
  let amount = 0;
  function changeGoods(goods) {
    // 销售金额
    let num = 0.0;
    // 成本金额
    let cost = 0.0;
    // 利润金额
    let profit = 0.0;
    goods.forEach(item => {
      num = parseFloat(num) + parseFloat(item.amount);
      cost = parseFloat(cost) + parseFloat(item.costAmount);
    });
    amount = num;
    formData.costAmount = cost;
    profit = parseFloat(amount) - parseFloat(cost);
    formData.profitAmount = profit.toFixed(decimalPlaces);
    calcDebtAmount();
  }
  // 修改已付款、优惠金额时计算欠款金额
  function changeMoney() {
    calcDebtAmount();
  }
  // 计算欠款金额
  function calcDebtAmount() {
    if (amount && (formData.paymentAmount || formData.paymentAmount == 0) && (formData.discountAmount || formData.discountAmount == 0)) {
      formData.debtAmount = (amount - formData.paymentAmount - formData.discountAmount).toFixed(decimalPlaces);
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
      formData.status = record.status + '';
      getGoods(formData.id);
      if (record.hasCopy) {
        formData.status = '';
        formData.invoiceStatus = undefined;
        formData.id = '';
        formData.billNo = '';
        formData.createBy = '';
        formData.createTime = '';
        formData.updateTime = '';
        formData.updateBy = '';
      }
    });
  }
  // 根据id获取商品数据信息
  function getGoods(id) {
    billDetail({ billId: id }).then(res=>{
      // dataSourceDetail.value = [...res]
      nextTick(()=>{
        goodsRef.value.setValue([...res]);
      });
    });
  }
  // 表单验证
  function validateForm() {
    if (!formData.custId) {
      createMessage.warning('请选择客户');
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
  // 重置表单
  function resetForm() {
    formData.id = '';
    formData.type = undefined;
    formData.billNo = '';
    formData.billDate = '';
    formData.companyName = '';
    formData.companyId = '';
    formData.custId = '';
    formData.custName = '';
    formData.custPhone = '';
    formData.custAddress = '';
    formData.custContact = '';
    formData.count = undefined;
    formData.amount = undefined;
    formData.costAmount = undefined;
    formData.paymentAmount = 0;
    formData.discountAmount = 0;
    formData.debtAmount = 0;
    formData.hisDebtAmount = undefined;
    formData.status = '';
    formData.invoiceStatus = undefined;
    formData.careNo = '';
    formData.contractCode = '';
    formData.remark = '';
    formData.userName = '';
    formData.createName = userStore.getUserInfo.realname;
    formData.operatorId = userStore.getUserInfo.id;
    formData.operatorName = userStore.getUserInfo.realname;
    goodsRef.value.setValue([]);
  }
  // 保存按钮点击事件
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
    console.log('params:', params);
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
    customerId,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
</style>
