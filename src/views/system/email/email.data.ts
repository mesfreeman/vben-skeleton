import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce';
import { h } from 'vue';
import { emailTemplateList } from '/@/api/system/email';

// 列表数据
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 45,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '邮件主题',
    dataIndex: 'subject',
    width: 200,
  },
  {
    title: '邮件内容',
    dataIndex: 'content',
    ifShow: false,
  },
  {
    title: '邮件标识',
    dataIndex: 'slug',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 100,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 100,
    sorter: true,
  },
];

// 搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    field: 'subject',
    label: '邮件主题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'slug',
    label: '邮件标识',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 邮件模板表单
export const templateFormSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'InputNumber',
    show: false,
  },
  {
    label: '邮件主题',
    field: 'subject',
    required: true,
    component: 'Input',
  },
  {
    label: '邮件标识',
    field: 'slug',
    required: true,
    component: 'Input',
  },
  {
    label: '邮件内容',
    field: 'content',
    required: true,
    component: 'Input',
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

// 邮件配置表单
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
    field: 'sender',
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
];

// 批量发送邮件表单
export const sendFormSchema: FormSchema[] = [
  {
    label: '邮件模板',
    field: 'templateId',
    component: 'ApiSelect',
    subLabel: '(选择相应模板会自动填充邮件主题和内容)',
    componentProps: ({ formModel }) => {
      return {
        api: emailTemplateList,
        params: {
          page: 1,
          pageSize: 100,
        },
        resultField: 'items',
        labelField: 'subject',
        valueField: 'content',
        onChange: (_: any, val: { label: string; value: string }) => {
          formModel.subject = val?.label ?? '';
          formModel.content = val?.value ?? '';
        },
      };
    },
  },
  {
    label: '收件人',
    field: 'recipients',
    required: true,
    component: 'InputTag',
    subLabel: '(如：zhangsan@126.com)',
  },
  {
    label: '邮件主题',
    field: 'subject',
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 64,
    },
  },
  {
    label: '邮件内容',
    field: 'content',
    required: true,
    component: 'Input',
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
