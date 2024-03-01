import { defHttp } from '/@/utils/http/axios';
import { BasicIdParams, BasicIdResult } from '/@/api/model/baseModel';
import {
  EmailViewConfigResult,
  EmailSaveConfigParams,
  EmailTemplateListParams,
  EmailTemplateListResult,
  EmailTemplateAddParams,
  EmailTemplateModifyParams,
  EmailBatchSendParams,
  EmailBatchSendResult,
} from '/@/api/system/model/emailModel';

enum Api {
  EmailViewConfig = '/system/email/viewConfig',
  EmailSaveConfig = '/system/email/saveConfig',
  EmailTemplateList = '/system/email/templateList',
  EmailTemplateAdd = '/system/email/templateAdd',
  EmailTemplateModify = '/system/email/templateModify',
  EmailTemplateDelete = '/system/email/templateDelete',
  EmailBatchSend = '/system/email/batchSend',
}

// 查看文件配置
export const emailViewConfig = () => {
  return defHttp.post<EmailViewConfigResult>({ url: Api.EmailViewConfig });
};

// 保存文件配置
export const emailSaveConfig = (params: EmailSaveConfigParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.EmailSaveConfig, params });
};

// 获取邮件模板列表
export const emailTemplateList = (params?: EmailTemplateListParams) => {
  return defHttp.post<EmailTemplateListResult>({ url: Api.EmailTemplateList, params });
};

// 添加邮件模板
export const emailTemplateAdd = (params: EmailTemplateAddParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.EmailTemplateAdd, params });
};

// 修改邮件模板
export const emailTemplateModify = (params: EmailTemplateModifyParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.EmailTemplateModify, params });
};

// 删除邮件模板
export const emailTemplateDelete = (params: BasicIdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.EmailTemplateDelete, params });
};

// 批量发送邮件
export const emailBatchSend = (params: EmailBatchSendParams) => {
  return defHttp.post<EmailBatchSendResult>({ url: Api.EmailBatchSend, params });
};
