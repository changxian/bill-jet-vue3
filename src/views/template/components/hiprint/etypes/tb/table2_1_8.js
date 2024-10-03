import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1_8 = {
  tid: 'defaultModule.table2_1_8',
  field: 'table',
  title: '页合计2_1_8',
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
      let weight = cal(currentPageGridRowsData, 'weight');
      let capital = Nzh.cn.toMoney(price, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="5">合计金额（大写）：' + capital + '整</td>' +
        '<td>' + count + '</td>' +
        '<td>' + weight + '</td>' +
        '<td></td>' +
        '<td>' + price + '</td>' +
        '</tr>'
      );
    }

    return '<tr><td colspan="5">合计金额（大写）：</td><td>0</td><td>0</td><td></td><td>0</td></tr>';
  },
  columns: [
    [
      {
        title: '序号',
        align: 'center',
        field: 'seq',
        width: 20,
      },
      {
        title: '货号',
        field: 'code',
        align: 'center',
        width: 50,
      },
      {
        title: '商品名称',
        field: 'orderNo',
        align: 'center',
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
        title: '重量(kg)',
        field: 'weight',
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

export { table2_1_8 };
