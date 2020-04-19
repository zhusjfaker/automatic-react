"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consumer = consumer;
exports.ReactiveProvider = exports.ContextProvider = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _react = _interopRequireDefault(require("react"));

var _proxy = require("./proxy");

var _jsontostring = require("./jsontostring");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ContextProvider = /*#__PURE__*/function (_React$Component) {
  _inherits(ContextProvider, _React$Component);

  var _super = _createSuper(ContextProvider);

  function ContextProvider(props) {
    _classCallCheck(this, ContextProvider);

    return _super.call(this, props);
  }

  _createClass(ContextProvider, [{
    key: "render",
    value: function render() {
      var Providerlayout = this.props.context.Provider;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Providerlayout, {
        value: this.props.initialidata
      }, this.props.children));
    }
  }]);

  return ContextProvider;
}(_react.default.Component);

exports.ContextProvider = ContextProvider;

var ReactiveProvider = /*#__PURE__*/function (_React$Component2) {
  _inherits(ReactiveProvider, _React$Component2);

  var _super2 = _createSuper(ReactiveProvider);

  function ReactiveProvider(props) {
    var _this;

    _classCallCheck(this, ReactiveProvider);

    _this = _super2.call(this, props);
    _this.store = Object.assign({}, _this.props.initialidata);
    _this.comparedata = (0, _jsontostring.proxyjsonobj)(Object.assign({}, _this.props.initialidata));
    return _this;
  }

  _createClass(ReactiveProvider, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, _nextState) {
      var nowdata = (0, _jsontostring.proxyjsonobj)(Object.assign({}, nextProps.initialidata));

      if (this.comparedata !== nowdata) {
        this.comparedata = nowdata;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var Providerlayout = this.props.context.Provider;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Providerlayout, {
        value: Object.assign({}, this.store)
      }, this.props.children));
    }
  }]);

  return ReactiveProvider;
}(_react.default.Component);

exports.ReactiveProvider = ReactiveProvider;

tslib_1.__decorate([(0, _proxy.ProxyState)(), tslib_1.__metadata("design:type", Object)], ReactiveProvider.prototype, "store", void 0);

exports.ReactiveProvider = ReactiveProvider = tslib_1.__decorate([(0, _proxy.ProxyComponent)(), tslib_1.__metadata("design:paramtypes", [Object])], ReactiveProvider);

function consumer(provider) {
  return function (target) {
    var serivce = provider;
    return function (props) {
      return /*#__PURE__*/_react.default.createElement(serivce.Consumer, null, function (value) {
        return _react.default.createElement(target, Object.assign({}, value, props));
      });
    };
  };
}