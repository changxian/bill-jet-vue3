import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/purchase/debt/purchaseDebt/list',
  byPurchaseId = '/purchase/debt/purchaseDebt/byPurchaseId',
  listCount = '/purchase/debt/purchaseDebt/listCount',
  save = '/purchase/debt/purchaseDebt/add',
  edit = '/purchase/debt/purchaseDebt/edit',
  deleteOne = '/purchase/debt/purchaseDebt/delete',
  deleteBatch = '/purchase/debt/purchaseDebt/deleteBatch',
  importExcel = '/bill/purchase/debt/purchaseDebt/importExcel',
  exportXls = '/purchase/debt/purchaseDebt/exportXls',
  repay = '/purchase/repay/purchaseRepay/repay',
  repayEdit = '/purchase/repay/purchaseRepay/repayEdit',
  oneKeyRepay = '/purchase/repay/purchaseRepay/oneKeyRepay',
  purchaseRepayList = '/purchase/repay/purchaseRepay/list',
  repayDetailList = '/purchase/repay/purchaseRepay/repayDetail',
  repayRevoke = '/purchase/repay/purchaseRepay/repayRevoke',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 根据供应商id获取欠款接口
 * @param params
 */
export const byPurchaseId = (params) => defHttp.get({ url: Api.byPurchaseId, params });

/**
 * 获取总计数据
 * @param params
 */
export const listCount = (params) => defHttp.get({ url: Api.listCount, params });

// 供应商还款
export const purchaseRepayList = (params) => defHttp.get({ url: Api.purchaseRepayList, params });
export const repayDetailList = (params) => defHttp.get({ url: Api.repayDetailList, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}

/**
 * 还款撤回
 * @param params
 * @param handleSuccess
 */
export const repayRevoke = (params) => {

      return defHttp.post({url: Api.repayRevoke,   data:params}, {joinParamsToUrl: true});

}

 /**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
/**
 * 供应商欠款还款
 * @param params
 * @param isUpdate
 */
export const repay = (params) => {
  let url =  Api.repay  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
/**
 * 供应商欠款还款
 * @param params
 * @param isUpdate
 */
export const repayEdit = (params) => {
  let url =  Api.repayEdit  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
/**
 * 供应商欠款还款
 * @param params
 * @param isUpdate
 */
export const oneKeyRepay = (params) => {
  let url =  Api.oneKeyRepay  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}


