const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

// 类型保护 val is object
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}
