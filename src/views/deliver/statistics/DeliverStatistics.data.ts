import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';

const numCountCol =  {
    title: '数量统计',
    align: "center",
    dataIndex: 'count'
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
  const countTotalCol =  {
    title: '合计',
    align: "center",
    slots: { customRender: 'count' },
    dataIndex: 'countTotal'
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
    // countCol
  ];
  
  // 按类别统计
export const typeCountColumns: BasicColumn[] = [
    {
        title: '类别',
        align: 'center',
        dataIndex: 'name',
       },
    numCountCol,
    amountCol,
    detailCol,
    countTotalCol
  ];
  
    // 按客户
export const custCountColumns: BasicColumn[] = [
    {
        title: '客户',
        align: 'center',
        dataIndex: 'name',
       },
    numCountCol,
    amountCol,
    detailCol,
    countTotalCol
  ];
  
      // 按用户
export const userCountColumns: BasicColumn[] = [
    {
        title: '用户',
        align: 'center',
        dataIndex: 'name',
       },
    numCountCol,
    amountCol,
    detailCol,
    countTotalCol
  ];
// 按车号
export const careNoCountColumns: BasicColumn[] = [
    {
        title: '车号',
        align: 'center',
        dataIndex: 'name',
       },
    numCountCol,
    amountCol,
    detailCol,
    countTotalCol
  ];
  
