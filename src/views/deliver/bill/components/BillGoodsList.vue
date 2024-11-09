  <template>
  <div>
    <a-row>
      <a-col :span="8" style="position:relative">
        <a-form-item label="商品搜索" id="DeliverBillForm-companyId" name="goodsName">
          <div style="display: flex">
            <a-input v-model:value="goodsName" placeholder="条码/编号/名称/规格" />
            <a-button type="primary" style="margin-left: 10px" @click="showModal">选择</a-button>
            <div v-if="goodsNameRepeat" style="color:red;position:absolute;left:104%;width:150px;top:6px"> 商品不可重复选择</div>
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
          <div style="width:98%">
            <goodsSelectList @get-select="getSelect" :billType="billType" :customerId="customerId" @db-ok="handleOk" :key="refreshKey"></goodsSelectList>
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
            <span class="name">数量:</span>  <span class="num">{{countNum}}</span>
            <span class="name">金额:</span>  <span class="num">￥{{countMoney}} 元</span>
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
  import { getMyBillSetting } from '@/views/setting/system/index.api';
  import { useUserStore } from '/@/store/modules/user';

  const emit = defineEmits(['change-goods']);
  const { createMessage, createConfirm } = useMessage();

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
      title: '商品编号(条码)',
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
      title: '单价',
      align: 'center',
      dataIndex: 'price',
      editable: false,
      edit: true,
      editComponent: 'InputNumber',
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
  const userStore = useUserStore();
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
        onChange: function (ids, rows) {
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
  // 传递给商品选择页面的参数
  const billType = 'deliver';
  // 校验商品是否可重复添加
  const goodsNameRepeat = ref(false);
  // 修改金额单价变动
  const editAmountEditPrice = ref(false);
  // 金额计算方式
  const buyPriceComputeMethod = ref(false);
  // 只允许选择商品开单
  const onlyChooseGoods = ref(false);
  // 自动记录客户价
  const autoCustPrice = ref(false);
  // 启用一客一价
  const singleCustPrice = ref(false);
  // 小数位数
  const decimalPlaces = ref(2);
  // 加载系统开单设置
  getMyBillSetting().then(res=>{
    goodsNameRepeat.value = !!res.goodsNameRepeat;
    editAmountEditPrice.value = !!res.editAmountEditPrice;
    onlyChooseGoods.value = !!res.onlyChooseGoods;
    autoCustPrice.value = !!res.autoCustPrice;
    singleCustPrice.value = !!res.singleCustPrice;
    buyPriceComputeMethod.value = res.buyPriceComputeMethod;
    if (res.decimalPlaces === 0 || res.decimalPlaces) {
      decimalPlaces.value = res.decimalPlaces;
    }
  });

  //选择商品后点击确定按钮
  const handleOk = (e: MouseEvent) => {
    selectedGoods.forEach(item=>{
      item.goodsId = item.id;
      item.goodsName = item.name;
      item.goodsCode = item.code;
      item.goodsType = item.type;
      item.goodsUnit = item.unit;
      if (singleCustPrice.value && item.custPrice) {
        item.price = item.custPrice;
      }
      // 根据金额计算方式来计算金额amount
      // num_price、weight_num_price、area_num_price、volume_num_price
      // weight_price、area_price、volume_price、write
      item.amount = item.price;
      item.costAmount = item.cost;
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
  const countNum = computed(()=>{
    let num = 0;
    dataSource.value.forEach(item=>{
      num += item.count;
    });
    return num;
  });
  // 总计金额
  const countMoney = computed(()=>{
    let num = 0.0;
    dataSource.value.forEach(item=>{
      num = parseFloat(num) + parseFloat(item.amount); // 售价 或 客户价
    });
    return num.toFixed(decimalPlaces.value);
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
        const tmp = dataSource.value.filter(item => !(delIds.indexOf(item.id) > -1));
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
    if (key === 'price') {
      record.amount = (value * record.count).toFixed(decimalPlaces.value);
      emit('change-goods', [...dataSource.value]);
    } else if (key === 'count') {
      record.amount = (value * record.price).toFixed(decimalPlaces.value);
      record.costAmount = (value * record.cost).toFixed(decimalPlaces.value);
      emit('change-goods', [...dataSource.value]);
    } else if (editAmountEditPrice.value && key === 'amount') {
      record.price = ((value * 100/record.count)/100).toFixed(decimalPlaces.value);
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
      width:100% !important
    }
    :deep(.ant-col) {
      max-width:100% !important
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
