/**
 * 将对象中的函数转化为字符串
 * 所有的内容可以正确打印
 * @export
 * @param {object} obj
 * @returns {string}
 */
export function proxyjsonobj(obj: object): string {
  const handler = {
    get: (target: object, prop: number | string | symbol): any => {
      // 递归创建并返回
      if (typeof target[prop] === 'function' && target[prop] !== null) {
        return target[prop].toString();
      }
      return Reflect.get(target, prop);
    },
  };

  const proxyobj = new Proxy(obj, handler);

  return JSON.stringify(proxyobj);
}
