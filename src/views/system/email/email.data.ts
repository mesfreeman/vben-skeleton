import { FormSchema } from '/@/components/Form';
import { liteAccounts } from '/@/api/common';

export const configFormSchema: FormSchema[] = [
  {
    label: '收信服务器',
    subLabel: '(如：smtp.126.com)',
    field: 'server',
    required: true,
    component: 'Input',
  },
  {
    label: '端口',
    subLabel: '(收信服务器端口号)',
    field: 'port',
    required: true,
    component: 'Input',
  },
  {
    label: '发件人',
    subLabel: '(如：张三)',
    field: 'fromer',
    required: true,
    component: 'Input',
  },
  {
    label: '账号',
    subLabel: '(如：zhangsan@126.com)',
    field: 'account',
    required: true,
    component: 'Input',
  },
  {
    label: '密码',
    subLabel: '(账号密码或授权码)',
    field: 'password',
    required: true,
    component: 'InputPassword',
  },
  {
    label: '收件人',
    field: 'toEmails',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: liteAccounts,
      labelField: 'account',
      valueField: 'email',
    },
  },
];
