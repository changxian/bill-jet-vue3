import { BasicColumn } from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;
const goodsCodeTitle = ref('');
const goodsNameTitle = ref('');
const goodsTypeTitle = ref('');
const countColTitle = ref('');
const weightColTitle = ref('');
const areaColTitle = ref('');
const volumeColTitle = ref('');
if (billSetting.dynaFieldsGroup['1']) {
  billSetting.dynaFieldsGroup['1'].forEach((item) => {
    // 商品编号
    if (item.fieldName === 'goodsCode') {
      goodsCodeTitle.value = item.fieldTitle;
    }
    // 商品名称
    if (item.fieldName === 'goodsName') {
      goodsNameTitle.value = item.fieldTitle;
    }
    // 商品类型
    if (item.fieldName === 'goodsType') {
      goodsTypeTitle.value = item.fieldTitle;
    }
    // 数量合计
    if (item.fieldName === 'count') {
      countColTitle.value = item.fieldTitle;
    }
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
  title: '数量合计' + (countColTitle.value ? ('(' + countColTitle.value + ')') : ''),
  align: 'center',
  dataIndex: 'countSubtotal',
  width: 100,
  resizable: true,
};
const weightCol = {
  title: '重量合计' + (weightColTitle.value ? ('(' + weightColTitle.value + ')') : ''),
  align: 'center',
  dataIndex: 'weightSubtotal',
  width: 100,
  resizable: true,
  ifShow: billSetting.showWeightCol || true,
};
const areaCol = {
  title: '面积合计' + (areaColTitle.value ? ('(' + areaColTitle.value + ')') : ''),
  align: 'center',
  dataIndex: 'areaSubtotal',
  width: 100,
  resizable: true,
  ifShow: billSetting.showAreaCol || false,
};
const volumeCol = {
  title: '体积合计' + (volumeColTitle.value ? ('(' + volumeColTitle.value + ')') : ''),
  align: 'center',
  dataIndex: 'volumeSubtotal',
  width: 100,
  resizable: true,
  ifShow: billSetting.showVolumeCol || false,
};
const amountCol = {
  title: '金额统计',
  align: 'center',
  dataIndex: 'amountSubtotal',
  width: 100,
  resizable: true,
};
const detailCol = {
  title: '明细',
  align: 'center',
  dataIndex: 'detail',
  width: 100,
  resizable: true,
  slots: { customRender: 'detail' },
};
const countTotalCol = {
  title: '合计',
  align: 'center',
  slots: { customRender: 'count' },
  dataIndex: 'countTotal',
  width: 100,
  resizable: true,
};
// 按商品统计
export const goodsCountColumns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'goodsName',
    width: 100,
    resizable: true,
  },
  {
    title: '编号',
    align: 'center',
    dataIndex: 'goodsCode',
    width: 100,
    resizable: true,
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'goodsType',
    width: 100,
    resizable: true,
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'goodsUnit',
    width: 100,
    resizable: true,
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
    width: 100,
    resizable: true,
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
    width: 150,
    resizable: true,
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
    width: 100,
    resizable: true,
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
    width: 100,
    resizable: true,
  },
  numCountCol,
  weightCol,
  areaCol,
  volumeCol,
  amountCol,
  detailCol,
  countTotalCol,
];
