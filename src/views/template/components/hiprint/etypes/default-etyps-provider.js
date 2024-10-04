import * as fields from '@/views/template/components/hiprint/etypes/default';
import { table1 } from '@/views/template/components/hiprint/etypes/tb/table1';
import { table2 } from '@/views/template/components/hiprint/etypes/tb/table2';
import { table2_1 } from '@/views/template/components/hiprint/etypes/tb/table2_1';
import { table2_1_1 } from '@/views/template/components/hiprint/etypes/tb/table2_1_1';
import { table2_1_2 } from '@/views/template/components/hiprint/etypes/tb/table2_1_2';
import { table2_1_3 } from '@/views/template/components/hiprint/etypes/tb/table2_1_3';
import { table2_1_4 } from '@/views/template/components/hiprint/etypes/tb/table2_1_4';
import { table2_1_5 } from '@/views/template/components/hiprint/etypes/tb/table2_1_5';
import { table2_1_6 } from '@/views/template/components/hiprint/etypes/tb/table2_1_6';
import { table2_1_7 } from '@/views/template/components/hiprint/etypes/tb/table2_1_7';
import { table2_1_8 } from '@/views/template/components/hiprint/etypes/tb/table2_1_8';
import { table2_1_9 } from '@/views/template/components/hiprint/etypes/tb/table2_1_9';
import { table2_1_10 } from '@/views/template/components/hiprint/etypes/tb/table2_1_10';
import { table2_2 } from '@/views/template/components/hiprint/etypes/tb/table2_2';
import { table3 } from '@/views/template/components/hiprint/etypes/tb/table3';
import { table4 } from '@/views/template/components/hiprint/etypes/tb/table4';
import { table4_1 } from '@/views/template/components/hiprint/etypes/tb/table4_1';
import { table4_2 } from '@/views/template/components/hiprint/etypes/tb/table4_2';
import { table5 } from '@/views/template/components/hiprint/etypes/tb/table5';
import { table5_1 } from '@/views/template/components/hiprint/etypes/tb/table5_1';
import { table6 } from '@/views/template/components/hiprint/etypes/tb/table6';
import { table6_1 } from '@/views/template/components/hiprint/etypes/tb/table6_1';
import { table6_2 } from '@/views/template/components/hiprint/etypes/tb/table6_2';
import { table6_2_1 } from '@/views/template/components/hiprint/etypes/tb/table6_2_1';
import { table6_1_1 } from '@/views/template/components/hiprint/etypes/tb/table6_1_1';
import { table6_1_2 } from '@/views/template/components/hiprint/etypes/tb/table6_1_2';
import { table6_3 } from '@/views/template/components/hiprint/etypes/tb/table6_3';

export default function (hiprint) {
  return function (options) {
    var addElementTypes = function (context) {
      context.removePrintElementTypes('defaultModule');
      context.addPrintElementTypes('defaultModule', [
        new hiprint.PrintElementTypeGroup('常规', [
          {
            tid: 'defaultModule.text',
            title: '文本',
            data: '',
            type: 'text',
          },
          {
            tid: 'defaultModule.image',
            title: '图片',
            data: '',
            type: 'image',
          },
          {
            tid: 'defaultModule.longText',
            title: '长文',
            data: '155123456789',
            type: 'longText',
          },
          {
            tid: 'defaultModule.html',
            title: 'html',
            formatter: function (data, options) {
              return '<div style="height:50pt;width:50pt;background:red;border-radius: 50%;"></div>';
            },
            type: 'html',
          },
          {
            tid: 'defaultModule.customText',
            title: '自定义文本',
            customText: '自定义文本',
            custom: true,
            type: 'text',
          },
        ]),
        new hiprint.PrintElementTypeGroup('辅助', [
          {
            tid: 'defaultModule.hline',
            title: '横线',
            type: 'hline',
          },
          {
            tid: 'defaultModule.vline',
            title: '竖线',
            type: 'vline',
          },
          {
            tid: 'defaultModule.rect',
            title: '矩形',
            type: 'rect',
          },
          {
            tid: 'defaultModule.oval',
            title: '椭圆',
            type: 'oval',
          },
          {
            tid: 'defaultModule.barcode',
            title: '条形码',
            type: 'barcode',
          },
          {
            tid: 'defaultModule.qrcode',
            title: '二维码',
            type: 'qrcode',
          },
        ]),
        new hiprint.PrintElementTypeGroup('表格', [
          table1,
          table2,
          table2_1,
          table2_2,
          table3,
          table2_1_1,
          table2_1_2,
          table2_1_3,
          table2_1_4,
          table2_1_5,
          table2_1_6,
          table2_1_7,
          table2_1_8,
          table2_1_9,
          table2_1_10,
          table4,
          table4_1,
          table5,
          table5_1,
          table6,
          table4_2,
          table6_1,
          table6_2,
          table6_2_1,
          table6_1_1,
          table6_1_2,
          table6_3,
          {
            tid: 'defaultModule.table',
            field: 'table',
            title: '表格1',
            type: 'table',
            options: {
              field: 'table',
              fields: fields.fields,
            },
            columns: [
              [
                {
                  title: '姓名',
                  align: 'left',
                  field: 'name',
                  width: 100,
                },
                { title: '性别', field: 'gender', width: 100 },
                {
                  title: '销售数量',
                  field: 'count',
                  width: 100,
                },
                {
                  title: '销售金额',
                  field: 'amount',
                  width: 100,
                },
              ],
            ],
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
          },
        ]),
      ]);
    };
    return {
      addElementTypes: addElementTypes,
    };
  };
}
