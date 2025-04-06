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

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
    width: 180,
    resizable: true,
  },
  {
    title: '供应商',
    align: 'center',
    dataIndex: 'supplierName',
    width: 180,
    resizable: true,
  },
  {
    title: '单号',
    align: 'center',
    dataIndex: 'billNo',
    width: 180,
    resizable: true,
  },
  {
    title: '单类型',
    align: 'center',
    dataIndex: 'type_dictText',
    width: 100,
    resizable: true,
    slots: { customRender: 'type_dictText' },
  },
  {
    title: '商品编号',
    align: 'center',
    dataIndex: 'goodsCode',
    width: 150,
    resizable: true,
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'goodsName',
    width: 150,
    resizable: true,
  },
  {
    title: '规格型号',
    align: 'center',
    dataIndex: 'goodsType',
    width: 100,
    resizable: true,
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'goodsUnit',
    width: 80,
    resizable: true,
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'count',
    width: 80,
    resizable: true,
  },
  {
    title: '进货价',
    align: 'center',
    dataIndex: 'cost',
    width: 100,
    resizable: true,
  },
  {
    title: '重量',
    align: 'center',
    dataIndex: 'weight',
    width: 80,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '重量小计(' + weightColTitle.value + ')',
    align: 'center',
    dataIndex: 'weightSubtotal',
    width: 120,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '长',
    align: 'center',
    dataIndex: 'length',
    width: 80,
    resizable: true,
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '宽',
    align: 'center',
    dataIndex: 'width',
    width: 80,
    resizable: true,
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '高',
    align: 'center',
    dataIndex: 'height',
    width: 80,
    resizable: true,
    ifShow: billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '面积',
    align: 'center',
    dataIndex: 'area',
    width: 80,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '面积小计(' + areaColTitle.value + ')',
    align: 'center',
    dataIndex: 'areaSubtotal',
    width: 120,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积',
    align: 'center',
    dataIndex: 'volume',
    width: 80,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '体积小计(' + volumeColTitle.value + ')',
    align: 'center',
    dataIndex: 'volumeSubtotal',
    width: 120,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'costAmount',
    width: 120,
    resizable: true,
  },
  {
    title: '合同号',
    align: 'center',
    dataIndex: 'contractCode',
    width: 120,
    resizable: true,
  },
  {
    title: '制单员',
    align: 'center',
    dataIndex: 'operatorName',
    width: 100,
    resizable: true,
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 150,
    resizable: true,
  },
];
