"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyjsonobj = proxyjsonobj;

/**
 * 将对象中的函数转化为字符串
 * 所有的内容可以正确打印
 * @export
 * @param {object} obj
 * @returns {string}
 */
function proxyjsonobj(obj) {
  var handler = {
    get: function get(target, prop) {
      // 递归创建并返回
      if (typeof target[prop] === 'function' && target[prop] !== null) {
        return target[prop].toString();
      }

      return Reflect.get(target, prop);
    }
  };
  var proxyobj = new Proxy(obj, handler);
  return JSON.stringify(proxyobj);
}