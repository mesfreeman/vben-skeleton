import { RouteMeta } from 'vue-router';

// 登录请求参数
export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

// 登录返回结果
export interface LoginResult {
  token: string;
}

// @todo 后面移除该属性
export interface RoleInfo {
  roleName: string;
  value: string;
}

// 我的个人信息返回结果
export interface MyInfoResult {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
  homePath?: string;
  desc?: string; // @todo 后面移除该属性
  roles?: RoleInfo[]; // @todo 后面移除该属性
}

// 路由元素信息
export interface RouteItem {
  name?: string;
  path: string;
  component: any;
  meta: RouteMeta;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

// 获取我的菜单返回结果
export type MyMenusResult = RouteItem[];

// 修改我的信息请求参数
export interface ModifyMyInfoParams {
  username: string;
  nickname: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// 修改我的密码请求参数
export interface ModifyMyPwdParams {
  oldPwd: string;
  newPwd: string;
}
