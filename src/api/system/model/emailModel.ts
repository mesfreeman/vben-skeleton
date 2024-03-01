import {
  BasicFetchResult,
  BasicIdParams,
  BasicPageParams,
  BasicResult,
} from '/@/api/model/baseModel';

// 查看文件配置响应结果
export type EmailViewConfigResult = {
  server: string;
  port: string;
  sender: string;
  account: string;
  password: string;
};

// 保存邮件配置请求参数
export type EmailSaveConfigParams = EmailViewConfigResult;

// 邮件模板列表请求参数
export type EmailTemplateListParams = BasicPageParams & {
  subject: string;
  slug: string;
};

// 单个邮件模板信息
export type EmailTemplateItem = BasicResult & {
  subject: string;
  content: string;
  slug: string;
  remark: string;
};

// 邮件模板列表响应结果
export type EmailTemplateListResult = BasicFetchResult<EmailTemplateItem>;

// 新增邮件模板请求参数
export type EmailTemplateAddParams = {
  subject: string;
  content: string;
  slug: string;
  remark: string;
};

// 修改邮件模板请求参数
export type EmailTemplateModifyParams = BasicIdParams & EmailTemplateAddParams;

// 批量发送邮件请求参数
export type EmailBatchSendParams = {
  subject: string;
  content: string;
  recipients: string[];
};

// 批量发送邮件响应结果
export type EmailBatchSendResult = {
  total: number;
  success: number;
  fail: number;
};
