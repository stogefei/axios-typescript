/**
 * @author zhuaofei
 * @date 2019-09-10
 * @Description: 转换函数
 * 处理请求数据和响应数据
 */
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
) {
  if (!fns) return data

  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
