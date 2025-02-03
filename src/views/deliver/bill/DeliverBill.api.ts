import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/deliver/bill/deliverBill/list',
  save = '/deliver/bill/deliverBill/add',
  edit = '/deliver/bill/deliverBill/edit',
  deleteOne = '/deliver/bill/deliverBill/delete',
  deleteBatch = '/deliver/bill/deliverBill/deleteBatch',
  importExcel = '/deliver/bill/deliverBill/importExcel',
  exportXls = '/deliver/bill/deliverBill/exportXls',
  billDetail = '/deliver/bill/deliverBill/billDetail',
  editStatus = '/deliver/bill/deliverBill/editStatus',
  editInvoiceStatus = '/deliver/bill/deliverBill/editInvoiceStatus',
  editInfo = '/deliver/bill/deliverBill/editInfo',
  queryById = '/deliver/bill/deliverBill/queryById',
  defaultCompany = '/company/tenantCompany/default',
  queryNewNo = '/bill/no/newNo',
}

/**
 * 修改送货单状态api
 * @param params
 */
export const editStatus = (params) => {
  return defHttp.post({ url: Api.editStatus, params }, { isTransformResponse: false });
};
/**
 * 修改送货单开票状态api
 * @param params
 */
export const editInvoiceStatus = (params) => {
  return defHttp.post({ url: Api.editInvoiceStatus, params }, { isTransformResponse: false });
};
/**
 * 修改送货单信息api
 * @param params
 */
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


/**
 * 送货单详情接口
 * @param params
 */
export const billDetail = (params) => defHttp.get({ url: Api.billDetail, params });

/**
 * 默认机构
 */
export const defaultCom = () => defHttp.get({ url: Api.defaultCompany });

/**
 * 送货开单查询新单号接口
 * @param params
 */
export const queryNewNo = (params) => defHttp.get({ url: Api.queryNewNo, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
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
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
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
