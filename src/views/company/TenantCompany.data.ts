import { BasicColumn } from '/@/components/Table';
// import { FormSchema } from '/@/components/Table';
// import { rules} from '/@/utils/helper/validator';
// import { render } from '/@/utils/common/renderUtils';
// import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '企业全称',
    align: 'center',
    dataIndex: 'compName',
  },
  {
    title: '简称',
    align: 'center',
    dataIndex: 'shortName',
  },
  {
    title: '默认公司',
    align: 'center',
    dataIndex: 'isDefault_dictText',
  },
  {
    title: '英文名称',
    align: 'center',
    dataIndex: 'enName',
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'address',
  },
  {
    title: '网站',
    align: 'center',
    dataIndex: 'webSite',
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '传真',
    align: 'center',
    dataIndex: 'fax',
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
];

// 高级查询数据
// export const superQuerySchema = {
//   compName: {title: '企业全称',order: 0,view: 'text', type: 'string',},
//   shortName: {title: '简称',order: 1,view: 'text', type: 'string',},
//   enName: {title: '英文名称',order: 2,view: 'text', type: 'string',},
//   address: {title: '地址',order: 3,view: 'text', type: 'string',},
//   webSite: {title: '网站',order: 4,view: 'text', type: 'string',},
//   phone: {title: '电话',order: 5,view: 'text', type: 'string',},
//   fax: {title: '传真',order: 6,view: 'text', type: 'string',},
//   qq: {title: 'QQ',order: 7,view: 'text', type: 'string',},
//   wechat: {title: '微信',order: 8,view: 'text', type: 'string',},
//   email: {title: '邮箱',order: 9,view: 'text', type: 'string',},
//   isDefault: {title: '默认公司',order: 10,view: 'number', type: 'number',dictCode: '',},
// };
