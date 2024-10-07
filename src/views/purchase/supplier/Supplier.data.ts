import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '供应商名称',
    align: "center",
    sorter: true,
    dataIndex: 'orgName'
  },
  {
    title: '手机',
    align: "center",
    dataIndex: 'cellPhone'
  },
  {
    title: '电话',
    align: "center",
    dataIndex: 'phone'
  },
  {
    title: '折扣率',
    align: "center",
    dataIndex: 'discount'
  },
  {
    title: '联系人',
    align: "center",
    dataIndex: 'contact'
  },
  {
    title: '地址',
    align: "center",
    dataIndex: 'address'
  },
  {
    title: '传真',
    align: "center",
    dataIndex: 'faxes'
  },
  {
    title: 'QQ',
    align: "center",
    dataIndex: 'qq'
  },
  {
    title: '微信',
    align: "center",
    dataIndex: 'wechat'
  },
  {
    title: '邮箱',
    align: "center",
    dataIndex: 'email'
  },
  {
    title: '业务员',
    align: "center",
    dataIndex: 'salesmanName'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];

// // 高级查询数据
// export const superQuerySchema = {
//   orgName: {title: '供应商名称',order: 0,view: 'text', type: 'string',},
//   cellPhone: {title: '手机',order: 1,view: 'text', type: 'string',},
//   phone: {title: '电话',order: 2,view: 'text', type: 'string',},
//   discount: {title: '折扣率',order: 3,view: 'number', type: 'number',},
//   contact: {title: '联系人',order: 4,view: 'text', type: 'string',},
//   address: {title: '地址',order: 5,view: 'text', type: 'string',},
//   faxes: {title: '传真',order: 6,view: 'text', type: 'string',},
//   qq: {title: 'QQ',order: 7,view: 'text', type: 'string',},
//   wechat: {title: '微信',order: 8,view: 'text', type: 'string',},
//   email: {title: '邮箱',order: 9,view: 'text', type: 'string',},
//   salesmanId: {title: '业务员id',order: 10,view: 'text', type: 'string',},
//   salesmanName: {title: '业务员',order: 11,view: 'text', type: 'string',},
//   remark: {title: '备注',order: 12,view: 'text', type: 'string',},
// };
