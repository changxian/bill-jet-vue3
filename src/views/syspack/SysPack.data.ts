import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '产品名称',
    align: "center",
    dataIndex: 'packName'
  },
  {
    title: '产品类别(单机版/云端版)',
    align: "center",
    dataIndex: 'category_dictText'
  },
  {
    title: '产品类型(送货单版/进销存版)',
    align: "center",
    dataIndex: 'type_dictText'
  },
  {
    title: '支持企业数(单机1个公司、云端版支持4家公司切换开单)',
    align: "center",
    dataIndex: 'orgNum'
  },
  {
    title: '支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)',
    align: "center",
    dataIndex: 'accountNum'
  },
  {
    title: '支持商品数量()',
    align: "center",
    dataIndex: 'goodsNum'
  },
  {
    title: '产品标准价格',
    align: "center",
    dataIndex: 'price'
  },
  {
    title: '产品折扣',
    align: "center",
    dataIndex: 'discounted'
  },
  {
    title: '产品折扣价',
    align: "center",
    dataIndex: 'discountedPrice'
  },
  {
    title: '规格',
    align: "center",
    dataIndex: 'specification'
  },
  {
    title: '规格单位',
    align: "center",
    dataIndex: 'specificationUnit'
  },
  {
    title: '产品启用状态(1 启用, 0 停用)',
    align: "center",
    dataIndex: 'status_dictText'
  },
];

// 高级查询数据
export const superQuerySchema = {
  packName: {title: '产品名称',order: 0,view: 'text', type: 'string',},
  category: {title: '产品类别(单机版/云端版)',order: 2,view: 'list', type: 'string',dictCode: '',},
  packType: {title: '产品类型(送货单版/进销存版)',order: 3,view: 'list', type: 'string',dictCode: '',},
  orgNum: {title: '支持企业数(单机1个公司、云端版支持4家公司切换开单)',order: 4,view: 'number', type: 'number',},
  accountNum: {title: '支持账号数(云端版支持添加2个子账号，授权后最大支持添加12个子账号)',order: 5,view: 'number', type: 'number',},
  goodsNum: {title: '支持商品数量()',order: 6,view: 'number', type: 'number',},
  price: {title: '产品标准价格',order: 7,view: 'number', type: 'number',},
  discounted: {title: '产品折扣',order: 8,view: 'number', type: 'number',},
  discountedPrice: {title: '产品折扣价',order: 9,view: 'number', type: 'number',},
  specification: {title: '规格',order: 10,view: 'number', type: 'number',},
  specificationUnit: {title: '规格单位',order: 11,view: 'text', type: 'string',},
  status: {title: '产品启用状态(1 启用, 0 停用)',order: 12,view: 'number', type: 'number',dictCode: '',},
};
