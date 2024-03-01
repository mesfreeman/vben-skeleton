import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { ProviderCodeEnum, providerMap } from '/@/enums/fileEnum';

// 根据通用状态显示标签
export function showTagByCommonStatus(status: number) {
  const enable = ~~status === 2;
  const color = enable ? 'green' : 'red';
  const text = enable ? '启用' : '禁用';
  return h(Tag, { color: color }, () => text);
}

// 根据是否状态显示标签
export function showTagByIsStatus(status: number) {
  const enable = ~~status === 2;
  const color = enable ? 'orange' : 'green';
  const text = enable ? '是' : '否';
  return h(Tag, { color: color }, () => text);
}

// 根据HTTP状态显示标签
export function showTagByHttpStatus(status: number) {
  const color = status == 200 ? 'green' : 'red';
  return h(Tag, { color: color }, () => status);
}

// 根据是否显示显示标签
export function showTagByIsShow(isShow: number) {
  const enable = ~~isShow === 2;
  const color = enable ? 'green' : 'red';
  const text = enable ? '显示' : '隐藏';
  return h(Tag, { color: color }, () => text);
}

// 根据提供商显示标签
export function showTagByProvider(provider: ProviderCodeEnum) {
  return h(Tag, { color: 'blue' }, () => providerMap.get(provider) || '未知');
}

// 根据登录类型显示标签
export function showTagByLoginType(type: number) {
  const color = type == 1 ? 'red' : type == 2 ? 'green' : 'blue';
  const text = type == 1 ? '登录失败' : type == 2 ? '登录成功' : '退出登录';
  return h(Tag, { color: color }, () => text);
}
