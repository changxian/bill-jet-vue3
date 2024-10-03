const fields = [
  { text: '订单编号', field: 'orderNo' },
  { text: '物料编号', field: 'code' },
  { text: '产品货号', field: 'code' },
  { text: '货号', field: 'code' },
  { text: '產品編號', field: 'code' },
  { text: '商品全名', field: 'name' },
  { text: '物料名称', field: 'name' },
  { text: '物料名称', field: 'name' },
  { text: '通用名称', field: 'name' },
  { text: '货品名称', field: 'name' },
  { text: '產品名稱', field: 'name' },
  { text: '名称简写', field: 'shortName' },
  { text: '品名', field: 'name' },
  { text: '规格型号', field: 'spec' },
  { text: '規格型號', field: 'spec' },
  { text: '型号', field: 'spec' },
  { text: '剂型', field: 'spec2' },
  { text: '包装', field: 'pack' },
  { text: '品名及规格', field: 'nameSpec' },
  { text: '生产厂商', field: 'firm' },
  { text: '生产企业', field: 'firm' },
  { text: '产商地址', field: 'firmAddress' },
  { text: '生产地址', field: 'firmAddress' },
  { text: '生产日期', field: 'productDate' },
  { text: '厂商', field: 'firm' },
  { text: '厂商', field: 'firm' },
  { text: '单位', field: 'unit' },
  { text: '單位', field: 'unit' },
  { text: '颜色', field: 'color' },
  { text: '数量', field: 'count' },
  { text: '重量', field: 'weight' },
  { text: '单价', field: 'price' },
  { text: '单价(元)', field: 'price' },
  { text: '金额', field: 'amount' },
  { text: '批号', field: 'batchNum' },
  { text: '有效期', field: 'validity' },
  { text: '零售价', field: 'retailPrice' },
  { text: '批准文号', field: 'approvalNo' },
  { text: '注册证号', field: 'certificateNo' },
  { text: '备注', field: 'remark' },
];

const default_prot = {
  editable: true,
  columnDisplayEditable: true, //列显示是否能编辑
  columnDisplayIndexEditable: true, //列顺序显示是否能编辑
  columnTitleEditable: true, //列标题是否能编辑
  columnResizable: true, //列宽是否能调整
  columnAlignEditable: true, //列对齐是否调整
  isEnableEditField: true, //编辑字段
  isEnableContextMenu: true, //开启右键菜单 默认true
  isEnableInsertRow: true, //插入行
  isEnableDeleteRow: true, //删除行
  isEnableInsertColumn: true, //插入列
  isEnableDeleteColumn: true, //删除列
  isEnableMergeCell: true, //合并单元格
};

const cal = (arr, attr) => {
  function v(o, a) {
    return !o[a] ? 0 : o[a];
  }
  if (!attr) attr = 'amount';
  if (arr && arr.length > 0) {
    let price = 0;
    for (let i = 0; i < arr.length; i++) {
      let p = Math.ceil(v(arr[i], attr) * 100);
      price += p;
    }
    return price / 100;
  }
  return '';
};

export { fields, default_prot, cal };
