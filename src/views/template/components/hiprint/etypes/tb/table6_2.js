import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_2 = {
  tid: 'defaultModule.table6_2',
  field: 'table',
  title: '尾页合计',
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
    if (data && currentPageGridRowsData && currentPageGridRowsData.length > 0) {
      let total = data['total'] ?? 0;
      let amount = cal(currentPageGridRowsData, 'amount');
      let count = cal(currentPageGridRowsData, 'count');
      let weight = cal(currentPageGridRowsData, 'weight');
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });

      let tfoot = '<tr>' +
        '<td colspan="4" style="text-align: right;">页小计：</td>' +
        '<td>' + count + '</td>' +
        '<td>' + weight + '</td>' +
        '<td></td>' +
        '<td>' + amount + '</td>' +
        '</tr>';

      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        tfoot =
          tfoot +
          '<tr>' +
          ' <td colspan="4">合计金额（大写）：' + capital + '</td>' +
          ' <td colspan="4">（小写）：￥' + amount + '</td>' +
          '</tr>';
      }
      return tfoot;
    }
    return (
      '<tr>' +
      ' <td colspan="4" style="text-align: right;">页小计：</td>' +
      ' <td>0</td>' +
      ' <td>0</td>' +
      ' <td></td>' +
      ' <td>0</td>' +
      '</tr>' +
      '<tr>' +
      ' <td colspan="4" style="text-align: right;">合计金额（大写）：</td>' +
      ' <td colspan="4">（小写）：</td>' +
      '</tr>'
    );
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
        title: '产品名称',
        align: 'center',
        field: 'name',
        width: 100,
      },
      {
        title: '规格型号',
        align: 'center',
        field: 'spec',
        width: 70,
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
        title: '重量(kg)',
        align: 'center',
        field: 'weight',
        width: 50,
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
    ],
  ],
  ...default_prot,
};

export { table6_2 };
