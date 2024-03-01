import { BasicIdParams, BasicResult } from '/@/api/model/baseModel';

// 获取菜单列表请求参数
export interface MenuListParams {
  name?: string;
  status?: number;
  type?: number[];
}

// 菜单元素信息
export type MenuItem = BasicResult & {
  pid: number;
  name: string;
  icon: string;
  path: string;
  type: number;
  weight: number;
  keepalive: number;
  isLink: number;
  status: number;
};

// 获取菜单列表返回结果
export type MenuListResult = MenuItem[];

// 添加菜单请求参数
export interface MenuAddParams {
  pid: number;
  name: string;
  icon: string;
  path: string;
  type: number;
  weight: number;
  keepalive: number;
  isLink: number;
  status: number;
}

// 修改菜单请求参数
export type MenuModifyParams = BasicIdParams & MenuAddParams;
