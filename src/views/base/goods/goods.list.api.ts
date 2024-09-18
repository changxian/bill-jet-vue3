import { defHttp } from '/@/utils/http/axios';

enum Api {
  treeList = '/bill/goods/queryGoodsTreeList',
  searchBy = '/bill/goods/category/searchBy',
}

/**
 * 获取部门树列表
 */
export const queryGoodsCategoryList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });

/**
 * 根据关键字搜索部门
 */
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });
