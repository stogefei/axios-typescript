import {AxiosRequestConfig} from './types/types'

export default function xhr(config:AxiosRequestConfig) {
    const {data = null, url, method = 'get'} = config
    const requst = new XMLHttpRequest()

    requst.open(method.toLowerCase(), url, true)

    requst.send(data)
}