import { BasicFetchResult, BasicPageParams, BasicResult } from '/@/api/model/baseModel';

// 操作日志请求参数
export type OperateLogListParams = BasicPageParams & {
  name: string;
  module: string;
  createdDate: any;
};

// 操作记录元素
export type OperateLogItem = BasicResult & {
  username: string;
  nickname: string;
  ip: string;
  module: string;
  function: string;
  uri: string;
  method: string;
  params: string;
  status: number;
  spendTime: number;
  result: string;
  userAgent: string;
  remark: string;
};

// 获取操作日志列表响应结果
export type OperateLogListResult = BasicFetchResult<OperateLogItem>;
