import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '商品类型',
    align: 'center',
    dataIndex: 'category',
  },
  {
    title: '商品编号',
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
    title: '进价（成本）',
    align: 'center',
    dataIndex: 'cost',
  },
  {
    title: '售价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '当前库存数量',
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];

// 高级查询数据
export const superQuerySchema = {
  category: { title: '商品类型', order: 0, view: 'number', type: 'number' },
  code: { title: '商品编号', order: 1, view: 'text', type: 'string' },
  name: { title: '商品名称', order: 2, view: 'text', type: 'string' },
  type: { title: '规格型号', order: 3, view: 'text', type: 'string' },
  unit: { title: '单位', order: 4, view: 'text', type: 'string' },
  cost: { title: '进价（成本）', order: 5, view: 'number', type: 'number' },
  price: { title: '售价', order: 6, view: 'number', type: 'number' },
  stock: { title: '当前库存数量', order: 7, view: 'number', type: 'number' },
  remark: { title: '备注', order: 8, view: 'text', type: 'string' },
};
