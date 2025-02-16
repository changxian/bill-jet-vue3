import { fields, cal, default_prot } from '../default';
import Nzh from 'nzh';

const table4_2 = {
  tid: 'defaultModule.table4_2',
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
        '<tr><td colspan="5" style="border: 0px solid;border-left: 1px solid;">总合计（大写）：' +
        capital +
        '整</td><td colspan="4">（小写）：￥' +
        data['total'] +
        '</td><td colspan="3" style="border: 1px solid">页小计：￥' +
        price +
        '</td></tr>' +
        '<tr><td colspan="5" style="border: 0px solid;border-left: 1px solid;">地址：' +
        data['address'] +
        '</td><td colspan="4">售后热线：' +
        data['hotLine'] +
        '</td><td colspan="3">开票人：' +
        data['drawer'] +
        '</td></tr>'
      );
    }

    return (
      '<tr><td colspan="5" style="border: 0px solid;border-left: 1px solid;">总合计（大写）：</td><td colspan="4">（小写）：</td><td colspan="3" style="border: 1px solid">页小计：</td></tr>' +
      '<tr><td colspan="5" style="border: 0px solid;border-left: 1px solid;">地址：</td><td colspan="4">售后热线：</td><td colspan="3">开票人：</td></tr>'
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
        title: '商品全名',
        align: 'left',
        field: 'name',
        width: 120,
      },
      {
        title: '规格',
        field: 'spec',
        width: 45,
      },
      {
        title: '生产企业',
        field: 'firm',
        width: 80,
      },
      {
        title: '单位',
        field: 'unit',
        width: 20,
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
        width: 70,
      },
      {
        title: '批号',
        field: 'batchNum',
        width: 60,
      },
      {
        title: '生产日期',
        field: 'productDate',
        width: 75,
      },
      {
        title: '有效期',
        field: 'validity',
        width: 75,
      },
      {
        title: '注册证号',
        field: 'certificateNo',
        width: 80,
      },
    ],
  ],
  ...default_prot,
};

export { table4_2 };
