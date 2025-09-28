<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="DeliverBillForm" style="background: #ffffff">
          <a-row>
            <a-col :span="6">
              <a-form-item label="公司名称" v-bind="validateInfos.companyId" id="DeliverBillForm-companyId" name="companyId">
                <j-select-company v-model:value="formData.companyId" @change="changeCompany" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <!--<a-form-item label="客户名称" v-bind="validateInfos.custName" id="DeliverBillForm-custName" name="custName">
                <a-input style="width: 70%; margin-right: 8px" v-model:value="formData.custName" placeholder="请输入客户名称" allow-clear></a-input>
                <a-button type="primary" @click="selectCustomer">选择</a-button>
              </a-form-item>-->
              <!--<a-form-item label="客户名称" v-bind="validateInfos.custId" id="DeliverBillForm-custId" name="custId">
                <j-select-customer v-model:value="formData.custId" @change="changeCustomer" />
              </a-form-item>-->
              <a-form-item label="客户名称" v-bind="validateInfos.custId" id="DeliverBillForm-custId" name="custId">
                <JSelectInputCustomer v-model:value="formData.custId" @change="changeCustomer" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="客户地址" v-bind="validateInfos.custAddress" id="DeliverBillForm-custAddress" name="custAddress">
                <a-input v-model:value="formData.custAddress" placeholder="请输入客户地址" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="单号" v-bind="validateInfos.billNo" id="DeliverBillForm-billNo" name="billNo">
                <a-input :disabled="true" v-model:value="formData.billNo" placeholder="请输入单号" allow-clear ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="联系人" v-bind="validateInfos.custContact" id="DeliverBillForm-custContact" name="custContact">
                <a-input v-model:value="formData.custContact" placeholder="请输入客户联系人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="联系电话" v-bind="validateInfos.custPhone" id="DeliverBillForm-custPhone" name="custPhone">
                <a-input v-model:value="formData.custPhone" placeholder="请输入联系电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="开单日期" v-bind="validateInfos.billDate" id="DeliverBillForm-billDate" name="billDate">
                <a-date-picker placeholder="请选择开单日期" v-model:value="formData.billDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" @change="changeBillNo"  allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="业务员" v-bind="validateInfos.userId" id="DeliverBillForm-userId" name="userId">
                <j-select-salesman v-model:value="formData.userId" @change="changeUser" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="送货车号" v-bind="validateInfos.careNo" id="DeliverBillForm-careNo" name="careNo">
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
              <a-form-item label="合同号" v-bind="validateInfos.contractCode" id="DeliverBillForm-contractCode" name="contractCode">
                <a-input v-model:value="formData.contractCode" placeholder="请输入合同号" allow-clear></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formData.dynamicCustFields && 0 < formData.dynamicCustFields.length" :gutter="10">
            <a-col v-for="(item, index) in formData.dynamicCustFields" :key="item.id" :span="span">
              <a-form-item
                v-if="item.fieldTitle"
                :label="item.fieldTitle"
                :id="'dynamicCustFields-' + item.fieldName"
                :name="'dynamicCustFields.' + item.fieldName"
              >
                <a-input v-model:value="formData.dynamicCustFields[index].fieldValue" :placeholder="'请输入' + item.fieldTitle" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <BillGoodsList ref="goodsRef" :customerId="customerId" :goodsIds="goodsIds" @change-goods="changeGoods"></BillGoodsList>
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
              <a-form-item label="折扣（折）" v-bind="validateInfos.discount" id="DeliverBillForm-discount" name="discount">
                <a-input-number @change="changeDiscount" v-model:value="formData.discount" :min="0" :max="10" placeholder="请输入折扣" style="width: 100%" />
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
                <a-input v-model:value="formData.operatorName" placeholder="请输入制单人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="备注" v-bind="validateInfos.operatorName" id="DeliverBillForm-remark" name="remark">
                <!--<a-input v-model:value="formData.remark" placeholder="请输入备注" allow-clear></a-input>-->
                <SelectInput v-model="formData.remark" style="width: 100%" />
              </a-form-item>
            </a-col>
            <!--<a-col :span="8">
              <a-form-item label="备注" id="DeliverBillForm-remark" name="remark">
                <JDictSelectTag
                  v-model:value="formData.remark"
                  dictCode="jxc_quick_info,info"
                  :showChooseOption="false"
                />
              </a-form-item>
            </a-col>-->
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
  <!-- 选择客户窗口
  <CustomerSelectModal @register="registerCustomerSelectModal" @success="handleSuccess" />
  -->
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { queryCustByOrgName, saveOrUpdate } from '../DeliverBill.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JSelectCompany from '@/components/Form/src/jeecg/components/JSelectCompany.vue';
  import JSelectInputCustomer from '@/components/Form/src/jeecg/components/JSelectInputCustomer.vue';
  import { statusList } from '@/views/deliver/bill/DeliverBill.data';
  import type { Rule } from 'ant-design-vue/es/form';
  import { defaultCom, queryNewNo, billDetail, getCustPrices, getGoodsPrices } from '@/views/deliver/bill/DeliverBill.api';
  import BillGoodsList from './BillGoodsList.vue';
  import { useUserStore } from '@/store/modules/user';
  import { fieldsList, getDynamicFieldsAndValue } from '@/views/setting/system/index.api';
  import { byDeliverId } from '@/views/deliver/debt/DeliverDebt.api';
  import JSelectSalesman from '@/components/Form/src/jeecg/components/JSelectSalesman.vue';
  import SelectInput from '@/views/statistics/statistics/SelectInput.vue';
  import { customerNum } from '@/views/deliver/customer/Customer.api';
  import { tenantGoodsNum } from '@/views/base/goods/components/goods.api';

  const userStore = useUserStore();
  // 小数位数
  const decimalPlaces = userStore.getBillSetting.decimalPlaces;

  // 启用一客一价
  const singleCustPrice = userStore.getBillSetting.singleCustPrice;
  // console.log(autoCustPrice, singleCustPrice);
  const span = 6;
  // 1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
  const statusOptions = ref(statusList);
  const typeOptions = ref([
    { value: 3, label: '销售开单' },
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
    companyId: '',
    custId: '',
    custName: '',
    custPhone: '',
    custContact: '',
    custAddress: '',
    count: 0,
    weight: 0,
    area: 0,
    volume: 0,
    amount: 0,
    paymentAmount: 0,
    discount: 10,
    discountAmount: 0,
    debtAmount: 0,
    hisDebtAmount: 0,
    careNo: '',
    deliveryBy: '',
    deliveryTel: '',
    contractCode: '',
    status: undefined,
    invoiceStatus: undefined,
    costAmount: 0,
    profitAmount: 0,
    userId: '',
    userName: '',
    remark: '',
    delFlag: undefined,
    version: undefined,
    dynamicCustFields: undefined,
    dynamicFields: undefined,
    createName: userStore.getUserInfo.realname,
    operatorId: userStore.getUserInfo.id,
    operatorName: userStore.getUserInfo.realname,
  });
  // 给开单类型设置默认值
  if (typeOptions.value.length > 0) {
    formData.type = typeOptions.value[0].value;
  }

  const rules: Record<string, Rule[]> = {
    companyId: [{ required: true, message: '必填', trigger: 'blur' }],
    custId: [{ required: true, message: '必填', trigger: 'blur' }],
    //  remark:  [{ required: true, message: '必填', trigger: 'change' }],
    // hisDebtAmount: [{ required: true, message: '必填', trigger: 'change' }],
  };
  const hasInit = ref(false);
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  const goodsRef = ref(null);
  const totalCustsNum = ref(0);
  const totalGoodsNum = ref(0);
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
      formData.dynamicCustFields = res['4'].filter((item) => item.id != null);
      formData.dynamicFields = res['6'].filter((item) => item.id != null);
    });
    queryNewNo({ category: 3, billDate: formData.billDate }).then((res) => {
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
    customerNum().then((res) => {
      totalCustsNum.value = res.total;
    });
    tenantGoodsNum().then((res) => {
      totalGoodsNum.value = res.total;
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
  // 选择业务员信息
  function changeUser(val, selectRows) {
    console.log(' changeUser val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      formData.userId = selectRows[0].id;
      formData.userName = selectRows[0].name;
    }
  }
  // 日期选择以后更新单号信息【yyyyMMdd-序号：需要更新】
  function changeBillNo(val) {
    console.log(' changeBillDate val', val);
    queryNewNo({ category: 3, billDate: val }).then((res) => {
      formData.billNo = res.newNo;
    });
  }
  // 传递给商品选择页面的参数
  const customerId = ref<string>('');
  // 用于商品列表过滤这部分已经选中了商品
  const goodsIds = ref<string>('');
  // function selectCustomer() {
  //   openCustomerSelectModal(true, {
  //     record: formData,
  //     // record: { id: selectedRowKeys.value[0], category: 1 },
  //     isUpdate: true,
  //     showFooter: false,
  //   });
  // }
  // 选择开单客户
  function changeCustomer(val, selectRows) {
    debugger;
    console.log(' changeCustomer val', val, 'selectRows:', selectRows);
    if (selectRows?.length > 0) {
      // if (selectRows[0].id == '0') {
      //   selectRows[0].id = null;
      // }
      if (selectRows[0].orgName) {
        // 判断机构名称是否存在
        queryCustByOrgName({ orgName: selectRows[0].orgName }).then((res) => {
          debugger;
          if (res.id != null) {
            selectRows[0].id = res.id;
          }
          customerId.value = selectRows[0].id;
          console.log(' customerId val', customerId.value);
          formData.custId = selectRows[0].id;
          formData.custName = selectRows[0].orgName;
          // 获取客户往期欠款金额
          if (selectRows[0].id != null) {
            formData.custPhone = selectRows[0].phone;
            formData.custContact = selectRows[0].contact;
            formData.custAddress = selectRows[0].address;
            byDeliverId({ custId: selectRows[0].id }).then((res) => {
              if (res == null) {
                formData.hisDebtAmount = 0;
              } else {
                formData.hisDebtAmount = res.deliverDebtAmount;
              }
            });
          }
          if (selectRows[0].discount) {
            formData.discount = selectRows[0].discount;
          }
          if (selectRows[0].dynamicFields) {
            formData.dynamicCustFields = selectRows[0].dynamicFields;
          }
        });
      }
      // 如果已经选择了商品，则根据客户ID去查询商品是否有客户价，如果有则更新列表里的客户价
      // 是否启用一客一价
      if (singleCustPrice) {
        // 加载商品的客户价
        const goods = goodsRef.value.getData().details;
        let goodsIds = '';
        if (goods.length > 0) {
          goods.forEach((item) => {
            if (item.goodsId) {
              goodsIds += item.goodsId + ',';
            }
          });
          // 在设置商品客户价之前先还原商品的单价【因为变更客户的时候已经设置上一个客户的客户价无法还原】
          getGoodsPrices({ goodsIds: goodsIds }).then((res) => {
            console.log(res);
            if (res) {
              res.forEach((item) => {
                goods.forEach((g) => {
                  if (item.id == g.id) {
                    g.price = item.price;
                    g.amount = item.price * g.count;
                  }
                });
              });
              goodsRef.value.setValue([...goods]);
              changeGoods(goods);
            }
            // 查询并设置商品客户价
            getCustPrices({ custId: selectRows[0].id, goodsIds: goodsIds }).then((res) => {
              console.log(res);
              if (res) {
                res.forEach((item) => {
                  goods.forEach((g) => {
                    if (item.goodsId == g.id) {
                      g.price = item.price;
                      g.amount = item.price * g.count;
                    }
                  });
                });
                goodsRef.value.setValue([...goods]);
                changeGoods(goods);
              }
            });
          });
        }
      }
    }
  }
  // 计算金额
  let amount = 0.0;
  function changeGoods(goods) {
    // 先将金额置为0
    amount = 0.0;
    // 成本金额
    let cost = 0.0;
    let ids = '';
    goods.forEach((item) => {
      // 开单过滤已添加商品
      if (userStore.getSystemSetting.billIgnoreAddedGoods == true) {
        ids += item.id + ',';
      }
      console.log('ids ', ids);
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
      // num = parseFloat(num) + parseFloat(item.amount);
      amount += parseFloat(item.amount);
      if (item.costAmount != null) {
        cost = parseFloat(cost) + parseFloat(item.costAmount);
      }
      // 计算商品利润【已改为后台计算】
      // let profit = amount - cost;
      // item.profit = profit;
    });
    goodsIds.value = ids;
    console.log('goodsIds ', goodsIds.value);
    // amount = (num + '').toFixed(decimalPlaces);
    formData.costAmount = cost;
    formData.discountAmount = (parseFloat(amount) * (10 - formData.discount) * 0.1).toFixed(decimalPlaces);
    calcDebtAmount();
  }
  // 修改已付款、优惠金额时计算欠款金额
  function changeMoney() {
    if (amount > 0) {
      formData.discount = (10 - (formData.discountAmount / amount) * 10).toFixed(decimalPlaces);
    }
    calcDebtAmount();
  }
  // 计算欠款金额
  function calcDebtAmount() {
    // 利润金额
    // let profit = 0.0;
    if (amount && (formData.paymentAmount || formData.paymentAmount == 0) && (formData.discountAmount || formData.discountAmount == 0)) {
      formData.debtAmount = (amount - formData.paymentAmount - formData.discountAmount).toFixed(decimalPlaces);
      let profit = parseFloat(amount) - parseFloat(formData.costAmount) - formData.discountAmount;
      formData.profitAmount = profit.toFixed(decimalPlaces);
    }
  }
  // 折扣变化时重新计算优惠金额
  function changeDiscount() {
    if (amount > 0) {
      formData.discountAmount = (parseFloat(amount) * (10 - formData.discount) * 0.1).toFixed(decimalPlaces);
    }
    calcDebtAmount();
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
      hasInit.value = true;
      getDynamicFieldsAndValue({ category: 4, id: tmpData.custId }).then((res) => {
        formData.dynamicCustFields = res;
      });
    });
  }
  // 根据id获取商品数据信息
  function getGoods(id) {
    billDetail({ billId: id }).then((res) => {
      // dataSourceDetail.value = [...res]
      nextTick(() => {
        goodsRef.value.setValue([...res]);
      });
      changeGoods(res);
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
    if (!formData.billDate) {
      createMessage.warning('请选择开单日期');
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
    formData.billNo = '';
    formData.billDate = '';
    formData.companyName = '';
    formData.companyId = '';
    formData.custId = '';
    formData.custName = '';
    formData.custPhone = '';
    formData.custAddress = '';
    formData.custContact = '';
    formData.count = 0;
    formData.weight = 0;
    formData.area = 0;
    formData.volume = 0;
    formData.amount = 0;
    formData.costAmount = 0;
    formData.paymentAmount = 0;
    formData.discount = 10;
    formData.discountAmount = 0;
    formData.debtAmount = 0;
    formData.hisDebtAmount = 0;
    formData.status = '';
    formData.invoiceStatus = undefined;
    formData.careNo = '';
    formData.deliveryBy = '';
    formData.deliveryTel = '';
    formData.contractCode = '';
    formData.remark = '';
    formData.userId = '';
    formData.userName = '';
    formData.createName = userStore.getUserInfo.realname;
    formData.operatorId = userStore.getUserInfo.id;
    formData.operatorName = userStore.getUserInfo.realname;
    formData.dynamicCustFields = undefined;
    formData.dynamicFields = undefined;
    goodsRef.value.setValue([]);
    hasInit.value = false;
    init();
  }
  // 租户套餐信息
  const tenantPack = userStore.getTenantPack;
  // 保存【编辑确认】按钮点击事件
  function clickSave() {
    // console.log('goodsRef:', goodsRef.value.getData());
    if (!validateForm()) {
      return;
    }
    debugger;
    console.log('formData:', formData);
    // 判断新增客户判断
    if (formData.custId) {
      if (formData.custId == '0') {
        // 如果公司数量小于套餐内规定数量，则可以继续添加
        if (tenantPack.customerNum != null && tenantPack.customerNum < totalCustsNum.value + 1) {
          createMessage.warning('客户数量已达上限！如果还想添加更多客户，请联系运营商扩容！');
          return;
        }
      }
    }
    const params = {
      ...formData,
      ...goodsRef.value.getData(),
    };
    if (params.details) {
      let gNum = 0;
      params.details.forEach((obj) => {
        // 判断新增商品数判断
        if (!obj.goodsId) {
          gNum += 1;
        }
        if (obj.cancelCbs) {
          delete obj.cancelCbs;
        }
        if (obj.editValueRefs) {
          delete obj.editValueRefs;
        }
      });
      // 如果商品数量小于套餐内规定数量，则可以继续添加
      if (tenantPack.goodsNum != null && tenantPack.goodsNum < totalGoodsNum.value + gNum && gNum > 0) {
        createMessage.warning('商品数量已达上限！如果还想添加更多商品，请联系运营商扩容！');
        return;
      }
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
    customerId,
    goodsIds,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;

    .ant-form-item {
      margin-bottom: 10px !important;
    }
  }
</style>
