import {BasicColumn} from '/@/components/Table';


//列表数据
export const columns: BasicColumn[] = [
  
  {
    title: '日期',
    align: "center",
    dataIndex: 'repayDate'
  },
  {
    title: '供应商',
    align: "center",
    dataIndex: 'supplierName'
  }, 
  {
    title: '单号',
    align: "center",
    dataIndex: 'billNo'
  },
  {
    title: '单类型',
    align: "center",
    dataIndex: 'type_dictText'
  },

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
      title: '进货价',
      align: 'center',
      dataIndex: 'cost',
     },
     {
      title: '金额',
      align: 'center',
      dataIndex: 'costAmount',
     },
     {
      title: '合同号',
      align: 'center',
      dataIndex: 'contractCode',
     },
     {
      title: '制单员',
      align: 'center',
      dataIndex: 'userName',
     },
     {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
     }
  ];
  
