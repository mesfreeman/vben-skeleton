import {
  AccountListParams,
  AccountListResult,
  AccountAddParams,
  AccountModifyParams,
  AccountModifyPwdParams,
} from '/@/api/system/model/accountModel';
import { defHttp } from '/@/utils/http/axios';
import { BasicIdParams, BasicIdResult } from '/@/api/model/baseModel';

enum Api {
  AccountList = '/system/account/list',
  AccountAdd = '/system/account/add',
  AccountModify = '/system/account/modify',
  AccountModifyPwd = '/system/account/modifyPwd',
  AccountDelete = '/system/account/delete',
}

// 获取账号列表
export const accountList = (params: AccountListParams) => {
  return defHttp.post<AccountListResult>({ url: Api.AccountList, params });
};

// 添加账号
export const accountAdd = (params: AccountAddParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.AccountAdd, params });
};

// 修改账号
export const accountModify = (params: AccountModifyParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.AccountModify, params });
};

// 修改账号密码
export const accountModifyPwd = (params: AccountModifyPwdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.AccountModifyPwd, params });
};

// 删除账号
export const accountDelete = (params: BasicIdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.AccountDelete, params });
};
