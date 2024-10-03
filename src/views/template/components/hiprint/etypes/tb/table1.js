import * as field from '../default';

const table1 = {
  tid: 'defaultModule.table1',
  field: 'table',
  title: '空白表格',
  type: 'table',
  options: {
    field: 'table',
    fields: field.fields,
  },
  columns: [
    [
      {
        title: '物料编号',
        align: 'left',
        field: 'code',
        width: 40,
      },
      {
        title: '物料名称',
        field: 'name',
        width: 150,
      },
      {
        title: '规格型号',
        field: 'spec',
        width: 40,
      },
      {
        title: '单位',
        field: 'unit',
        width: 30,
      },
      {
        title: '数量',
        field: 'count',
        width: 30,
      },
      {
        title: '单价',
        field: 'price',
        width: 50,
      },
      {
        title: '金额',
        field: 'amount',
        width: 50,
      },
      {
        title: '备注',
        field: 'remark',
        width: 50,
      },
    ],
  ],
  ...field.default_prot,
};

export { table1 };
