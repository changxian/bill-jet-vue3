import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
  },
  {
    title: '单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '欠款类型',
    align: 'center',
    dataIndex: 'type_dictText',
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
    title: '制单员',
    align: 'center',
    dataIndex: 'operatorName',
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
    title: '业务员',
    align: 'center',
    dataIndex: 'userName',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
