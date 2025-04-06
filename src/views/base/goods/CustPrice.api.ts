import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/deliver/custprice/goodsCustPrice/list',
  save = '/deliver/custprice/goodsCustPrice/add',
  saveInit = '/deliver/custprice/goodsCustPrice/initCustPrice',
  saveInit2 = '/deliver/custprice/goodsCustPrice/custToPrice',
  edit = '/deliver/custprice/goodsCustPrice/edit',
  updatePrice = '/deliver/custprice/goodsCustPrice/updatePrice',
  deleteOne = '/deliver/custprice/goodsCustPrice/delete',
  deleteBatch = '/deliver/custprice/goodsCustPrice/deleteBatch',
  importExcel = '/bill/deliver/custprice/goodsCustPrice/importExcel',
  exportXls = '/deliver/custprice/goodsCustPrice/exportXls',
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
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
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
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const updatePrice = (params) => {
  let url = Api.updatePrice;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新【选择商品加入客户的客户价】
 * @param params
 * @param isUpdate
 */
export const saveInitCustPrice = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.saveInit;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新【选择客户加入商品的客户价】
 * @param params
 * @param isUpdate
 */
export const saveInitCustPrice2 = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.saveInit2;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
