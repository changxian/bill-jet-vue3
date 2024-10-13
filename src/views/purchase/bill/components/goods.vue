  <template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-form-item label="商品搜索"  id="PurchaseBillForm-companyId" name="goodsName">
          <div style="display: flex">
            <a-input v-model:value="goodsName" placeholder="条码/编号/名称/简拼/规格" />
            <a-button type="primary" style="margin-left: 10px" @click="showModal">选择</a-button>
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
            <goodsSelectList @get-select="getSelect" :key="refreshKey"></goodsSelectList>
        </div>
        </BasicModal>
    </a-row>
    <div class="tbl-wrap">
         <BasicTable :beforeEditSubmit="beforeEditSubmit" @register="registerTable" :rowSelection="rowSelection" :dataSource="dataSource">
        <template #tableTitle>
             <a-button type="primary" preIcon="ant-design:plus-outlined" @click="addRow" v-auth="'purchase.bill:jxc_purchase_bill:add'">插入行</a-button>
             <a-button type="primary" preIcon="ant-design:delete-outlined" @click="delRow" v-auth="'purchase.bill:jxc_purchase_bill:add'">删除</a-button>
             <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">剪切</a-button>
             <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">复制</a-button>
             <a-button type="primary" preIcon="ant-design:delete-outlined" v-auth="'purchase.bill:jxc_purchase_bill:add'">粘贴</a-button>
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
import { ref,computed } from 'vue';
import goodsSelectList from '@/views/base/goods/index.vue';
import { BasicModal, useModal } from '/@/components/Modal';
import {  BasicColumn, BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useMessage } from '/@/hooks/web/useMessage';

 const { createMessage, createConfirm } = useMessage();

const goodsId = ref('');
const goodsName = ref('');

const refreshKey:any = ref(new Date().getTime())
const [register, { closeModal, openModal }] = useModal();
const showModal = () => {
  openModal()
  refreshKey.value = ref(new Date().getTime())
};

let selectedGoods:any = []
function getSelect(rows, ids) {
    selectedGoods = [...rows]
}

const columns: BasicColumn[] = [
     {
    title: '商品编号(条码)',
    align: 'center',
    dataIndex: 'code',
        editable: false,
    edit: true,
    editComponent: 'Input',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'name',
            editable: false,
    edit: true,
    editComponent: 'Input',
  },
  {
    title: '规格型号',
    align: 'center',
    dataIndex: 'type',
            editable: false,
    edit: true,
    editComponent: 'Input',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
            editable: false,
    edit: true,
    editComponent: 'Input',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'stock',
    editable: false,
    edit: true,
    editComponent: 'InputNumber',
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
  }
  ];
  const dataSource:any = ref([])
  // 列表页面公共参数、方法
  let delIds:any = []
  const { tableContext } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '可选择表格',
      columns: columns,
      rowkey: 'id',
    //定义rowSelection的类型，默认是checkbox多选，可以设置成radio单选 
      rowSelection: { type: 'checkbox',
      onChange: function(ids, rows) {
          console.log('get-select', rows, ids)
          delIds = ids;
        }
       }, 
    },
  });


/**BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
selectedRows选中的行信息、selectedRowKeys 选中的行rowkey */
  const [registerTable, { reload }, {rowSelection}] = tableContext;
 
const handleOk = (e: MouseEvent) => {
  console.log('ok:',e);
  if(dataSource.value.length){
    dataSource.value = [...dataSource.value, ...selectedGoods]
  }else{
    dataSource.value = [...selectedGoods]
  }
  
  closeModal()
};

const countNum = computed(()=>{
    let  num = 0
    dataSource.value.forEach(item=>{
        num += item.stock;
    })
    return num
})
const countMoney = computed(()=>{
    let  num = 0
    dataSource.value.forEach(item=>{
        num += item.costAmount;
    })
    return num
})

function addRow(){
    const row = {
        id: new Date().getTime(),
        code: '',
        name: '',
        type: '',
        unit: '',
        stock: '',
        cost: '',
        costAmount: '',
        remark: '',
    }
    dataSource.value.push(row)
}

function delRow(){
    if(delIds.length === 0){
        return createMessage.warning('请选择要删除的数据')
    }
    
    createConfirm({
          title: '删除',
          content: `确定要删除吗？`,
          iconType: 'warning',
          onOk: () => {
            const tmp = dataSource.value.filter(item => !(delIds.indexOf(item.id) > -1))
            dataSource.value = [...tmp]
            delIds = []
          }
    });

}
  function beforeEditSubmit({ record, index, key, value }) {
     console.log('==', record, index, key, value)
     if(key === 'cost'){
        record.costAmount = value * record.stock;
     }else if(key === 'stock'){
         record.costAmount = value * record.cost;
     }
  }
function test(){
    console.log('dataSource.value:', dataSource.value)
}

function setValue(goods) {
    dataSource.value = [...goods]
}
function getData(){
    return {
        details: dataSource.value,
        count: countNum.value,
        amount: countMoney.value
    }
}

defineExpose({
    getData,
    setValue
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
    transform: translateY(-10px);
    padding-bottom: 20px;

    .name {
        margin: 0 0 0 30px;
    }
    .num {
        margin-left: 4px;
    }

}
</style>
