import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Avatar } from 'ant-design-vue';
import { liteRoles } from '/@/api/common';
import { showTagByCommonStatus } from '/@/utils/show';
import defaultImg from '/@/assets/images/header.jpg';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 70,
    customRender: ({ record }) => {
      return h(Avatar, { size: 40, src: record.avatar || defaultImg });
    },
  },
  {
    title: '账号',
    dataIndex: 'username',
    width: 200,
    sorter: true,
    customRender: ({ record }) => {
      const nickname = record.nickname || '-';
      return `${nickname}(${record.username})`;
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    sorter: true,
    defaultSortOrder: 'descend',
    customRender: ({ record }) => {
      return showTagByCommonStatus(record.status);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '最后登录时间',
    dataIndex: 'loginAt',
    width: 180,
    sorter: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    sorter: true,
    defaultHidden: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '账号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '禁用', value: 1 },
        { label: '启用', value: 2 },
      ],
    },
    colProps: { span: 3 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'InputNumber',
    defaultValue: 0,
    show: false,
  },
  {
    label: '头像',
    field: 'avatar',
    slot: 'avatarSlot',
    defaultValue: defaultImg,
    component: 'Input',
  },
  {
    label: '账号',
    field: 'username',
    required: true,
    component: 'Input',
  },
  {
    label: '密码',
    field: 'password',
    required: true,
    component: 'StrengthMeter',
    ifShow: ({ values }) => values.id === 0,
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
    label: '角色',
    field: 'rids',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: liteRoles,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: '禁用', value: 1 },
        { label: '启用', value: 2 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const modifyPwdFormSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'InputNumber',
    defaultValue: 0,
    show: false,
  },
  {
    label: '账号',
    field: 'username',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '新密码',
    field: 'newPwd',
    required: true,
    component: 'StrengthMeter',
  },
];
