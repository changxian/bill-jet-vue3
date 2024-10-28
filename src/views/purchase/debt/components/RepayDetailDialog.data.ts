import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';

// 状态  1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
export const statusList = [
    { value: '1', label: '未打印' },
    { value: '2', label: '已打印' },
    { value: '3', label: '签回' },
    { value: '4', label: '过账' },
    { value: '5', label: '审核' },
    { value: '6', label: '已开票' },
    { value: '9', label: '作废' },
]
// 开票状态（1未开、2不开、3已开、4无信息、9其他）
export const billStatusList = [
  { value: '1', label: '未开' },
  { value: '2', label: '不开' },
  { value: '3', label: '已开' },
  { value: '4', label: '无信息' },
  { value: '9', label: '其他' },
]
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '还款类型',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '还款单号',
    align: "center",
    dataIndex: 'billNo'
  },
  {
    title: '供应商名称',
    align: "center",
    dataIndex: 'supplierName'
  }, 
  {
    title: '日期',
    align: "center",
    dataIndex: 'repayDate'
  },
  {
    title: '抵欠金额',
    align: "center",
    dataIndex: 'deductionAmount'
  },
  {
    title: '还款金额',
    align: "center",
    dataIndex: 'repayAmount'
  },
  {
    title: '公司名称',
    align: "center",
    dataIndex: 'collectCompanyName'
  },
  {
    title: '操作员',
    align: "center",
    dataIndex: 'userName'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  }
];

export const detailColumns: BasicColumn[] = [
     {
        title: '欠款单号',
        align: "center",
        dataIndex: 'billNo'
      },
      {
        title: '欠款金额',
        align: "center",
        dataIndex: 'debtAmount'
      },
      {
        title: '还款金额',
        align: "center",
        dataIndex: 'repayAmount'
      },
];
// 高级查询数据
export const superQuerySchema = {
  billNo: {title: '单号',order: 0,view: 'text', type: 'string',},
  type: {title: '开单类型（1：进货开单，2：退货开单）',order: 1,view: 'number', type: 'number',dictCode: '',},
  billDate: {title: '开单日期',order: 2,view: 'datetime', type: 'string',},
  companyName: {title: '公司名称(记录开票时的公司名称）',order: 3,view: 'sel_user', type: 'string',},
  supplierName: {title: '供应商名称',order: 4,view: 'sel_user', type: 'string',},
  supplierPhone: {title: '供应商电话',order: 5,view: 'text', type: 'string',},
  supplierContact: {title: '供应商联系人',order: 6,view: 'text', type: 'string',},
  supplierAddress: {title: '供应商地址',order: 7,view: 'text', type: 'string',},
  count: {title: '数量（本单商品数量）',order: 8,view: 'number', type: 'number',},
  amount: {title: '本单金额',order: 9,view: 'number', type: 'number',},
  paymentAmount: {title: '已付款金额',order: 10,view: 'number', type: 'number',},
  discountAmount: {title: '优惠金额',order: 11,view: 'number', type: 'number',},
  debtAmount: {title: '未付款（欠款）金额',order: 12,view: 'number', type: 'number',},
  hisDebtAmount: {title: '往期欠款金额',order: 13,view: 'number', type: 'number',},
  careNo: {title: '送货车号',order: 14,view: 'text', type: 'string',},
  contractCode: {title: '合同号',order: 15,view: 'text', type: 'string',},
  status: {title: '状态（1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废）',order: 16,view: 'number', type: 'number',dictCode: '',},
  invoiceStatus: {title: '开票状态（1未开、2不开、3已开、4无信息、9其他）',order: 17,view: 'number', type: 'number',dictCode: '',},
  userName: {title: '业务员',order: 18,view: 'sel_user', type: 'string',},
  remark: {title: '备注',order: 19,view: 'text', type: 'string',},
  version: {title: '版本',order: 21,view: 'number', type: 'number',},
  createName: {title: '制单人',order: 22,view: 'text', type: 'string',},
};
