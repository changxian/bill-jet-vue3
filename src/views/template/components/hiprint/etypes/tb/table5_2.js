import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table5_2 = {
  tid: 'defaultModule.table5_2',
  field: 'table',
  title: '总合计',
  type: 'table',
  options: {
    field: 'table',
    fields: fields,
  },
  footerFormatter: function (options, rows, data, currentPageGridRowsData) {
    if (data && data['total']) {
      let amount = cal(currentPageGridRowsData);
      let capital = Nzh.cn.toMoney(amount, { complete: false, outSymbol: false });
      return (
        '<tr>' +
        ' <td colspan="6" style="text-align: left">合计人同币（大写）：' + capital + '整</td>' +
        ' <td colspan="6" style="text-align: left">（小写）：' + amount + '</td>' +
        '</td></tr>'
      );
    }
    return (
      '<tr>' +
      ' <td colspan="6" style="text-align: left">合计人同币（大写）：整</td>' +
      ' <td colspan="6" style="text-align: left">（小写）：0</td>' +
      '</td></tr>'
    );
  },
  columns: [
    [
      {
        title: '产品名称',
        align: 'left',
        field: 'name',
        width: 100,
      },
      {
        title: '编码',
        field: 'code',
        width: 40,
      },
      {
        title: '规格型号',
        field: 'spec',
        width: 40,
      },
      {
        title: '生产企业',
        field: 'firm',
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
        width: 40,
      },
      {
        title: '金额',
        field: 'amount',
        width: 50,
      },
      {
        title: '批号',
        field: 'batchNum',
        width: 50,
      },
      {
        title: '生产日期',
        field: 'firmDate',
        width: 50,
      },
      {
        title: '有效期',
        field: 'validity',
        width: 50,
      },
      {
        title: '产品注册号',
        field: 'certificateNo',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table5_2 };
