import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table2_1_2 = {
  tid: 'defaultModule.table2_1_2',
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
      let count = cal(currentPageGridRowsData, 'count');
      let capital = Nzh.cn.toMoney(price, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="5" style="border: 1px solid">合计金额：' +
        capital +
        '整</td><td>' +
        count +
        '</td><td></td><td>￥' +
        price +
        '</td><td></td></tr>'
      );
    }

    return '<tr><td colspan="5" style="border: 1px solid">合计金额：</td><td></td><td></td><td>￥</td><td></td></tr>';
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
        title: '货品名称',
        align: 'left',
        field: 'name',
        width: 150,
      },
      {
        title: '规格',
        field: 'unit',
        width: 30,
      },
      {
        title: '颜色',
        field: 'color',
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
        title: '单价（元）',
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

export { table2_1_2 };
