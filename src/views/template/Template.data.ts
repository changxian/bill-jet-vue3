import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  // {
  //   title: '模板类型',
  //   align: 'center',
  //   dataIndex: 'category_dictText',
  // },
  {
    title: '模板名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '是否定制模板',
    align: 'center',
    dataIndex: 'type',
    slots: { customRender: 'type_dictText' },
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
    label: '模板名称',
    field: 'name',
    component: 'JInput', //TODO 范围查询
    //colProps: {span: 6},
  },
  {
    label: '模板类别',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'jxc_template_type',
      placeholder: '请模板类别',
    },
    //colProps: {span: 6},
  },
  // {
  //   label: '模板类型',
  //   field: 'category',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'jxc_template_category',
  //     placeholder: '请模板类型',
  //   },
  //   //colProps: {span: 6},
  // },
];
