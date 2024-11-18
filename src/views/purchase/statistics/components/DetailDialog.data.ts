import {BasicColumn} from '/@/components/Table';
 

export const supplierCol = {
    title: '供应商',
    align: "center",
    dataIndex: 'supplierName'
}
export const userCol = {
    title: '用户',
    align: 'center',
    dataIndex: 'userName',
}

export const careNoCol =  {
    title: '车号',
    align: 'center',
    dataIndex: 'careNo',
}

//列表数据
export const columns: BasicColumn[] = [

  {
    title: '日期',
    align: "center",
    dataIndex: 'repayDate'
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
    title: '供应商',
    align: "center",
    dataIndex: 'supplierName'
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
    title: '金额',
    align: 'center',
    dataIndex: 'amount',
   },
   {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
   }
 
];

//列表数据
export const totalColumns: BasicColumn[] = [
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
      dataIndex: 'countSubtotal',
     },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amountSubtotal',
  }
  ];
  
