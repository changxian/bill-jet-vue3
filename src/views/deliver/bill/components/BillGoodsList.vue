<template>
  <div>
    <a-row>
      <a-col :span="8" style="position: relative">
        <a-form-item label="商品搜索" id="DeliverBillForm-companyId" name="goodsName">
          <div style="display: flex">
            <a-input v-model:value="goodsName" placeholder="条码/编号/名称/规格" />
            <a-button type="primary" style="margin-left: 10px" @click="showModal">选择</a-button>
            <div v-if="goodsNameRepeat" style="color: red; position: absolute; left: 104%; width: 150px; top: 6px"> 商品不可重复选择</div>
          </div>
        </a-form-item>
      </a-col>
      <BasicModal v-bind="$attrs" @register="register" title="商品搜索" :width="'1400px'" @ok="handleOk">
        <div style="width: 98%">
          <goodsSelectList @get-select="getSelect" :billType="billType" :customerId="customerId" :goodsName="goodsName" @db-ok="handleOk" :key="refreshKey"></goodsSelectList>
        </div>
      </BasicModal>
    </a-row>
    <div class="tbl-wrap">
      <BasicTable :beforeEditSubmit="beforeEditSubmit" @register="registerTable" :rowSelection="rowSelection" :dataSource="dataSource">
        <template #tableTitle>
          <a-button type="primary" preIcon="ant-design:plus-outlined" @click="addRow" v-if="!onlyChooseGoods" v-auth="'deliver.bill:jxc_deliver_bill:add'">插入行</a-button>
          <a-button type="primary" preIcon="ant-design:delete-outlined" @click="delRow" v-auth="'deliver.bill:jxc_deliver_bill:add'">删除</a-button>
          <!-- <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'deliver.bill:jxc_deliver_bill:add'">剪切</a-button>
          <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'deliver.bill:jxc_deliver_bill:add'">复制</a-button>
          <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'deliver.bill:jxc_deliver_bill:add'">粘贴</a-button> -->
        </template>
      </BasicTable>
      <div class="count-wrap">
        <span class="name">总计</span>
        <span class="name">数量:</span><span class="num">{{ countNum }}</span>
        <span class="name">金额:</span><span class="num">￥{{ countMoney }} 元</span>
        <span class="name" v-if="showWeightCol">重量<span v-if="weightColTitle">({{ weightColTitle }})</span>：{{ weightNum }}</span>
        <span class="name" v-if="showAreaCol">面积<span v-if="areaColTitle">({{ areaColTitle }})</span>：{{ areaNum }}</span>
        <span class="name" v-if="showVolumeCol">体积<span v-if="volumeColTitle">({{ volumeColTitle }})</span>：{{ volumeNum }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, defineEmits, defineProps } from 'vue';
  import goodsSelectList from '@/views/base/goods/index.vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicColumn, BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const emit = defineEmits(['change-goods']);
  const { createMessage, createConfirm } = useMessage();
  const userStore = useUserStore();
  const dataSource: any = ref([]);

  // 显示重量列【合计 和 列表皆显示，0不显示，1显示】
  const showWeightCol = ref(false);
  const weightColTitle = ref('');
  // 显示面积列【合计 和 列表皆显示】
  const showAreaCol = ref(false);
  const areaColTitle = ref('');
  // 显示体积列【合计 和 列表皆显示】
  const showVolumeCol = ref(false);
  const volumeColTitle = ref('');
  // 系统开单设置
  const billSetting = userStore.getBillSetting;
  if (billSetting) {
    showWeightCol.value = !!billSetting.showWeightCol;
    showAreaCol.value = !!billSetting.showAreaCol;
    showVolumeCol.value = !!billSetting.showVolumeCol;
    if (billSetting.dynaFieldsGroup['1']) {
      billSetting.dynaFieldsGroup['1'].forEach((item) => {
        // 重量小计
        if (item.fieldName === 'weightSubtotal') {
          weightColTitle.value = item.fieldTitle || '';
        }
        // 面积小计
        if (item.fieldName === 'areaSubtotal') {
          areaColTitle.value = item.fieldTitle || '';
        }
        // 体积小计
        if (item.fieldName === 'volumeSubtotal') {
          volumeColTitle.value = item.fieldTitle || '';
        }
      });
    }
  }
  // 传递给商品选择页面的参数
  const billType = 'deliver';
  // 校验商品是否可重复添加
  const goodsNameRepeat = ref(false);
  // 修改金额单价变动
  const editAmountEditPrice = ref(false);
  // 进货价计算方式
  const buyPriceComputeMethod = ref(false);
  // 金额计算方式
  const amountComputeMethod = ref('');
  // 只允许选择商品开单
  const onlyChooseGoods = ref(false);
  // 启用一客一价
  const singleCustPrice = ref(false);
  // 普通单价类小数位数
  const decimalPlaces = ref(2);
  // 小计类小数位数
  const subtotalDecimalPlaces = ref(2);
  // 加载系统开单设置
  if (billSetting) {
    goodsNameRepeat.value = !!billSetting.goodsNameRepeat;
    editAmountEditPrice.value = !!billSetting.editAmountEditPrice;
    onlyChooseGoods.value = !!billSetting.onlyChooseGoods;
    singleCustPrice.value = !!billSetting.singleCustPrice;
    buyPriceComputeMethod.value = billSetting.buyPriceComputeMethod;
    amountComputeMethod.value = billSetting.amountComputeMethod;
    if (billSetting.decimalPlaces === 0 || billSetting.decimalPlaces) {
      decimalPlaces.value = billSetting.decimalPlaces;
    }
    if (billSetting.subtotalDecimalPlaces === 0 || billSetting.subtotalDecimalPlaces) {
      subtotalDecimalPlaces.value = billSetting.subtotalDecimalPlaces;
    }
  }
  const goodsId = ref('');
  const goodsName = ref('');

  const refreshKey: any = ref(new Date().getTime());
  const [register, { closeModal, openModal }] = useModal();
  const showModal = () => {
    openModal();
    refreshKey.value = ref(new Date().getTime());
  };
  let selectedGoods: any = [];
  function getSelect(rows, ids) {
    selectedGoods = [...rows];
  }

  const columns: BasicColumn[] = [
    {
      title: '编号(条码)',
      align: 'center',
      dataIndex: 'goodsCode',
      editable: false,
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'goodsName',
      editable: false,
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '规格',
      align: 'center',
      dataIndex: 'goodsType',
      editable: false,
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '单位',
      align: 'center',
      dataIndex: 'goodsUnit',
      editable: false,
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '单价',
      align: 'center',
      dataIndex: 'price',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
    },
    {
      title: '数量',
      align: 'center',
      dataIndex: 'count',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
    },
    {
      title: '重量',
      align: 'center',
      dataIndex: 'weight',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showWeightCol || false,
    },
    {
      title: '重量小计(' + weightColTitle.value + ')',
      align: 'center',
      dataIndex: 'weightSubtotal',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showWeightCol || false,
    },
    {
      title: '长',
      align: 'center',
      dataIndex: 'length',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
    },
    {
      title: '宽',
      align: 'center',
      dataIndex: 'width',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
    },
    {
      title: '高',
      align: 'center',
      dataIndex: 'height',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showLengthWidthHeightCol || false,
    },
    {
      title: '面积',
      align: 'center',
      dataIndex: 'area',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showAreaCol || false,
    },
    {
      title: '面积小计(' + areaColTitle.value + ')',
      align: 'center',
      dataIndex: 'areaSubtotal',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showAreaCol || false,
    },
    {
      title: '体积',
      align: 'center',
      dataIndex: 'volume',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showVolumeCol || false,
    },
    {
      title: '体积小计(' + volumeColTitle.value + ')',
      align: 'center',
      dataIndex: 'volumeSubtotal',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
      ifShow: billSetting.showVolumeCol || false,
    },
    {
      title: '成本金额',
      align: 'center',
      dataIndex: 'costAmount',
      ifShow: false,
    },
    {
      title: '金额',
      align: 'center',
      dataIndex: 'amount',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      editable: false,
      edit: true,
      editComponent: 'Input',
    },
  ];

  // 列表页面公共参数、方法
  let delIds: any = [];
  const { tableContext } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '商品详情',
      columns: columns,
      cols: userStore.getCols, // 添加列备注信息
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      rowKey: 'id',
      pagination: false,
      //定义rowSelection的类型，默认是checkbox多选，可以设置成radio单选
      rowSelection: {
        type: 'checkbox',
        onChange: function (ids, rows) {
          debugger;
          if (rows.stock <= 0) {
            alert(0);
          }
          console.log('get-select', rows, ids);
          delIds = ids;
        },
      },
    },
  });

  /**BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
  selectedRows选中的行信息、selectedRowKeys 选中的行rowkey */
  const [registerTable, { reload }, { rowSelection }] = tableContext;

  const props = defineProps({
    customerId: { type: String, default: '' },
  });
  // 客户id
  const customerId = computed(() => {
    if (props.customerId != '') {
      return props.customerId;
    }
  });

  //选择商品后点击确定按钮
  const handleOk = (e: MouseEvent) => {
    selectedGoods.forEach((item) => {
      item.goodsId = item.id;
      item.goodsName = item.name;
      item.goodsCode = item.code;
      item.goodsType = item.type;
      item.goodsUnit = item.unit;
      // 重量小计
      if (item.weight != undefined) {
        item.weightSubtotal = item.weight;
      }
      // 面积小计
      if (item.area != undefined) {
        item.areaSubtotal = item.area;
      }
      // 体积小计
      if (item.volume != undefined) {
        item.volumeSubtotal = item.volume;
      }
      if (singleCustPrice.value && item.custPrice) {
        item.price = item.custPrice;
      }
      item.amount = item.price;
      item.costAmount = item.cost;
      // item.dynamicFields = item.dynamicFields;
      item.count = 1;
    });
    if (goodsNameRepeat.value) {
      selectedGoods = removedExistGoods(selectedGoods);
    }
    if (dataSource.value.length) {
      dataSource.value = [...dataSource.value, ...selectedGoods];
    } else {
      dataSource.value = [...selectedGoods];
    }
    emit('change-goods', [...dataSource.value]);
    closeModal();
  };
  // 去掉已重复的商品
  function removedExistGoods(goods) {
    const ids = dataSource.value.map(item=>item.id);
    const tmp = goods.filter(item => ids.indexOf(item.id) === -1);
    return tmp;
  }
  // 总计数量
  const countNum = computed(() => {
    let num = 0;
    dataSource.value.forEach((item) => {
      num += item.count;
    });
    return num;
  });
  // 总计金额
  const countMoney = computed(() => {
    let num = 0.0;
    dataSource.value.forEach((item) => {
      num = parseFloat(num) + parseFloat(item.amount); // 售价 或 客户价
    });
    return num.toFixed(decimalPlaces.value);
  });
  // 总计重量
  const weightNum = computed(() => {
    let weight = 0.0;
    dataSource.value.forEach((item) => {
      weight = parseFloat(weight) + parseFloat(item.weightSubtotal);
    });
    return weight.toFixed(decimalPlaces.value);
  });
  // 总计面积
  const areaNum = computed(() => {
    let area = 0.0;
    dataSource.value.forEach((item) => {
      area = parseFloat(area) + parseFloat(item.areaSubtotal);
    });
    return area.toFixed(decimalPlaces.value);
  });
  // 总计体积
  const volumeNum = computed(() => {
    let volume = 0.0;
    dataSource.value.forEach((item) => {
      volume = parseFloat(volume) + parseFloat(item.volumeSubtotal);
    });
    return volume.toFixed(decimalPlaces.value);
  });

  // 增加一行空商品数据
  function addRow() {
    const row = {
      id: new Date().getTime(),
      goodsCode: '',
      goodsId: '',
      goodsName: '',
      goodsType: '',
      goodsUnit: '',
      count: '',
      cost: '',
      price: '',
      amount: '',
      costAmount: '',
      dynamicFields: undefined,
      remark: '',
    };
    dataSource.value.push(row);
  }
  // 删除一行商品数据
  function delRow() {
    if (delIds.length === 0) {
      return createMessage.warning('请选择要删除的数据');
    }
    createConfirm({
      title: '删除',
      content: `确定要删除吗？`,
      iconType: 'warning',
      onOk: () => {
        const tmp = dataSource.value.filter((item) => !(delIds.indexOf(item.id) > -1));
        dataSource.value = [...tmp];
        delIds = [];
      },
    });
  }
  // 商品列表修改单价数量金额时执行该方法
  function beforeEditSubmit({ record, index, key, value }) {
    console.log('==', record, index, key, value);
    // 售价 或 客户价
    // 根据金额计算方式来计算金额amount
    // num_price、weight_num_price、area_num_price、volume_num_price
    // weight_price、area_price、volume_price、write
    // 金额计算方式 amountComputeMethod
    if (key === 'price') {
      if (amountComputeMethod.value === 'num_price') {
        record.amount = (value * record.count).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'weight_num_price') {
        record.amount = (value * record.count * record.weight).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'area_num_price') {
        record.amount = (value * record.count * record.area).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'volume_num_price') {
        record.amount = (value * record.count * record.volume).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'weight_price') {
        record.amount = (value * record.weight).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'area_price') {
        record.amount = (value * record.area).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'volume_price') {
        record.amount = (value * record.volume).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'write') {
        record.amount = 0;
      }
      emit('change-goods', [...dataSource.value]);
    } else if (key === 'count') {
      record.costAmount = (value * record.cost).toFixed(decimalPlaces.value);
      // 修改小计
      record.weightSubtotal = (value * record.weight).toFixed(subtotalDecimalPlaces.value);
      record.areaSubtotal = (value * record.area).toFixed(subtotalDecimalPlaces.value);
      record.volumeSubtotal = (value * record.volume).toFixed(subtotalDecimalPlaces.value);
      if (amountComputeMethod.value === 'num_price') {
        record.amount = (value * record.price).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'weight_num_price') {
        record.amount = (value * record.price * record.weight).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'area_num_price') {
        record.amount = (value * record.price * record.area).toFixed(decimalPlaces.value);
      } else if (amountComputeMethod.value === 'volume_num_price') {
        record.amount = (value * record.price * record.volume).toFixed(decimalPlaces.value);
      }
      emit('change-goods', [...dataSource.value]);
    } else if (editAmountEditPrice.value && key === 'amount') {
      // 如果用户勾选了修改金额时变动单价
      record.price = ((value * 100) / record.count / 100).toFixed(decimalPlaces.value);
      emit('change-goods', [...dataSource.value]);
    }
  }

  function setValue(goods) {
    dataSource.value = [...goods];
  }
  function getData() {
    return {
      details: dataSource.value,
      count: countNum.value,
      weight: weightNum.value,
      area: areaNum.value,
      volume: volumeNum.value,
      amount: countMoney.value,
    };
  }

  defineExpose({
    getData,
    setValue,
    goodsName,
    billType,
    customerId,
  });
</script>

<style lang="less" scoped>
  .tbl-wrap {
    :deep(.ant-row) {
      width: 100% !important;
    }
    :deep(.ant-col) {
      max-width: 100% !important;
    }
  }
  .count-wrap {
    padding-bottom: 20px;

    .name {
      margin: 0 0 0 30px;
    }
    .num {
      margin-left: 4px;
    }
  }
</style>
