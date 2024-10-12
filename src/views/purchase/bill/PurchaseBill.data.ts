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
    title: '交易类型（1：进货，2：退货）',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '开单日期',
    align: "center",
    dataIndex: 'billDate'
  },
  {
    title: '公司名称(记录开票时的公司名称）',
    align: "center",
    dataIndex: 'companyName_dictText'
  },
  {
    title: '供应商/客户名称',
    align: "center",
    dataIndex: 'supplierName'
  },
  {
    title: '供应商/客户电话',
    align: "center",
    dataIndex: 'supplierPhone'
  },
  {
    title: '供应商/客户联系人',
    align: "center",
    dataIndex: 'supplierContact'
  },
  {
    title: '供应商/客户地址',
    align: "center",
    dataIndex: 'supplierAddress'
  },
  {
    title: '数量（本单商品数量）',
    align: "center",
    dataIndex: 'count'
  },
  {
    title: '本单金额',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '已付款金额',
    align: "center",
    dataIndex: 'paymentAmount'
  },
  {
    title: '优惠金额',
    align: "center",
    dataIndex: 'discountAmount'
  },
  {
    title: '未付款（欠款）金额',
    align: "center",
    dataIndex: 'debtAmount'
  },
  {
    title: '往期欠款金额',
    align: "center",
    dataIndex: 'hisDebtAmount'
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
    title: '状态（未打印、已打印、签回、过账、审核、已开票、作废）',
    align: "center",
    dataIndex: 'status'
  },
  {
    title: '开票状态（未开、不开、已开、无信息、其他）',
    align: "center",
    dataIndex: 'billStatus'
  },
  {
    title: '成本',
    align: "center",
    dataIndex: 'costAmount'
  },
  {
    title: '利润',
    align: "center",
    dataIndex: 'profitAmount'
  },
  {
    title: '业务员',
    align: "center",
    dataIndex: 'userName_dictText'
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
  {
    title: '制单人',
    align: "center",
    dataIndex: 'createName'
  },
];

// 高级查询数据
export const superQuerySchema = {
  billNo: {title: '单号',order: 0,view: 'text', type: 'string',},
  type: {title: '交易类型（1：进货，2：退货）',order: 1,view: 'number', type: 'number',dictCode: '',},
  billDate: {title: '开单日期',order: 2,view: 'datetime', type: 'string',},
  companyName: {title: '公司名称(记录开票时的公司名称）',order: 3,view: 'list', type: 'string',dictCode: '',},
  supplierName: {title: '供应商/客户名称',order: 4,view: 'text', type: 'string',},
  supplierPhone: {title: '供应商/客户电话',order: 5,view: 'text', type: 'string',},
  supplierContact: {title: '供应商/客户联系人',order: 6,view: 'text', type: 'string',},
  supplierAddress: {title: '供应商/客户地址',order: 7,view: 'text', type: 'string',},
  count: {title: '数量（本单商品数量）',order: 8,view: 'number', type: 'number',},
  amount: {title: '本单金额',order: 9,view: 'number', type: 'number',},
  paymentAmount: {title: '已付款金额',order: 10,view: 'number', type: 'number',},
  discountAmount: {title: '优惠金额',order: 11,view: 'number', type: 'number',},
  debtAmount: {title: '未付款（欠款）金额',order: 12,view: 'number', type: 'number',},
  hisDebtAmount: {title: '往期欠款金额',order: 13,view: 'number', type: 'number',},
  careNo: {title: '送货车号',order: 14,view: 'text', type: 'string',},
  contractCode: {title: '合同号',order: 15,view: 'text', type: 'string',},
  status: {title: '状态（未打印、已打印、签回、过账、审核、已开票、作废）',order: 16,view: 'number', type: 'number',},
  billStatus: {title: '开票状态（未开、不开、已开、无信息、其他）',order: 17,view: 'number', type: 'number',},
  costAmount: {title: '成本',order: 18,view: 'number', type: 'number',},
  profitAmount: {title: '利润',order: 19,view: 'number', type: 'number',},
  userName: {title: '业务员',order: 20,view: 'sel_user', type: 'string',},
  remark: {title: '备注',order: 21,view: 'text', type: 'string',},
  version: {title: '版本',order: 23,view: 'number', type: 'number',},
  createName: {title: '制单人',order: 24,view: 'text', type: 'string',},
};
