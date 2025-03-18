import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    align: 'center',
    dataIndex: 'customerName',
  },
  {
    title: '模板名称',
    align: 'center',
    dataIndex: 'name',
  },
  // {
  //   title: '模板类型',
  //   align: 'center',
  //   dataIndex: 'category_dictText',
  // },
  {
    title: '定制日期',
    align: 'center',
    dataIndex: 'customizedDate',
  },
  {
    title: '定制价格',
    align: 'center',
    dataIndex: 'customizedPrice',
  },
];
