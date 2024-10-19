import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';

const numCountCol =  {
    title: '数量统计',
    align: "center",
    dataIndex: 'numCount'
  }
  const amountCol =  {
    title: '金额统计',
    align: "center",
    dataIndex: 'amount'
  }
const detailCol =  {
    title: '明细',
    align: "center",
    dataIndex: 'detail',
    slots: { customRender: 'detail' },
  }
  const countCol =  {
    title: '合计',
    align: "center",
    slots: { customRender: 'count' },
    dataIndex: 'count'
  }
// 按商品统计
export const goodsCountColumns: BasicColumn[] = [
    {
        title: '名称',
        align: 'center',
        dataIndex: 'goodsName',
       },
    {
        title: '编号(条码)',
        align: 'center',
        dataIndex: 'goodsCode',
       },

       {
        title: '规格',
        align: 'center',
        dataIndex: 'goodsType',
       },
       {
        title: '单位',
        align: 'center',
        dataIndex: 'goodsUnit',
       },
    numCountCol,
    amountCol,
    detailCol,
    countCol
  ];
  
  // 按类别统计
export const typeCountColumns: BasicColumn[] = [
    {
        title: '类别',
        align: 'center',
        dataIndex: 'type',
       },
    numCountCol,
    amountCol,
    detailCol,
    countCol
  ];
  
    // 按供应商
export const supplierCountColumns: BasicColumn[] = [
    {
        title: '供应商',
        align: 'center',
        dataIndex: 'supplierName',
       },
    numCountCol,
    amountCol,
    detailCol,
    countCol
  ];
  
      // 按用户
export const userCountColumns: BasicColumn[] = [
    {
        title: '用户',
        align: 'center',
        dataIndex: 'userName',
       },
    numCountCol,
    amountCol,
    detailCol,
    countCol
  ];
// 按车号
export const careNoCountColumns: BasicColumn[] = [
    {
        title: '车号',
        align: 'center',
        dataIndex: 'careNo',
       },
    numCountCol,
    amountCol,
    detailCol,
    countCol
  ];
  
