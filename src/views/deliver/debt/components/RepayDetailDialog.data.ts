import { BasicColumn } from '/@/components/Table';

// 状态  1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
export const statusList = [
  { value: '1', label: '未打印' },
  { value: '2', label: '已打印' },
  { value: '3', label: '签回' },
  { value: '4', label: '过账' },
  { value: '5', label: '审核' },
  { value: '6', label: '已开票' },
  { value: '9', label: '作废' },
];
// 开票状态（1未开、2不开、3已开、4无信息、9其他）
export const billStatusList = [
  { value: '1', label: '未开' },
  { value: '2', label: '不开' },
  { value: '3', label: '已开' },
  { value: '4', label: '无信息' },
  { value: '9', label: '其他' },
];
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '还款类型',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '还款单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'custName',
  },
  {
    title: '日期',
    align: 'center',
    dataIndex: 'repayDate',
  },
  {
    title: '抵欠金额',
    align: 'center',
    dataIndex: 'deductionAmount',
  },
  {
    title: '还款金额',
    align: 'center',
    dataIndex: 'repayAmount',
  },
  {
    title: '公司名称',
    align: 'center',
    dataIndex: 'collectCompanyName',
  },
  {
    title: '操作员',
    align: 'center',
    dataIndex: 'userName',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '欠款单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '欠款金额',
    align: 'center',
    dataIndex: 'debtAmount',
  },
  {
    title: '还款金额',
    align: 'center',
    dataIndex: 'repayAmount',
  },
];
