import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import zhCn from 'moment/dist/locale/zh-cn';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '账号',
    dataIndex: 'username',
    width: 150,
    sorter: true,
    customRender: ({ record }) => {
      const nickname = record.nickname || '-';
      return `${nickname}(${record.username})`;
    },
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    sorter: true,
  },
  {
    title: '设备型号',
    dataIndex: 'device',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
  },
  {
    title: '日志类型',
    dataIndex: 'operType',
    width: 100,
    sorter: true,
    customRender: ({ record }) => {
      const operType = record.operType;
      const color = operType == 1 ? 'green' : operType == 2 ? 'red' : 'blue';
      const text = operType == 1 ? '登录成功' : operType == 2 ? '登录失败' : '退出登录';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '登录时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '登录账号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'ip',
    label: 'IP地址',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'operType',
    label: '日志类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '登录成功', value: 1 },
        { label: '登录失败', value: 2 },
        { label: '退出登录', value: 3 },
      ],
    },
    colProps: { span: 4 },
  },
  {
    field: 'createdDate',
    label: '登录时间',
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
