import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '单位',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '系统内置',
    align: 'center',
    dataIndex: 'def_dictText',
  },
];
