import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import zhCn from 'moment/dist/locale/zh-cn';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Textarea from 'ant-design-vue/es/input/Textarea';
import { isJson } from '/@/utils/is';
import { showTagByHttpStatus } from '/@/utils/show';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '操作账号',
    dataIndex: 'username',
    width: 85,
    sorter: true,
    customRender: ({ record }) => {
      const nickname = record.nickname || '-';
      return `${nickname}(${record.username})`;
    },
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    width: 85,
    sorter: true,
    defaultHidden: true,
  },
  {
    title: '操作功能',
    dataIndex: 'function',
    width: 100,
  },
  {
    title: '请求地址',
    dataIndex: 'uri',
    width: 150,
  },
  {
    title: '请求方式',
    dataIndex: 'method',
    width: 50,
  },
  {
    title: '请求参数',
    dataIndex: 'params',
    ifShow: false,
  },
  {
    title: '状态码',
    dataIndex: 'status',
    width: 50,
    sorter: true,
    customRender: ({ record }) => {
      return showTagByHttpStatus(record.status);
    },
  },
  {
    title: '业务码',
    dataIndex: 'code',
    width: 50,
    sorter: true,
    customRender: ({ record }) => {
      const color = record.code != 0 ? 'red' : '';
      return h('span', { style: `color: ${color}` }, record.code);
    },
  },
  {
    title: '累计耗时',
    dataIndex: 'spendTime',
    width: 60,
    sorter: true,
    customRender: ({ record }) => {
      const color = record.spendTime > 1000 ? 'red' : '';
      return h('span', { style: `color: ${color}` }, record.spendTime + ' ms');
    },
  },
  {
    title: '响应结果',
    dataIndex: 'result',
    ifShow: false,
  },
  {
    title: '浏览器',
    dataIndex: 'userAgent',
    ifShow: false,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    defaultHidden: true,
    width: 150,
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    width: 110,
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '操作账号',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'function',
    label: '操作功能',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createdDate',
    label: '操作时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      showTime: false,
      locale: zhCn,
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { span: 6 },
  },
];

// 详情
export const detailSchema: DescItem[] = [
  {
    label: '操作账号',
    field: 'username',
    labelMinWidth: 90,
    render: (value, data) => {
      return `${data.nickname}(${value})`;
    },
  },
  {
    label: 'IP地址',
    field: 'ip',
  },
  {
    label: '操作功能',
    field: 'function',
  },
  {
    label: '操作时间',
    field: 'createdAt',
  },
  {
    label: '请求地址',
    field: 'uri',
    render: (_, data) => {
      return h('div', [h(Tag, { color: 'blue' }, () => data.method), h('span', {}, data.uri)]);
    },
  },
  {
    label: '累计耗时',
    field: 'spendTime',
    render: (value, _) => {
      const color = value > 1000 ? 'red' : '';
      return h('span', { style: `color: ${color}` }, value + ' ms');
    },
  },
  {
    label: '状态码',
    field: 'status',
    render: (value, _) => {
      return showTagByHttpStatus(value);
    },
  },
  {
    label: '业务码',
    field: 'code',
    render: (value, _) => {
      const color = value != 0 ? 'red' : '';
      return h('span', { style: `color: ${color}` }, value);
    },
  },
  {
    label: '浏览器',
    field: 'userAgent',
    span: 2,
  },
  {
    label: '备注',
    field: 'remark',
    span: 2,
  },
  {
    label: '请求参数',
    field: 'params',
    span: 2,
    render: (value, _) => {
      return h(Textarea, {
        readonly: true,
        disabled: true,
        autoSize: { minRows: 1, maxRows: 10 },
        value: isJson(value) ? JSON.stringify(JSON.parse(value), null, 4) : value,
      });
    },
  },
  {
    label: '响应结果',
    field: 'result',
    span: 2,
    render: (value, _) => {
      return h(Textarea, {
        readonly: true,
        disabled: true,
        autoSize: { minRows: 1, maxRows: 10 },
        value: isJson(value) ? JSON.stringify(JSON.parse(value), null, 4) : value,
      });
    },
  },
];
