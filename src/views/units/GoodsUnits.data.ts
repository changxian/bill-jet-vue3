import {BasicColumn} from '/@/components/Table';
// import {FormSchema} from '/@/components/Table';
// import { rules} from '/@/utils/helper/validator';
// import { render } from '/@/utils/common/renderUtils';
// import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'serialNumber',
    width: 120,
    customRender: ({ index}) => {
      return index + 1;
    },
  },
  {
    title: '商品单位',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '是否内置',
    align: 'center',
    dataIndex: 'def',
  },
];

// 高级查询数据
// export const superQuerySchema = {
//   name: {title: '商品单位',order: 0,view: 'text', type: 'string',},
//   def: {title: '是否内置',order: 1,view: 'text', type: 'string',},
// };
