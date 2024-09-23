import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
   
  queryTreeListForRole = '/sys/role/queryTreeList',
  queryRolePermission = '/sys/permission/queryUserPermission',
  saveRolePermission = '/sys/permission/saveUserPermission', 
}
 
  
// update-end--author:liaozhiyang---date:20231215---for：【QQYUN-7415】表单调用接口进行校验的添加防抖
/**
 * 根据角色查询树信息
 */
export const queryTreeListForRole = () => defHttp.get({ url: Api.queryTreeListForRole });
/**
 * 查询角色权限
 */
export const queryRolePermission = (params) => defHttp.get({ url: Api.queryRolePermission, params });
/**
 * 保存角色权限
 */
export const saveRolePermission = (params) => defHttp.post({ url: Api.saveRolePermission, params });
