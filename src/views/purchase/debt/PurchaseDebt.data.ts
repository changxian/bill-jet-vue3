import {BasicColumn} from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '供应商名',
    align: "center",
    dataIndex: 'supplierName',
    width: 150,
    resizable: true,
  },
  {
    title: '进货欠款金额',
    align: "center",
    dataIndex: 'purchaseDebtAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '退货欠款金额',
    align: "center",
    dataIndex: 'returnDebtAmount',
    width: 100,
    resizable: true,
  }
];
