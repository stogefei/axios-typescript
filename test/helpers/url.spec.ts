/**
 * @author 成雨
 * @date 2019-07-17
 * @Description: url 模块测试
 */

import { buildURL, isAbsolutURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helper:url', () => {
  describe('buildURL', () => {
    test('应该支持不传入params参数', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('应该支持传入params参数，能正确返回', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    test('params参数中含有null值，应该被忽略', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })

    test('应该支持传入对象作为params的参数', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    test('params应该支持传入时间', () => {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    test('params应该支持传入数组', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('params支持传入特殊字符', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsolutURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsolutURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsolutURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsolutURL('HTTP://example.com/')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsolutURL('123://example.com/')).toBeFalsy()
      expect(isAbsolutURL('!valid://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsolutURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsolutURL('/foo')).toBeFalsy()
      expect(isAbsolutURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
