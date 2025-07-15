import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    align: 'center',
    dataIndex: 'tenantName',
  },
  {
    title: '账号',
    align: 'center',
    dataIndex: 'userid',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: '登录时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  // {
  //   title: '终端类型',
  //   align: 'center',
  //   dataIndex: 'clientType',
  // },
  {
    title: 'IP地址',
    align: 'center',
    dataIndex: 'ip',
  },
  {
    title: '详细日志',
    align: 'center',
    dataIndex: 'logContent',
  },
];
