import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6 = {
  tid: 'defaultModule.table6',
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
      let price = cal(currentPageGridRowsData);
      if (data && data['total'] && currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        let capital = Nzh.cn.toMoney(data['total'], { complete: false, outSymbol: false });
        return (
          '<tr><td colspan="5"></td><td colspan="3">页小计：' +
          price +
          '</td></tr>' +
          '<tr><td colspan="5">合计金额（大写）：' +
          capital +
          '</td><td colspan="3">总合计：' +
          data['total'] +
          '</td></tr>'
        );
      }
      return '<tr><td colspan="5"></td><td colspan="3">页小计：' + price + '</td></tr>';
    }
    return '<tr><td colspan="5"></td><td colspan="3">页小计：</td></tr><tr><td colspan="5">合计金额（大写）：</td><td colspan="3">页小计：</td></tr>';
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
        title: '商品名称',
        align: 'left',
        field: 'name',
        width: 100,
      },
      {
        title: '规格型号',
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

export { table6 };
