import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';

import {getAutoScrollContainer} from '/@/utils/common/compUtils';
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
    title: '套餐类型',
    align:"center",
    dataIndex: 'packTypeName'
   },
   {
    title: '购买数量',
    align:"center",
    dataIndex: 'packNum'
   },
   {
    title: '购买单位',
    align:"center",
    dataIndex: 'packUnitName'
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
    label: '套餐编码',
    field: 'packCode',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '套餐名',
    field: 'packName',
    component: 'Input',
  dynamicDisabled:true
  },
  // {
  //   label: '套餐类型(送货单版/进销存版)',
  //   field: 'packType',
  //   component: 'InputNumber',dynamicDisabled:true
  // },
  {
    label: '购买数量',
    field: 'packNum',
    component: 'InputNumber',
  },
  {
    label: '购买单位',
    field: 'packUnit',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"",
        options:[{value:"1",label:"月"},{value:"2",label:"年"}]
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
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  // {
  //   field: 'beginDate',
  //   label: '开始时间',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     getPopupContainer: getAutoScrollContainer,
  //   },
  // },
  // {
  //   field: 'endDate',
  //   label: '结束时间',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     getPopupContainer: getAutoScrollContainer,
  //   },
  // },

  //  {
  //   label: '版本号',
  //   field: 'version',
  //   component: 'InputNumber',
  // },
	// {
	//   label: '',
	//   field: 'id',
	//   component: 'Input',
	//   show: false
	// },
];


