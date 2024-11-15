import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/deliver/statistics/deliverStatistics/list',
  detailsList = '/deliver/statistics/deliverStatistics/detailsList',
  totalList = '/deliver/statistics/deliverStatistics/totalList',
  exportXls = '/deliver/statistics/deliverStatistics/exportXls',
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
 * 明细列表接口
 * @param params
 */
export const detailsList = (params) => defHttp.get({ url: Api.detailsList, params });

/**
 * 合计列表接口
 * @param params
 */
export const totalList = (params) => defHttp.get({ url: Api.totalList, params });
