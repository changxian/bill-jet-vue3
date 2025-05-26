import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/bill/goods/categoryTree/rootList',
  save = '/bill/goods/categoryTree/add',
  edit = '/bill/goods/categoryTree/edit',
  uniqueDictCheck = '/bill/goods/categoryTree/uniqueDictCheck',
  deleteCategory = '/bill/goods/categoryTree/delete',
  deleteBatch = '/bill/goods/categoryTree/deleteBatch',
  importExcel = '/bill/goods/categoryTree/importExcel',
  exportXls = '/bill/goods/categoryTree/exportXls',
  loadTreeData = '/bill/goods/categoryTree/loadTreeRoot',
  getChildList = '/bill/goods/categoryTree/childList',
  getChildListBatch = '/bill/goods/categoryTree/getChildListBatch',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 * @param params
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 删除
 */
export const deleteCategory = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteCategory, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDeleteCategory = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 分类唯一性检查
 * @param params
 */
export const uniqueDictCheck = (params) => {
  let url = Api.uniqueDictCheck;
  return defHttp.post({ url: url, params });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 查询全部树形节点数据
 * @param params
 */
export const loadTreeData = (params) => defHttp.get({ url: Api.loadTreeData, params });
/**
 * 查询子节点数据
 * @param params
 */
export const getChildList = (params) => defHttp.get({ url: Api.getChildList, params });
/**
 * 批量查询子节点数据
 * @param params
 */
export const getChildListBatch = (params) => defHttp.get({ url: Api.getChildListBatch, params }, { isTransformResponse: false });
