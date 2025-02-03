import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/purchase/checkbill/purchaseCheckBill/list',
  exportXls = '/purchase/checkbill/purchaseCheckBill/exportXls',
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
