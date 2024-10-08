import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import {rules} from '/@/utils/helper/validator';
// import {render} from '/@/utils/common/renderUtils';
// import {getWeekMonthQuarterYear} from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '商品类别',
    align: 'center',
    dataIndex: 'categoryId_dictText',
  },
  {
    title: '商品编号',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '商品名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '规格型号',
    align: 'center',
    dataIndex: 'type',
  },
  {
    title: '面积',
    align: 'center',
    dataIndex: 'area',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '库存数量',
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: '成本',
    align: 'center',
    dataIndex: 'cost',
  },
  {
    title: '售价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  // Input 是精确查询, JInput 是模糊查询
  {
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
