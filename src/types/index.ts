import { request } from 'https'

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 请求参数
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 响应参数
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosIntercetorManager<AxiosRequestConfig>
    response: AxiosIntercetorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  option<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>
}

export interface AxiosIntance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>
  <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
//拦截器
export interface AxiosIntercetorManager<T> {
  use(resolved: ResolvedFn<T>, reject?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
