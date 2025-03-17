import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '所属租户',
    align: "center",
    dataIndex: 'belongTenantIdName'
  },
  {
    title: '激活码',
    align: "center",
    dataIndex: 'activateCode'
  },
  
 {
    title: '套餐类型',
    dataIndex: 'packType',
    width: 150,
    customRender: ({ text }) => {
      if (text === 1) {
        return '送货单版';
      } else {
        return '进销存版';
      }
    },
  },
  {
    title: '套餐类别',
    dataIndex: 'packCategory',
    width: 150,
    customRender: ({ text }) => {
      if (text === 1) {
        return '单机版';
      } else {
        return '云端版';
      }
    },
  },
  {
    title: '价格',
    align: "center",
    dataIndex: 'price'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'ststusName'
  },
   {
    title: '(激活)租户',
    align: "center",
    dataIndex: 'actTenantIdName'
  },
  {
    title: '激活时间',
    align: "center",
    dataIndex: 'activateDateTime'
  },


  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
  
];

// 高级查询数据
export const superQuerySchema = {
  belongTenantId: {title: '所属租户id',order: 0,view: 'number', type: 'number',},
  actTenantId: {title: '(激活)租户id',order: 1,view: 'number', type: 'number',},
  activateCode: {title: '激活码',order: 2,view: 'text', type: 'string',},
  ststus: {title: '状态',order: 3,view: 'text', type: 'string',},
  activateDateTime: {title: '激活时间',order: 4,view: 'text', type: 'string',},
  packType: {title: '激活码类型(1送货单版/2进销存版)',order: 5,view: 'number', type: 'number',},
  packCategory: {title: '激活码类别(1单机版/2云端版)',order: 6,view: 'text', type: 'string',},
  remark: {title: '备注',order: 8,view: 'text', type: 'string',},
  version: {title: '版本号',order: 9,view: 'number', type: 'number',},
};
