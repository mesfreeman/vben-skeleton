import { defHttp } from '/@/utils/http/axios';
import { BasicIdResult } from '/@/api/model/baseModel';
import { EmailSaveConfigParams, EmailViewConfigResult } from '/@/api/system/model/emailModel';

enum Api {
  EmailSaveConfig = '/system/email/saveConfig',
  EmailViewConfig = '/system/email/viewConfig',
}

// 保存文件配置
export const emailSaveConfig = (params: EmailSaveConfigParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.EmailSaveConfig, params });
};

// 查看文件配置
export const emailViewConfig = () => {
  return defHttp.post<EmailViewConfigResult>({ url: Api.EmailViewConfig });
};
