import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '欠款类型（1：送货欠款,2：退货欠款）',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '客户名',
    align: "center",
    dataIndex: 'custName'
  },
  {
    title: '客户手机',
    align: "center",
    dataIndex: 'custPhone'
  },
  {
    title: '客户联系人',
    align: "center",
    dataIndex: 'custContact'
  },
  {
    title: '客户地址',
    align: "center",
    dataIndex: 'custAddress'
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
  },
  {
    title: '版本',
    align: "center",
    dataIndex: 'version'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];

// 高级查询数据
export const superQuerySchema = {
  type: {title: '欠款类型（1：送货欠款,2：退货欠款）',order: 0,view: 'number', type: 'number',dictCode: '',},
  custName: {title: '客户名',order: 1,view: 'text', type: 'string',},
  custPhone: {title: '客户手机',order: 2,view: 'text', type: 'string',},
  custContact: {title: '客户联系人',order: 3,view: 'text', type: 'string',},
  custAddress: {title: '客户地址',order: 4,view: 'text', type: 'string',},
  deliverDebtAmount: {title: '送货欠款金额',order: 5,view: 'number', type: 'number',},
  returnDebtAmount: {title: '退货欠款金额',order: 6,view: 'number', type: 'number',},
  version: {title: '版本',order: 8,view: 'number', type: 'number',},
  remark: {title: '备注',order: 9,view: 'text', type: 'string',},
};
