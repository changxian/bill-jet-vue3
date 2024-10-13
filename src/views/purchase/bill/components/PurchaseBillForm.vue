<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form
          ref="formRef"
          class="antd-modal-form"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          name="PurchaseBillForm"
          style="background: #ffffff"
        >
          <a-row>
            <a-col :span="span">
              <a-form-item label="公司名称(记录开票时的公司名称）" v-bind="validateInfos.companyId" id="PurchaseBillForm-companyId" name="companyId">
                <j-select-company v-model:value="formData.companyId" @change="changeCompany" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商名称" v-bind="validateInfos.supplierId" id="PurchaseBillForm-supplierId" name="supplierId">
                <j-select-supplier v-model:value="formData.supplierId" @change="changeSupplier" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商电话" v-bind="validateInfos.supplierPhone" id="PurchaseBillForm-supplierPhone" name="supplierPhone">
                <a-input v-model:value="formData.supplierPhone" placeholder="请输入供应商电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商联系人" v-bind="validateInfos.supplierContact" id="PurchaseBillForm-supplierContact" name="supplierContact">
                <a-input v-model:value="formData.supplierContact" placeholder="请输入供应商联系人" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="供应商地址" v-bind="validateInfos.supplierAddress" id="PurchaseBillForm-supplierAddress" name="supplierAddress">
                <a-input v-model:value="formData.supplierAddress" placeholder="请输入供应商地址" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="开单日期" v-bind="validateInfos.billDate" id="PurchaseBillForm-billDate" name="billDate">
                <a-date-picker
                  placeholder="请选择开单日期"
                  v-model:value="formData.billDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="送货车号" v-bind="validateInfos.careNo" id="PurchaseBillForm-careNo" name="careNo">
                <a-input v-model:value="formData.careNo" placeholder="请输入送货车号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="合同号" v-bind="validateInfos.contractCode" id="PurchaseBillForm-contractCode" name="contractCode">
                <a-input v-model:value="formData.contractCode" placeholder="请输入合同号" allow-clear></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <goods ref="goodsRef"></goods>
          <a-row>
            <!-- <a-col :span="span">
							<a-form-item label="单号" v-bind="validateInfos.billNo" id="PurchaseBillForm-billNo" name="billNo">
								<a-input v-model:value="formData.billNo" placeholder="请输入单号"  allow-clear ></a-input>
							</a-form-item>
						</a-col> -->
            <a-col :span="span">
              <a-form-item label="开单类型" v-bind="validateInfos.type" id="PurchaseBillForm-type" name="type">
                <j-dict-select-tag v-model:value="formData.type" dictCode="" :options="typeOptions" placeholder="请选择开单类型" allow-clear />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="span">
							<a-form-item label="数量（本单商品数量）" v-bind="validateInfos.count" id="PurchaseBillForm-count" name="count">
								<a-input-number v-model:value="formData.count" placeholder="请输入数量（本单商品数量）" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="本单金额" v-bind="validateInfos.amount" id="PurchaseBillForm-amount" name="amount">
								<a-input-number v-model:value="formData.amount" placeholder="请输入本单金额" style="width: 100%" />
							</a-form-item>
						</a-col> -->
            <a-col :span="span">
              <a-form-item label="已付款金额" v-bind="validateInfos.paymentAmount" id="PurchaseBillForm-paymentAmount" name="paymentAmount">
                <a-input-number v-model:value="formData.paymentAmount" placeholder="请输入已付款金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="优惠金额" v-bind="validateInfos.discountAmount" id="PurchaseBillForm-discountAmount" name="discountAmount">
                <a-input-number v-model:value="formData.discountAmount" placeholder="请输入优惠金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="未付款（欠款）金额" v-bind="validateInfos.debtAmount" id="PurchaseBillForm-debtAmount" name="debtAmount">
                <a-input-number v-model:value="formData.debtAmount" placeholder="请输入未付款（欠款）金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="往期欠款金额" id="PurchaseBillForm-hisDebtAmount" name="hisDebtAmount">
                <a-input-number v-model:value="formData.hisDebtAmount" placeholder="请输入往期欠款金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item
                label="状态"
                v-bind="validateInfos.status"
                id="PurchaseBillForm-status"
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
            </a-col>
            <!-- <a-col :span="span">
							<a-form-item label="开票状态（1未开、2不开、3已开、4无信息、9其他）" v-bind="validateInfos.billStatus" id="PurchaseBillForm-billStatus" name="billStatus">
								<j-dict-select-tag v-model:value="formData.billStatus" dictCode="" placeholder="请选择开票状态（1未开、2不开、3已开、4无信息、9其他）"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="业务员" v-bind="validateInfos.userName" id="PurchaseBillForm-userName" name="userName">
						<j-select-user v-model:value="formData.userName"      allow-clear />
							</a-form-item>
						</a-col> -->
            <a-col :span="8">
              <a-form-item label="备注" id="PurchaseBillForm-remark" name="remark" >
                <a-textarea v-model:value="formData.remark" placeholder="请输入备注" allow-clear></a-textarea>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="span">
							<a-form-item label="版本" v-bind="validateInfos.version" id="PurchaseBillForm-version" name="version">
								<a-input-number v-model:value="formData.version" placeholder="请输入版本" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="span">
							<a-form-item label="制单人" v-bind="validateInfos.createName" id="PurchaseBillForm-createName" name="createName">
								<a-input v-model:value="formData.createName" placeholder="请输入制单人"  allow-clear ></a-input>
							</a-form-item>
						</a-col> -->
          </a-row>
          <a-row class="btns-wrap">
            <a-button type="primary" @click="clickSave">保存</a-button>
            <a-button style="margin: 0 30px 0 10px">保存并打印</a-button>
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
import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
import JSelectSupplier from '/@/components/Form/src/jeecg/components/JSelectSupplier.vue';
import goods from './goods.vue';
import { getValueType } from '/@/utils';
import { saveOrUpdate } from '../PurchaseBill.api';
import { Form } from 'ant-design-vue';
import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
import type { Rule } from 'ant-design-vue/es/form';

const span = 8;
// 1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
const statusOptions = ref([
  { value: '1', label: '未打印' },
  { value: '2', label: '已打印' },
  { value: '3', label: '签回' },
  { value: '4', label: '过账' },
  { value: '5', label: '审核' },
  { value: '6', label: '已开票' },
  { value: '9', label: '作废' },
]);
const typeOptions = ref([
  { value: '1', label: '进货开单' },
  { value: '2', label: '退货开单' },
]);

const props = defineProps({
  formDisabled: { type: Boolean, default: false },
  formData: { type: Object, default: () => ({}) },
  formBpm: { type: Boolean, default: true },
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const formData = reactive({
  id: '',
  billNo: '',
  type: undefined,
  billDate: '',
  companyName: '',
  companyId: '',
  supplierId: '',
  supplierName: '',
  supplierPhone: '',
  supplierAddress: '',
  supplierContact: '',
  count: undefined,
  amount: undefined,
  paymentAmount: undefined,
  discountAmount: undefined,
  debtAmount: undefined,
  hisDebtAmount: undefined,
  careNo: '',
  contractCode: '',
  status: undefined,
  billStatus: undefined,
  userName: '',
  remark: '',
  delFlag: undefined,
  version: undefined,
  createName: '',
});
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
function changeCompany(val, selectRows) {
  console.log(' changeCompany val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    formData.companyName = selectRows[0].compName;
  }
}
function changeSupplier(val, selectRows) {
  console.log(' changeSupplier val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    formData.supplierName = selectRows[0].orgName;
    formData.supplierPhone = selectRows[0].phone;
    formData.supplierContact = selectRows[0].contact;
    formData.supplierAddress = selectRows[0].address;
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

function  clickSave() {
  // console.log('goodsRef:', goodsRef.value.getData());
  console.log('formData:', formData);
  const params = {
    ...formData,
    ...goodsRef.value.getData()
  }
  console.log('params:', params)
  confirmLoading.value = true;
  saveOrUpdate(params)
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

  
  // formRef.value
  //   .validate()
  //   .then((res) => {
  //     console.log('res', res);
  //   })
  //   .catch((res) => {
  //     console.log('catch res=====', res);
  //   });
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
.btns-wrap {
  display: flex;
  justify-content: end;
}
</style>
