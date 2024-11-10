import { defHttp } from '/@/utils/http/axios';

enum Api {
  moduleTotal = '/statistics/statistics/moduleTotal',
  moduleDateTotal = '/statistics/statistics/moduleDateTotal',
}


export const moduleTotal = (params) => defHttp.get({ url: Api.moduleTotal, params });
export const moduleDateTotal = (params) => defHttp.get({ url: Api.moduleDateTotal, params });
