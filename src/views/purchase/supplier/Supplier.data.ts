import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '供应商名',
    align: 'center',
    sorter: true,
    dataIndex: 'orgName',
  },
  {
    title: '手机',
    align: 'center',
    dataIndex: 'cellPhone',
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
  },
  // {
  //   title: '折扣率',
  //   align: 'center',
  //   dataIndex: 'discount',
  // },
  {
    title: '联系人',
    align: 'center',
    dataIndex: 'contact',
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'address',
  },
  {
    title: '传真',
    align: 'center',
    dataIndex: 'faxes',
  },
  {
    title: 'QQ',
    align: 'center',
    dataIndex: 'qq',
  },
  {
    title: '微信',
    align: 'center',
    dataIndex: 'wechat',
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'email',
  },
  // {
  //   title: '业务员',
  //   align: 'center',
  //   dataIndex: 'salesmanName',
  // },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
