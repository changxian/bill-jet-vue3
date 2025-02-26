<template>
  <div>
    <a-row>
      <a-col :span="8" style="position: relative">
        <a-form-item label="商品搜索" id="PurchaseBillForm-companyId" name="goodsName">
          <div style="display: flex">
            <a-input v-model:value="goodsName" placeholder="条码/编号/名称/简拼/规格" />
            <a-button type="primary" style="margin-left: 10px" @click="showModal">选择</a-button>
            <div v-if="goodsNameRepeat" style="color: red; position: absolute; left: 104%; width: 150px; top: 6px"> 商品不可重复选择</div>
          </div>
        </a-form-item>
      </a-col>
      <BasicModal
        v-bind="$attrs"
        @register="register"
        title="商品搜索"
        :width="'1400px'"
        @ok="handleOk"
      >
        <div style="width: 98%">
          <goodsSelectList @get-select="getSelect" @db-ok="handleOk" :goodsName="goodsName" :billType="billType" :key="refreshKey"></goodsSelectList>
        </div>
      </BasicModal>
    </a-row>
    <div class="tbl-wrap">
      <BasicTable :beforeEditSubmit="beforeEditSubmit" @register="registerTable" :rowSelection="rowSelection" :dataSource="dataSource">
        <template #tableTitle>
          <a-button type="primary" preIcon="ant-design:plus-outlined" @click="addRow" v-if="!onlyChooseGoods" v-auth="'purchase.bill:jxc_purchase_bill:add'">插入行</a-button>
          <a-button type="primary" preIcon="ant-design:delete-outlined" @click="delRow" v-auth="'purchase.bill:jxc_purchase_bill:add'">删除</a-button>
          <!-- <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">剪切</a-button>
            <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">复制</a-button>
            <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">粘贴</a-button> -->
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
  import { ref, computed, defineEmits } from 'vue';
  import goodsSelectList from '@/views/base/goods/index.vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicColumn, BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
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
  const emit = defineEmits(['change-goods']);
  const { createMessage, createConfirm } = useMessage();

  const billType = 'purchase';
  const goodsId = ref('');
  const goodsName = ref('');

  const refreshKey:any = ref(new Date().getTime())
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
      title: '进货价',
      align: 'center',
      dataIndex: 'cost',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
    },
    {
      title: '金额',
      align: 'center',
      dataIndex: 'costAmount',
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

  const dataSource: any = ref([]);
  // 列表页面公共参数、方法
  let delIds: any = [];
  const { tableContext } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '商品详情',
      columns: columns,
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      rowkey: 'id',
      pagination: false,
      //定义rowSelection的类型，默认是checkbox多选，可以设置成radio单选
      rowSelection: {type: 'checkbox',
      onChange: function(ids, rows) {
          console.log('get-select', rows, ids);
          delIds = ids;
        },
      },
    },
  });

  /**BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
  selectedRows选中的行信息、selectedRowKeys 选中的行rowkey */
  const [registerTable, { reload }, { rowSelection }] = tableContext;

  // 校验商品是否可重复添加
  const goodsNameRepeat = ref(false);
  const editAmountEditPrice = ref(false);
  const onlyChooseGoods = ref(false);
  const decimalPlaces = ref(2);
  if (billSetting) {
    goodsNameRepeat.value = !!billSetting.goodsNameRepeat;
    editAmountEditPrice.value = !!billSetting.editAmountEditPrice;
    onlyChooseGoods.value = !!billSetting.onlyChooseGoods;
    if (billSetting.decimalPlaces === 0 || billSetting.decimalPlaces) {
      decimalPlaces.value = billSetting.decimalPlaces;
    }
  }
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
      item.count = 1;
      item.costAmount = item.cost;
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
  // 去掉已重发的商品
  function removedExistGoods(goods) {
    const ids = dataSource.value.map((item) => item.id);
    const tmp = goods.filter((item) => ids.indexOf(item.id) === -1);
    return tmp;
  }

  const countNum = computed(() => {
    let num = 0;
    dataSource.value.forEach((item) => {
      num += item.count;
    });
    return num;
  });
  const weightNum = computed(() => {
    let weight = 0.0;
    dataSource.value.forEach((item) => {
      weight = parseFloat(weight) + parseFloat(item.weightSubtotal);
    });
    return weight.toFixed(decimalPlaces.value);
  });

  const areaNum = computed(() => {
    let area = 0.0;
    dataSource.value.forEach((item) => {
      area = parseFloat(area) + parseFloat(item.areaSubtotal);
    });
    return area.toFixed(decimalPlaces.value);
  });
  const volumeNum = computed(() => {
    let volume = 0.0;
    dataSource.value.forEach((item) => {
      volume = parseFloat(volume) + parseFloat(item.volumeSubtotal);
    });
    return volume.toFixed(decimalPlaces.value);
  });

  const countMoney = computed(() => {
    let costAmount = 0.0;
    dataSource.value.forEach((item) => {
      costAmount = parseFloat(costAmount) + parseFloat(item.costAmount);
    });
    return costAmount.toFixed(decimalPlaces.value);
  });

  function addRow() {
    const row = {
      id: new Date().getTime(),
      goodsCode: '',
      goodsId: '',
      goodsName: '',
      goodsType: '',
      goodsUnit: '',
      count: 0,
      weight: 0,
      area: 0,
      volume: 0,
      cost: 0,
      costAmount: 0,
      remark: '',
    };
    dataSource.value.push(row);
  }

  function delRow() {
    if (delIds.length === 0) {
      return createMessage.warning('请选择要删除的数据');
    }
    createConfirm({
      title: '删除',
      content: `确定要删除吗？`,
      iconType: 'warning',
      onOk: () => {
        const tmp = dataSource.value.filter(item => !(delIds.indexOf(item.id) > -1))
        dataSource.value = [...tmp];
        delIds = [];
      },
    });
  }
  function beforeEditSubmit({ record, index, key, value }) {
    if (key === 'cost') {
      record.costAmount = value * record.count;
      emit('change-goods', [...dataSource.value]);
    } else if (key === 'count') {
      record.costAmount = (value * record.cost).toFixed(decimalPlaces.value);
      // 修改小计
      record.weightSubtotal = (value * record.weight).toFixed(decimalPlaces.value);
      record.areaSubtotal = (value * record.area).toFixed(decimalPlaces.value);
      record.volumeSubtotal = (value * record.volume).toFixed(decimalPlaces.value);
      emit('change-goods', [...dataSource.value]);
    } else if (editAmountEditPrice.value && key === 'costAmount') {
      record.cost = ((value * 100 / record.count)/100).toFixed(decimalPlaces.value);
      emit('change-goods', [...dataSource.value]);
    }
  }
  function test() {
    console.log('dataSource.value:', dataSource.value);
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
    billType,
    goodsName,
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
