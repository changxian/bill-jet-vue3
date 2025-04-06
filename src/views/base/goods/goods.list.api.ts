import { defHttp } from '/@/utils/http/axios';

enum Api {
  treeList = '/bill/goods/queryGoodsTreeList',
  searchBy = '/bill/goods/category/searchBy',
  editCategory = '/bill/goods/editCategory',
  addStockRecord = '/system/goodsInventoryRecord/add',
  updateBillCostByGoodsId = '/deliver/bill/deliverBill/updateBillCostByGoodsId',
  updateAllBillCost = '/deliver/bill/deliverBill/updateAllBillCost',
}

/**
 * 获取部门树列表
 */
export const queryGoodsCategoryList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });

/**
 * 根据关键字搜索部门
 */
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });

/**
 * 修改商品的类别
 */
export const editCategory = (params) => {
  return defHttp.post({ url: Api.editCategory, params }, { isTransformResponse: false });
};

/**
 * 修改商品的库存
 */
export const addStockRecord = (params) => {
  return defHttp.post({ url: Api.addStockRecord, params }, { isTransformResponse: false });
};

/**
 * 更新指定商品销售单的成本价
 */
export const updateBillCostByGoodsId = (params) => defHttp.get({ url: Api.updateBillCostByGoodsId, params });

/**
 * 更新所有销售单的成本价
 */
export const updateAllBillCost = () => defHttp.get({ url: Api.updateAllBillCost });
