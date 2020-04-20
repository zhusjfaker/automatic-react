"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactiveProxy = ReactiveProxy;
exports.ReactiveOrigin = ReactiveOrigin;
exports.ReactiveSingle = ReactiveSingle;

require("reflect-metadata");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 获取Proxy 对象
 *
 * @export
 * @param {object} obj
 * @param {() => void} renderUpdate
 * @returns {*}
 */
function ReactiveProxy(obj, renderUpdate) {
  var asyncid = null;
  var handler = {
    get: function get(target, prop) {
      // 递归创建并返回
      if (_typeof(target[prop]) === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler);
      }

      return Reflect.get(target, prop);
    },
    set: function set(target, prop, value) {
      var reuslt = Reflect.set(target, prop, value);

      if (_typeof(renderUpdate) === 'object' && renderUpdate.isasync === true) {
        if (asyncid) {
          clearTimeout(asyncid);
        }

        asyncid = setTimeout(function () {
          renderUpdate.renderUpdate(value, prop);
        }, 0);
      } else if (_typeof(renderUpdate) === 'object' && renderUpdate.isasync === false) {
        renderUpdate.renderUpdate(value, prop);
      } else if (typeof renderUpdate === 'function') {
        renderUpdate(value, prop);
      }

      return reuslt;
    }
  };
  var proxyobj = new Proxy(obj, handler);
  Reflect.defineMetadata('$$origindata', proxyobj, obj);
  return proxyobj;
}

function ReactiveOrigin(proxyobj) {
  return Reflect.getMetadata('$$origindata', proxyobj);
}

function ReactiveSingle(property) {
  return Reflect.getMetadata("$$single_".concat(property), this);
}