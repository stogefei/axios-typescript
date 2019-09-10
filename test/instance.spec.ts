/**
 * @author 成雨
 * @date 2019-07-25
 * @Description: Axios 实例模块测试
 */

import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('创建一个axios实例，并且能成功发送请求', () => {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('GET 请求', () => {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('POST 请求', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('POST')
    })
  })

  test('PUT 请求', () => {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('PUT')
    })
  })

  test('patch 请求', () => {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('PATCH')
    })
  })

  test('OPTIONS 请求', () => {
    const instance = axios.create()

    instance.options('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('DELETE 请求', () => {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('DELETE')
    })
  })

  test('HEAD 请求', () => {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('HEAD')
    })
  })

  test('请求超时', () => {
    const instance = axios.create({
      timeout: 1000
    })

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })

  test('默认headers', () => {
    const instance = axios.create({
      baseURL: 'https://api.example.com'
    })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance 请求拦截器', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })

    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: AxiosResponse
    instance.get('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })

      setTimeout(() => {
        expect(response.config.timeout).toEqual(0)
        expect(response.config.withCredentials).toEqual(true)
        done()
      }, 100)
    })
  })

  test('should get the computed uri', () => {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com/',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(axios.getUrl(fakeConfig)).toBe(
      'https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest'
    )
  })
})
