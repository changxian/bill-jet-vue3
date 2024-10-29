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
              <a-form-item label="公司名称" v-bind="validateInfos.collectCompanyId"
                           id="PurchaseBillForm-collectCompanyId" name="collectCompanyId">
                <j-select-company v-model:value="formData.collectCompanyId" @change="changeCompany"
                                  allow-clear/>
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
import {repay} from "@/views/purchase/debt/PurchaseDebt.api";
import JSelectCompany from "@/components/Form/src/jeecg/components/JSelectCompany.vue";

const userStore = useUserStore();
const visible = ref(false)
const emit = defineEmits(['refresh']);
const formRef = ref();
const useForm = Form.useForm;
const formData = reactive<Record<string, any>>({
  id: '',
  collectCompanyId: '',
  collectCompanyName: '',
  remark: '',
});
const {createMessage} = useMessage();
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const confirmLoading = ref<boolean>(false);

//表单验证
const validatorRules = reactive({
  repayAmount: [{required: true, message: '请输入还款金额!'},]
});
function changeCompany(val, selectRows) {
  console.log(' changeCompany val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    formData.collectCompanyName = selectRows[0].compName;
    formData.collectCompanyId = selectRows[0].id;
  }
}
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
  await repay(formData )
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
  formData.collectCompanyName = record.supplierName
  formData.userName = userStore.getUserInfo.username
  var billNo="";
  var debtAmount=0;
  formData.bills.forEach((item) => {
      if (billNo) {
        billNo= billNo+",";
      }
    billNo=billNo+item.billNo;
    debtAmount=debtAmount+item.debtAmount;
  })
  formData.billNo=billNo;
  formData.debtAmount=debtAmount;
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
