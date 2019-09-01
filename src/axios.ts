import { AxiosIntance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
function createInstance(config: AxiosRequestConfig): AxiosIntance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosIntance
}

const axios = createInstance(defaults)

export default axios
