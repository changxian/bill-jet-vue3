import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '类型名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '是否内置',
    align: 'center',
    dataIndex: 'def_dictText',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'delFlag_dictText',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '类型名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: '是否内置',
    field: 'def',
    component: 'JDictSelectTag',
    componentProps: {
      /* 值说明：表名,显示字段，取值字段，where后加的sql */
      dictCode: "sys_dict_item,item_text,item_value,dict_id='1834250119016280066' order by sort_order asc",
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: true,
    },
    colProps: { span: 5 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_delete_status',
      showChooseOption: false,
    },
    colProps: { span: 5 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '类型名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入类型名称!' }];
    },
    colProps: { span: 22 },
  },
  /* 从字典中取 */
  {
    label: '是否内置',
    field: 'def',
    component: 'JDictSelectTag',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择是否内置!' }];
    },
    componentProps: {
      // (这种是读redis缓存）
      // 默认是 sys_dict 表
      // dictCode: 'jxc_yes_no',

      // （这种是读库）
      /* 值说明：表名,显示字段，取值字段，where后加的sql */
      dictCode: "sys_dict_item,item_text,item_value,dict_id='1834250119016280066' order by sort_order asc",
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
    },
    colProps: { span: 14 },
  },
  {
    label: '状态',
    field: 'delFlag',
    component: 'JDictSelectTag',
    defaultValue: 0,
    componentProps: {
      dictCode: 'jxc_delete_status',
      placeholder: '请选择',
      // 删除请选择选项
      showChooseOption: false,
      stringToNumber: true,
    },
    colProps: { span: 14 },
  },
  /* 前端配置
  {
    field: 'def',
    component: 'Select',
    label: '是否内置',
    colProps: {
      span: 8,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入是否内置!' }];
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
          key: '1',
        },
        {
          label: '否',
          value: '1',
          key: '1',
        },
      ],
    },
  }, */
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  name: { title: '类型名称', order: 0, view: 'text', type: 'string' },
  def: { title: '是否内置', order: 1, view: 'text', type: 'string' },
  status: { title: '状态', order: 2, view: 'number', type: 'number' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
