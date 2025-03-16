import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户名称',
    align: 'center',
    dataIndex: 'payerName',
  },
  {
    title: '交易类别',
    align: 'center',
    dataIndex: 'category_dictText',
  },
  {
    title: '套餐类别',
    align: 'center',
    dataIndex: 'packCategory_dictText',
  },
  {
    title: '套餐类型',
    align: 'center',
    dataIndex: 'packType_dictText',
  },
  {
    title: '编码',
    align: 'center',
    dataIndex: 'objectCode',
  },
  {
    title: '费用项名称',
    align: 'center',
    dataIndex: 'objectName',
  },
  {
    title: '交易时间',
    align: 'center',
    dataIndex: 'tradeDate',
  },
  {
    title: '交易金额',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '开票日期',
    align: 'center',
    dataIndex: 'invoiceTime',
  },
  {
    title: '开票状态',
    align: 'center',
    dataIndex: 'invoiceStatus_dictText',
  },
];
