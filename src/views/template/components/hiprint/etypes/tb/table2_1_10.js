import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1_10 = {
  tid: 'defaultModule.table2_1_10',
  field: 'table',
  title: '页合计2_1_10',
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
      let capital = Nzh.cn.toMoney(price, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="2" style="text-align: center">金额合计（大写）</td>' +
        '<td colspan="4" style="border: 0 solid">' + capital + '</td>' +
        '<td colspan="2" style="border: 0 solid">￥' + price + '</td>' +
        '</tr>'
      );
    }

    return '<tr><td colspan="2" style="text-align: center">金额合计（大写）</td><td colspan="4" style="border: 0 solid">0</td><td colspan="2" style="border: 0 solid">￥0.00</td></tr>';
  },
  columns: [
    [
      {
        title: '序号',
        align: 'center',
        field: 'seq',
        width: 25,
      },
      {
        title: '物料号',
        field: 'code',
        align: 'center',
        width: 50,
      },
      {
        title: '物料名称',
        field: 'name',
        align: 'center',
        width: 80,
      },
      {
        title: '型号',
        align: 'center',
        field: 'spec',
        width: 40,
      },
      {
        title: '单位',
        field: 'unit',
        align: 'center',
        width: 40,
      },
      {
        title: '数量',
        field: 'count',
        align: 'center',
        width: 40,
      },
      {
        title: '单价',
        field: 'price',
        width: 40,
      },
      {
        title: '金额',
        field: 'amount',
        width: 40,
      },
    ],
  ],
  ...default_prot,
};

export { table2_1_10 };
