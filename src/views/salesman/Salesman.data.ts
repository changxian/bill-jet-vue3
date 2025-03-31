import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '业务员姓名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'cellPhone',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remarks',
  },
];

// 高级查询数据
/*export const superQuerySchema = {
  name: {title: '业务员姓名',order: 0,view: 'text', type: 'string',},
  cellPhone: {title: '手机号',order: 1,view: 'text', type: 'string',},
  remarks: {title: '备注',order: 2,view: 'text', type: 'string',},
};*/
