import {AxiosRequestConfig} from './types/types'
import xhr from './xhr'
function axios(config:AxiosRequestConfig):void {
    xhr(config)
}

export default axios
