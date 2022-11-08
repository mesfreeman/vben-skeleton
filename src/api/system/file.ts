import { defHttp } from '/@/utils/http/axios';
import { BasicIdParams, BasicIdResult } from '/@/api/model/baseModel';
import {
  FileListParams,
  FileListResult,
  FileSaveConfigParams,
  FileViewConfigResult,
} from '/@/api/system/model/fileModel';

enum Api {
  FileList = '/system/file/list',
  FileDelete = '/system/file/delete',
  FileSaveConfig = '/system/file/saveConfig',
  FileViewConfig = '/system/file/viewConfig',
}

// 获取文件列表
export const fileList = (params: FileListParams) => {
  return defHttp.post<FileListResult>({ url: Api.FileList, params });
};

// 文件删除
export const fileDelete = (params: BasicIdParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.FileDelete, params });
};

// 保存文件配置
export const fileSaveConfig = (params: FileSaveConfigParams) => {
  return defHttp.post<BasicIdResult>({ url: Api.FileSaveConfig, params });
};

// 查看文件配置
export const fileViewConfig = () => {
  return defHttp.post<FileViewConfigResult>({ url: Api.FileViewConfig });
};
