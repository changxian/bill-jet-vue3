import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/bill/goods/listIgnoreAdded',
}

/**
 * 列表接口
 * @param params
 */
export const goodsList = (params) => defHttp.get({ url: Api.list, params });
