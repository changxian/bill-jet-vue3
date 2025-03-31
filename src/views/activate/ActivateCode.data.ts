import { BasicColumn } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '运营商户',
    align: 'center',
    dataIndex: 'belongTenantIdName',
  },
  {
    title: '激活码',
    align: 'center',
    dataIndex: 'activateCode',
  },
  {
    title: '套餐类型',
    dataIndex: 'packType',
    width: 150,
    customRender: ({ text }) => {
      if (text === 1) {
        return '送货单版';
      } else {
        return '进销存版';
      }
    },
  },
  {
    title: '套餐类别',
    dataIndex: 'packCategory',
    width: 150,
    customRender: ({ text }) => {
      if (text === 1) {
        return '单机版';
      } else {
        return '云端版';
      }
    },
  },
  {
    title: '购买价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'statusName',
  },
  {
    title: '激活企业',
    align: 'center',
    dataIndex: 'actTenantIdName',
  },
  {
    title: '激活时间',
    align: 'center',
    dataIndex: 'activateDateTime',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
