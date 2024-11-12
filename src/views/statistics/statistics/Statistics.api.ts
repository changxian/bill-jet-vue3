import { defHttp } from '/@/utils/http/axios';

enum Api {
  moduleTotal = '/statistics/statistics/moduleTotal',
  moduleDateTotal = '/statistics/statistics/moduleDateTotal',
  hotGoods = '/statistics/statistics/hotGoods',
}


export const moduleTotal = (params) => defHttp.get({ url: Api.moduleTotal, params });
export const moduleDateTotal = (params) => defHttp.get({ url: Api.moduleDateTotal, params });
export const hotGoods = (params) => defHttp.get({ url: Api.hotGoods, params });
