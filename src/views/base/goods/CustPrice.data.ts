import { BasicColumn, FormSchema } from '/src/components/Table';
//列表数据

// 客户价列表
export const custPriceColumns: BasicColumn[] = [
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'custName',
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

// 客户搜索表单
export const custPriceFormSchema: FormSchema[] = [
  {
    field: 'custName',
    label: '客户名称',
    component: 'JInput',
    colProps: { xxl: 50 },
  },
];
