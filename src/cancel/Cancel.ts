export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}
//   测试一个对象是否为一个类的实例
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
