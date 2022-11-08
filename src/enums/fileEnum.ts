export enum ProviderCodeEnum {
  QINIU = 'qiniu',
  ALI = 'ali',
  TENCENT = 'tencent',
}

export enum ProviderNameEnum {
  QINIU = '七牛云',
  ALI = '阿里云',
  TENCENT = '腾讯云',
}

// 提供商映射
export const providerMap: Map<ProviderCodeEnum, ProviderNameEnum> = (() => {
  const map = new Map<ProviderCodeEnum, ProviderNameEnum>();
  map.set(ProviderCodeEnum.QINIU, ProviderNameEnum.QINIU);
  map.set(ProviderCodeEnum.ALI, ProviderNameEnum.ALI);
  map.set(ProviderCodeEnum.TENCENT, ProviderNameEnum.TENCENT);
  return map;
})();
