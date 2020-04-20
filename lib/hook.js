"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rxhook = rxhook;

var _react = require("react");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function rxhook(obj) {
  var isasync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var asyncid = null;

  var _useState = (0, _react.useState)(obj),
      _useState2 = _slicedToArray(_useState, 2),
      originobj = _useState2[0],
      setoriginobj = _useState2[1];

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

      if (isasync) {
        if (asyncid) {
          clearTimeout(asyncid);
        }

        asyncid = setTimeout(function () {
          setoriginobj(originobj);
        }, 0);
      } else {
        setoriginobj(Object.assign({}, originobj));
      }

      return reuslt;
    }
  };
  var proxyobj = new Proxy(originobj, handler);
  Reflect.defineMetadata('$$origindata', proxyobj, originobj);
  return proxyobj;
}