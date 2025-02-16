import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_2_1 = {
  tid: 'defaultModule.table6_2_1',
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
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });

      let tfoot = '<tr>' +
        '<td colspan="5"></td>' +
        '<td colspan="3">页小计：￥' + amount + '</td>' +
        '</tr>';

      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        tfoot =
          tfoot +
          '<tr>' +
          ' <td colspan="5">合计金额（大写）：' + capital + '</td>' +
          ' <td colspan="3">总合计：￥' + total + '</td>' +
          '</tr>';
      }
      return tfoot;
    }
    return (
      '<tr>' +
      '<td colspan="5"></td>' +
      '<td colspan="3">页小计：</td>' +
      '</tr>' +
      '<tr>' +
      ' <td colspan="5">合计金额（大写）：</td>' +
      ' <td colspan="3">总合计：</td>' +
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
        title: '商品名称',
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

export { table6_2_1 };
