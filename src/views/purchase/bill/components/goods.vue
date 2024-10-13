  <template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-form-item label="商品搜索" v-bind="goodsId" id="PurchaseBillForm-companyId" name="companyId">
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
            <goodsSelectList @get-select="getSelect"></goodsSelectList>
        </div>
        </BasicModal>
    </a-row>
    <div class="tbl-wrap">
         <BasicTable @register="registerTable" :rowSelection="rowSelection" :dataSource="dataSource">
   
        </BasicTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import goodsSelectList from '@/views/base/goods/index.vue';
import { BasicModal, useModal } from '/@/components/Modal';
import {  BasicColumn, BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';

console.log('goodsSelectList:', goodsSelectList)
const goodsId = ref('');
const goodsName = ref('');

const [register, { closeModal, openModal }] = useModal();
const showModal = () => {
  openModal()
};

let selectedGoods:any = []
function getSelect(rows, ids) {
    console.log('selectedGoods:', rows)
    selectedGoods = [...rows]
}

const columns: BasicColumn[] = [
     {
    title: '商品编号(条码)',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '规格型号',
    align: 'center',
    dataIndex: 'type',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: '进货价',
    align: 'center',
    dataIndex: 'cost',
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'costAmount',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  }
  ];
  const dataSource:any = ref([])
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'basic-table-demo',
    tableProps: {
      title: '可选择表格',
      columns: columns,
      rowkey:"id",
    //定义rowSelection的类型，默认是checkbox多选，可以设置成radio单选 
      rowSelection: { type: 'checkbox',
      onChange: function(ids, rows) {
          console.log('get-select', rows, ids)
        }
       }, 
    },
  });


/**BasicTable绑定注册 ，返回reload 刷新方法、rowSelection行选择属性、
selectedRows选中的行信息、selectedRowKeys 选中的行rowkey */
  const [registerTable, { reload }, {rowSelection}] = tableContext;
 
const handleOk = (e: MouseEvent) => {
  console.log('ok:',e);
  dataSource.value = [...selectedGoods]
  closeModal()
};

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
</style>
