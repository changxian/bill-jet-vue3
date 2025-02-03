import {defHttp} from '/@/utils/http/axios';
enum Api {
  list = '/system/sysTenantPackRecord/list',
  reNew='/system/sysTenantPackRecord/reNew',
  exportXls = '/system/sysTenantPackRecord/exportXls',
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
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params) => {
  let url =  Api.reNew;
  return defHttp.post({url: url, params});
}
