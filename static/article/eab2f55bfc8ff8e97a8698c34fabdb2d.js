var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dist = {};
var mdxTag = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$1 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
function A(a) {
  if (a === null || typeof a !== "object")
    return null;
  a = z && a[z] || a["@@iterator"];
  return typeof a === "function" ? a : null;
}
var B = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C = Object.assign, D = {};
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function(a, b) {
  if (typeof a !== "object" && typeof a !== "function" && a != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E.prototype;
function G(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
var H = G.prototype = new F();
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = true;
var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
function M(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (b != null)
    for (d in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k2 = "" + b.key), b)
      J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (g === 1)
    c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      c[d] === void 0 && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K.current };
}
function N(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O(a) {
  return typeof a === "object" && a !== null && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P = /\/+/g;
function Q(a, b) {
  return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
  var k2 = typeof a;
  if (k2 === "undefined" || k2 === "boolean")
    a = null;
  var h = false;
  if (a === null)
    h = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = d === "" ? "." + Q(h, 0) : d, I(c) ? (e = "", a != null && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
      return a2;
    })) : c != null && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = d === "" ? "." : d + ":";
  if (I(a))
    for (var g = 0; g < a.length; g++) {
      k2 = a[g];
      var f2 = d + Q(k2, g);
      h += R(k2, b, e, f2, c);
    }
  else if (f2 = A(a), typeof f2 === "function")
    for (a = f2.call(a), g = 0; !(k2 = a.next()).done; )
      k2 = k2.value, f2 = d + Q(k2, g++), h += R(k2, b, e, f2, c);
  else if (k2 === "object")
    throw b = String(a), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S(a, b, e) {
  if (a == null)
    return a;
  var d = [], c = 0;
  R(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T(a) {
  if (a._status === -1) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 2, a._result = b2;
    });
    a._status === -1 && (a._status = 0, a._result = b);
  }
  if (a._status === 1)
    return a._result.default;
  throw a._result;
}
var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
react_production_min.Children = { map: S, forEach: function(a, b, e) {
  S(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E;
react_production_min.Fragment = p$1;
react_production_min.Profiler = r;
react_production_min.PureComponent = G;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
react_production_min.cloneElement = function(a, b, e) {
  if (a === null || a === void 0)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (b != null) {
    b.ref !== void 0 && (k2 = b.ref, h = K.current);
    b.key !== void 0 && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f2 in b)
      J.call(b, f2) && !L.hasOwnProperty(f2) && (d[f2] = b[f2] === void 0 && g !== void 0 ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (f2 === 1)
    d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M;
react_production_min.createFactory = function(a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v, render: a };
};
react_production_min.isValidElement = O;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: b === void 0 ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V.transition;
  V.transition = {};
  try {
    a();
  } finally {
    V.transition = b;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a, b) {
  return U.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U.current.useTransition();
};
react_production_min.version = "18.0.0-fc46dba67-20220329";
{
  react.exports = react_production_min;
}
var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    for (var i = 0; i < keys.length; ++i) {
      var key2 = keys[i];
      if (!REACT_STATICS[key2] && !KNOWN_STATICS[key2] && (!blacklist || !blacklist[key2])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key2);
        try {
          defineProperty(targetComponent, key2, descriptor);
        } catch (e) {
        }
      }
    }
    return targetComponent;
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;
var mdxProvider = {};
var lib = { exports: {} };
var implementation = { exports: {} };
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction$2() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction$2;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction$2
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var key = "__global_unique_id__";
var gud = function() {
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
};
function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}
var emptyFunction$1 = function emptyFunction() {
};
emptyFunction$1.thatReturns = makeEmptyFunction;
emptyFunction$1.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$1.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$1.thatReturnsNull = makeEmptyFunction(null);
emptyFunction$1.thatReturnsThis = function() {
  return this;
};
emptyFunction$1.thatReturnsArgument = function(arg) {
  return arg;
};
var emptyFunction_1 = emptyFunction$1;
var emptyFunction2 = emptyFunction_1;
var warning = emptyFunction2;
var warning_1 = warning;
(function(module, exports) {
  exports.__esModule = true;
  var _react3 = react.exports;
  _interopRequireDefault2(_react3);
  var _propTypes3 = propTypes.exports;
  var _propTypes22 = _interopRequireDefault2(_propTypes3);
  var _gud = gud;
  var _gud2 = _interopRequireDefault2(_gud);
  var _warning = warning_1;
  _interopRequireDefault2(_warning);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn2(self2, call) {
    if (!self2) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self2;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var MAX_SIGNED_31_BIT_INT = 1073741823;
  function objectIs(x2, y2) {
    if (x2 === y2) {
      return x2 !== 0 || 1 / x2 === 1 / y2;
    } else {
      return x2 !== x2 && y2 !== y2;
    }
  }
  function createEventEmitter(value) {
    var handlers = [];
    return {
      on: function on(handler) {
        handlers.push(handler);
      },
      off: function off(handler) {
        handlers = handlers.filter(function(h) {
          return h !== handler;
        });
      },
      get: function get() {
        return value;
      },
      set: function set(newValue, changedBits) {
        value = newValue;
        handlers.forEach(function(handler) {
          return handler(value, changedBits);
        });
      }
    };
  }
  function onlyChild(children) {
    return Array.isArray(children) ? children[0] : children;
  }
  function createReactContext(defaultValue, calculateChangedBits) {
    var _Provider$childContex, _Consumer$contextType;
    var contextProp = "__create-react-context-" + (0, _gud2.default)() + "__";
    var Provider2 = function(_Component) {
      _inherits2(Provider3, _Component);
      function Provider3() {
        var _temp, _this, _ret;
        _classCallCheck2(this, Provider3);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn2(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn2(_this, _ret);
      }
      Provider3.prototype.getChildContext = function getChildContext() {
        var _ref;
        return _ref = {}, _ref[contextProp] = this.emitter, _ref;
      };
      Provider3.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
          var oldValue = this.props.value;
          var newValue = nextProps.value;
          var changedBits = void 0;
          if (objectIs(oldValue, newValue)) {
            changedBits = 0;
          } else {
            changedBits = typeof calculateChangedBits === "function" ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            changedBits |= 0;
            if (changedBits !== 0) {
              this.emitter.set(nextProps.value, changedBits);
            }
          }
        }
      };
      Provider3.prototype.render = function render() {
        return this.props.children;
      };
      return Provider3;
    }(_react3.Component);
    Provider2.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes22.default.object.isRequired, _Provider$childContex);
    var Consumer2 = function(_Component2) {
      _inherits2(Consumer3, _Component2);
      function Consumer3() {
        var _temp2, _this2, _ret2;
        _classCallCheck2(this, Consumer3);
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn2(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
          value: _this2.getValue()
        }, _this2.onUpdate = function(newValue, changedBits) {
          var observedBits = _this2.observedBits | 0;
          if ((observedBits & changedBits) !== 0) {
            _this2.setState({ value: _this2.getValue() });
          }
        }, _temp2), _possibleConstructorReturn2(_this2, _ret2);
      }
      Consumer3.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var observedBits = nextProps.observedBits;
        this.observedBits = observedBits === void 0 || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
      };
      Consumer3.prototype.componentDidMount = function componentDidMount() {
        if (this.context[contextProp]) {
          this.context[contextProp].on(this.onUpdate);
        }
        var observedBits = this.props.observedBits;
        this.observedBits = observedBits === void 0 || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
      };
      Consumer3.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.context[contextProp]) {
          this.context[contextProp].off(this.onUpdate);
        }
      };
      Consumer3.prototype.getValue = function getValue() {
        if (this.context[contextProp]) {
          return this.context[contextProp].get();
        } else {
          return defaultValue;
        }
      };
      Consumer3.prototype.render = function render() {
        return onlyChild(this.props.children)(this.state.value);
      };
      return Consumer3;
    }(_react3.Component);
    Consumer2.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes22.default.object, _Consumer$contextType);
    return {
      Provider: Provider2,
      Consumer: Consumer2
    };
  }
  exports.default = createReactContext;
  module.exports = exports["default"];
})(implementation, implementation.exports);
(function(module, exports) {
  exports.__esModule = true;
  var _react3 = react.exports;
  var _react22 = _interopRequireDefault2(_react3);
  var _implementation = implementation.exports;
  var _implementation2 = _interopRequireDefault2(_implementation);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = _react22.default.createContext || _implementation2.default;
  module.exports = exports["default"];
})(lib, lib.exports);
Object.defineProperty(mdxProvider, "__esModule", {
  value: true
});
mdxProvider.withMDXComponents = void 0;
var _extends$1 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key2 in source) {
      if (Object.prototype.hasOwnProperty.call(source, key2)) {
        target[key2] = source[key2];
      }
    }
  }
  return target;
};
var _react$1 = react.exports;
var _react2$1 = _interopRequireDefault$1(_react$1);
var _createReactContext2 = lib.exports;
var _createReactContext3 = _interopRequireDefault$1(_createReactContext2);
var _propTypes = propTypes.exports;
var _propTypes2 = _interopRequireDefault$1(_propTypes);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}
var _createReactContext = (0, _createReactContext3.default)({}), Provider = _createReactContext.Provider, Consumer = _createReactContext.Consumer;
var withMDXComponents = function withMDXComponents2(Component) {
  return function(_ref) {
    var components = _ref.components, props = _objectWithoutProperties(_ref, ["components"]);
    return _react2$1.default.createElement(Consumer, null, function(contextComponents) {
      return _react2$1.default.createElement(Component, _extends$1({ components: components || contextComponents }, props));
    });
  };
};
mdxProvider.withMDXComponents = withMDXComponents;
var MDXProvider = function MDXProvider2(_ref2) {
  var components = _ref2.components, children = _ref2.children;
  return _react2$1.default.createElement(Provider, { value: components }, children);
};
MDXProvider.propTypes = {
  components: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.element.isRequired
};
mdxProvider.default = MDXProvider;
Object.defineProperty(mdxTag, "__esModule", {
  value: true
});
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key2 in source) {
      if (Object.prototype.hasOwnProperty.call(source, key2)) {
        target[key2] = source[key2];
      }
    }
  }
  return target;
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = react.exports;
var _react2 = _interopRequireDefault(_react);
var _hoistNonReactStatics = hoistNonReactStatics_cjs;
var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
var _mdxProvider = mdxProvider;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var defaults = {
  inlineCode: "code",
  wrapper: "div"
};
var MDXTag = function(_Component) {
  _inherits(MDXTag2, _Component);
  function MDXTag2() {
    _classCallCheck(this, MDXTag2);
    return _possibleConstructorReturn(this, (MDXTag2.__proto__ || Object.getPrototypeOf(MDXTag2)).apply(this, arguments));
  }
  _createClass(MDXTag2, [{
    key: "render",
    value: function render() {
      var _props = this.props, name = _props.name, parentName = _props.parentName, _props$props = _props.props, childProps = _props$props === void 0 ? {} : _props$props, children = _props.children, _props$components = _props.components, components = _props$components === void 0 ? {} : _props$components, Layout = _props.Layout, layoutProps = _props.layoutProps;
      var Component = components[parentName + "." + name] || components[name] || defaults[name] || name;
      if (Layout) {
        (0, _hoistNonReactStatics2.default)(this, Layout);
        return _react2.default.createElement(Layout, _extends({ components }, layoutProps), _react2.default.createElement(Component, childProps, children));
      }
      return _react2.default.createElement(Component, childProps, children);
    }
  }]);
  return MDXTag2;
}(_react.Component);
mdxTag.default = (0, _mdxProvider.withMDXComponents)(MDXTag);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _mdxTag = mdxTag;
  Object.defineProperty(exports, "MDXTag", {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault2(_mdxTag).default;
    }
  });
  var _mdxProvider2 = mdxProvider;
  Object.defineProperty(exports, "MDXProvider", {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault2(_mdxProvider2).default;
    }
  });
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
})(dist);
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react.exports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const Brief = function({
  text
}) {
  return /* @__PURE__ */ jsx("p", {
    className: "Brief",
    children: text
  });
};
const MD = (_a) => {
  var _b = _a, {
    components
  } = _b, props = __objRest(_b, [
    "components"
  ]);
  return /* @__PURE__ */ jsxs(dist.MDXTag, {
    name: "wrapper",
    components,
    children: [/* @__PURE__ */ jsx(dist.MDXTag, {
      name: "h3",
      components,
      children: `The list \u{1F447}`
    }), /* @__PURE__ */ jsxs(dist.MDXTag, {
      name: "ul",
      components,
      children: [/* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Be curious. Be proactive on asking questions. Don't be afraid of feeling dumb or exposing yourself. Your team mates are not there for judging you, and they might also not know many things.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Be humble, accept knowledge and suggestions. Never be cocky. Listen, understand and apply the feedback even if you didn't ask for it.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don't be too defensive about code. It's just code. And you'll not care much as soon as you leave the office, so it is not worth it.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don't fight unnecessary battles. They'll end up undermining the team's mood and motivation. Pick battles that are worth it for the overall team progress.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Read tech books if you enjoy doing it, ask for good book recommendations.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Create, have side projects. They can boost your motivation and creativity a lot. They also help to try things out. Putting your hands into something teaches more than reading a thousand articles or books.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `This might sound contrary to the previous points, but do those things only while you still enjoy. Use them as a hobby, never as an obligation. The moment it starts feeling like work, do a hard stop \u{1F645}\u200D\u2642\uFE0F`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Find hobbies unrelated to programming. I'm learning to play the piano and use to exercise for example. This makes a huge difference at the end of the day.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don't push yourself too hard. You don't need to be good at everything.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don\u2019t be hard at you if you fail at work, or your team mate had to explain you something. Tomorrow will be better. One more time, you don\u2019t need to be the best on everything every single day.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don\u2019t be too competitive or ambitious. Learn about the good values along the way. A bit can be good, but being too competitive leads to frustration when your end goals are not fulfilled.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Learn to identify and find devs more experienced than you and ways to work with them (professionally or not). Ask them for advice, use them as mentors somehow.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Be empathetic with everyone. Specially on the days you feel down. Many times a not very communicative developer is actually a person with a personal issue. Work on your communication with this person, more improvements will come later.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Use your initial years as a professional to build up a career. Responsibilities you need to take care of likely grow with your age. Always keeping an eye on your mental health ofc.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don\u2019t be scared of moving abroad, or even just to a different region within your country. Live other cultures.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Never be afraid of sharing knowledge. There will always be a person taking good value of it.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Embrace failure. Fail as many times as you need to learn something.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Shipping and delivering is always better than perfect.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Hear your business people. Be empathetic with the company needs, make it happen. Deliver if you said you\u2019d deliver. That\u2019ll earn you value.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Learn to axe stuff. Removing code or features can be very positive ultimately for both developer quality of life and the product (if that\u2019s your thing).`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Relax. Life is not work, it actually happens outside of it. Learn to separate things well. It\u2019s great to have a good relationship with your workmates, but your family is at home.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Once you feel fed up, consider moving back to your hometown and work remotely if you have the chance. That\u2019ll help you to stay closer to who you really are, and your people.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Expose your progress, highlight it, make it visible to managers. They will not remember everything you did right when the time comes since they have other priorities also, and probably a lot of people to care of.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Ask for salary raises or any other perks when you feel you deserve it. Many companies will negotiate an initial salary for you and keep it like that forever if you don\u2019t explicitly ask again. They\u2019ll assume you are happy with it.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `The same but the other way around: learn to identify when you are underperforming and you don\u2019t deserve more. We are sometimes all about our rights but, are we providing enough value to the company? Both points of view are equally relevant to make things work.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Your mental health always goes first. If you are not happy somewhere and you have an option to leave and move to something more appealing to you, do it. Don\u2019t waste your time or put your mental health in risk for the wrong reasons. No money or perk can pay for that.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Take care about yourself. Exercise, eat well, sleep well. There is no work or project that is worth not doing this.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Give high priority to improve work-life balance. Things like salary are great but remote work, free time and working hours flexibility can have an invaluable impact on your happiness.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Do one thing at a time, and do it well. Be an example for your team mates. Multitasking or spamming a thousand PRs might not be worth it, neither pushing code to production on day 1. Bragging about these things is stupid.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Never accept crunch if you are able to. It can\u2019t yield any positive outcome under any possible scenario.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Don\u2019t be afraid of saying no. To unrealistic deadlines, to estimations with no clear requirements, to too ambitious features. Don\u2019t push yourself to say yes and then work twice as hard to make it happen. That will drain you fast.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `In the same way, learn to provide alternative paths. Saying no might save you from burnout, but maybe you can help to reprioritize and provide a shortcut or a more desirable way to achieve the same or similar goals.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Be communicative. Rancor and isolation can\u2019t lead to anything good. Don\u2019t hide your feelings. If you\u2019re not happy about something, tell your lead / manager / whatever, and keep telling her/him on every 1on1 if it is not addressed.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Be positive and productive when reviewing code. Think on being unlocker rather than blocker. It doesn\u2019t make any sense to block progress because of a variable name. Leave a suggestion, approve.`
      }), /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "li",
        components,
        parentName: "ul",
        children: `Leverage one of the biggest advantages we have in our profession: interact and learn from people from other countries and cultures.`
      })]
    }), /* @__PURE__ */ jsx(dist.MDXTag, {
      name: "p",
      components,
      children: `And for sure I\u2019m forgetting a ton of things. I\u2019ll probably keep adding more.`
    }), /* @__PURE__ */ jsx(dist.MDXTag, {
      name: "p",
      components,
      children: `Most of these tips I still need to repeat to me today. Theory on things is great, reality is always different and applying these becomes harder many days. So feel free to use it as a cheatsheet and come back every now and then if it works well for you. I will definitely need to.`
    }), /* @__PURE__ */ jsx(dist.MDXTag, {
      name: "p",
      components,
      children: `Thanks for reading! \u{1F64C}`
    }), /* @__PURE__ */ jsx(dist.MDXTag, {
      name: "hr",
      components
    }), /* @__PURE__ */ jsxs(dist.MDXTag, {
      name: "p",
      components,
      children: [`I also share thoughts and ideas `, /* @__PURE__ */ jsx(dist.MDXTag, {
        name: "a",
        components,
        parentName: "p",
        props: {
          "href": "http://localhost:9999/artical/1"
        },
        children: `on Twitter`
      }), ` quite regularly. You can also find me on Instagram. See you there!`]
    }), /* @__PURE__ */ jsx(dist.MDXTag, {
      name: "p",
      components,
      children: `More interesting stuff to come \u{1F64C}`
    })]
  });
};
const content = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Brief, {
      text: "This post is supposed to be a self reflection on things I failed on or learned along the way, but it might also work well for any developers that are starting out on this business. There is a big mix of topics not in any specific order."
    }), /* @__PURE__ */ jsx(MD, {})]
  });
};
const MDXMeta = {
  name: "Spark Elf",
  title: "A letter to my younger self",
  readTime: 4,
  profile: "",
  brief: "A self reflection on things I failed on or learned along the way",
  tags: ["essay"],
  website: ""
};
const MDX = content;
export { MDX, MDXMeta };
