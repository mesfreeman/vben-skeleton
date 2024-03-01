import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { showTagByCommonStatus, showTagByIsShow } from '/@/utils/show';

export const isDir = (type: number) => type === 1;
export const isMenu = (type: number) => type === 2;
export const isApi = (type: number) => type === 3;

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    align: 'left',
    slots: { customRender: 'nameSlot' },
  },
  {
    title: '地址',
    dataIndex: 'path',
    align: 'left',
    slots: { customRender: 'pathSlot' },
  },
  {
    title: '排序',
    dataIndex: 'weight',
    width: 80,
  },
  {
    title: '显示',
    dataIndex: 'isShow',
    width: 80,
    customRender: ({ record }) => {
      return showTagByIsShow(record.isShow);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      return showTagByCommonStatus(record.status);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '接口', value: 3 },
      ],
    },
    colProps: { span: 5 },
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
    colProps: { span: 5 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'pid',
    label: 'pid',
    component: 'InputNumber',
    defaultValue: 0,
    show: false,
  },
  {
    field: 'type',
    label: '类型',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '目录', value: 1 },
          { label: '菜单', value: 2 },
          { label: '接口', value: 3 },
        ],
        onChange: (e: ChangeEvent) => {
          try {
            const val = Number(e.target.value);
            if (isDir(val)) {
              formModel.mode = 1;
              formModel.isShow = 2;
              formModel.status = 2;
            } else if (isApi(val)) {
              formModel.mode = 1;
              formModel.isShow = 1;
              formModel.status = 2;
            }
          } catch (error) {}
        },
      };
    },
  },
  {
    field: 'icon',
    label: '图标',
    subLabel: '(用于菜单栏显示)',
    component: 'IconPicker',
    show: ({ values }) => !isApi(values.type),
  },
  {
    field: 'pname',
    label: '上级',
    subLabel: '(留空时表示为一级目录或菜单)',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'mode',
    label: '模式',
    component: 'Input',
    defaultValue: 1,
    show: false,
  },
  {
    field: 'path',
    label: '地址',
    component: 'InputGroup',
    required: true,
    slot: 'pathSlot',
  },
  {
    field: 'weight',
    label: '排序',
    subLabel: '(数值越大越靠前)',
    component: 'InputNumber',
    defaultValue: 0,
    componentProps: {
      style: 'width:119px',
    },
  },
  {
    field: 'isShow',
    label: '显示',
    component: 'RadioButtonGroup',
    defaultValue: 2,
    required: true,
    componentProps: {
      options: [
        { label: '显示', value: 2 },
        { label: '隐藏', value: 1 },
      ],
    },
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: '启用', value: 2 },
        { label: '禁用', value: 1 },
      ],
    },
  },
];
