import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'orgName',
    width: 150,
    resizable: true,
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
    width: 120,
    resizable: true,
  },
  {
    title: '联系人',
    align: 'center',
    dataIndex: 'contact',
    width: 100,
    resizable: true,
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'address',
    width: 150,
    resizable: true,
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
    width: 120,
    resizable: true,
  },
  {
    title: '传真',
    align: 'center',
    dataIndex: 'faxes',
    width: 100,
    resizable: true,
  },
  {
    title: 'QQ',
    align: 'center',
    dataIndex: 'qq',
    width: 100,
    resizable: true,
  },
  {
    title: '微信',
    align: 'center',
    dataIndex: 'wechat',
    width: 100,
    resizable: true,
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'email',
    width: 150,
    resizable: true,
  },
  {
    title: '业务员',
    align: 'center',
    dataIndex: 'userName',
    width: 100,
    resizable: true,
  },
  {
    title: '创建日期',
    align: 'center',
    dataIndex: 'createTime',
    width: 150,
    resizable: true,
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 150,
    resizable: true,
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

