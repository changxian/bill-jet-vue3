import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '开单id',
    align: "center",
    dataIndex: 'billId'
  },
  {
    title: '关联商品id',
    align: "center",
    dataIndex: 'doogsId'
  },
  {
    title: '商品编号',
    align: "center",
    dataIndex: 'doogsCode'
  },
  {
    title: '商品名称',
    align: "center",
    dataIndex: 'doogsName'
  },
  {
    title: '规格型号',
    align: "center",
    dataIndex: 'doogsType'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'doogsUnit'
  },
  {
    title: '进货价',
    align: "center",
    dataIndex: 'costAmount'
  },
  {
    title: '金额',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '数量',
    align: "center",
    dataIndex: 'count'
  },
  {
    title: '业务员',
    align: "center",
    dataIndex: 'userName_dictText'
  },
  {
    title: '送货车号',
    align: "center",
    dataIndex: 'careNo'
  },
  {
    title: '版本',
    align: "center",
    dataIndex: 'version'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];

// 高级查询数据
export const superQuerySchema = {
  billId: {title: '开单id',order: 0,view: 'text', type: 'string',},
  doogsId: {title: '关联商品id',order: 1,view: 'text', type: 'string',},
  doogsCode: {title: '商品编号',order: 2,view: 'text', type: 'string',},
  doogsName: {title: '商品名称',order: 3,view: 'text', type: 'string',},
  doogsType: {title: '规格型号',order: 4,view: 'text', type: 'string',},
  doogsUnit: {title: '单位',order: 5,view: 'text', type: 'string',},
  costAmount: {title: '进货价',order: 6,view: 'number', type: 'number',},
  amount: {title: '金额',order: 7,view: 'number', type: 'number',},
  count: {title: '数量',order: 8,view: 'number', type: 'number',},
  userName: {title: '业务员',order: 9,view: 'sel_user', type: 'string',},
  careNo: {title: '送货车号',order: 10,view: 'text', type: 'string',},
  version: {title: '版本',order: 12,view: 'number', type: 'number',},
  remark: {title: '备注',order: 13,view: 'text', type: 'string',},
};
