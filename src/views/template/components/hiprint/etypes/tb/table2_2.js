import { fields, cal, default_prot } from '../default';

const table2_2 = {
  tid: 'defaultModule.table2_2',
  field: 'table',
  title: '页小计',
  type: 'table',
  options: {
    field: 'table',
    fields: fields,
  },
  footerFormatter: function (options, rows, data, currentPageGridRowsData) {
    // options 配置信息
    // rows 总行数据信息
    // data 整个数据信息
    // currentPageGridRowsData 当前页的数据信息
    if (currentPageGridRowsData && 0 < currentPageGridRowsData.length) {
      let price = cal(currentPageGridRowsData);
      return '<tr><td colspan="6" style="border: 1px solid"></td><td colspan="4">页小计：￥' + price + '</td></tr>';
    }

    return '<tr><td colspan="6" style="border: 1px solid"></td><td colspan="4">页小计：￥</td></tr>';
  },
  columns: [
    [
      {
        title: '药品编码',
        align: 'center',
        field: 'code',
        width: 60,
      },
      {
        title: '药品名称',
        align: 'left',
        field: 'name',
        width: 120,
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
        title: '产地',
        field: 'firmAddress',
        width: 70,
      },
      {
        title: '批号',
        field: 'batchNum',
        width: 70,
      },
      {
        title: '零售价',
        field: 'retailPrice',
        width: 70,
      },
      {
        title: '生产日期',
        field: 'productDate',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table2_2 };
