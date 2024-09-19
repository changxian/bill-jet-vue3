import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '产品名称',
    align:"center",
    dataIndex: 'packName'
   },
   {
    title: '产品类别(单机版/云端版)',
    align:"center",
    dataIndex: 'category'
   },
   {
    title: '产品类型(送货单版/进销存版)',
    align:"center",
    dataIndex: 'type'
   },
   {
    title: '支持企业数(单机1个公司、云端版支持4家公司切换开单)',
    align:"center",
    dataIndex: 'orgNum'
   },
   {
    title: '支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)',
    align:"center",
    dataIndex: 'accountNum'
   },
   {
    title: '支持商品数量()',
    align:"center",
    dataIndex: 'goodsNum'
   },
   {
    title: '产品标准价格',
    align:"center",
    dataIndex: 'price'
   },
   {
    title: '产品折扣',
    align:"center",
    dataIndex: 'discounted'
   },
   {
    title: '产品折扣价',
    align:"center",
    dataIndex: 'discountedPrice'
   },
   {
    title: '规格',
    align:"center",
    dataIndex: 'specification'
   },
   {
    title: '规格单位',
    align:"center",
    dataIndex: 'specificationUnit'
   },
   {
    title: '产品启用状态(1 启用, 0 停用)',
    align:"center",
    dataIndex: 'status'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "产品名称",
      field: 'packName',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "产品编码",
      field: 'packCode',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "产品类别(单机版/云端版)",
      field: 'category',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "产品类型(送货单版/进销存版)",
      field: 'type',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "支持企业数(单机1个公司、云端版支持4家公司切换开单)",
      field: 'orgNum',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)",
      field: 'accountNum',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "支持商品数量()",
      field: 'goodsNum',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "产品标准价格",
      field: 'price',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "产品折扣",
      field: 'discounted',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "产品折扣价",
      field: 'discountedPrice',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "规格",
      field: 'specification',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "规格单位",
      field: 'specificationUnit',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "产品启用状态(1 启用, 0 停用)",
      field: 'status',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
	{
      label: "产品描述",
      field: 'discription',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "备注说明",
      field: 'remarks',
      component: 'Input',
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '产品名称',
    field: 'packName',
    component: 'Input',
  },
  {
    label: '产品类别(单机版/云端版)',
    field: 'category',
    component: 'Input',
  },
  {
    label: '产品类型(送货单版/进销存版)',
    field: 'type',
    component: 'Input',
  },
  {
    label: '支持企业数(单机1个公司、云端版支持4家公司切换开单)',
    field: 'orgNum',
    component: 'InputNumber',
  },
  {
    label: '支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)',
    field: 'accountNum',
    component: 'InputNumber',
  },
  {
    label: '支持商品数量()',
    field: 'goodsNum',
    component: 'InputNumber',
  },
  {
    label: '产品标准价格',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '产品折扣',
    field: 'discounted',
    component: 'InputNumber',
  },
  {
    label: '产品折扣价',
    field: 'discountedPrice',
    component: 'InputNumber',
  },
  {
    label: '规格',
    field: 'specification',
    component: 'InputNumber',
  },
  {
    label: '规格单位',
    field: 'specificationUnit',
    component: 'Input',
  },
  {
    label: '产品描述',
    field: 'discription',
    component: 'Input',
  },
  {
    label: '备注说明',
    field: 'remarks',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  packName: {title: '产品名称',order: 0,view: 'text', type: 'string',},
  category: {title: '产品类别(单机版/云端版)',order: 2,view: 'text', type: 'string',},
  type: {title: '产品类型(送货单版/进销存版)',order: 3,view: 'text', type: 'string',},
  orgNum: {title: '支持企业数(单机1个公司、云端版支持4家公司切换开单)',order: 4,view: 'number', type: 'number',},
  accountNum: {title: '支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)',order: 5,view: 'number', type: 'number',},
  goodsNum: {title: '支持商品数量()',order: 6,view: 'number', type: 'number',},
  price: {title: '产品标准价格',order: 7,view: 'number', type: 'number',},
  discounted: {title: '产品折扣',order: 8,view: 'number', type: 'number',},
  discountedPrice: {title: '产品折扣价',order: 9,view: 'number', type: 'number',},
  specification: {title: '规格',order: 10,view: 'number', type: 'number',},
  specificationUnit: {title: '规格单位',order: 11,view: 'text', type: 'string',},
  status: {title: '产品启用状态(1 启用, 0 停用)',order: 12,view: 'number', type: 'number',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}