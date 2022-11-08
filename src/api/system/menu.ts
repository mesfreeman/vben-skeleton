import { defHttp } from '/@/utils/http/axios';
import { MenuListParams, MenuListResult, MenuAddParams, MenuModifyParams } from './model/menuModel';
import { BasicIdParams, BasicIdResult } from '/@/api/model/baseModel';

enum Api {
  MenuList = '/system/menu/list',
  MenuAdd = '/system/menu/add',
  MenuModify = '/system/menu/modify',
  MenuDelete = '/system/menu/delete',
}

// 获取菜单列表
export const menuList = (params?: MenuListParams) => {
  return defHttp.post<MenuListResult>({ url: Api.MenuList, params });
};

// 添加菜单
export const menuAdd = (params: MenuAddParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.MenuAdd, params });
};

// 修改菜单
export const menuModify = (params: MenuModifyParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.MenuModify, params });
};

// 删除菜单
export const menuDelete = (params: BasicIdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.MenuDelete, params });
};
