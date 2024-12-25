import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/deliver/debt/deliverDebt/list',
  byDeliverId = '/deliver/debt/deliverDebt/byDeliverId',
  listCount = '/deliver/debt/deliverDebt/listCount',
  save = '/deliver/debt/deliverDebt/add',
  edit = '/deliver/debt/deliverDebt/edit',
  exportXls = '/deliver/debt/deliverDebt/exportXls',
  repay = '/deliver/repay/deliverRepay/repay',
  repayEdit = '/deliver/repay/deliverRepay/repayEdit',
  oneKeyRepay = '/deliver/repay/deliverRepay/oneKeyRepay',
  deliverRepayList = '/deliver/repay/deliverRepay/list',
  repayDetailList = '/deliver/repay/deliverRepay/repayDetail',
  repayRevoke = '/deliver/repay/deliverRepay/repayRevoke',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 根据客户id获取欠款接口
 * @param params
 */
export const byDeliverId = (params) => defHttp.get({ url: Api.byDeliverId, params });

/**
 * 获取总计数据
 * @param params
 */
export const listCount = (params) => defHttp.get({ url: Api.listCount, params });
// 客户还款列表
export const deliverRepayList = (params) => defHttp.get({ url: Api.deliverRepayList, params });
export const repayDetailList = (params) => defHttp.get({ url: Api.repayDetailList, params });

/**
 * 还款撤回
 * @param params
 * @param handleSuccess
 */
export const repayRevoke = (params) => {
  return defHttp.post({ url: Api.repayRevoke, data: params }, { joinParamsToUrl: true });
};
/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
/**
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const repay = (params) => {
  const url = Api.repay;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
/**
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const repayEdit = (params) => {
  const url = Api.repayEdit;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
/**
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const oneKeyRepay = (params) => {
  const url = Api.oneKeyRepay;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
