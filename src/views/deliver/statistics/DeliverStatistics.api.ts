import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/deliver/statistics/deliverStatistics/list',
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
