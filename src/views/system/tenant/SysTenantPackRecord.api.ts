import {defHttp} from '/@/utils/http/axios';
enum Api {
  list = '/system/sysTenantPackRecord/list',
  reNew = '/system/sysTenantPackRecord/reNew',
  reNewByCode = '/activate/activateCode/activate',
  exportXls = '/system/sysTenantPackRecord/exportXls',
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
export const list = (params) => {
  defHttp.get({url: Api.list, params});
};

/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params) => {
  let url = Api.reNew;
  return defHttp.post({ url: url, params });
};
/**
 * 保存或者更新
 * @param params
 */
export const reNewByCode = (params) => {
  let url = Api.reNewByCode;
  return defHttp.post({ url: url, params });
};
