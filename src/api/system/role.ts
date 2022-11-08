import { defHttp } from '/@/utils/http/axios';
import { RoleListParams, RoleListReuslt, RoleAddParams, RoleModifyParams } from './model/roleModel';
import { BasicIdParams, BasicIdResult } from '/@/api/model/baseModel';

enum Api {
  RoleList = '/system/role/list',
  RoleAdd = '/system/role/add',
  RoleModify = '/system/role/modify',
  RoleDelete = '/system/role/delete',
}

// 获取角色列表
export const roleList = (params?: RoleListParams) => {
  return defHttp.post<RoleListReuslt>({ url: Api.RoleList, params });
};

// 添加角色
export const roleAdd = (params: RoleAddParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.RoleAdd, params });
};

// 修改角色
export const roleModify = (params: RoleModifyParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.RoleModify, params });
};

// 删除角色
export const roleDelete = (params: BasicIdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.RoleDelete, params });
};
