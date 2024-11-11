const fields = [
  { text: '序号', field: 'seq' },
  { text: '行号', field: 'seq2' },
  { text: 'NO', field: 'seq3' },
  { text: '订单编号', field: 'orderNo' },
  { text: '订单号', field: 'orderNo2' },
  { text: '訂單號', field: 'orderNo3' },

  { text: '商品编号', field: 'code' },
  { text: '商品编码', field: 'code16' },
  { text: '物料编号', field: 'code2' },
  { text: '编号', field: 'code3' },
  { text: '编码', field: 'code4' },
  { text: '产品编号', field: 'code5' },
  { text: '产品货号', field: 'code6' },
  { text: '产品代码', field: 'code12' },
  { text: '货号', field: 'code7' },
  { text: '品号', field: 'code8' },
  { text: '药品编号', field: 'code9' },
  { text: '產品編號', field: 'code10' },
  { text: '貨號', field: 'code11' },
  { text: 'Barcode', field: 'code13' },
  { text: '条形码', field: 'code14' },
  { text: '商品条码', field: 'code15' },

  { text: '商品名称', field: 'name' },
  { text: '物料名称', field: 'name2' },
  { text: '产品名称', field: 'name3' },
  { text: '商品全名', field: 'name4' },
  { text: '通用名称', field: 'name5' },
  { text: '货品名称', field: 'name6' },
  { text: '货物名称', field: 'name7' },
  { text: '名称', field: 'name8' },
  { text: '品名', field: 'name9' },
  { text: '药品名称', field: 'name10' },
  { text: '產品名稱', field: 'name11' },
  { text: '配件/工时项目', field: 'name12' },

  { text: '名称简写', field: 'shortName' },

  { text: '规格型号', field: 'spec' },
  { text: '规格', field: 'spec2' },
  { text: '型号', field: 'spec3' },
  { text: '規格型號', field: 'spec4' },
  { text: '细码明细', field: 'spec5' },

  { text: '剂型', field: 'spec_2' },

  { text: '名称及规格', field: 'nameSpec' },
  { text: '名稱及規格', field: 'nameSpec3' },
  { text: '品名及规格', field: 'nameSpec5' },
  { text: '材料名称及规格', field: 'nameSpec2' },
  { text: '物料名称及规格', field: 'nameSpec4' },

  { text: '包装', field: 'pack' },

  { text: '单位', field: 'unit' },
  { text: '單位', field: 'unit2' },

  { text: '颜色', field: 'color' },

  { text: '长(m)', field: 'length' },
  { text: '长度(m)', field: 'length1' },

  { text: '宽(m)', field: 'wide' },
  { text: '宽度(m)', field: 'wide1' },

  { text: '高(m)', field: 'high' },
  { text: '高度(m)', field: 'high2' },

  { text: '面积(m²)', field: 'area' },

  { text: '数量', field: 'count' },
  { text: '數量', field: 'count2' },
  { text: 'QTY', field: 'count3' },

  { text: '重量', field: 'weight' },
  { text: '重量(kg)', field: 'weight1' },

  { text: '单价', field: 'price' },
  { text: '单价(元)', field: 'price2' },
  { text: '零售价', field: 'price3' },
  { text: '單價', field: 'price4' },
  { text: 'Price', field: 'price5' },

  { text: '金额', field: 'amount' },
  { text: '金额（元）', field: 'amount2' },
  { text: '金額', field: 'amount3' },
  { text: 'Amount', field: 'amount4' },
  { text: '金额（RMB）', field: 'amount4' },

  { text: '备注', field: 'remark' },
  { text: '備注', field: 'remark1' },

  { text: 'Description', field: 'description' },

  { text: '备注（订单号）', field: 'orderNo' },

  { text: '产商', field: 'firm2' },
  { text: '厂商', field: 'firm4' },
  { text: '生产产商', field: 'firm' },
  { text: '生产厂商', field: 'firm3' },
  { text: '生产厂家', field: 'firm5' },
  { text: '生产企业', field: 'firm6' },

  { text: '产商地址', field: 'firmAddress' },
  { text: '生产地址', field: 'firmAddress2' },

  { text: '生产日期', field: 'productDate' },

  { text: '批号', field: 'batchNum' },
  { text: '生产批号', field: 'batchNum2' },

  { text: '有效期', field: 'validity' },

  { text: '生产日期有效期至', field: 'productDateValidity' },
  { text: '批准文号', field: 'approvalNo' },
  { text: '注册证号', field: 'certificateNo' },
  { text: '生产许可证号', field: 'productApprovalNo' },
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
