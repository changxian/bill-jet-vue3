import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/deliver/debt/deliverDebt/list',
  save='/deliver/debt/deliverDebt/add',
  edit='/deliver/debt/deliverDebt/edit',
  deleteOne = '/deliver/debt/deliverDebt/delete',
  deleteBatch = '/deliver/debt/deliverDebt/deleteBatch',
  importExcel = '/deliver/debt/deliverDebt/importExcel',
  exportXls = '/deliver/debt/deliverDebt/exportXls',
  repay ='/deliver/repay/deliverRepay/repay',
  repayEdit ='/deliver/repay/deliverRepay/repayEdit',
  oneKeyRepay ='/deliver/repay/deliverRepay/oneKeyRepay',
  deliverRepayList='/deliver/repay/deliverRepay/list',
  repayDetailList='/deliver/repay/deliverRepay/repayDetail',
  repayRevoke='/deliver/repay/deliverRepay/repayRevoke',
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
// 客户还款
export const deliverRepayList = (params) => defHttp.get({ url: Api.deliverRepayList, params });
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
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const repay = (params) => {
  let url =  Api.repay  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
/**
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const repayEdit = (params) => {
  let url =  Api.repayEdit  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
/**
 * 客户欠款还款
 * @param params
 * @param isUpdate
 */
export const oneKeyRepay = (params) => {
  let url =  Api.oneKeyRepay  ;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}


