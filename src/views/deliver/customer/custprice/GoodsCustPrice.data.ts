import { BasicColumn, FormSchema } from '/@/components/Table';
//列表数据

// 客户价列表
export const custPriceColumns: BasicColumn[] = [
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'goodsName',
  },
  {
    title: '商品规格',
    align: 'center',
    dataIndex: 'goodsType',
  },
  {
    title: '客户价',
    align: 'center',
    dataIndex: 'price',
    editable: false,
    edit: true,
    editComponent: 'InputNumber',
  },
];

// 客户价搜索表单
export const custPriceFormSchema: FormSchema[] = [
  {
    field: 'goodsName',
    label: '商品名称',
    component: 'JInput',
  },
  {
    label: '编号(条码)',
    field: 'code',
    component: 'JInput'
  },
];


// 高级查询数据
/*export const superQuerySchema = {
  goodsName: {title: '商品名称',order: 0,view: 'text', type: 'string',},
  goodsType: {title: '商品规格',order: 1,view: 'text', type: 'string',},
  price: {title: '客户价',order: 2,view: 'number', type: 'number',},
  status: {title: '状态（1：正常，-1：已删除）',order: 3,view: 'number', type: 'number',},
};*/
