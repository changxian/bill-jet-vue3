import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_3 = {
  tid: 'defaultModule.table6_3',
  field: 'table',
  title: '页总计',
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
      let price = cal(currentPageGridRowsData);
      let count = cal(currentPageGridRowsData, 'count');
      let capital = Nzh.cn.toMoney(data['total'], { complete: false, outSymbol: false });
      return (
        '<tr>' +
        ' <td colspan="4" style="text-align: center">小计</td>' +
        ' <td>' + count + '</td>' +
        ' <td></td>' +
        ' <td>' + price + '</td>' +
        ' <td></td>' +
        '</tr>' +
        '<tr>' +
        ' <td colspan="5">合计金额（大写）：' + capital +
        ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥' + data['total'] +
        ' </td>' +
        ' <td colspan="3">合计数量：' + data['count'] + '</td>' +
        '</tr>'
      );
    }
    return (
      '<tr>' +
      ' <td colspan="4" style="text-align: center">小计</td>' +
      ' <td>0</td>' +
      ' <td></td>' +
      ' <td>0</td>' +
      ' <td></td>' +
      '</tr>' +
      '<tr>' +
      ' <td colspan="5">合计金额（大写）：' +
      ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥' +
      ' </td>' +
      ' <td colspan="3">合计数量：</td>' +
      '</tr>'
    );
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
        title: '产品名称',
        align: 'left',
        field: 'name',
        width: 100,
      },
      {
        title: '型号规格',
        field: 'spec',
        width: 40,
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
        width: 40,
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

export { table6_3 };
