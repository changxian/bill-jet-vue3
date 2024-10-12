import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '公司id',
    align: "center",
    dataIndex: 'companyId'
  },
  {
    title: '单号',
    align: "center",
    dataIndex: 'billNo'
  },
  {
    title: '客户id',
    align: "center",
    dataIndex: 'custId'
  },
  {
    title: '商品类别',
    align: "center",
    dataIndex: 'categoryName'
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
    dataIndex: 'userName'
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
  companyId: {title: '公司id',order: 0,view: 'text', type: 'string',},
  billNo: {title: '单号',order: 1,view: 'text', type: 'string',},
  custId: {title: '客户id',order: 2,view: 'text', type: 'string',},
  categoryName: {title: '商品类别',order: 3,view: 'text', type: 'string',},
  doogsCode: {title: '商品编号',order: 4,view: 'text', type: 'string',},
  doogsName: {title: '商品名称',order: 5,view: 'text', type: 'string',},
  doogsType: {title: '规格型号',order: 6,view: 'text', type: 'string',},
  doogsUnit: {title: '单位',order: 7,view: 'text', type: 'string',},
  costAmount: {title: '进货价',order: 8,view: 'number', type: 'number',},
  amount: {title: '金额',order: 9,view: 'number', type: 'number',},
  count: {title: '数量',order: 10,view: 'number', type: 'number',},
  userName: {title: '业务员',order: 11,view: 'text', type: 'string',},
  careNo: {title: '送货车号',order: 12,view: 'text', type: 'string',},
  version: {title: '版本',order: 14,view: 'number', type: 'number',},
  remark: {title: '备注',order: 15,view: 'text', type: 'string',},
};
