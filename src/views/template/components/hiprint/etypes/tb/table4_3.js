import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table4_3 = {
  tid: 'defaultModule.table4_3',
  field: 'table',
  title: '总合计',
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
    if (data && data['total']) {
      let price = cal(currentPageGridRowsData);
      let capital = Nzh.cn.toMoney(data['total'], { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="5" style="text-align: left">总合计（大写）：' + capital + '整</td>' +
        ' <td colspan="4" style="text-align: left;">页小计：￥' + price + '</td>' +
        '</tr>'
      );
    }

    return '<tr><td colspan="5" style="text-align: left">总合计（大写）：</td><td colspan="4" style="text-align: left;">页小计：￥0</td></tr>';
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
        title: '货物名称',
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
        title: '颜色',
        field: 'color',
        width: 30,
      },
      {
        title: '数量',
        field: 'count',
        width: 30,
      },
      {
        title: '单位',
        field: 'unit',
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
  ...default_prot,
};

export { table4_3 };
