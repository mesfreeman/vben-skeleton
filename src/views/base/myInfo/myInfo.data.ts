import { FormSchema } from '/@/components/Form';
import defaultImg from '/@/assets/images/header.jpg';

// 个人信息设置列表
export const settingList = [
  {
    key: '1',
    name: '账号设置',
    component: 'AccountSetting',
  },
  {
    key: '2',
    name: '修改密码',
    component: 'ModifyPassword',
  },
];

// 账号设置表单数据
export const accountFormSchema: FormSchema[] = [
  {
    label: '账号',
    field: 'username',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '昵称',
    field: 'nickname',
    required: true,
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'email',
    required: true,
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '头像',
    field: 'avatar',
    slot: 'avatarSlot',
    defaultValue: defaultImg,
    component: 'Input',
  },
];

// 设置密码表单参数
export const PasswordFormSchema: FormSchema[] = [
  {
    field: 'oldPwd',
    label: '旧密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'newPwd',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPwd',
    label: '确认密码',
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (value !== values.newPwd) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
