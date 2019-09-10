/**
 * @author 成雨
 * @date 2019-07-17
 * @Description: cookie 模块测试
 */

import cookie from '../../src/helpers/cookie'

describe('helper:cookie', () => {
  test('should read cookie 能否正确读取cookie', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not exist 没有cookie应该返null', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
