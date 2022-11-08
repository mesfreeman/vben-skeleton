// 基础的分页请求参数
export interface BasicPageParams {
  page: number;
  pageSize: number;
}

// 基础响应结果
export interface BasicResult {
  id: number;
  createdAt?: any;
  updatedAt?: any;
}

// 基础的分页响应结果
export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

// 基础的ID请求参数
export interface BasicIdParams {
  id: number;
}

// 基础的ID响应结果
export interface BasicIdResult {
  id: number;
}
