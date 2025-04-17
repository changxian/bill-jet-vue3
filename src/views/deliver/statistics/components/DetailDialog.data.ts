import { BasicColumn } from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;
const goodsCodeTitle = ref('');
const goodsNameTitle = ref('');
const goodsTypeTitle = ref('');
const priceTitle = ref('');
const countTitle = ref('');
const remarkTitle = ref('');
const lengthTitle = ref('');
const widthTitle = ref('');
const heightTitle = ref('');
const weightTitle = ref('');
const areaTitle = ref('');
const volumeTitle = ref('');

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
    if (item.fieldName === 'price') {
      priceTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'count') {
      countTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'remark') {
      remarkTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'length') {
      lengthTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'width') {
      widthTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'height') {
      heightTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'weight') {
      weightTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'area') {
      areaTitle.value = item.fieldTitle;
    }
    if (item.fieldName === 'volume') {
      volumeTitle.value = item.fieldTitle;
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

export const custCol = {
  title: '客户',
  align: 'center',
  dataIndex: 'custName',
  width: 150,
  resizable: true,
};
export const userCol = {
  title: '业务员',
  align: 'center',
  dataIndex: 'userName',
  width: 100,
  resizable: true,
};
export const operatorCol = {
  title: '用户',
  align: 'center',
  dataIndex: 'operatorName',
  width: 100,
  resizable: true,
};
export const careNoCol = {
  title: '车号',
  align: 'center',
  dataIndex: 'careNo',
  width: 100,
  resizable: true,
};
export const categoryCol = {
  title: '类别',
  align: 'center',
  dataIndex: 'categoryName',
  width: 100,
  resizable: true,
};

// 明细列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
    width: 150,
    resizable: true,
  },
  {
    title: '单号',
    align: 'center',
    dataIndex: 'billNo',
    width: 150,
    resizable: true,
  },
  {
    title: '单类型',
    align: 'center',
    dataIndex: 'type_dictText',
    slots: { customRender: 'type_dictText' },
    width: 100,
    resizable: true,
  },
  {
    title: '客户',
    align: 'center',
    dataIndex: 'custName',
    width: 150,
    resizable: true,
  },
  {
    title: '商品编号' + (goodsCodeTitle.value ? '(' + goodsCodeTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'goodsCode',
    width: 100,
    resizable: true,
    ifShow: billSetting.showGoodsCodeCol || false,
  },
  {
    title: '名称' + (goodsNameTitle.value ? '(' + goodsNameTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'goodsName',
    width: 100,
    resizable: true,
  },
  {
    title: '规格' + (goodsTypeTitle.value ? '(' + goodsTypeTitle.value + ')' : ''),
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
  {
    title: '进价',
    align: 'center',
    dataIndex: 'cost',
    width: 100,
    resizable: true,
  },
  {
    title: '售价' + (priceTitle.value ? '(' + priceTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'price',
    width: 100,
    resizable: true,
  },
  {
    title: '数量' + (countTitle.value ? '(' + countTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'count',
    width: 100,
    resizable: true,
  },
  {
    title: '重量' + (weightTitle.value ? '(' + weightTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'weight',
    width: 100,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '重量小计' + (weightColTitle.value ? '(' + weightColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'weightSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '长' + (lengthTitle.value ? '(' + lengthTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'length',
    width: 100,
    resizable: true,
    ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
  },
  {
    title: '宽' + (widthTitle.value ? '(' + widthTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'width',
    width: 100,
    resizable: true,
    ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
  },
  {
    title: '高' + (heightTitle.value ? '(' + heightTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'height',
    width: 100,
    resizable: true,
    ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
  },
  {
    title: '面积' + (areaTitle.value ? '(' + areaTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'area',
    width: 100,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '面积小计' + (areaColTitle.value ? '(' + areaColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'areaSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积' + (volumeTitle.value ? '(' + volumeTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'volume',
    width: 100,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '体积小计' + (volumeColTitle.value ? '(' + volumeColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'volumeSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amount',
    width: 100,
    resizable: true,
  },
  {
    title: '成本',
    align: 'center',
    dataIndex: 'costAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '利润',
    align: 'center',
    dataIndex: 'profitAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '备注' + (remarkTitle.value ? '(' + remarkTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'remark',
    width: 120,
    resizable: true,
  },
];

// 合计列表数据
export const totalColumns: BasicColumn[] = [
  {
    title: '商品编号' + (goodsCodeTitle.value ? '(' + goodsCodeTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'goodsCode',
    width: 100,
    resizable: true,
    ifShow: billSetting.showGoodsCodeCol || false,
  },
  {
    title: '商品名称' + (goodsNameTitle.value ? '(' + goodsNameTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'goodsName',
    width: 100,
    resizable: true,
  },
  {
    title: '规格' + (goodsTypeTitle.value ? '(' + goodsTypeTitle.value + ')' : '' ),
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
  {
    title: '数量合计',
    align: 'center',
    dataIndex: 'countSubtotal',
    width: 100,
    resizable: true,
  },
  {
    title: '重量合计' + (weightColTitle.value ? '(' + weightColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'weightSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '面积合计' + (areaColTitle.value ? '(' + areaColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'areaSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积合计' + (volumeColTitle.value ? '(' + volumeColTitle.value + ')' : '' ),
    align: 'center',
    dataIndex: 'volumeSubtotal',
    width: 100,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amountSubtotal',
    width: 100,
    resizable: true,
  },
  {
    title: '成本',
    align: 'center',
    dataIndex: 'costSubtotal',
    width: 100,
    resizable: true,
  },
  {
    title: '利润',
    align: 'center',
    dataIndex: 'profitSubtotal',
    width: 100,
    resizable: true,
  },
];
