import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

const isDir = (type: number) => type === 1;
const isMenu = (type: number) => type === 2;
const isApi = (type: number) => type === 3;
const isComponent = (mode: number) => mode === 1;

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
  },
  {
    title: '组件',
    dataIndex: 'component',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'weight',
    width: 80,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    customRender: ({ record }) => {
      const type = record.type;
      const color = isDir(type) ? 'blue' : isMenu(type) ? 'green' : 'red';
      const text = isDir(type) ? '目录' : isMenu(type) ? '菜单' : '接口';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '显示',
    dataIndex: 'isShow',
    width: 80,
    customRender: ({ record }) => {
      const isShow = record.isShow;
      const enable = ~~isShow === 2;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 2;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
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
    colProps: { span: 6 },
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
    colProps: { span: 6 },
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
              formModel.component = 'layout';
            } else if (isMenu(val)) {
              formModel.component = '';
            } else if (isApi(val)) {
              formModel.mode = 1;
              formModel.component = '';
              formModel.isShow = 1;
            }
          } catch (error) {}
        },
      };
    },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    dynamicDisabled: ({ values }) => isApi(values.type),
  },
  {
    field: 'mode',
    label: '模式',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '组件', value: 1 },
          { label: '内链', value: 2 },
          { label: '外链', value: 3 },
        ],
        onChange: (e: ChangeEvent) => {
          try {
            const val = Number(e.target.value);
            if (isComponent(val)) {
              formModel.component = '';
            } else {
              formModel.component = 'iframe';
            }
          } catch (error) {}
        },
      };
    },
    dynamicDisabled: ({ values }) => !isMenu(values.type),
  },
  {
    field: 'pname',
    label: '上级',
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
    field: 'isShow',
    label: '显示',
    component: 'RadioButtonGroup',
    helpMessage: '开启显示时将会在侧边菜单栏显示',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: '否', value: 1 },
        { label: '是', value: 2 },
      ],
    },
    dynamicDisabled: ({ values }) => isApi(values.type),
  },
  {
    field: 'path',
    label: '地址',
    component: 'Input',
    helpMessage: '路由或链接地址',
    required: true,
  },
  {
    field: 'weight',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
    helpMessage: '数值越大菜单越靠前',
  },
  {
    field: 'component',
    label: '组件',
    component: 'Input',
    defaultValue: 'layout',
    dynamicDisabled: ({ values }) => !isMenu(values.type) || !isComponent(values.mode),
  },
  {
    field: 'status',
    label: '状态',
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
];
