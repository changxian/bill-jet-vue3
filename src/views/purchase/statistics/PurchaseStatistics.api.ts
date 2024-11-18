import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/purchase/statistics/purchaseStatistics/list',
  exportXls = '/purchase/statistics/purchaseStatistics/exportXls',


  detailsList = '/purchase/statistics/purchaseStatistics/detailsList',
  detailsExportXls = '/purchase/statistics/purchaseStatistics/detailsExportXls',

  totalList = '/purchase/statistics/purchaseStatistics/totalList',
  totalExportXls = '/purchase/statistics/purchaseStatistics/totalExportXls',
}
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;



/**
 * 明细列表接口
 * @param params
 */
export const detailsList = (params) => defHttp.get({ url: Api.detailsList, params });
/**
 * 导出api
 * @param params
 */
export const detailsExportXls = Api.detailsExportXls;
/**
 * 合计列表接口
 * @param params
 */
export const totalList = (params) => defHttp.get({ url: Api.totalList, params });
/**
 * 导出api
 * @param params
 */
export const totalExportXls = Api.totalExportXls;
