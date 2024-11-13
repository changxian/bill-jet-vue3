import { BasicColumn } from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;

const numCountCol = {
  title: '数量合计',
  align: 'center',
  dataIndex: 'countSubtotal',
};
const amountCol = {
  title: '金额合计',
  align: 'center',
  dataIndex: 'amountSubtotal',
};
const weightCol = {
  title: '重量合计',
  align: 'center',
  dataIndex: 'weightSubtotal',
  ifShow: billSetting.showWeightCol,
};
const areaCol = {
  title: '面积合计',
  align: 'center',
  dataIndex: 'areaSubtotal',
  ifShow: billSetting.showAreaCol,
};
const volumeCol = {
  title: '体积合计',
  align: 'center',
  dataIndex: 'volumeSubtotal',
  ifShow: billSetting.showVolumeCol,
};
const costAmountCol = {
  title: '成本合计',
  align: 'center',
  dataIndex: 'costSubtotal',
};
const profitAmountCol = {
  title: '利润合计',
  align: 'center',
  dataIndex: 'profitSubtotal',
};
const detailCol = {
  title: '明细',
  align: 'center',
  dataIndex: 'id',
  slots: { customRender: 'detail' },
};
const countTotalCol = {
  title: '合计',
  align: 'center',
  slots: { customRender: 'count' },
  dataIndex: 'countTotal',
};

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
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
];

// 按类别统计
export const typeCountColumns: BasicColumn[] = [
  {
    title: '类别',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
  countTotalCol,
];

// 按客户
export const custCountColumns: BasicColumn[] = [
  {
    title: '客户',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
  countTotalCol,
];

// 按业务员
export const userNameCountColumns: BasicColumn[] = [
  {
    title: '业务员',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
  countTotalCol,
];

// 按用户
export const operatorCountColumns: BasicColumn[] = [
  {
    title: '用户',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
  countTotalCol,
];

// 按车号
export const careNoCountColumns: BasicColumn[] = [
  {
    title: '车号',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  costAmountCol,
  profitAmountCol,
  detailCol,
  countTotalCol,
];
