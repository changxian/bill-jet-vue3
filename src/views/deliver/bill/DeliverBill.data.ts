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
//送货单列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
  },
  {
    title: '公司',
    align: 'center',
    dataIndex: 'companyName',
  },
  {
    title: '客户',
    align: 'center',
    dataIndex: 'custName',
  },
  {
    title: '单类型',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '本单数量',
    align: 'center',
    dataIndex: 'count',
  },
  {
    title: '本单金额',
    align: 'center',
    dataIndex: 'amount',
  },
  {
    title: '付款金额',
    align: 'center',
    dataIndex: 'paymentAmount',
  },
  {
    title: '优惠金额',
    align: 'center',
    dataIndex: 'discountAmount',
  },
  {
    title: '欠款金额',
    align: 'center',
    dataIndex: 'debtAmount',
  },
  {
    title: '送货车号',
    align: 'center',
    dataIndex: 'careNo',
  },
  {
    title: '合同号',
    align: 'center',
    dataIndex: 'contractCode',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '开票',
    align: 'center',
    dataIndex: 'invoiceStatus_dictText',
  },
  {
    title: '制单员',
    align: 'center',
    dataIndex: 'createName',
  },
  {
    title: '业务员',
    align: 'center',
    dataIndex: 'userName_dictText',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
  {
    title: '客户电话',
    align: 'center',
    dataIndex: 'custPhone',
  },
  {
    title: '客户联系人',
    align: 'center',
    dataIndex: 'custContact',
  },
  {
    title: '客户地址',
    align: 'center',
    dataIndex: 'custAddress',
  },
  {
    title: '往期欠款金额',
    align: 'center',
    dataIndex: 'hisDebtAmount',
  },
  {
    title: '成本',
    align: 'center',
    dataIndex: 'costAmount',
  },
  {
    title: '利润',
    align: 'center',
    dataIndex: 'profitAmount',
  },
];
// 开单页面商品列表数据
export const detailColumns: BasicColumn[] = [
  {
    title: '商品编号(条码)',
    align: 'center',
    dataIndex: 'goodsCode',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'goodsName',
  },
  {
    title: '规格型号',
    align: 'center',
    dataIndex: 'goodsType',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'goodsUnit',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'count',
  },
  {
    title: '单价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'costAmount',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
