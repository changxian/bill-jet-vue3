import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名',
    align: 'center',
    dataIndex: 'custName',
    width: 150,
    resizable: true,
  },
  {
    title: '销售欠款金额',
    align: 'center',
    dataIndex: 'deliverDebtAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '退货欠款金额',
    align: 'center',
    dataIndex: 'returnDebtAmount',
    width: 100,
    resizable: true,
  },
];
