/**
 * @author 成雨
 * @date 2019-07-17
 * @Description: data 模块测试
 */

import { transformResponse, transformRequest } from '../../src/helpers/data'

describe('helper:data', () => {
  describe('transformRequest', () => {
    test('传入对象应该返回JSON字符转', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('传入URLSearchParams对象 应该原样返回', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('transformResponse', () => {
    test('传入JSON字符串，应该解析为对象返回', () => {
      const a = '{"a": 123}'
      expect(transformResponse(a)).toEqual({ a: 123 })
    })

    test('传入非JSON字符串，应该原样返回', () => {
      const a = '{a:123}'
      expect(transformResponse(a)).toBe('{a:123}')
    })

    test('传入对象, 应该原样返回', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
