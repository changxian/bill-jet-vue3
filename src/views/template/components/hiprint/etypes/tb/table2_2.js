import { fields, cal, default_prot } from '../default';
import Nzh from "nzh";

const table2_2 = {
  tid: 'defaultModule.table2_2',
  field: 'table',
  title: '页小计',
  type: 'table',
  options: {
    field: 'table',
    fields: fields,
  },
  footerFormatter: function (options, rows, data, currentPageGridRowsData) {
    // currentPageGridRowsData 当前页的数据信息
    if (data && currentPageGridRowsData && 0 < currentPageGridRowsData.length) {
      let total = data['total'] ?? 0;
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });
      let price = cal(currentPageGridRowsData);
      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        return (
          '<tr>' +
          ' <td colspan="6"></td>' +
          ' <td colspan="4" style="text-align: left">页小计：￥' + price + '</td>' +
          '</tr>' +
          '<tr>' +
          ' <td colspan="4" style="text-align: left">合计金额（大写）：'+ capital +'整</td>' +
          ' <td colspan="6" style="text-align: left">（小写）：'+ total +'</td>' +
          '</tr>'
        );
      }
      return '<tr><td colspan="6"></td><td colspan="4" style="text-align: left">页小计：￥' + price + '</td></tr>';
    }

    return (
      '<tr>' +
      ' <td colspan="6"></td>' +
      ' <td colspan="4" style="text-align: left">页小计：￥</td>' +
      '</tr>' +
      '<tr>' +
      ' <td colspan="4" style="text-align: left">合计金额（大写）：整</td>' +
      ' <td colspan="6" style="text-align: left">（小写）：0</td>' +
      '</tr>'
    );
  },
  columns: [
    [
      {
        title: '药品编码',
        field: 'code',
        width: 60,
      },
      {
        title: '药品名称',
        field: 'name',
        width: 120,
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
        title: '产地',
        field: 'firmAddress',
        width: 70,
      },
      {
        title: '批号',
        field: 'batchNum',
        width: 70,
      },
      {
        title: '零售价',
        field: 'retailPrice',
        width: 70,
      },
      {
        title: '生产日期',
        field: 'productDate',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table2_2 };
