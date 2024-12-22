<template>
  <j-modal :title="title" :width="width" :maxHeight="400" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel"
           cancelText="关闭">
    <div style="padding: 20px 30px">
      <!-- 改状态 -->
      <div v-if="modifyType === 'category'">
        <p style="margin: 40px 0 20px 10px">单号：{{ goodsName }}</p>
        <p style="margin: 0 0 0 10px">类别：<j-dict-select-tag
                  style="width:300px"
                  v-model:value="category"
                  :url="allList"
                  label-field="name"
                  value-field="id"
                  placeholder="请选择类别"
                  allow-clear
                /> </p>
      </div>

      <!-- 更新成本价 -->
      <div v-if="modifyType === 'updateCost'">
        <p> </p>
        <p>说明：</p>
        <p>1.选定更新：将选定商品的成本价更新到所有已开单据。</p>
        <p>2.所有更新：将所有商品的成本价更新到所有已开单据。</p>
        <p> </p>
        <p style="margin: 40px 0 10px 10px">
          <span style="text-align: center; display: inline-block; width: 50%">
            <a-popconfirm
              title="确认将选定商品的成本价更新到已开送货单据吗？"
              :visible="visible"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handleUpdateCheckedBillCost"
              @cancel="handleCancel"
            >
              <a-button type="primary" v-auth="'bill:jxc_goods:add'" preIcon="ant-design:edit-outlined"> 选定更新 </a-button>
            </a-popconfirm>
          </span>
          <span>
            <a-popconfirm
              title="确认将所有商品的成本价更新到已开送货单据吗？"
              :visible="visible"
              ok-text="确认"
              cancel-text="取消"
              @confirm="handleUpdateAllBillCost"
              @cancel="handleCancel"
            >
              <a-button type="primary" v-auth="'bill:jxc_goods:add'" preIcon="ant-design:edit-outlined"> 所有更新 </a-button>
            </a-popconfirm>
          </span>
        </p>
      </div>

      <!-- 变动库存 antdesign vue 两个下拉框级联默认选第1个 ??????????????????????????? -->
      <div v-if="modifyType === 'updateStocks'">
        <p style="margin: 40px 0 10px 10px"><span style="text-align: right; display: inline-block; width: 100px">商品名：</span> {{goodsName}}</p>
        <p style="margin: 18px 0 10px 10px"><span style="text-align: right; display: inline-block; width: 100px">变动方式：</span>
          <a-select
            style="width: 400px"
            v-model:value="mode1"
            @change="handleMode1Change"
            placeholder="请选择变动方式"
            allow-clear
          >
            <a-select-option v-for="mode in stockOptions.mode1" :key="mode.code" :value="mode.code">
              {{ mode.name }}
            </a-select-option>
          </a-select>
        </p>
        <p style="margin: 18px 0 10px 10px"><span style="text-align: right; display: inline-block; width: 100px">变动类型：</span>
          <a-select
            style="width: 400px"
            v-model:value="mode2"
            placeholder="请选择变动类型"
            allow-clear
          >
            <a-select-option v-for="mode in stockOptions.mode2" :key="mode.code" :value="mode.code">
              {{ mode.name }}
            </a-select-option>
          </a-select>
        </p>
        <p style="margin: 18px 0 10px 10px"><span style="text-align: right; display: inline-block; width: 100px">数量：</span><a-input style="width: 400px" v-model:value="quantity" allow-clear></a-input></p>
        <p style="margin: 18px 0 10px 10px"><span style="text-align: right; display: inline-block; width: 100px">备注：</span><a-textarea style="width: 400px" v-model:value="remark" allow-clear></a-textarea></p>
      </div>
    </div>
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import { allList } from '../category.api';
  import { editCategory, addStockRecord, updateBillCostByGoodsId, updateAllBillCost } from '../goods.list.api';
  import { stockOptions } from '../goods.list.data';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const title = ref<string>('');
  const width = ref<number>(600);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const emit = defineEmits(['refresh']);

  const category = ref('');
  const goodsName = ref('');
  const mode1 = ref('');
  const mode2 = ref('');
  const quantity = ref<number>(0);
  const remark = ref('');

  const titleObj = {
    category: '改类别',
    updateCost: '更新成本价',
    updateStocks: '变动库存',
  };
  const modifyType = ref('');
  let row = {
    id: '',
  };
  function show(type, data) {
    debugger;
    title.value = titleObj[type];
    modifyType.value = type;
    // if (type == 'updateStocks') {
    //   disableSubmit.value = true;
    // }
    if (data) {
      goodsName.value = data.name;
      row = data;
    }
    visible.value = true;
  }

  function handleMode1Change(value) {
    stockOptions.mode2 = stockOptions.mode1Map[value] || [];
  }

  /**
   * 确定按钮点击事件
   */
  async function handleOk() {
    let res: any;
    // 修改商品类别
    if (modifyType.value === 'category') {
      res = await editCategory({ id: row.id, categoryId: category.value });
    } else if (modifyType.value === 'updateCost') {
      handleCancel();
    } else if (modifyType.value === 'updateStocks') {
      const params = { productId: row.id, mode1: mode1.value, mode2: mode2.value, quantity: quantity.value, remark: remark.value };
      res = await addStockRecord(params);
      console.log(params, res);
    }
    createMessage.success(res.message);
    handleCancel();
    emit('refresh');
  }

  /**
   * 更新选中商品所有已开送货单的成本价
   */
  async function handleUpdateCheckedBillCost() {
    if (row.id) {
      updateBillCostByGoodsId({ goodsId: row.id }).then(res => {
        createMessage.success('更新成功！');
      });
    } else {
      createMessage.success('请先选定需要更新的商品');
    }
  }

  /**
   * 更新所有商品所有已开送货单的成本价
   */
  async function handleUpdateAllBillCost() {
    debugger;
    await updateAllBillCost();
    createMessage.success('更新成功！');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    modifyType.value = '';
    visible.value = false;
  }

  defineExpose({
    show,
  });
</script>

<style lang="less">
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
<style lang="less" scoped></style>
