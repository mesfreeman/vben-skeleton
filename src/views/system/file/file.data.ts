import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image, Tag } from 'ant-design-vue';
import zhCn from 'moment/dist/locale/zh-cn';
import { providerMap } from '/@/enums/fileEnum';

// 默认缩略图
const defaultThumbnail = 'https://file.dandy.fun/20221103/0906file.png?imageMogr2/thumbnail/90x90';

// 表格数据
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '缩略图',
    dataIndex: 'thumbnail',
    width: 100,
    customRender: ({ record }) => {
      return h(Image, { width: '70px', src: record.thumbnail || defaultThumbnail });
    },
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
  },
  {
    title: '文件大小',
    dataIndex: 'fileSize',
    width: 100,
    sorter: true,
    customRender: ({ record }) => {
      let unit = ' KB';
      let fileSize = record.fileSize / 1024;
      if (fileSize > 1024) {
        unit = ' M';
        fileSize = fileSize / 1024;
      }
      return fileSize.toFixed(2) + unit;
    },
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    width: 100,
    defaultHidden: true,
  },
  {
    title: '文件地址',
    dataIndex: 'fileUrl',
    ellipsis: true,
    customRender: ({ record }) => {
      return h('a', { href: record.fileUrl, target: '_blank' }, record.fileUrl);
    },
  },
  {
    title: '提供商',
    dataIndex: 'provider',
    width: 100,
    customRender: ({ record }) => {
      return h(Tag, { color: 'blue' }, () => providerMap.get(record.provider) || '未知');
    },
  },
  {
    title: '上传者',
    dataIndex: 'username',
    width: 150,
    customRender: ({ record }) => {
      const nickname = record.nickname || '-';
      return `${nickname}(${record.username})`;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '上传时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    defaultHidden: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键词',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'uploader',
    label: '上传者',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createdDate',
    label: '上传时间',
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

export const configFormSchema: FormSchema[] = [
  {
    label: '提供商',
    field: 'provider',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 'qiniu',
    componentProps: {
      options: [
        { label: '七牛云', value: 'qiniu' },
        { label: '阿里云', value: 'ali' },
        { label: '腾讯云', value: 'tencent' },
      ],
    },
  },
  {
    label: '空间',
    field: 'bucket',
    required: true,
    component: 'Input',
  },
  {
    label: '密匙',
    field: 'accessKey',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: 'access key',
    },
  },
  {
    label: '密钥',
    field: 'secretKey',
    required: true,
    component: 'InputPassword',
    componentProps: {
      placeholder: 'secret key',
    },
  },
  {
    label: '域名',
    field: 'domain',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '如：https://file.dandy.fun',
    },
  },
  {
    label: '缩略图',
    field: 'thumbConf',
    component: 'Input',
    componentProps: {
      placeholder: '缩略图样式参数',
    },
  },
  {
    label: '类型',
    field: 'allowTypes',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        { label: '.png', value: 'png' },
        { label: '.jpg', value: 'jpg' },
        { label: '.jpeg', value: 'jpeg' },
        { label: '.gif', value: 'gif' },
        { label: '.mp3', value: 'mp3' },
        { label: '.mp4', value: 'mp4' },
        { label: '.avi', value: 'avi' },
        { label: '.3gp', value: '3gp' },
        { label: '.txt', value: 'txt' },
        { label: '.json', value: 'json' },
        { label: '.md', value: 'md' },
        { label: '.pdf', value: 'pdf' },
        { label: '.xls', value: 'xls' },
        { label: '.xlsx', value: 'xlsx' },
        { label: '.doc', value: 'doc' },
        { label: '.docx', value: 'docx' },
        { label: '.ppt', value: 'ppt' },
        { label: '.pptx', value: 'pptx' },
        { label: '.zip', value: 'zip' },
        { label: '.tar', value: 'tar' },
        { label: '.gz', value: 'gz' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
