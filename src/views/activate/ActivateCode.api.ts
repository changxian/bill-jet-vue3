import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/activate/activateCode/list',
  save = '/activate/activateCode/add',
  edit = '/activate/activateCode/edit',
  deleteOne = '/activate/activateCode/delete',
  deleteBatch = '/activate/activateCode/deleteBatch',
  importExcel = '/bill/activate/activateCode/importExcel',
  exportXls = '/activate/activateCode/exportXls',
  activateCodeUrl = '/activate/activateCode/activate',
  myActivateCodeList = '/activate/activateCode/myActivateCodeList',
  limitActivateCodeList = '/activate/activateCode/limitActivateCodeList',
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
 * 列表接口
 * @param params
 */
export const myActivateCodeList = (params) => defHttp.get({ url: Api.myActivateCodeList, params });

/**
 * 列表接口
 * @param params
 */
export const limitActivateCodeList = (params) => defHttp.get({ url: Api.limitActivateCodeList, params });

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
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新
 * @param params
 */
export const activateCodeSave = (params) => {
  return defHttp.post({ url: Api.activateCodeUrl, params }, { isTransformResponse: false });
};
