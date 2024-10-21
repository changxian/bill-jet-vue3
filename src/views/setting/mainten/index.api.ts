import { defHttp } from '/@/utils/http/axios';

enum Api {
  getDataBackupParam = '/setting/mainten/getData',
  addDataBackupParam = '/setting/mainten/add',
  editDataBackupParam = '/setting/mainten/edit',
  execDataBackup = '/setting/mainten/execBackup',
  execDataRestore = '/setting/mainten/execRestore',

  delBillsByCycle = '/setting/mainten/delBillsByCycle',
  delCustomer = '/setting/mainten/delCustomer',
  delGoods = '/setting/mainten/delGoods',
  delStock = '/setting/mainten/delStock',
  delSupplier = '/setting/mainten/delSupplier',
}

/**
 * 获取备份数据设置
 * @param params
 */
export const getDataBackupParam = (params) => defHttp.get({ url: Api.getDataBackupParam, params });

/**
 * 保存或者更新数据备份设置
 * @param params
 * @param isUpdate
 */
export const saveDataBackup = (params, isUpdate) => {
  let url = isUpdate ? Api.editDataBackupParam : Api.addDataBackupParam;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 执行数据备份
 * @param params
 */
export const execDataBackup = (params) => {
  return defHttp.post({ url: Api.execDataBackup, params }, { isTransformResponse: false });
};

/**
 * 执行数据备份还原
 * @param params
 */
export const execDataRestore = (params) => {
  return defHttp.post({ url: Api.execDataRestore, params }, { isTransformResponse: false });
};

/**
 * 清除选定时间范围内的单据数据
 * @param params
 */
export const delBillsByCycle = (params) => {
  return defHttp.post({ url: Api.delBillsByCycle, params }, { isTransformResponse: false });
};

/**
 * 清除客户数据
 * @param params
 */
export const delCustomer = (params) => {
  return defHttp.post({ url: Api.delCustomer, params }, { isTransformResponse: false });
};

/**
 * 清除商品数据
 * @param params
 */
export const delGoods = (params) => {
  return defHttp.post({ url: Api.delGoods, params }, { isTransformResponse: false });
};

/**
 * 清除库存数据
 * @param params
 */
export const delStock = (params) => {
  return defHttp.post({ url: Api.delStock, params }, { isTransformResponse: false });
};

/**
 * 清除供应商数据
 * @param params
 */
export const delSupplier = (params) => {
  return defHttp.post({ url: Api.delSupplier, params }, { isTransformResponse: false });
};
