import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table5 = {
  tid: 'defaultModule.table5',
  field: 'table',
  title: '总合计',
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
    if (data && data['total']) {
      let price = cal(currentPageGridRowsData);
      let capital = Nzh.cn.toMoney(data['total'], { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="3" style="border-bottom: 1px solid">本页合计：￥' +
        price +
        '</td><td colspan="6">合计人民币（大写）：' +
        capital +
        '整</td><td colspan="2" style="border: 1px solid">￥' +
        data['total'] +
        '</td></tr>'
      );
    }

    return '<tr><td colspan="3">总合计（大写）：</td><td colspan="2">￥</td><td colspan="3" style="border: 1px solid">页小计：￥</td></tr>';
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
        title: '通用名称',
        align: 'left',
        field: 'name',
        width: 100,
      },
      {
        title: '规格',
        field: 'spec',
        width: 40,
      },
      {
        title: '单位',
        field: 'unit',
        width: 30,
      },
      {
        title: '剂型',
        field: 'spec2',
        width: 30,
      },
      {
        title: '生产厂商',
        field: 'firm',
        width: 60,
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
        title: '批准文号',
        field: 'approvalNum',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table5 };
