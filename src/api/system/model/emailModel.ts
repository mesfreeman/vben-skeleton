// 保存邮件配置请求参数
export type EmailSaveConfigParams = {
  server: string;
  port: string;
  fromer: string;
  account: string;
  password: string;
  toEmails: string[];
};

// 查看文件配置响应结果
export type EmailViewConfigResult = EmailSaveConfigParams;
