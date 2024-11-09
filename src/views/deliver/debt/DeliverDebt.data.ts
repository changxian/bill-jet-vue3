import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名',
    align: 'center',
    dataIndex: 'custName',
  },
  {
    title: '送货欠款金额',
    align: 'center',
    dataIndex: 'deliverDebtAmount',
  },
  {
    title: '退货欠款金额',
    align: 'center',
    dataIndex: 'returnDebtAmount',
  },
];
