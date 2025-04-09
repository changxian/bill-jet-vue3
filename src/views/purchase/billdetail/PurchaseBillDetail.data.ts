import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '开单单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '供应商id',
    align: 'center',
    dataIndex: 'supplierId_dictText',
  },
  {
    title: '商品类型',
    align: 'center',
    dataIndex: 'categoryName',
  },
  {
    title: '商品编号',
    align: 'center',
    dataIndex: 'goodsCode',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'goodsName'
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
    title: '进货价',
    align: 'center',
    dataIndex: 'costAmount',
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amount',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'count',
  },
  {
    title: '业务员id',
    align: 'center',
    dataIndex: 'userId'
  },
  {
    title: '业务员',
    align: 'center',
    dataIndex: 'userName',
  },
  {
    title: '送货车号',
    align: 'center',
    dataIndex: 'careNo',
  },
  {
    title: '版本',
    align: 'center',
    dataIndex: 'version',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
