import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '模板类型',
    align: 'center',
    dataIndex: 'category',
  },
  {
    title: '模板名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '模板名称',
    field: 'name',
    component: 'Input', //TODO 范围查询
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '模板类型',
    field: 'category',
    component: 'InputNumber',
  },
  {
    label: '模板名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
