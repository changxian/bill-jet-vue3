<template>
  <j-modal title="进货欠款还款" width="700px" maxHeight="400px" :visible="visible" @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    <div style="padding:20px 30px">
      <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :model="formData" :labelCol="labelCol"
                :wrapperCol="wrapperCol" name="PurchaseDebtForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="供应商名" v-bind="validateInfos.supplierName"
                           id="PurchaseDebtForm-supplierName" name="supplierName">
                <a-input  :disabled="true" v-model:value="formData.supplierName" placeholder="请输入供应商名"
                         allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="还款日期" v-bind="validateInfos.billDate"
                           id="PurchaseBillForm-billDate" name="billDate">
                <a-date-picker
                  placeholder="请选择还款日期"
                  v-model:value="formData.repayDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="退货欠款" v-bind="validateInfos.returnDebtAmount"
                           id="PurchaseDebtForm-purchaseDebtAmount" name="returnDebtAmount">
                <a-input :disabled="true" v-model:value="formData.returnDebtAmount"
                                placeholder="请输入退货欠款金额" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="进货欠款" v-bind="validateInfos.purchaseDebtAmount"
                           id="PurchaseDebtForm-purchaseDebtAmount" name="purchaseDebtAmount">
                <a-input :disabled="true" v-model:value="formData.purchaseDebtAmount"
                                placeholder="请输入需还款总额" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="需还款总额" v-bind="validateInfos.debtAmount"
                           id="PurchaseDebtForm-purchaseDebtAmount" name="debtAmount">
                <a-input  :disabled="true" v-model:value="formData.debtAmount"
                                style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="还款金额" v-bind="validateInfos.repayAmount"
                           id="PurchaseDebtForm-repayAmount" name="repayAmount">
                <a-input-number @change="repayAmountChange" v-model:value="formData.repayAmount" placeholder="请输入还款金额"
                                style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="公司名称" v-bind="validateInfos.collectCompanyId"
                           id="PurchaseBillForm-collectCompanyId" name="collectCompanyId">
                <j-select-company v-model:value="formData.collectCompanyId" @change="changeCompany"
                                  allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="操作员" v-bind="validateInfos.userName"
                           id="PurchaseDebtForm-userName" name="userName">
                <a-input v-model:value="formData.userName" placeholder="请输入操作员"
                         allow-clear></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="PurchaseDebtForm-remark"
                           name="remark">
                <a-textarea v-model:value="formData.remark" placeholder="请输入备注"
                            allow-clear></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </div>
  </j-modal>
</template>

<script lang="ts" setup>
import {ref, defineExpose, reactive, defineEmits} from 'vue'
import JModal from '/@/components/Modal/src/JModal/JModal.vue';
import dayjs from 'dayjs';
import {Form} from 'ant-design-vue';
import {useMessage} from '/@/hooks/web/useMessage';
import {useUserStore} from '/@/store/modules/user';
import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
import {oneKeyRepay} from "@/views/purchase/debt/PurchaseDebt.api";

const userStore = useUserStore();
const visible = ref(false)
const emit = defineEmits(['refresh']);
const formRef = ref();
const useForm = Form.useForm;
const formData = reactive<Record<string, any>>({
  id: '',
  type: undefined,
  repayDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  supplierId: '',
  userName: userStore.getUserInfo.username,
  collectCompanyName: '',
  debtAmount: '',
  repayAmount: 0,
  supplierName: '',
  supplierPhone: '',
  supplierContact: '',
  supplierAddress: '',
  purchaseDebtAmount: undefined,
  returnDebtAmount: undefined,
  remark: '',
});
const {createMessage} = useMessage();
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const confirmLoading = ref<boolean>(false);

function changeCompany(val, selectRows) {
  console.log(' changeCompany val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    formData.collectCompanyName = selectRows[0].compName;
    formData.collectCompanyId = selectRows[0].id;
  }
}

//表单验证
const validatorRules = reactive({
  repayAmount: [{required: true, message: '请输入还款金额!'},],
  collectCompanyId: [{required: true, message: '请选择公司!'},],

});

const {
  resetFields,
  validate,
  validateInfos
} = useForm(formData, validatorRules, {immediate: false});

async function handleOk() {
  try {
    // 触发表单验证
    await validate();

  } catch ({errorFields}) {
    if (errorFields) {
      const firstField = errorFields[0];
      if (firstField) {
        formRef.value.scrollToField(firstField.name, {behavior: 'smooth', block: 'center'});
      }
    }
    return Promise.reject(errorFields);
  }
  confirmLoading.value = true;
  await oneKeyRepay(formData )
    .then((res) => {
      if (res.success) {
        createMessage.success(res.message);
        emit('refresh')
        visible.value = false
      } else {
        createMessage.warning(res.message);
      }
    })
    .finally(() => {
      confirmLoading.value = false;
    });
  emit('refresh')

}
function  repayAmountChange(value){
  if(value>formData.debtAmount){
    formData.repayAmount=formData.debtAmount;
  }
}
function show(record) {
  visible.value = true
  const tmpData = {};
  Object.keys(formData).forEach((key) => {
    if (record.hasOwnProperty(key)) {
      tmpData[key] = record[key]
    }
  })
  //赋值
  Object.assign(formData, tmpData);
  formData.debtAmount =  formData.purchaseDebtAmount;
  formData.repayAmount=0;
}

function handleCancel() {
  resetFields();
  visible.value = false
}

defineExpose({
  show
})

</script>

<style lang="less" scoped>

</style>
