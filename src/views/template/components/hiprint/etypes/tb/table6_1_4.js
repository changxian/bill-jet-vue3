import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_1_4 = {
  tid: 'defaultModule.table6_1_4',
  field: 'table',
  title: '尾页合计',
  type: 'table',
  options: {
    field: 'table',
    fields: fields,
  },
  footerFormatter: function (options, rows, data, currentPageGridRowsData) {
    if (data && currentPageGridRowsData && currentPageGridRowsData.length > 0) {
      let amount = cal(currentPageGridRowsData);
      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        let total = data['total'] ?? 0;
        let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });
        return (
          '<tr><td> 页小计：' + amount + '</td>' +
          '<td colspan="5" style="text-align: right">合计金额（大写）：' + capital + '</td>' +
          '<td style="text-align: center">' + total + '</td>' +
          '<td></td>' +
          '</tr>'
        );
      }
      return '<tr><td colspan="8" style="text-align: left">页小计：' + amount + '</td></tr>';
    }
    return (
      '<tr><td>页小计：</td>' +
      '<td colspan="5" style="text-align: right">合计金额（大写）：</td>' +
      '<td style="text-align: center">0</td>' +
      '<td></td>' +
      '</tr>'
    );
  },
  columns: [
    [
      {
        title: '货号',
        align: 'center',
        field: 'code',
        width: 30,
      },
      {
        title: '名称',
        align: 'center',
        field: 'name',
        width: 80,
      },
      {
        title: '规格',
        align: 'center',
        field: 'spec',
        width: 40,
      },
      {
        title: '单位',
        align: 'center',
        field: 'unit',
        width: 30,
      },
      {
        title: '数量',
        align: 'center',
        field: 'count',
        width: 30,
      },
      {
        title: '单价',
        align: 'center',
        field: 'price',
        width: 50,
      },
      {
        title: '金额',
        align: 'center',
        field: 'amount',
        width: 50,
      },
      {
        title: '备注',
        align: 'center',
        field: 'remark',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table6_1_4 };
