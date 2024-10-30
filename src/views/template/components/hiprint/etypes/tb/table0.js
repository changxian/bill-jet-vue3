import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额
import Nzh from 'nzh';

const table0 = {
  tid: 'defaultModule.table0',
  field: 'table',
  title: '页合计2_1_8',
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
    if (data) {
      data['ppc'] = (data['ppc'] || '-1') * 1 + 1 + '';
      if (currentPageGridRowsData && currentPageGridRowsData.length > 0) {
        let count = cal(currentPageGridRowsData, 'count');
        let totaoCount = cal(rows, 'count');
        let price = cal(currentPageGridRowsData);
        let capital = Nzh.cn.toMoney(price, { complete: false, outSymbol: false });
        let total = data['total'] || 0;
        let totalCapital = Nzh.cn.toMoney(total, { complete: false, outSymbol: false });
        let debt = data['debt'] || 0;
        let curDebt = data['curDebt'] || '';
        let totalDebt = data['totalDebt'] || '';
        let payment = data['payment'] || '';
        let bankNum = data['bankNum'] || '';
        let bankAccount = data['bankAccount'] || '';
        let remark = data['remark'] || '';
        let desc = data['desc'] || '';
        let ppc = data['ppc'] || '';
        let tel = data['tel'] || '';
        let address = data['address'] || '';
        let hotLine = data['hotLine'] || '';
        let createBy = data['createBy'] || '';
        let salesman = data['salesman'] || '';

        if (currentPageGridRowsData[currentPageGridRowsData.length - 1]['tail']) {
          return (
            '<tr height="19">' +
            '  <td colSpan="3" style="border: 1px solid;text-align: left">备注：'+ remark +'</td>' +
            '  <td  style="border: 1px solid;text-align: left">页小计</td>' +
            '  <td  style="border: 1px solid;text-align: left">'+ count +'</td>' +
            '  <td  style="border: 1px solid;text-align: left"></td>' +
            '  <td colSpan="2"  style="border: 1px solid;text-align: left">￥'+ price +'</td>' +
            '</tr>' +
            '<tr height="19">' +
            '  <td colspan="7"  style="border: 1px solid;text-align: left">本单合计数量：'+ totaoCount +'&nbsp;&nbsp; 本单合计金额：'+ totalCapital +'整&nbsp;&nbsp; ￥'+ total +'</td>' +
            '  <td rowspan="4"  style="border: 1px solid;text-align: left"><img src="/src/assets/test/er_wei_ma.png"/></td>' +
            '</tr>' +
            '<tr height="19">' +
            '  <td colspan="7"  style="border: 1px solid;text-align: left">主营：</td>' +
            '</tr>' +
            '<tr height="19">' +
            '  <td rowspan="2"  style="border: 1px solid;text-align: center">销货<br/>单位</td>' +
            '  <td colspan="6"  style="border: 1px solid;text-align: left">地址：'+ address +'</td>' +
            '</tr>' +
            '<tr height="19">' +
            '  <td colspan="6"  style="border: 1px solid;text-align: left">电话：'+ tel +'</td>' +
            '</tr>' +
            '<tr height="19">' +
            '  <td colspan="2" style="text-align: left">制单员：'+ createBy +'</td>' +
            '  <td colspan="2" style="text-align: left">业务员：'+ salesman +'</td>' +
            '  <td colspan="3" style="text-align: left">客户签收：</td>' +
            '  <td class>扫码付款</td>' +
            '</tr>'
          );
        }

        return (
          '<tr height="19">' +
          '  <td colSpan="3" style="border: 1px solid;text-align: left">备注：'+ remark +'</td>' +
          '  <td  style="border: 1px solid;text-align: left">页小计</td>' +
          '  <td  style="border: 1px solid;text-align: left">'+ count +'</td>' +
          '  <td  style="border: 1px solid;text-align: left"></td>' +
          '  <td colSpan="2"  style="border: 1px solid;text-align: left">￥'+ price +'</td>' +
          '</tr>'
        );
      }
    }
    return (
      '<tr height="19">' +
      '  <td colSpan="3" style="border: 1px solid;text-align: left">备注：</td>' +
      '  <td  style="border: 1px solid;text-align: left">页小计</td>' +
      '  <td  style="border: 1px solid;text-align: left">0</td>' +
      '  <td  style="border: 1px solid;text-align: left"></td>' +
      '  <td colSpan="2"  style="border: 1px solid;text-align: left">￥0.00</td>' +
      '</tr>' +
      '<tr height="19">' +
      '  <td colspan="7"  style="border: 1px solid;text-align: left">本单合计数量：28 本单合计金额：在中是虽中蝇蝇中 ￥4444.00</td>' +
      '  <td rowspan="4"  style="border: 1px solid;text-align: left"></td>' +
      '</tr>' +
      '<tr height="19">' +
      '  <td colspan="7"  style="border: 1px solid;text-align: left">主营：</td>' +
      '</tr>' +
      '<tr height="19">' +
      '  <td rowspan="2"  style="border: 1px solid;text-align: center">销货<br/>单位</td>' +
      '  <td colspan="6"  style="border: 1px solid;text-align: left">地址：</td>' +
      '</tr>' +
      '<tr height="19">' +
      '  <td colspan="6"  style="border: 1px solid;text-align: left">电话：</td>' +
      '</tr>' +
      '<tr height="19">' +
      '  <td colspan="2" style="text-align: left">制单员：</td>' +
      '  <td colspan="2" style="text-align: left">业务员：</td>' +
      '  <td colspan="3" style="text-align: left">客户签收：</td>' +
      '  <td class>扫码付款</td>' +
      '</tr>'
    );
  },
  // rowsColumnsMerge: function (row, col, colIndex, rowIndex, tableData, printData) {
  //   if (col.field === 'remark') {
  //     if (0 === rowIndex) {
  //       // 第一行备注跨行
  //       return [5, 1];
  //     } else {
  //       // 否则不显示
  //       return [0, 1];
  //     }
  //   } else {
  //     // 非备注行，跨行1，跨列1
  //     return [1, 1];
  //   }
  // },
  columns: [
    [
      {
        title: '序号',
        field: 'seq',
        width: 40,
      },
      {
        title: '产品名称',
        field: 'name',
        width: 40,
      },
      {
        title: '规格',
        field: 'spec',
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
        width: 50,
      },
      {
        title: '金额（元）',
        field: 'amount',
        width: 50,
      },
    ],
  ],
  ...default_prot,
};

export { table0 };
