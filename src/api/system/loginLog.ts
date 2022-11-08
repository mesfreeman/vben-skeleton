import { LoginLogListParams, LoginLogListResult } from '/@/api/system/model/loginLogModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  LoginLogList = '/system/loginLog/list',
}

// 获取登录日志列表
export const loginLogList = (params: LoginLogListParams) => {
  return defHttp.post<LoginLogListResult>({ url: Api.LoginLogList, params });
};
