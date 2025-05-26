import { BasicColumn, FormSchema} from '/@/components/Table';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const billSetting = userStore.getBillSetting;
//查询数据
export const searchFormSchema: FormSchema[] = [
  // Input 是精确查询, JInput 是模糊查询
  {
    label: '搜索条件',
    field: 'goodsName',
    component: 'JInput',
    colProps: { span: 10 },
  },
  /*{
    label: '编号(条码)',
    field: 'code',
    component: 'JInput',
    //colProps: {span: 6},
  },
  {
    label: '名称',
    field: 'name',
    component: 'JInput',
    //colProps: {span: 6},
  },
  {
    label: '规格型号',
    field: 'type',
    component: 'JInput',
    //colProps: {span: 6},
  },*/
  // {
  //   label: '状态',
  //   field: 'status',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'jxc_goods_status',
  //     placeholder: '请选择',
  //     // 删除请选择选项
  //     showChooseOption: false,
  //     stringToNumber: false,
  //   },
  // },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    // TODO 主键隐藏字段，目前写死为ID
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '商品类别',
    field: 'categoryId',
    component: 'JDictSelectTag',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择商品类型!' }];
    },
    componentProps: {
      dictCode: 'jxc_goods_category,name,id,status=0 order by sort asc',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: false,
    },
  },
  {
    label: '商品编号',
    field: 'code',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入商品编号!' }];
    },
  },
  {
    label: '商品名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入商品名称!' }];
    },
  },
  {
    label: '规格型号',
    field: 'type',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入规格型号!' }];
    },
  },
  {
    label: '面积',
    field: 'area',
    component: 'InputNumber',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'JDictSelectTag',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择单位!' }];
    },
    componentProps: {
      dictCode: 'jxc_goods_units,name,id,status=0 order by sort asc',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: false,
    },
  },
  {
    label: '进价',
    field: 'cost',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入进价!' }];
    },
  },
  {
    label: '售价',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入售价!' }];
    },
  },
  {
    label: '库存数量',
    field: 'stock',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入当前库存数量!' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_goods_status',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: false,
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
// 列表数据
export function getGoodsColumns(billType){
  const goodsColumns: BasicColumn[] = [
    {
      title: '类别',
      align: 'center',
      dataIndex: 'categoryName',
      width: 100,
      resizable: true,
    },
    {
      title: '编号',
      align: 'center',
      dataIndex: 'goodsCode',
      width: 150,
      resizable: true,
      ifShow: billSetting.showGoodsCodeCol || false,
    },
    {
      title: '名称',
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
      dataIndex: 'unit',
      width: 80,
      resizable: true,
    },
    {
      title: '进货价',
      align: 'center',
      dataIndex: 'cost',
      width: 80,
      resizable: true,
    },
    {
      title: '销售价',
      align: 'center',
      dataIndex: 'price',
      width: 80,
      resizable: true,
    },
    {
      title: '客户价',
      align: 'center',
      dataIndex: 'custPrice',
      width: 80,
      resizable: true,
      ifShow: billType === 'deliver',
    },
    {
      title: '库存',
      align: 'center',
      dataIndex: 'stock',
      width: 80,
      resizable: true,
    },
    {
      title: '重量',
      align: 'center',
      dataIndex: 'weight',
      width: 100,
      resizable: true,
      ifShow: billSetting.showWeightCol || false,
    },
    {
      title: '长',
      align: 'center',
      dataIndex: 'length',
      width: 100,
      resizable: true,
      ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
    },
    {
      title: '宽',
      align: 'center',
      dataIndex: 'width',
      width: 100,
      resizable: true,
      ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
    },
    {
      title: '高',
      align: 'center',
      dataIndex: 'height',
      width: 100,
      resizable: true,
      ifShow: billSetting.showLengthWidthHeightCol || billSetting.showLengthWidthCol || false,
    },
    {
      title: '面积',
      align: 'center',
      dataIndex: 'area',
      width: 100,
      resizable: true,
      ifShow: billSetting.showAreaCol || false,
    },
    {
      title: '体积',
      align: 'center',
      dataIndex: 'volume',
      width: 100,
      resizable: true,
      ifShow: billSetting.showVolumeCol || false,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status_dictText',
      width: 80,
      resizable: true,
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: 150,
      resizable: true,
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      width: 120,
      resizable: true,
    },
  ];
  return goodsColumns;
}
