import { BasicFetchResult, BasicPageParams, BasicResult } from '/@/api/model/baseModel';

// 登录日志请求参数
export type LoginLogListParams = BasicPageParams & {
  name: string;
  ip: string;
  operType: number;
  createdDate: any;
};

// 登录记录元素
export type LoginLogItem = BasicResult & {
  username: string;
  nickname: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  operType: number;
  remark: string;
};

// 获取登录日志列表响应结果
export type LoginLogListResult = BasicFetchResult<LoginLogItem>;
