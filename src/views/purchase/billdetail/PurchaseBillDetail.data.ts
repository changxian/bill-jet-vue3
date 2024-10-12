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
    title: '公司id',
    align:"center",
    dataIndex: 'companyId'
   },
   {
    title: '开单id',
    align:"center",
    dataIndex: 'billId'
   },
   {
    title: '单号',
    align:"center",
    dataIndex: 'billNo'
   },
   {
    title: '供应商/客户id',
    align:"center",
    dataIndex: 'supplierId'
   },
   {
    title: '商品类型id',
    align:"center",
    dataIndex: 'categoryId'
   },
   {
    title: '商品类别',
    align:"center",
    dataIndex: 'categoryName_dictText'
   },
   {
    title: '商品编号',
    align:"center",
    dataIndex: 'doogsCode'
   },
   {
    title: '商品名称',
    align:"center",
    dataIndex: 'doogsName'
   },
   {
    title: '规格型号',
    align:"center",
    dataIndex: 'doogsType'
   },
   {
    title: '单位',
    align:"center",
    dataIndex: 'doogsUnit'
   },
   {
    title: '进货价',
    align:"center",
    dataIndex: 'costAmount'
   },
   {
    title: '金额',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '数量',
    align:"center",
    dataIndex: 'count'
   },
   {
    title: '业务员',
    align:"center",
    dataIndex: 'userName_dictText'
   },
   {
    title: '送货车号',
    align:"center",
    dataIndex: 'careNo'
   },
   {
    title: '版本',
    align:"center",
    dataIndex: 'version'
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
    label: '公司id',
    field: 'companyId',
    component: 'Input',
  },
  {
    label: '开单id',
    field: 'billId',
    component: 'Input',
  },
  {
    label: '单号',
    field: 'billNo',
    component: 'Input',
  },
  {
    label: '供应商/客户id',
    field: 'supplierId',
    component: 'Input',
  },
  {
    label: '关联商品id',
    field: 'doogsId',
    component: 'Input',
  },
  {
    label: '商品类别',
    field: 'categoryName',
    component: 'JSelectUser',
    componentProps:{
    },
  },
  {
    label: '商品编号',
    field: 'doogsCode',
    component: 'Input',
  },
  {
    label: '商品名称',
    field: 'doogsName',
    component: 'Input',
  },
  {
    label: '规格型号',
    field: 'doogsType',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'doogsUnit',
    component: 'Input',
  },
  {
    label: '进货价',
    field: 'costAmount',
    component: 'InputNumber',
  },
  {
    label: '金额',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '数量',
    field: 'count',
    component: 'InputNumber',
  },
  {
    label: '业务员',
    field: 'userName',
    component: 'JSelectUser',
    componentProps:{
    },
  },
  {
    label: '送货车号',
    field: 'careNo',
    component: 'Input',
  },
  {
    label: '版本',
    field: 'version',
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
  companyId: {title: '公司id',order: 1,view: 'text', type: 'string',},
  billId: {title: '开单id',order: 2,view: 'text', type: 'string',},
  billNo: {title: '单号',order: 3,view: 'text', type: 'string',},
  supplierId: {title: '供应商/客户id',order: 4,view: 'text', type: 'string',},
  categoryId: {title: '商品类型id',order: 6,view: 'text', type: 'string',},
  categoryName: {title: '商品类别',order: 7,view: 'sel_user', type: 'string',},
  doogsCode: {title: '商品编号',order: 8,view: 'text', type: 'string',},
  doogsName: {title: '商品名称',order: 9,view: 'text', type: 'string',},
  doogsType: {title: '规格型号',order: 10,view: 'text', type: 'string',},
  doogsUnit: {title: '单位',order: 11,view: 'text', type: 'string',},
  costAmount: {title: '进货价',order: 12,view: 'number', type: 'number',},
  amount: {title: '金额',order: 13,view: 'number', type: 'number',},
  count: {title: '数量',order: 14,view: 'number', type: 'number',},
  userName: {title: '业务员',order: 15,view: 'sel_user', type: 'string',},
  careNo: {title: '送货车号',order: 16,view: 'text', type: 'string',},
  version: {title: '版本',order: 18,view: 'number', type: 'number',},
  remark: {title: '备注',order: 19,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}