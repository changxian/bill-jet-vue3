import { BasicColumn } from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;
const countColTitle = ref('');
const weightColTitle = ref('');
const areaColTitle = ref('');
const volumeColTitle = ref('');
if (billSetting.dynaFieldsGroup['1']) {
  billSetting.dynaFieldsGroup['1'].forEach((item) => {
    // 重量小计
    if (item.fieldName === 'count') {
      countColTitle.value = item.fieldTitle || '';
    }
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

// 状态  1未打印、2已打印、3签回、4过账、5审核、6已开票、9作废
export const statusList = [
  { value: '1', label: '未打印' },
  { value: '2', label: '已打印' },
  { value: '3', label: '签回' },
  { value: '4', label: '过账' },
  { value: '5', label: '审核' },
  { value: '6', label: '已开票' },
  { value: '9', label: '作废' },
];
// 开票状态（1未开、2不开、3已开、4无信息、9其他）
export const billStatusList = [
  { value: '1', label: '未开' },
  { value: '2', label: '不开' },
  { value: '3', label: '已开' },
  { value: '4', label: '无信息' },
  { value: '9', label: '其他' },
];
//销售单列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'billDate',
    width: 150,
    resizable: true,
  },
  {
    title: '公司',
    align: 'center',
    dataIndex: 'companyName',
    width: 150,
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
    title: '单类型',
    align: 'center',
    dataIndex: 'type_dictText',
    slots: { customRender: 'type_dictText' },
    width: 100,
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
    title: '数量合计' + (countColTitle.value ? '(' + countColTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'count',
    width: 100,
    resizable: true,
  },
  {
    title: '本单金额',
    align: 'center',
    dataIndex: 'amount',
    width: 100,
    resizable: true,
  },
  {
    title: '付款金额',
    align: 'center',
    dataIndex: 'paymentAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '折扣率',
    align: 'center',
    dataIndex: 'discount',
    width: 100,
    resizable: true,
  },
  {
    title: '优惠金额',
    align: 'center',
    dataIndex: 'discountAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '欠款金额',
    align: 'center',
    dataIndex: 'debtAmount',
    width: 100,
    resizable: true,
  },
  {
    title: '重量合计' + (weightColTitle.value ? '(' + weightColTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'weight',
    defaultHidden: !billSetting.showWeightCol,
    ifShow: billSetting.showWeightCol || false,
    width: 100,
    resizable: true,
  },
  {
    title: '面积合计' + (areaColTitle.value ? '(' + areaColTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'area',
    defaultHidden: !billSetting.showAreaCol,
    ifShow: billSetting.showAreaCol || false,
    width: 100,
    resizable: true,
  },
  {
    title: '体积合计' + (volumeColTitle.value ? '(' + volumeColTitle.value + ')' : ''),
    align: 'center',
    dataIndex: 'volume',
    defaultHidden: !billSetting.showVolumeCol,
    ifShow: billSetting.showVolumeCol || false,
    width: 100,
    resizable: true,
  },
  {
    title: '送货车号',
    align: 'center',
    dataIndex: 'careNo',
    width: 100,
    resizable: true,
  },
  {
    title: '合同号',
    align: 'center',
    dataIndex: 'contractCode',
    width: 100,
    resizable: true,
  },
  {
    title: '送货人姓名',
    align: 'center',
    dataIndex: 'deliveryBy',
    width: 100,
    resizable: true,
  },
  {
    title: '送货人电话',
    align: 'center',
    dataIndex: 'deliveryTel',
    width: 100,
    resizable: true,
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
    slots: { customRender: 'status_dictText' },
    width: 100,
    resizable: true,
  },
  {
    title: '开票',
    align: 'center',
    dataIndex: 'invoiceStatus_dictText',
    width: 100,
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
    title: '业务员',
    align: 'center',
    dataIndex: 'userName',
    width: 100,
    resizable: true,
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 100,
    resizable: true,
  },
  {
    title: '客户电话',
    align: 'center',
    dataIndex: 'custPhone',
    width: 100,
    resizable: true,
  },
  {
    title: '客户联系人',
    align: 'center',
    dataIndex: 'custContact',
    width: 100,
    resizable: true,
  },
  {
    title: '客户地址',
    align: 'center',
    dataIndex: 'custAddress',
    width: 150,
    resizable: true,
  },
  /*{
    title: '往期欠款金额',
    align: 'center',
    dataIndex: 'hisDebtAmount',
    width: 100,
    resizable: true,
  },*/
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
];
// 开单页面商品列表数据
export const detailColumns: BasicColumn[] = [
  {
    title: '编号',
    align: 'center',
    dataIndex: 'goodsCode',
    width: 100,
    resizable: true,
    ifShow: billSetting.showGoodsCodeCol || false,
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'goodsName',
    width: 100,
    resizable: true,
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'goodsType',
    width: 80,
    resizable: true,
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'goodsUnit',
    width: 60,
    resizable: true,
  },
  {
    title: '单价',
    align: 'center',
    dataIndex: 'price',
    width: 60,
    resizable: true,
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'count',
    width: 60,
    resizable: true,
  },
  {
    title: '重量',
    align: 'center',
    dataIndex: 'weight',
    width: 60,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '重量小计(' + weightColTitle.value + ')',
    align: 'center',
    dataIndex: 'weightSubtotal',
    width: 80,
    resizable: true,
    ifShow: billSetting.showWeightCol || false,
  },
  {
    title: '长',
    align: 'center',
    dataIndex: 'length',
    width: 60,
    resizable: true,
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '宽',
    align: 'center',
    dataIndex: 'width',
    width: 60,
    resizable: true,
    ifShow: billSetting.showLengthWidthCol || billSetting.showLengthWidthHeightCol || false,
  },
  {
    title: '高',
    align: 'center',
    dataIndex: 'height',
    width: 60,
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
    width: 80,
    resizable: true,
    ifShow: billSetting.showAreaCol || false,
  },
  {
    title: '体积',
    align: 'center',
    dataIndex: 'volume',
    width: 60,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '体积小计(' + volumeColTitle.value + ')',
    align: 'center',
    dataIndex: 'volumeSubtotal',
    width: 80,
    resizable: true,
    ifShow: billSetting.showVolumeCol || false,
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amount',
    width: 60,
    resizable: true,
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 100,
    resizable: true,
  },
];
