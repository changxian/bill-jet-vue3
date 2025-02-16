import { fields, default_prot } from '../default';
import Nzh from 'nzh';

const table6_1_5 = {
  tid: 'defaultModule.table6_1_5',
  field: 'table',
  title: '尾页合计',
  type: 'table',
  options: {
    field: 'table',
    fields: fields,
  },
  footerFormatter: function (options, rows, data, currentPageGridRowsData) {
    if (data && currentPageGridRowsData && currentPageGridRowsData.length > 0) {
      if (currentPageGridRowsData[currentPageGridRowsData.length - 1].tail) {
        let total = data['total'] ?? 0;
        let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });
        return '<tr><td colspan="5">合计金额（大写）：' + capital + '整</td><td colspan="4">小写金额：' + total + '</td></tr>';
      }
      return '';
    }
    return '<tr><td colspan="5">合计金额（大写）：</td><td colspan="4">小写金额：0</td>' + '</tr>';
  },
  columns: [
    [
      {
        title: '名称',
        align: 'center',
        field: 'name',
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
        title: '生产批号',
        align: 'center',
        field: 'batchNum2',
        width: 50,
      },
      {
        title: '有效期',
        align: 'center',
        field: 'validity',
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

export { table6_1_5 };
