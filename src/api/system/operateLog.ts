import { OperateLogListParams, OperateLogListResult } from '/@/api/system/model/operateLogModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  OperateLogList = '/system/operateLog/list',
}

// 获取操作日志列表
export const operateLogList = (params: OperateLogListParams) => {
  return defHttp.post<OperateLogListResult>({ url: Api.OperateLogList, params });
};
