import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1_4 = {
  tid: 'defaultModule.table2_1_4',
  field: 'table',
  title: '页合计2_1_4',
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
      let weight = cal(currentPageGridRowsData, 'weight');
      let capital = Nzh.cn.toMoney(price, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="3" style="border: 1px solid; text-align: center;">大写金额：' +
        capital +
        '整</td><td>总重量：</td><td>' +
        weight +
        '</td><td>总金额：</td><td>' +
        price +
        '</td>' +
        '<td></td></tr>'
      );
    }

    return '<tr><td colspan="3" style="border: 1px solid; text-align: center;">大写金额：</td><td>总重量：</td><td></td><td>总金额：</td><td></td></tr>';
  },
  columns: [
    [
      {
        title: '品名',
        align: 'left',
        field: 'name',
        width: 110,
      },
      {
        title: '规格',
        field: 'unit',
        width: 60,
      },
      {
        title: '单位',
        field: 'unit',
        width: 40,
      },
      {
        title: '数量',
        field: 'count',
        width: 40,
      },
      {
        title: '重量',
        field: 'weight',
        width: 40,
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

export { table2_1_4 };
