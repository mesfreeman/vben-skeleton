import {
  BasicFetchResult,
  BasicIdParams,
  BasicPageParams,
  BasicResult,
} from '/@/api/model/baseModel';
import { RoleLite } from '/@/api/system/model/roleModel';

// 账号简单信息
export interface AccountLite {
  email: string;
  account: string;
}

// 账号列表请求参数
export type AccountListParams = BasicPageParams & { name: string; status: number };

// 单个账号信息
export type AccountItem = BasicResult & {
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  status: number;
  remark: string;
  loginAt: any;
  roles: RoleLite[];
};

// 账号列表响应结果
export type AccountListResult = BasicFetchResult<AccountItem>;

// 添加账号请求参数
export interface AccountAddParams {
  username: string;
  password?: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  status: number;
  remark: string;
  rids: number[];
}

// 修改账号请求参数
export type AccountModifyParams = AccountAddParams & BasicIdParams;

// 修改账号密码请求参数
export type AccountModifyPwdParams = BasicIdParams & { newPwd: string };
