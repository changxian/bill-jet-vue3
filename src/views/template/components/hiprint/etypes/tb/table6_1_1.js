import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table6_1_1 = {
  tid: 'defaultModule.table6_1_1',
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
      let discount = data['discount'] ?? 0;
      let count = cal(currentPageGridRowsData, 'count');
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });

      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        return (
          '<tr>' +
          ' <td colspan="2">本单金额：'+ total +'</td>' +
          ' <td colspan="3">优惠金额：' + discount + '</td>' +
          ' <td colspan="3">应收金额：' + (total - discount) + '</td>' +
          '</tr>' +
          '<tr>' +
          ' <td colspan="5">合计金额（大写）：'+ capital +'整</td>' +
          ' <td colspan="3">合计数量：' + count + '</td>' +
          '</tr>'
        );
      }
      return '';
    }
    return (
      '<tr>' +
      ' <td colspan="2">本单金额：</td>' +
      ' <td colspan="3">优惠金额：</td>' +
      ' <td colspan="3">应收金额：</td>' +
      '</tr>' +
      '<tr>' +
      ' <td colspan="5">合计金额（大写）：</td>' +
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
        width: 30,
      },
      {
        title: '产品名称',
        align: 'center',
        field: 'name',
        width: 100,
      },
      {
        title: '规格',
        align: 'center',
        field: 'spec',
        width: 70,
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

export { table6_1_1 };
