import { BasicColumn } from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;
const weightColTitle = ref('');
const areaColTitle = ref('');
const volumeColTitle = ref('');
if (billSetting.dynaFieldsGroup['1']) {
  billSetting.dynaFieldsGroup['1'].forEach((item) => {
    // 重量小计
    if (item.fieldName === 'weightSubtotal') {
      weightColTitle.value = item.fieldTitle;
    }
    // 面积小计
    if (item.fieldName === 'areaSubtotal') {
      areaColTitle.value = item.fieldTitle;
    }
    // 体积小计
    if (item.fieldName === 'volumeSubtotal') {
      volumeColTitle.value = item.fieldTitle;
    }
  });
}
const numCountCol = {
  title: '数量统计',
  align: 'center',
  dataIndex: 'countSubtotal',
};
const weightCol = {
  title: '重量合计' + (weightColTitle.value?('(' + weightColTitle.value + ')'):''),
  align: 'center',
  dataIndex: 'weightSubtotal',
  ifShow: billSetting.showWeightCol || true,
};
const areaCol = {
  title: '面积合计'+(areaColTitle.value?('(' + areaColTitle.value + ')'):''),
  align: 'center',
  dataIndex: 'areaSubtotal',
  ifShow: billSetting.showAreaCol || false,
};
const volumeCol = {
  title: '体积合计'+(volumeColTitle.value?('(' + volumeColTitle.value + ')'):''),
  align: 'center',
  dataIndex: 'volumeSubtotal',
  ifShow: billSetting.showVolumeCol || false,
};
const amountCol = {
  title: '金额统计',
  align: 'center',
  dataIndex: 'amountSubtotal',
};
const detailCol = {
  title: '明细',
  align: 'center',
  dataIndex: 'detail',
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
    title: '编号',
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
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  detailCol,
  countTotalCol,
];

// 按供应商
export const supplierCountColumns: BasicColumn[] = [
  {
    title: '供应商',
    align: 'center',
    dataIndex: 'name',
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
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
  detailCol,
  countTotalCol,
];
