import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/purchase/bill/purchaseBill/list',
  save = '/purchase/bill/purchaseBill/saveOrUpdate',
  edit = '/purchase/bill/purchaseBill/saveOrUpdate',
  deleteOne = '/purchase/bill/purchaseBill/delete',
  deleteBatch = '/purchase/bill/purchaseBill/deleteBatch',
  importExcel = '/purchase/bill/purchaseBill/importExcel',
  exportXls = '/purchase/bill/purchaseBill/exportXls',
  billDetail = '/purchase/bill/purchaseBill/billDetail',
  editStatus = '/purchase/bill/purchaseBill/editStatus',
  editInvoiceStatus = '/purchase/bill/purchaseBill/editInvoiceStatus',
  editInfo = '/purchase/bill/purchaseBill/editInfo',
  queryById = '/purchase/bill/purchaseBill/queryById',
  querySupByOrgName = '/purchase/supplier/supplier/queryByOrgName',
}

export const editStatus = (params) => {
  return defHttp.post({ url: Api.editStatus, params }, { isTransformResponse: false });
};
export const editInvoiceStatus = (params) => {
  return defHttp.post({ url: Api.editInvoiceStatus, params }, { isTransformResponse: false });
};
export const editInfo = (params) => {
  return defHttp.post({ url: Api.editInfo, params }, { isTransformResponse: false });
};

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

export const billDetail = (params) => defHttp.get({ url: Api.billDetail, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
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
export const saveOrUpdate = (params) => {
  return defHttp.post({ url: Api.save, params }, { isTransformResponse: false });
};

/**
 * 根据供应商名称查询客户api
 * @param params
 */
export const querySupByOrgName = (params) => defHttp.get({ url: Api.querySupByOrgName, params });
