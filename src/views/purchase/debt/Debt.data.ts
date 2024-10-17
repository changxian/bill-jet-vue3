import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '欠款类型（1：进货欠款,2： 退货欠款）',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '供应商id',
    align: "center",
    dataIndex: 'supplierId'
  },
  {
    title: '供应商名',
    align: "center",
    dataIndex: 'supplierName'
  },
  {
    title: '供应商手机',
    align: "center",
    dataIndex: 'supplierPhone'
  },
  {
    title: '供应商联系人',
    align: "center",
    dataIndex: 'supplierContact'
  },
  {
    title: '供应商地址',
    align: "center",
    dataIndex: 'supplierAddress'
  },
  {
    title: '进货欠款金额',
    align: "center",
    dataIndex: 'purchaseDebtAmount'
  },
  {
    title: '退货欠款金额',
    align: "center",
    dataIndex: 'returnDebtAmount'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];

// 高级查询数据
export const superQuerySchema = {
  type: {title: '欠款类型（1：进货欠款,2： 退货欠款）',order: 0,view: 'number', type: 'number',dictCode: '',},
  supplierId: {title: '供应商id',order: 1,view: 'text', type: 'string',},
  supplierName: {title: '供应商名',order: 2,view: 'text', type: 'string',},
  supplierPhone: {title: '供应商手机',order: 3,view: 'text', type: 'string',},
  supplierContact: {title: '供应商联系人',order: 4,view: 'text', type: 'string',},
  supplierAddress: {title: '供应商地址',order: 5,view: 'text', type: 'string',},
  purchaseDebtAmount: {title: '进货欠款金额',order: 6,view: 'number', type: 'number',},
  returnDebtAmount: {title: '退货欠款金额',order: 7,view: 'number', type: 'number',},
  remark: {title: '备注',order: 8,view: 'text', type: 'string',},
};
