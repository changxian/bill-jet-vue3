import { fields, cal } from '../default';

const table2 = {
  tid: 'defaultModule.table2',
  field: 'table',
  title: '页小合计',
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
    // 算当前页金额小计
    debugger;
    let price = cal(currentPageGridRowsData);
    console.log(price);
    if (data && data['total']) {
      let price = cal(currentPageGridRowsData);
      return (
        '<tr><td colspan="5" style="border: 1px solid">合计金额（大写）：' + data['total'] + '</td><td colspan="3">小写：' + price + '</td></tr>'
      );
    }

    return '<tr><td colspan="5" style="border: 1px solid">合计金额（大写）：</td><td colspan="3">小写：</td></tr>';
  },
  columns: [
    [
      {
        title: '序号',
        align: 'center',
        field: 'seq',
        width: 30,
      },
      {
        title: '商品名称',
        align: 'left',
        field: 'name',
        width: 150,
      },
      {
        title: '规格',
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
        field: 'amount',
        width: 50,
      },
    ],
  ],
  ...fields.default_prot,
};

export { table2 };
