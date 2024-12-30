import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '套餐编码',
    align:"center",
    dataIndex: 'packCode'
   },
   {
    title: '套餐名',
    align:"center",
    dataIndex: 'packName'
   },
   {
    title: '套餐类型(送货单版/进销存版)',
    align:"center",
    dataIndex: 'packType'
   },
   {
    title: '购买数量',
    align:"center",
    dataIndex: 'packNum'
   },
   {
    title: '购买单位(1 月 2年)',
    align:"center",
    dataIndex: 'packUnit_dictText'
   },
   {
    title: '购买时间',
    align:"center",
    dataIndex: 'buyDate'
   },
   {
    title: '开始时间',
    align:"center",
    dataIndex: 'beginDate'
   },
   {
    title: '结束时间',
    align:"center",
    dataIndex: 'endDate'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },

];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '套餐Id',
    field: 'packId',
    component: 'Input',
  },
  {
    label: '套餐编码',
    field: 'packCode',
    component: 'Input',
  },
  {
    label: '套餐名',
    field: 'packName',
    component: 'Input',
  },
  {
    label: '套餐类型(送货单版/进销存版)',
    field: 'packType',
    component: 'InputNumber',
  },
  {
    label: '购买数量',
    field: 'packNum',
    component: 'InputNumber',
  },
  {
    label: '购买单位(1 月 2年)',
    field: 'packUnit',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
  },
  {
    label: '购买时间',
    field: 'buyDate',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '开始时间',
    field: 'beginDate',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '结束时间',
    field: 'endDate',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '版本号',
    field: 'version',
    component: 'InputNumber',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];


