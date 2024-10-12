import { defHttp } from '/@/utils/http/axios';

enum Api {
  getDictFields = '/bill/dynamic/getDictFields',
  savePrint = '/setting/print/printSetting/add',
  editPrint = '/setting/print/printSetting/edit',
  saveBilling = '/setting/billing/billingSetting/add',
  editBilling = '/setting/billing/billingSetting/edit',
  saveSystem = '/setting/system/systemSetting/add',
  editSystem = '/setting/system/systemSetting/edit',
}

/**
 * 导出api
 * @param params
 */
export const getDictFields = Api.getDictFields;

/**
 * 保存或者更新打印设置
 * @param params
 * @param isUpdate
 */
export const saveOrUpdatePrint = (params, isUpdate) => {
  let url = isUpdate ? Api.editPrint : Api.savePrint;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新开单设置
 * @param params
 * @param isUpdate
 */
export const saveOrUpdateBilling = (params, isUpdate) => {
  let url = isUpdate ? Api.editBilling : Api.saveBilling;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

/**
 * 保存或者更新系统设置
 * @param params
 * @param isUpdate
 */
export const saveOrUpdateSystem = (params, isUpdate) => {
  let url = isUpdate ? Api.editSystem : Api.saveSystem;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};

export const getInitData = () => defHttp.get({ url: Api.getDictFields });
