import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1 = {
  tid: 'defaultModule.table2_1',
  field: 'table',
  title: '页合计2',
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
      return '<tr><td colspan="4" style="border: 1px solid">合计金额（大写）：' + capital + '整</td><td colspan="3">￥' + price + '</td></tr>';
    }

    return '<tr><td colspan="4" style="border: 1px solid">合计金额（大写）：</td><td colspan="3">￥</td></tr>';
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
        title: '品名及规格',
        align: 'left',
        field: 'nameSpec',
        width: 150,
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
  ...default_prot,
};

export { table2_1 };
