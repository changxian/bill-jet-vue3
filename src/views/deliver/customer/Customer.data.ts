import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'orgName',
  },
  /*{
    title: '折扣率',
    align: 'center',
    dataIndex: 'discount',
  },*/
  {
    title: '手机',
    align: 'center',
    dataIndex: 'cellPhone',
  },
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
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
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
  {
    title: '业务员',
    align: 'center',
    dataIndex: 'userName',
  },
  {
    title: '创建日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];

// 高级查询数据
/*export const superQuerySchema = {
  orgName: {title: '客户名称',order: 0,view: 'text', type: 'string',},
  discount: {title: '折扣率',order: 1,view: 'number', type: 'number',},
  cellPhone: {title: '手机',order: 2,view: 'text', type: 'string',},
  phone: {title: '电话',order: 3,view: 'text', type: 'string',},
  contact: {title: '联系人',order: 4,view: 'text', type: 'string',},
  faxes: {title: '传真',order: 5,view: 'text', type: 'string',},
  address: {title: '地址',order: 6,view: 'text', type: 'string',},
  qq: {title: 'QQ',order: 7,view: 'text', type: 'string',},
  wechat: {title: '微信',order: 8,view: 'text', type: 'string',},
  email: {title: '邮箱',order: 9,view: 'text', type: 'string',},
  userName: {title: '业务员',order: 10,view: 'list', type: 'string',dictCode: '',},
  remark: {title: '备注',order: 11,view: 'textarea', type: 'string',},
};*/

