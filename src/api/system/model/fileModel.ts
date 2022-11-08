import { BasicFetchResult, BasicPageParams, BasicResult } from '/@/api/model/baseModel';

// 文件列表请求参数
export type FileListParams = BasicPageParams & {
  fileName: string;
  uploader: string;
  createdDate: any;
};

// 单个文件信息
export type FileItem = BasicResult & {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  thumbnail: string;
  provider: string;
  username: string;
  nickname: string;
  remark: string;
};

// 文件列表响应结果
export type FileListResult = BasicFetchResult<FileItem>;

// 保存文件配置请求参数
export type FileSaveConfigParams = {
  provider: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  domain: string;
  thumbConf: string;
  allowTypes: string[];
  remark: string;
};

// 查看文件配置响应结果
export type FileViewConfigResult = FileSaveConfigParams;
