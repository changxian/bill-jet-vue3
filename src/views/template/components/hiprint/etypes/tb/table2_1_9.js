import { fields, cal, default_prot } from '../default';
// 数字转中文,大写,金额

const table2_1_9 = {
  tid: 'defaultModule.table2_1_9',
  field: 'table',
  title: '页合计2_1_9',
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
      let remark = data['remark'] ?? '';
      return (
        '<tr><td style="border: 0px solid" style="text-align: right">说明:</td>' +
        '<td colspan="3" style="text-align: left">' + remark + '</td>' +
        '<td colspan="2" style="text-align: center; border: 1px solid">TOTAL总金额</td>' +
        '<td colspan="2" style="text-align: center; border: 1px solid">' + price + ' 元</td>' +
        '</tr>'
      );
    }

    return '<tr><td style="text-align: right">说明:</td><td colspan="3"></td><td colspan="2" style="text-align: center; border: 1px solid">TOTAL总金额</td><td colspan="2" style="text-align: center; border: 1px solid">0 元</td></tr>';
  },
  columns: [
    [
      {
        title: '序号',
        align: 'center',
        field: 'seq',
        width: 25,
      },
      {
        title: '物料号',
        field: 'code',
        align: 'center',
        width: 50,
      },
      {
        title: '物料名称',
        field: 'name',
        align: 'center',
        width: 80,
      },
      {
        title: '型号',
        align: 'center',
        field: 'spec',
        width: 40,
      },
      {
        title: '单位',
        field: 'unit',
        align: 'center',
        width: 40,
      },
      {
        title: '数量',
        field: 'count',
        align: 'center',
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
        width: 40,
      },
    ],
  ],
  ...default_prot,
};

export { table2_1_9 };
