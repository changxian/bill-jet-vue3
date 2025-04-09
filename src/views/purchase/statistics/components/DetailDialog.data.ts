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
      weightColTitle.value = item.fieldTitle || '';
    }
    // 面积小计
    if (item.fieldName === 'areaSubtotal') {
      areaColTitle.value = item.fieldTitle || '';
    }
    // 体积小计
    if (item.fieldName === 'volumeSubtotal') {
      volumeColTitle.value = item.fieldTitle || '';
    }
  });
}

export const supplierCol = {
  title: '供应商',
  align: 'center',
  dataIndex: 'supplierName',
};
export const userCol = {
  title: '用户',
  align: 'center',
  dataIndex: 'userName',
};

export const careNoCol = {
  title: '车号',
  align: 'center',
  dataIndex: 'careNo',
};

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
  },
  {
    title: '单号',
    align: 'center',
    dataIndex: 'billNo',
  },
  {
    title: '单类型',
    align: 'center',
    dataIndex: 'type_dictText',
    slots: { customRender: 'type_dictText' },
  },
  {
    title: '供应商',
    align: 'center',
    dataIndex: 'supplierName',
  },
  {
    title: '商品编号',
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
    title: '进价',
    align: 'center',
    dataIndex: 'cost',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'count',
  },
  {
    title: '重量',
    align: 'center',
    dataIndex: 'weight',
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '重量小计(' + weightColTitle.value + ')',
    align: 'center',
    dataIndex: 'weightSubtotal',
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '长',
    align: 'center',
    dataIndex: 'length',
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '宽',
    align: 'center',
    dataIndex: 'width',
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '高',
    align: 'center',
    dataIndex: 'height',
    ifShow: billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '面积',
    align: 'center',
    dataIndex: 'area',
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '面积小计(' + areaColTitle.value + ')',
    align: 'center',
    dataIndex: 'areaSubtotal',
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积',
    align: 'center',
    dataIndex: 'volume',
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '体积小计(' + volumeColTitle.value + ')',
    align: 'center',
    dataIndex: 'volumeSubtotal',
    ifShow: billSetting.showVolumeCol || false,
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
  },
];

//列表数据
export const totalColumns: BasicColumn[] = [
  {
    title: '商品编号',
    align: 'center',
    dataIndex: 'goodsCode',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'goodsName',
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
  {
    title: '数量合计',
    align: 'center',
    dataIndex: 'countSubtotal',
  },
  {
    title: '重量合计(' + weightColTitle.value + ')',
    align: 'center',
    dataIndex: 'weightSubtotal',
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '面积合计(' + areaColTitle.value + ')',
    align: 'center',
    dataIndex: 'areaSubtotal',
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积合计(' + volumeColTitle.value + ')',
    align: 'center',
    dataIndex: 'volumeSubtotal',
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '金额合计',
    align: 'center',
    dataIndex: 'amountSubtotal',
  },
];
