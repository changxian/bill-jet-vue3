import { fields, cal, default_prot } from '../default';

const table2_1_3 = {
  tid: 'defaultModule.table2_1_3',
  field: 'table',
  title: '页合计5',
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
    if (data && currentPageGridRowsData && 0 < currentPageGridRowsData.length) {
      let price = cal(currentPageGridRowsData);
      let count = cal(currentPageGridRowsData, 'count');
      return (
        '<tr><td colspan="4" style="border: 1px solid; text-align: center;">合計金額</td>' +
        '<td>' +
        count +
        '</td>' +
        '<td></td>' +
        '<td>' +
        price +
        '</td>' +
        '<td></td></tr>'
      );
    }

    return '<tr><td colspan="4" style="border: 1px solid; text-align: center;">合計金額</td><td></td><td></td><td></td><td></td></tr>';
  },
  columns: [
    [
      {
        title: '產品編號',
        align: 'center',
        field: 'code',
        width: 40,
      },
      {
        title: '產品名稱',
        align: 'left',
        field: 'name',
        width: 130,
      },
      {
        title: '規格型號',
        field: 'spec',
        width: 40,
      },
      {
        title: '單位',
        field: 'unit',
        width: 30,
      },
      {
        title: '數量',
        field: 'count',
        width: 30,
      },
      {
        title: '單價',
        field: 'price',
        width: 50,
      },
      {
        title: '金額',
        field: 'amount',
        width: 50,
      },
      {
        title: '備註',
        field: 'remark',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table2_1_3 };
