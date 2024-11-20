import {BasicColumn} from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'packName',
  },
  {
    title: '产品类别',
    align: 'center',
    dataIndex: 'category_dictText',
  },
  {
    title: '产品类型',
    align: 'center',
    dataIndex: 'packType_dictText',
  },
  {
    title: '支持企业数',
    align: 'center',
    dataIndex: 'orgNum',
  },
  {
    title: '支持账号数',
    align: 'center',
    dataIndex: 'accountNum',
  },
  {
    title: '支持商品数量',
    align: 'center',
    dataIndex: 'goodsNum',
  },
  {
    title: '产品价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '产品折扣',
    align: 'center',
    dataIndex: 'discounted',
  },
  {
    title: '折扣价',
    align: 'center',
    dataIndex: 'discountedPrice',
  },
  {
    title: '规格',
    align: 'center',
    dataIndex: 'specification',
  },
  {
    title: '规格单位',
    align: 'center',
    dataIndex: 'specificationUnit',
  },
  {
    title: '启用状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
];
