import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_1_2 = {
  tid: 'defaultModule.table6_1_2',
  field: 'table',
  title: '尾页合计',
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
      let total = data['total'] ?? 0;
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });

      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        return (
          '<tr>' +
          ' <td>合计：</td>' +
          ' <td colspan="3">' + capital + '整</td>' +
          ' <td colspan="2">￥' + total + '</td>' +
          ' <td></td>' +
          '</tr>' +
          '<tr>' +
          ' <td>备注：</td>' +
          ' <td colspan="7">' + data['remark'] +'</td>' +
          '</tr>'
        );
      }
      return '';
    }
    return (
      '<tr>' +
      ' <td>合计：</td>' +
      ' <td colspan="3"></td>' +
      ' <td colspan="2"></td>' +
      ' <td></td>' +
      '</tr>' +
      '<tr>' +
      ' <td>备注：</td>' +
      ' <td colspan="7"></td>' +
      '</tr>'
    );
  },
  columns: [
    [
      {
        title: '商品编号',
        align: 'center',
        field: 'code',
        width: 60,
      },
      {
        title: '商品名称',
        align: 'center',
        field: 'name',
        width: 100,
      },
      {
        title: '单位',
        align: 'center',
        field: 'unit',
        width: 30,
      },
      {
        title: '数量',
        align: 'center',
        field: 'count',
        width: 30,
      },
      {
        title: '单价',
        align: 'center',
        field: 'price',
        width: 50,
      },
      {
        title: '金额',
        align: 'center',
        field: 'amount',
        width: 50,
      },
      {
        title: '备注',
        align: 'center',
        field: 'remark',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table6_1_2 };
