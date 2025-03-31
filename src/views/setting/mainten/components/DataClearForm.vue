<template>
  <a-divider orientation="left"> 数据清理</a-divider>
  <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol"
          name="DataClearForm">
    <a-row>
      <a-col :span="12">
        <a-form-item label="清除所有单据及明细：" v-bind="validateInfos.clearBillCycle"
                     id="DataClearForm-clearBillCycle" name="clearBillCycle">
          <j-dict-select-tag v-model:value="formData.clearBillCycle" dictCode=""
                             :options="clearBillCycleOptions"
                             placeholder="请选择清除所有单据及明细时间段"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-button :icon="h(DeleteOutlined)" type="primary" @click="cleanBillsCycle">清除</a-button>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 200px">
      <a-col :span="12">
        <a-button type="primary" style="margin-left: 20px" :icon="h(UserOutlined)"
                  @click="cleanCustomer">清除客户
        </a-button>
        <a-button type="primary" style="margin-left: 20px" :icon="h(ShoppingOutlined)"
                  @click="cleanGoods">清除商品
        </a-button>
        <a-button type="primary" style="margin-left: 20px" :icon="h(CodepenOutlined)"
                  @click="cleanStock">清空库存
        </a-button>
        <a-button type="primary" style="margin-left: 20px" :icon="h(UserOutlined)"
                  @click="cleanSupplier">清除供应商
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import {ref, defineExpose, defineProps, h} from 'vue';
import {useMessage} from '/@/hooks/web/useMessage';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import {delBillsByCycle, delCustomer, delGoods, delStock, delSupplier} from '../index.api';
import {
  DeleteOutlined,
  UserOutlined,
  ShoppingOutlined,
  CodepenOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import {Form} from 'ant-design-vue';
// const formRef = ref();
// const emit = defineEmits(['register', 'ok']);
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const formData = ref<Record<any>>({});
const useForm = Form.useForm;
const {validateInfos} = useForm(formData, {immediate: false});
// const props = defineProps({
//   formDisabled: { type: Boolean, default: false },
//   formBpm: { type: Boolean, default: true },
// });
const {createMessage} = useMessage();

const clearBillCycleOptions = ref([
  {label: '全部',value: 'all'},
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' },
  { label: '最近三月', value: 'month3' },
  { label: '最近六月', value: 'month6' },
  { label: '最近一年', value: 'month12' },
]);
/**
 * 编辑
 */
/*  function edit(record) {
    nextTick(() => {
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key];
        }
      });
      //赋值
      Object.assign(formData, tmpData);
    });
  }*/

/**
 * 清除所有单据及明细数据
 */
async function cleanBillsCycle() {

  delBillsByCycle({"dataDate":formData.value.clearBillCycle}).then((res) => {
    if (res.success) {
      createMessage.warning(res.message);
    }
  }).finally(() => {
  });


}

/**
 * 清除所有客户数据
 */
async function cleanCustomer() {

  await delCustomer(formData.value.clearBillCycle);
}

/**
 * 清除所有商品数据
 */
async function cleanGoods() {
  await delGoods(formData.value.clearBillCycle);
}

/**
 * 清除所有库存数据
 */
async function cleanStock() {
  await delStock(formData.value.clearBillCycle);
}

/**
 * 清除所有供应商数据
 */
async function cleanSupplier() {
  await delSupplier(formData.value.clearBillCycle);
}


defineExpose({
  cleanBillsCycle,
  cleanCustomer,
  cleanGoods,
  cleanStock,
  cleanSupplier,
});
</script>

<style lang="less" scoped>
.antd-modal-form {
  padding: 14px;
}
</style>
