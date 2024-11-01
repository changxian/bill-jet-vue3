import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/purchase/statistics/purchaseStatistics/list',
  exportXls = '/purchase/statistics/purchaseStatistics/exportXls',
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
