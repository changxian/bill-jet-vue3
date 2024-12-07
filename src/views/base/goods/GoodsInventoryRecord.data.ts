import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '租户id',
    align:"center",
    dataIndex: 'tenantId'
   },
   {
    title: '企业id',
    align:"center",
    dataIndex: 'departId'
   },
   {
    title: '企业名称',
    align:"center",
    dataIndex: 'departName'
   },
   {
    title: '关联开单id',
    align:"center",
    dataIndex: 'billId'
   },
   {
    title: '商品id',
    align:"center",
    dataIndex: 'productId'
   },
   {
    title: '商品名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '规格型号',
    align:"center",
    dataIndex: 'type'
   },
   {
    title: '单位',
    align:"center",
    dataIndex: 'unit'
   },
   {
    title: '变动方向（1：增加库存，2：减少库存）',
    align:"center",
    dataIndex: 'mode1'
   },
   {
    title: '变动类型（110：初始入库，120：进货增加，130：销售退货增加，140：调入增加，150：报溢增加，190：其他增加；210：销货减少，220：进货退货减少 ，230：调出减少，240：报损减少，290：其他减少）',
    align:"center",
    dataIndex: 'mode2'
   },
   {
    title: '当前库存量',
    align:"center",
    dataIndex: 'stock'
   },
   {
    title: '交易数量',
    align:"center",
    dataIndex: 'quantity'
   },
   {
    title: '是否回滚(1是，0否)',
    align:"center",
    dataIndex: 'rollBack'
   },
   {
    title: '交易状态：增加/锁定库存/减少',
    align:"center",
    dataIndex: 'status'
   },
   {
    title: '交易后库存量',
    align:"center",
    dataIndex: 'stock2'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '租户id',
    field: 'tenantId',
    component: 'InputNumber',
  },
  {
    label: '企业id',
    field: 'departId',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'departName',
    component: 'Input',
  },
  {
    label: '关联开单id',
    field: 'billId',
    component: 'Input',
  },
  {
    label: '商品id',
    field: 'productId',
    component: 'Input',
  },
  {
    label: '商品名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '规格型号',
    field: 'type',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '变动方向（1：增加库存，2：减少库存）',
    field: 'mode1',
    component: 'InputNumber',
  },
  {
    label: '变动类型（110：初始入库，120：进货增加，130：销售退货增加，140：调入增加，150：报溢增加，190：其他增加；210：销货减少，220：进货退货减少 ，230：调出减少，240：报损减少，290：其他减少）',
    field: 'mode2',
    component: 'InputNumber',
  },
  {
    label: '当前库存量',
    field: 'stock',
    component: 'InputNumber',
  },
  {
    label: '交易数量',
    field: 'quantity',
    component: 'InputNumber',
  },
  {
    label: '是否回滚(1是，0否)',
    field: 'rollBack',
    component: 'InputNumber',
  },
  {
    label: '交易状态：增加/锁定库存/减少',
    field: 'status',
    component: 'InputNumber',
  },
  {
    label: '交易后库存量',
    field: 'stock2',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
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
  tenantId: {title: '租户id',order: 0,view: 'number', type: 'number',},
  departId: {title: '企业id',order: 1,view: 'text', type: 'string',},
  departName: {title: '企业名称',order: 2,view: 'text', type: 'string',},
  billId: {title: '关联开单id',order: 3,view: 'text', type: 'string',},
  productId: {title: '商品id',order: 4,view: 'text', type: 'string',},
  name: {title: '商品名称',order: 5,view: 'text', type: 'string',},
  type: {title: '规格型号',order: 6,view: 'text', type: 'string',},
  unit: {title: '单位',order: 7,view: 'text', type: 'string',},
  mode1: {title: '变动方向（1：增加库存，2：减少库存）',order: 8,view: 'number', type: 'number',},
  mode2: {title: '变动类型（110：初始入库，120：进货增加，130：销售退货增加，140：调入增加，150：报溢增加，190：其他增加；210：销货减少，220：进货退货减少 ，230：调出减少，240：报损减少，290：其他减少）',order: 9,view: 'number', type: 'number',},
  stock: {title: '当前库存量',order: 10,view: 'number', type: 'number',},
  quantity: {title: '交易数量',order: 11,view: 'number', type: 'number',},
  rollBack: {title: '是否回滚(1是，0否)',order: 12,view: 'number', type: 'number',},
  status: {title: '交易状态：增加/锁定库存/减少',order: 13,view: 'number', type: 'number',},
  stock2: {title: '交易后库存量',order: 14,view: 'number', type: 'number',},
  remark: {title: '备注',order: 15,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}