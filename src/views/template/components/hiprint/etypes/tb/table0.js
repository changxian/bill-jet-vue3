import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table0 = {
  tid: 'defaultModule.table0',
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
      let capital = Nzh.cn.toMoney(amount, { complete: false, outSymbol: false });
      return (
        '<tr>' +
        ' <td></td>' +
        ' <td colspan="3" style="text-align: left;">人民币（大写）：'+ capital +'整</td>' +
        ' <td colspan="3" style="text-align: left;">（小写）：'+ amount +'</td>' +
        '</tr>'
      );
    }

    return '<tr><td></td><td colspan="3" style="text-align: left;">人民币（大写）：整</td><td colspan="3" style="text-align: left;">（小写）：0</td></tr>';
  },
  // rowsColumnsMerge: function (row, col, colIndex, rowIndex, tableData, printData) {
  //   if (col.field === 'remark') {
  //     if (0 === rowIndex) {
  //       // 第一行备注跨行
  //       return [5, 1];
  //     } else {
  //       // 否则不显示
  //       return [0, 1];
  //     }
  //   } else {
  //     // 非备注行，跨行1，跨列1
  //     return [1, 1];
  //   }
  // },
  columns: [
    [
      {
        title: '序号',
        field: 'seq',
        width: 40,
      },
      {
        title: '产品名称',
        field: 'name',
        width: 40,
      },
      {
        title: '规格',
        field: 'spec',
        width: 30,
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
        title: '金额（元）',
        field: 'amount',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table0 };
