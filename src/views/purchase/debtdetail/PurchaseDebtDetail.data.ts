import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '单号',
    align: "center",
    dataIndex: 'billNo'
  },
  {
    title: '日期',
    align: "center",
    dataIndex: 'billDate'
  },
  {
    title: '欠款类型（1：进货欠款，2：退货欠款）',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '本单金额',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '付款金额',
    align: "center",
    dataIndex: 'paymentAmount'
  },
  {
    title: '优惠金额',
    align: "center",
    dataIndex: 'discountAmount'
  },
  {
    title: '欠款金额',
    align: "center",
    dataIndex: 'debtAmount'
  },
  {
    title: '送货车号',
    align: "center",
    dataIndex: 'careNo'
  },
  {
    title: '合同号',
    align: "center",
    dataIndex: 'contractCode'
  },
  {
    title: '业务员',
    align: "center",
    dataIndex: 'userName'
  },
  {
    title: '制单人',
    align: "center",
    dataIndex: 'createName'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
  {
    title: '版本',
    align: "center",
    dataIndex: 'version'
  },
];

// 高级查询数据
export const superQuerySchema = {
  billNo: {title: '单号',order: 0,view: 'text', type: 'string',},
  billDate: {title: '日期',order: 1,view: 'datetime', type: 'string',},
  type: {title: '欠款类型（1：进货欠款，2：退货欠款）',order: 2,view: 'number', type: 'number',dictCode: '',},
  amount: {title: '本单金额',order: 3,view: 'number', type: 'number',},
  paymentAmount: {title: '付款金额',order: 4,view: 'number', type: 'number',},
  discountAmount: {title: '优惠金额',order: 5,view: 'number', type: 'number',},
  debtAmount: {title: '欠款金额',order: 6,view: 'number', type: 'number',},
  careNo: {title: '送货车号',order: 7,view: 'text', type: 'string',},
  contractCode: {title: '合同号',order: 8,view: 'text', type: 'string',},
  userName: {title: '业务员',order: 10,view: 'text', type: 'string',},
  createName: {title: '制单人',order: 11,view: 'text', type: 'string',},
  remark: {title: '备注',order: 12,view: 'text', type: 'string',},
  version: {title: '版本',order: 14,view: 'number', type: 'number',},
};
