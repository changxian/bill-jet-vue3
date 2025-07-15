import { defHttp } from '/@/utils/http/axios';

enum Api {
  loginList = '/sys/log/loginList',
}

/**
 * 列表接口
 * @param params
 */
export const loginList = (params) => defHttp.get({ url: Api.loginList, params });
