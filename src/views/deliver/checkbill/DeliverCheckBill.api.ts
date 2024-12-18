import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/deliver/checkbill/deliverCheckBill/list',
  listCount = '/deliver/checkbill/deliverCheckBill/listCount',
  exportXls = '/deliver/checkbill/deliverCheckBill/exportXls',
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
 列表总计统计接口
 * @param params
 */
export const listCount = (params) => defHttp.get({ url: Api.listCount, params });
