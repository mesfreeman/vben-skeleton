import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResult,
  MyInfoResult,
  MyMenusResult,
  ModifyMyPwdParams,
  ModifyMyInfoParams,
} from './model/commonModel';
import { ErrorMessageMode } from '/#/axios';
import { BasicIdResult } from '/@/api/model/baseModel';
import { RoleLite } from '/@/api/system/model/roleModel';
import { AccountLite } from '/@/api/system/model/accountModel';

enum Api {
  Login = '/login/login',
  Logout = '/login/logout',
  MyInfo = '/base/myInfo',
  MyMenus = '/base/myMenus',
  MyPerms = '/base/myPerms',
  ModifyMypwd = '/base/modifyMyPwd',
  ModifyMyInfo = '/base/modifyMyInfo',
  LiteRoles = '/base/liteRoles',
  LiteAccounts = '/base/liteAccounts',
}

// 登录请求
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResult>({ url: Api.Login, params }, { errorMessageMode: mode });
}

// 登出请求
export function logoutApi() {
  return defHttp.post<BasicIdResult>({ url: Api.Logout });
}

// 我的个人信息
export function myInfo() {
  return defHttp.post<MyInfoResult>({ url: Api.MyInfo });
}

// 我的权限菜单
export function myMenus() {
  return defHttp.post<MyMenusResult>({ url: Api.MyMenus });
}

// 我的权限代码
export function myPerms() {
  return defHttp.post<string[]>({ url: Api.MyPerms });
}

// 修改我的密码
export function modifyMypwd(params: ModifyMyPwdParams) {
  return defHttp.post<BasicIdResult>({ url: Api.ModifyMypwd, params });
}

// 修改我的信息
export function modifyMyInfo(params: ModifyMyInfoParams) {
  return defHttp.post<BasicIdResult>({ url: Api.ModifyMyInfo, params });
}

// 获取角色简单信息
export function liteRoles() {
  return defHttp.post<RoleLite[]>({ url: Api.LiteRoles });
}

// 获取角色简单信息
export function liteAccounts() {
  return defHttp.post<AccountLite[]>({ url: Api.LiteAccounts });
}
