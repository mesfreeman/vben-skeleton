import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { showTagByCommonStatus } from '/@/utils/show';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 280,
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
    title: '排序',
    dataIndex: 'weight',
    width: 80,
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
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
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'InputNumber',
    show: false,
  },
  {
    label: '名称',
    field: 'name',
    required: true,
    component: 'Input',
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
    label: '排序',
    field: 'weight',
    component: 'InputNumber',
    defaultValue: 0,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '权限',
    field: 'mids',
    slot: 'menuSolt',
    component: 'Input',
  },
];
