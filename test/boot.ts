/**
 * @author 成雨
 * @date 2019-07-16
 * @Description: 每次测试启动都会首先执行该文件下的内容
 */

const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
