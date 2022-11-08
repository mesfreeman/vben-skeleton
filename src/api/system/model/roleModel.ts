import {
  BasicPageParams,
  BasicFetchResult,
  BasicIdParams,
  BasicResult,
} from '/@/api/model/baseModel';

// 角色简单信息
export interface RoleLite {
  id: number;
  name: string;
}

// 角色列表请求参数
export type RoleListParams = BasicPageParams & { name: string; status: number };

// 角色元素信息
export type RoleItem = BasicResult & {
  name: string;
  status: number;
  weight: number;
  remark: string;
  mids: number[];
};

// 角色列表响应结果
export type RoleListReuslt = BasicFetchResult<RoleItem>;

// 添加角色请求参数
export interface RoleAddParams {
  name: string;
  status: number;
  weight: number;
  remark: string;
  mids: number[];
}

// 修改角色请求参数
export type RoleModifyParams = BasicIdParams & RoleAddParams;
