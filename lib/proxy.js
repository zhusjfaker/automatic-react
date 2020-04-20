"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyState = ProxyState;
exports.ProxyComponent = ProxyComponent;

require("reflect-metadata");

var _reactiveproxy = require("./reactiveproxy");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ProxyState() {
  var isproxy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return function (target, prop) {
    var list = Reflect.getMetadata('$$renderstate', target);

    if (!list) {
      Reflect.defineMetadata('$$renderstate', [{
        key: prop,
        isproxy: isproxy
      }], target);
    } else {
      list.push({
        key: prop,
        isproxy: isproxy
      });
    }
  };
}

function ProxyComponent() {
  return function (target) {
    return /*#__PURE__*/function (_target) {
      _inherits(_class, _target);

      var _super = _createSuper(_class);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        var keys = Reflect.getMetadata('$$renderstate', _assertThisInitialized(_this));

        if (keys) {
          keys.forEach(function (p) {
            var origin_object = Reflect.get(_assertThisInitialized(_this), p.key);
            var base_object = {};
            Reflect.set(base_object, p.key, origin_object);
            _this.state = Object.assign(base_object, _this.state);
            /** 处理单值必须增加伪引用层 */

            Reflect.deleteProperty(_assertThisInitialized(_this), p.key);
            Object.defineProperty(_assertThisInitialized(_this), p.key, {
              enumerable: true,
              configurable: true,
              get: function get() {
                var _this2 = this;

                if (p.isproxy) {
                  if (Object.keys(origin_object).includes('$$issingle') && origin_object.$$issingle === true) {
                    return origin_object["single_".concat(p.key)];
                  } else {
                    var _base_object = {};
                    Reflect.set(_base_object, p.key, { ...origin_object
                    });
                    var reactiveobject = (0, _reactiveproxy.ReactiveProxy)(origin_object, function (_value, _prop) {
                      var proxystate = {};
                      Reflect.set(proxystate, p.key, { ...origin_object
                      });

                      _this2.setState(proxystate);
                    });
                    return reactiveobject;
                  }
                } else {
                  return origin_object;
                }
              },
              set: function set(value) {
                if (p.isproxy) {
                  if (_typeof(value) !== 'object') {
                    if (_typeof(origin_object) !== 'object') {
                      var inderit_object = {};
                      inderit_object["single_".concat(p.key)] = value;
                      inderit_object["$$issingle"] = true;
                      var reactiveobject = (0, _reactiveproxy.ReactiveProxy)(inderit_object, function (val) {
                        var temp = {};
                        Reflect.set(temp, p.key, val);

                        _this.setState(temp);
                      });
                      Reflect.defineMetadata("$$single_".concat(p.key), reactiveobject, _assertThisInitialized(_this));
                      origin_object = reactiveobject;
                    } else {
                      origin_object["single_".concat(p.key)] = value;
                    }
                  } else {
                    origin_object = value;

                    if (_this.state[p.key] !== value) {
                      var temp = {};
                      Reflect.set(temp, p.key, value);

                      _this.setState(temp);
                    }
                  }
                } else {
                  origin_object = value;
                }
              }
            });
            _this[p.key] = origin_object;
          });
        }

        return _this;
      }

      return _class;
    }(target);
  };
}