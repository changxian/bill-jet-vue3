import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'type',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '变动方式',
    align: 'center',
    dataIndex: 'mode1_dictText',
  },
  {
    title: '变动类型',
    align: 'center',
    dataIndex: 'mode2_dictText',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'quantity',
  },
  {
    title: '是否回滚',
    align: 'center',
    dataIndex: 'rollBack',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '方式',
    field: 'mode1',
    component: 'InputNumber',
  },
  {
    label: '类型',
    field: 'mode2',
    component: 'InputNumber',
  },
  {
    label: '商品名称',
    field: 'name',
    component: 'Input',
  },
];

// 变动库存
export const stockOptions = {
  mode1: [
    { code: '1', name: '增加库存' },
    { code: '2', name: '减少库存' },
  ],
  mode1Map: {
    1: [
      { code: '110', name: '初始入库' },
      { code: '120', name: '进货增加' },
      { code: '130', name: '销售退货增加' },
      { code: '140', name: '调入增加' },
      { code: '150', name: '报溢增加' },
      { code: '190', name: '其他增加' },
    ],
    2: [
      { code: '210', name: '销货减少' },
      { code: '220', name: '进货退货减少' },
      { code: '230', name: '调出减少' },
      { code: '240', name: '报损减少' },
      { code: '290', name: '其他减少' },
    ],
  },
  mode2: [],
};
