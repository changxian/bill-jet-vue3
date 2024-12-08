import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table5_1 = {
  tid: 'defaultModule.table5_1',
  field: 'table',
  title: '总合计table5_1',
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
      let total = data['total'] ?? 0;
      let capital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });
      return (
        '<tr><td colspan="13" style="text-align: left">总金额：' +
        capital +
        '整' +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '￥' +
        total +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '本页小计：￥' +
        price +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '本页数量：' +
        count +
        '</td></tr>'
      );
    }

    return (
      '<tr><td colspan="13">总金额：' +
      '整' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '￥' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '本页小计：￥' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
      '本页数量：' +
      '</td></tr>'
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
        title: '通用名称',
        field: 'orderNo',
        align: 'center',
        width: 60,
      },
      {
        title: '规格',
        field: 'spec',
        width: 20,
      },
      {
        title: '生产厂商上市许可持有人',
        field: 'spec',
        width: 100,
      },
      {
        title: '剂型',
        field: 'spec2',
        width: 30,
      },
      {
        title: '包装',
        field: 'spec2',
        width: 40,
      },
      {
        title: '批号',
        field: 'batchNum',
        width: 40,
      },
      {
        title: '有效期',
        field: 'validity',
        width: 40,
      },
      {
        title: '生产日期',
        field: 'productDate',
        width: 40,
      },
      {
        title: '数量',
        field: 'count',
        width: 40,
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
        title: '批准文号',
        field: 'approvalNo',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table5_1 };
