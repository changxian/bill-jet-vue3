import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1_11 = {
  tid: 'defaultModule.table2_1_11',
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
      let amount = cal(currentPageGridRowsData);
      let count = cal(currentPageGridRowsData, 'count');
      let capital = Nzh.cn.toMoney(amount, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="4">合计金额（大写）：' +
        capital +
        '整</td>' +
        '<td></td>' +
        '<td style="text-align: center">' +
        count +
        '</td>' +
        '<td></td>' +
        '<td style="text-align: center">' +
        amount +
        '</td>' +
        '<td></td>' +
        '</tr>'
      );
    }

    return '<tr><td colspan="4">合计金额（大写）：</td>' + '<td></td><td>0</td><td></td><td>0</td><td>0</td></tr>';
  },
  rowsColumnsMerge: function (row, col, colIndex, rowIndex, tableData, printData) {
    if (col.field === 'remark') {
      if (0 === rowIndex) {
        // 第一行备注跨行
        return [5, 1];
      } else {
        // 否则不显示
        return [0, 1];
      }
    } else {
      // 非备注行，跨行1，跨列1
      return [1, 1];
    }
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
        title: '产品编码',
        field: 'code',
        align: 'center',
        width: 50,
      },
      {
        title: '产品名称',
        field: 'name',
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
        title: '单价',
        field: 'price',
        align: 'center',
        width: 40,
      },
      {
        title: '金额',
        field: 'amount',
        align: 'center',
        width: 40,
      },
      {
        title: '备注',
        field: 'remark',
        width: 40,
      },
    ],
  ],
  ...default_prot,
};

export { table2_1_11 };
