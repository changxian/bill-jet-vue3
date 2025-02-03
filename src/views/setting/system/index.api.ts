import { defHttp } from '/@/utils/http/axios';

enum Api {
  getDictFields = '/bill/dynamic/getMyTelnetDynaFieldsGroup',
  getDynamicFieldsAndValue = '/bill/dynamic/getDynamicFieldsAndValue',
  myBillSetting = '/setting/billing/billingSetting/getMyBillSetting',
  mySystemSetting = '/setting/system/systemSetting/getMySystemSetting',
  savePrint = '/setting/print/printSetting/add',
  editPrint = '/setting/print/printSetting/edit',
  saveBilling = '/setting/billing/billingSetting/add',
  editBilling = '/setting/billing/billingSetting/edit',
  saveOthers = '/bill/dynamic/saveFieldTitles',
  saveSystem = '/setting/system/systemSetting/add',
  editSystem = '/setting/system/systemSetting/edit',


}

/**
 * 系统角色列表
 * @param params
 */
export const fieldsList = (params) => defHttp.get({ url: Api.getDictFields, params });
export const getDynamicFieldsAndValue = (params) => defHttp.get({ url: Api.getDynamicFieldsAndValue, params });

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
 * 保存或者更新其他设置
 * @param params
 * @param isUpdate
 */
export const saveOrUpdateOthers = (params) => {
  let url = Api.saveOthers;
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

export const getMyBillSetting = () => defHttp.get({ url: Api.myBillSetting });
export const getMySystemSetting = () => defHttp.get({ url: Api.mySystemSetting });
