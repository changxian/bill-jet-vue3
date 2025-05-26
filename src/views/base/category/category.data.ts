import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '分类名称',
    dataIndex: 'name',
    width: 450,
    align: 'left',
  },
  {
    title: '是否内置',
    dataIndex: 'def_dictText',
    align: 'left',
  },
  {
    title: '启用状态',
    dataIndex: 'status_dictText',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '分类名称',
    field: 'name',
    component: 'JInput',
    colProps: { span: 5 },
  },
  {
    label: '是否内置',
    field: 'def',
    component: 'JDictSelectTag',
    componentProps: {
      /* 值说明：表名,显示字段，取值字段，where后加的sql */
      // dictCode: "sys_dict_item,item_text,item_value,dict_id='1834250119016280066' order by sort_order asc",
      dictCode: 'yn',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: true,
    },
    colProps: { span: 5 },
  },
  {
    label: '启用状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_status',
      showChooseOption: false,
    },
    colProps: { span: 5 },
  },
  // {
  //   label: '编码',
  //   field: 'code',
  //   component: 'JInput',
  //   colProps: { span: 6 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '父级节点',
    field: 'parentId',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        value: 'key',
      },
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: () => document.body,
    },
    show: ({ values }) => {
      return values.pid !== '0';
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '分类名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  /* 从字典中取 */
  {
    label: '是否内置',
    field: 'def',
    component: 'JDictSelectTag',
    defaultValue: '0',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择是否内置!' }];
    },
    componentProps: {
      dictCode: 'yn',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
    },
    // colProps: { span: 14 },
  },
  {
    label: '启用状态',
    field: 'status',
    component: 'JDictSelectTag',
    defaultValue: '1',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择启用状态!' }];
    },
    componentProps: {
      dictCode: 'jxc_status',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
    },
    // colProps: { span: 14 },
  },
];
