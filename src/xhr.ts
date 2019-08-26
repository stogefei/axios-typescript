import { AxiosRequestConfig, AxiosPromis, AxiosResponse } from './types/types'

export default function xhr(config: AxiosRequestConfig): AxiosPromis {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    request.open(method.toLowerCase(), url, true)
    request.onreadystatechange = function handloader() {
      if (request.readyState === 4) {
        return
      }
      const responseHeader = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }
      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
