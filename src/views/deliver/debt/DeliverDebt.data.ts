import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名',
    align: "center",
    dataIndex: 'custName'
  },
  {
    title: '送货欠款金额',
    align: "center",
    dataIndex: 'deliverDebtAmount'
  },
  {
    title: '退货欠款金额',
    align: "center",
    dataIndex: 'returnDebtAmount'
  }
];

// 高级查询数据
export const superQuerySchema = {
  type: {title: '欠款类型（1：送货欠款,2： 退货欠款）',order: 0,view: 'number', type: 'number',dictCode: '',},
  custId: {title: '客户id',order: 1,view: 'text', type: 'string',},
  custName: {title: '客户名',order: 2,view: 'text', type: 'string',},
  custPhone: {title: '客户手机',order: 3,view: 'text', type: 'string',},
  custContact: {title: '客户联系人',order: 4,view: 'text', type: 'string',},
  custAddress: {title: '客户地址',order: 5,view: 'text', type: 'string',},
  deliverDebtAmount: {title: '送货欠款金额',order: 6,view: 'number', type: 'number',},
  returnDebtAmount: {title: '退货欠款金额',order: 7,view: 'number', type: 'number',},
  remark: {title: '备注',order: 8,view: 'text', type: 'string',},
};
