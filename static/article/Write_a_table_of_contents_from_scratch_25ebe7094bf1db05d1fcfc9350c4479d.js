var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
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
import React, { useState, useEffect } from "react";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var classnames = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn2 = {}.hasOwnProperty;
    function classNames2() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames2.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn2.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames2.default = classNames2;
      module.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classNames = classnames.exports;
const protocols = ["http", "https", "mailto", "tel"];
function uriTransformer(uri) {
  const url = (uri || "").trim();
  const first = url.charAt(0);
  if (first === "#" || first === "/") {
    return url;
  }
  const colon = url.indexOf(":");
  if (colon === -1) {
    return url;
  }
  let index2 = -1;
  while (++index2 < protocols.length) {
    const protocol = protocols[index2];
    if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
      return url;
    }
  }
  index2 = url.indexOf("?");
  if (index2 !== -1 && colon > index2) {
    return url;
  }
  index2 = url.indexOf("#");
  if (index2 !== -1 && colon > index2) {
    return url;
  }
  return "javascript:void(0)";
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer = function isBuffer2(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
};
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point$1(value);
  }
  return "";
}
function point$1(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column);
}
function position(pos) {
  return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
class VFileMessage extends Error {
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position2 = {
      start: { line: null, column: null },
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index2);
        parts[1] = origin.slice(index2 + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position2 = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position2 = place;
      } else if ("line" in place || "column" in place) {
        position2.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = typeof reason === "object" ? reason.stack : "";
    this.reason = this.message;
    this.fatal;
    this.line = position2.start.line;
    this.column = position2.start.column;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.position = position2;
    this.actual;
    this.expected;
    this.file;
    this.url;
    this.note;
  }
}
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;
const path = { basename, dirname: dirname$1, extname, join: join$1, sep: "/" };
function basename(path2, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath$1(path2);
  let start = 0;
  let end = -1;
  let index2 = path2.length;
  let seenNonSlash;
  if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
    while (index2--) {
      if (path2.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index2 + 1;
      }
    }
    return end < 0 ? "" : path2.slice(start, end);
  }
  if (ext === path2) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extIndex = ext.length - 1;
  while (index2--) {
    if (path2.charCodeAt(index2) === 47) {
      if (seenNonSlash) {
        start = index2 + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index2 + 1;
      }
      if (extIndex > -1) {
        if (path2.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end = index2;
          }
        } else {
          extIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path2.length;
  }
  return path2.slice(start, end);
}
function dirname$1(path2) {
  assertPath$1(path2);
  if (path2.length === 0) {
    return ".";
  }
  let end = -1;
  let index2 = path2.length;
  let unmatchedSlash;
  while (--index2) {
    if (path2.charCodeAt(index2) === 47) {
      if (unmatchedSlash) {
        end = index2;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0 ? path2.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path2.charCodeAt(0) === 47 ? "//" : path2.slice(0, end);
}
function extname(path2) {
  assertPath$1(path2);
  let index2 = path2.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index2--) {
    const code2 = path2.charCodeAt(index2);
    if (code2 === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index2 + 1;
    }
    if (code2 === 46) {
      if (startDot < 0) {
        startDot = index2;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path2.slice(startDot, end);
}
function join$1(...segments) {
  let index2 = -1;
  let joined;
  while (++index2 < segments.length) {
    assertPath$1(segments[index2]);
    if (segments[index2]) {
      joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
    }
  }
  return joined === void 0 ? "." : normalize$1(joined);
}
function normalize$1(path2) {
  assertPath$1(path2);
  const absolute = path2.charCodeAt(0) === 47;
  let value = normalizeString(path2, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path2, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index2 = -1;
  let code2;
  let lastSlashIndex;
  while (++index2 <= path2.length) {
    if (index2 < path2.length) {
      code2 = path2.charCodeAt(index2);
    } else if (code2 === 47) {
      break;
    } else {
      code2 = 47;
    }
    if (code2 === 47) {
      if (lastSlash === index2 - 1 || dots === 1)
        ;
      else if (lastSlash !== index2 - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index2;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path2.slice(lastSlash + 1, index2);
        } else {
          result = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (code2 === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath$1(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
  }
}
const proc = { cwd };
function cwd() {
  return "/";
}
function isUrl(fileURLOrPath) {
  return fileURLOrPath !== null && typeof fileURLOrPath === "object" && fileURLOrPath.href && fileURLOrPath.origin;
}
function urlToPath(path2) {
  if (typeof path2 === "string") {
    path2 = new URL(path2);
  } else if (!isUrl(path2)) {
    const error = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`");
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path2.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path2);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError('File URL host must be "localhost" or empty on darwin');
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index2 = -1;
  while (++index2 < pathname.length) {
    if (pathname.charCodeAt(index2) === 37 && pathname.charCodeAt(index2 + 1) === 50) {
      const third = pathname.charCodeAt(index2 + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError("File URL path must not include encoded / characters");
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}
const order = ["history", "path", "basename", "stem", "extname", "dirname"];
class VFile {
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || isBuffer(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index2 = -1;
    while (++index2 < order.length) {
      const prop2 = order[index2];
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop))
        this[prop] = options[prop];
    }
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(path2) {
    if (isUrl(path2)) {
      path2 = urlToPath(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0;
  }
  set dirname(dirname2) {
    assertPath(this.basename, "dirname");
    this.path = path.join(dirname2 || "", this.basename);
  }
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0;
  }
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = path.join(this.dirname || "", basename2);
  }
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0;
  }
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath(this.dirname, "extname");
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""));
  }
  get stem() {
    return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
  }
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = path.join(this.dirname || "", stem + (this.extname || ""));
  }
  toString(encoding) {
    return (this.value || "").toString(encoding);
  }
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
}
function assertPart(part, name) {
  if (part && part.includes(path.sep)) {
    throw new Error("`" + name + "` cannot be a path: did not expect `" + path.sep + "`");
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
function bail(error) {
  if (error) {
    throw error;
  }
}
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray2(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
};
var isPlainObject$1 = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, "constructor");
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  var key;
  for (key in obj) {
  }
  return typeof key === "undefined" || hasOwn.call(obj, key);
};
var setProperty = function setProperty2(target, options) {
  if (defineProperty && options.name === "__proto__") {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
};
var getProperty = function getProperty2(obj, name) {
  if (name === "__proto__") {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      return gOPD(obj, name).value;
    }
  }
  return obj[name];
};
var extend = function extend2() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (target == null || typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i < length; ++i) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name);
        if (target !== copy) {
          if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject$1(src) ? src : {};
            }
            setProperty(target, { name, newValue: extend2(deep, clone, copy) });
          } else if (typeof copy !== "undefined") {
            setProperty(target, { name, newValue: copy });
          }
        }
      }
    }
  }
  return target;
};
function isPlainObject2(value) {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap$1(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError("Expected `middelware` to be a function, not " + middelware);
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap$1(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = error;
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}
const unified = base().freeze();
const own$7 = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use;
  processor.parse = parse2;
  processor.stringify = stringify2;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index2 = -1;
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2]);
    }
    destination.data(extend(true, {}, namespace));
    return destination;
  }
  function data(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key] = value;
        return processor;
      }
      return own$7.call(namespace, key) && namespace[key] || null;
    }
    if (key) {
      assertUnfrozen("data", frozen);
      namespace = key;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0)
      ;
    else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0)
        ;
      else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index2 = -1;
      let entry;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2];
          break;
        }
      }
      if (entry) {
        if (isPlainObject2(entry[1]) && isPlainObject2(value2)) {
          value2 = extend(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse2(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify2(node, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node);
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file);
  }
  function run(node, doc, callback) {
    assertNode(node);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node, file) {
    let result;
    let complete;
    processor.run(node, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null)
            ;
          else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name) {
  return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
}
function keys(value) {
  let key;
  for (key in value) {
    if (own$7.call(value, key)) {
      return true;
    }
  }
  return false;
}
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
  }
}
function assertNode(node) {
  if (!isPlainObject2(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || isBuffer(value);
}
function toString(node, options) {
  var { includeImageAlt = true } = options || {};
  return one$1(node, includeImageAlt);
}
function one$1(node, includeImageAlt) {
  return node && typeof node === "object" && (node.value || (includeImageAlt ? node.alt : "") || "children" in node && all$1(node.children, includeImageAlt) || Array.isArray(node) && all$1(node, includeImageAlt)) || "";
}
function all$1(values, includeImageAlt) {
  var result = [];
  var index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one$1(values[index2], includeImageAlt);
  }
  return result.join("");
}
function splice(list2, start, remove, items) {
  const end = list2.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    [].splice.apply(list2, parameters);
  } else {
    if (remove)
      [].splice.apply(list2, [start, remove]);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      [].splice.apply(list2, parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items);
    return list2;
  }
  return items;
}
const hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension2[hook];
    let code2;
    for (code2 in right) {
      if (!hasOwnProperty.call(left, code2))
        left[code2] = [];
      const value = right[code2];
      constructs(left[code2], Array.isArray(value) ? value : value ? [value] : []);
    }
  }
}
function constructs(existing, list2) {
  let index2 = -1;
  const before = [];
  while (++index2 < list2.length) {
    (list2[index2].add === "after" ? existing : before).push(list2[index2]);
  }
  splice(existing, 0, 0, before);
}
const unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code2) {
  return code2 !== null && (code2 < 32 || code2 === 127);
}
function markdownLineEndingOrSpace(code2) {
  return code2 !== null && (code2 < 0 || code2 === 32);
}
function markdownLineEnding(code2) {
  return code2 !== null && code2 < -2;
}
function markdownSpace(code2) {
  return code2 === -2 || code2 === -1 || code2 === 32;
}
const unicodeWhitespace = regexCheck(/\s/);
const unicodePunctuation = regexCheck(unicodePunctuationRegex);
function regexCheck(regex) {
  return check;
  function check(code2) {
    return code2 !== null && regex.test(String.fromCharCode(code2));
  }
}
function factorySpace(effects, ok2, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code2) {
    if (markdownSpace(code2)) {
      effects.enter(type);
      return prefix(code2);
    }
    return ok2(code2);
  }
  function prefix(code2) {
    if (markdownSpace(code2) && size++ < limit) {
      effects.consume(code2);
      return prefix;
    }
    effects.exit(type);
    return ok2(code2);
  }
}
const content$2 = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  let previous2;
  return contentStart;
  function afterContentStartConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code2) {
    effects.enter("paragraph");
    return lineStart(code2);
  }
  function lineStart(code2) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    if (previous2) {
      previous2.next = token;
    }
    previous2 = token;
    return data(code2);
  }
  function data(code2) {
    if (code2 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code2);
    return data;
  }
}
const document$2 = {
  tokenize: initializeDocument
};
const containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self2 = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code2) {
    if (continued < stack.length) {
      const item = stack[continued];
      self2.containerState = item[1];
      return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code2);
    }
    return checkNewContainers(code2);
  }
  function documentContinue(code2) {
    continued++;
    if (self2.containerState._closeFlow) {
      self2.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point2;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          point2 = self2.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
      self2.events.length = index2;
      return checkNewContainers(code2);
    }
    return start(code2);
  }
  function checkNewContainers(code2) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code2);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code2);
      }
      self2.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }
    self2.containerState = {};
    return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code2);
  }
  function thereIsANewContainer(code2) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code2);
  }
  function thereIsNoNewContainer(code2) {
    self2.parser.lazy[self2.now().line] = continued !== stack.length;
    lineStartOffset = self2.now().offset;
    return flowStart(code2);
  }
  function documentContinued(code2) {
    self2.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code2);
  }
  function containerContinue(code2) {
    continued++;
    stack.push([self2.currentConstruct, self2.containerState]);
    return documentContinued(code2);
  }
  function flowStart(code2) {
    if (code2 === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    childFlow = childFlow || self2.parser.flow(self2.now());
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code2);
  }
  function flowContinue(code2) {
    if (code2 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self2.interrupt = void 0;
      return start;
    }
    effects.consume(code2);
    return flowContinue;
  }
  function writeToChild(token, eof) {
    const stream = self2.sliceStream(token);
    if (eof)
      stream.push(null);
    token.previous = childToken;
    if (childToken)
      childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self2.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (childFlow.events[index2][1].start.offset < lineStartOffset && (!childFlow.events[index2][1].end || childFlow.events[index2][1].end.offset > lineStartOffset)) {
          return;
        }
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point2;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point2 = self2.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
      self2.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self2.containerState = entry[1];
      entry[0].exit.call(self2, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self2.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function classifyCharacter(code2) {
  if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
    return 1;
  }
  if (unicodePunctuation(code2)) {
    return 2;
  }
}
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }
  return events;
}
const attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text2;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start = Object.assign({}, events[open][1].end);
          const end = Object.assign({}, events[index2][1].start);
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: Object.assign({}, events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end
          };
          text2 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index2][1].start)
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          };
          events[open][1].end = Object.assign({}, openingSequence.start);
          events[index2][1].start = Object.assign({}, closingSequence.end);
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events[open][1], context],
              ["exit", events[open][1], context]
            ]);
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text2, context]
          ]);
          nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
          nextEvents = push(nextEvents, [
            ["exit", text2, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context]
            ]);
          } else {
            offset = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok2) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous2 = this.previous;
  const before = classifyCharacter(previous2);
  let marker;
  return start;
  function start(code2) {
    effects.enter("attentionSequence");
    marker = code2;
    return sequence(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return sequence;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code2);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    token._open = Boolean(marker === 42 ? open : open && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok2(code2);
  }
}
function movePoint(point2, offset) {
  point2.column += offset;
  point2.offset += offset;
  point2._bufferIndex += offset;
}
const autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok2, nok) {
  let size = 1;
  return start;
  function start(code2) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return schemeOrEmailAtext;
    }
    return asciiAtext(code2) ? emailAtext(code2) : nok(code2);
  }
  function schemeOrEmailAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2) ? schemeInsideOrEmailAtext(code2) : emailAtext(code2);
  }
  function schemeInsideOrEmailAtext(code2) {
    if (code2 === 58) {
      effects.consume(code2);
      return urlInside;
    }
    if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size++ < 32) {
      effects.consume(code2);
      return schemeInsideOrEmailAtext;
    }
    return emailAtext(code2);
  }
  function urlInside(code2) {
    if (code2 === 62) {
      effects.exit("autolinkProtocol");
      return end(code2);
    }
    if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return urlInside;
  }
  function emailAtext(code2) {
    if (code2 === 64) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (asciiAtext(code2)) {
      effects.consume(code2);
      return emailAtext;
    }
    return nok(code2);
  }
  function emailAtSignOrDot(code2) {
    return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
  }
  function emailLabel(code2) {
    if (code2 === 46) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code2 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      return end(code2);
    }
    return emailValue(code2);
  }
  function emailValue(code2) {
    if ((code2 === 45 || asciiAlphanumeric(code2)) && size++ < 63) {
      effects.consume(code2);
      return code2 === 45 ? emailValue : emailLabel;
    }
    return nok(code2);
  }
  function end(code2) {
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.exit("autolink");
    return ok2;
  }
}
const blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true
};
function tokenizeBlankLine(effects, ok2, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix");
  function afterWhitespace(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (code2 === 62) {
      const state = self2.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code2);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    if (markdownSpace(code2)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code2);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok2;
    }
    effects.exit("blockQuotePrefix");
    return ok2(code2);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
  return factorySpace(effects, effects.attempt(blockQuote, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function exit(effects) {
  effects.exit("blockQuote");
}
const characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    effects.exit("escapeMarker");
    return open;
  }
  function open(code2) {
    if (asciiPunctuation(code2)) {
      effects.enter("characterEscapeValue");
      effects.consume(code2);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok2;
    }
    return nok(code2);
  }
}
const element = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference2 = "&" + value + ";";
  element.innerHTML = characterReference2;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference2 ? false : char;
}
const characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok2, nok) {
  const self2 = this;
  let size = 0;
  let max;
  let test;
  return start;
  function start(code2) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code2);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value(code2);
  }
  function numeric(code2) {
    if (code2 === 88 || code2 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value(code2);
  }
  function value(code2) {
    let token;
    if (code2 === 59 && size) {
      token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token))) {
        return nok(code2);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok2;
    }
    if (test(code2) && size++ < max) {
      effects.consume(code2);
      return value;
    }
    return nok(code2);
  }
}
const codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true
};
function tokenizeCodeFenced(effects, ok2, nok) {
  const self2 = this;
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  const nonLazyLine = {
    tokenize: tokenizeNonLazyLine,
    partial: true
  };
  const tail = this.events[this.events.length - 1];
  const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code2) {
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    marker = code2;
    return sequenceOpen(code2);
  }
  function sequenceOpen(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeFencedFenceSequence");
    return sizeOpen < 3 ? nok(code2) : factorySpace(effects, infoOpen, "whitespace")(code2);
  }
  function infoOpen(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code2);
  }
  function info(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, infoAfter, "whitespace")(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return info;
  }
  function infoAfter(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code2);
  }
  function meta(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return openAfter(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return meta;
  }
  function openAfter(code2) {
    effects.exit("codeFencedFence");
    return self2.interrupt ? ok2(code2) : contentStart(code2);
  }
  function contentStart(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(nonLazyLine, effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace(effects, contentStart, "linePrefix", initialPrefix + 1) : contentStart), after)(code2);
    }
    effects.enter("codeFlowValue");
    return contentContinue(code2);
  }
  function contentContinue(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return contentStart(code2);
    }
    effects.consume(code2);
    return contentContinue;
  }
  function after(code2) {
    effects.exit("codeFenced");
    return ok2(code2);
  }
  function tokenizeNonLazyLine(effects2, ok3, nok2) {
    const self3 = this;
    return start2;
    function start2(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self3.parser.lazy[self3.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function tokenizeClosingFence(effects2, ok3, nok2) {
    let size = 0;
    return factorySpace(effects2, closingSequenceStart, "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    function closingSequenceStart(code2) {
      effects2.enter("codeFencedFence");
      effects2.enter("codeFencedFenceSequence");
      return closingSequence(code2);
    }
    function closingSequence(code2) {
      if (code2 === marker) {
        effects2.consume(code2);
        size++;
        return closingSequence;
      }
      if (size < sizeOpen)
        return nok2(code2);
      effects2.exit("codeFencedFenceSequence");
      return factorySpace(effects2, closingSequenceEnd, "whitespace")(code2);
    }
    function closingSequenceEnd(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects2.exit("codeFencedFence");
        return ok3(code2);
      }
      return nok2(code2);
    }
  }
}
const codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
const indentedContent = {
  tokenize: tokenizeIndentedContent,
  partial: true
};
function tokenizeCodeIndented(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterStartPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code2) : nok(code2);
  }
  function afterPrefix(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code2);
    }
    effects.enter("codeFlowValue");
    return content2(code2);
  }
  function content2(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return afterPrefix(code2);
    }
    effects.consume(code2);
    return content2;
  }
  function after(code2) {
    effects.exit("codeIndented");
    return ok2(code2);
  }
}
function tokenizeIndentedContent(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (self2.parser.lazy[self2.now().line]) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return start;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? start(code2) : nok(code2);
  }
}
const codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code2) {
  return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok2, nok) {
  let sizeOpen = 0;
  let size;
  let token;
  return start;
  function start(code2) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return openingSequence(code2);
  }
  function openingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      sizeOpen++;
      return openingSequence;
    }
    effects.exit("codeTextSequence");
    return gap(code2);
  }
  function gap(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return closingSequence(code2);
    }
    if (code2 === 32) {
      effects.enter("space");
      effects.consume(code2);
      effects.exit("space");
      return gap;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return gap;
    }
    effects.enter("codeTextData");
    return data(code2);
  }
  function data(code2) {
    if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
      effects.exit("codeTextData");
      return gap(code2);
    }
    effects.consume(code2);
    return data;
  }
  function closingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      size++;
      return closingSequence;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok2(code2);
    }
    token.type = "codeTextData";
    return data(code2);
  }
}
function subtokenize(events) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events[index2];
    if (index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events[otherIndex];
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events[lineIndex][1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events[lineIndex][1].start);
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        splice(events, lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  return !more;
}
function subcontent(events, eventIndex) {
  const token = events[eventIndex][1];
  const context = events[eventIndex][2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous2;
  let index2 = -1;
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events[++startPosition][1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous2) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous2 = current;
    current = current.next;
  }
  current = token;
  while (++index2 < childEvents.length) {
    if (childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.unshift([start2, start2 + slice.length - 1]);
    splice(events, start2, 2, slice);
  }
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}
const content$1 = {
  tokenize: tokenizeContent,
  resolve: resolveContent
};
const continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok2) {
  let previous2;
  return start;
  function start(code2) {
    effects.enter("content");
    previous2 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return data(code2);
  }
  function data(code2) {
    if (code2 === null) {
      return contentEnd(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code2);
    }
    effects.consume(code2);
    return data;
  }
  function contentEnd(code2) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok2(code2);
  }
  function contentContinue(code2) {
    effects.consume(code2);
    effects.exit("chunkContent");
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    });
    previous2 = previous2.next;
    return data;
  }
}
function tokenizeContinuation(effects, ok2, nok) {
  const self2 = this;
  return startLookahead;
  function startLookahead(code2) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    const tail = self2.events[self2.events.length - 1];
    if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok2(code2);
    }
    return effects.interrupt(self2.parser.constructs.flow, nok, ok2)(code2);
  }
}
function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code2) {
    if (code2 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore;
    }
    if (code2 === null || code2 === 41 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationRaw(code2);
  }
  function destinationEnclosedBefore(code2) {
    if (code2 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationEnclosed(code2);
  }
  function destinationEnclosed(code2) {
    if (code2 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return destinationEnclosedBefore(code2);
    }
    if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? destinationEnclosedEscape : destinationEnclosed;
  }
  function destinationEnclosedEscape(code2) {
    if (code2 === 60 || code2 === 62 || code2 === 92) {
      effects.consume(code2);
      return destinationEnclosed;
    }
    return destinationEnclosed(code2);
  }
  function destinationRaw(code2) {
    if (code2 === 40) {
      if (++balance > limit)
        return nok(code2);
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === 41) {
      if (!balance--) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      if (balance)
        return nok(code2);
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok2(code2);
    }
    if (asciiControl(code2))
      return nok(code2);
    effects.consume(code2);
    return code2 === 92 ? destinationRawEscape : destinationRaw;
  }
  function destinationRawEscape(code2) {
    if (code2 === 40 || code2 === 41 || code2 === 92) {
      effects.consume(code2);
      return destinationRaw;
    }
    return destinationRaw(code2);
  }
}
function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
  const self2 = this;
  let size = 0;
  let data;
  return start;
  function start(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 && !data || code2 === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs || size > 999) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return label(code2);
  }
  function label(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code2);
    }
    effects.consume(code2);
    data = data || !markdownSpace(code2);
    return code2 === 92 ? labelEscape : label;
  }
  function labelEscape(code2) {
    if (code2 === 91 || code2 === 92 || code2 === 93) {
      effects.consume(code2);
      size++;
      return label;
    }
    return label(code2);
  }
}
function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
  let marker;
  return start;
  function start(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    marker = code2 === 40 ? 41 : code2;
    return atFirstTitleBreak;
  }
  function atFirstTitleBreak(code2) {
    if (code2 === marker) {
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    return atTitleBreak(code2);
  }
  function atTitleBreak(code2) {
    if (code2 === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker);
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, atTitleBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return title(code2);
  }
  function title(code2) {
    if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      return atTitleBreak(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? titleEscape : title;
  }
  function titleEscape(code2) {
    if (code2 === marker || code2 === 92) {
      effects.consume(code2);
      return title;
    }
    return title(code2);
  }
}
function factoryWhitespace(effects, ok2) {
  let seen;
  return start;
  function start(code2) {
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code2);
    }
    return ok2(code2);
  }
}
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
const titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};
function tokenizeDefinition(effects, ok2, nok) {
  const self2 = this;
  let identifier;
  return start;
  function start(code2) {
    effects.enter("definition");
    return factoryLabel.call(self2, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code2);
  }
  function labelAfter(code2) {
    identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
    if (code2 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code2);
      effects.exit("definitionMarker");
      return factoryWhitespace(effects, factoryDestination(effects, effects.attempt(titleConstruct, factorySpace(effects, after, "whitespace"), factorySpace(effects, after, "whitespace")), nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"));
    }
    return nok(code2);
  }
  function after(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("definition");
      if (!self2.parser.defined.includes(identifier)) {
        self2.parser.defined.push(identifier);
      }
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizeTitle(effects, ok2, nok) {
  return start;
  function start(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, before)(code2) : nok(code2);
  }
  function before(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(effects, factorySpace(effects, after, "whitespace"), nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code2);
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("hardBreakEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (markdownLineEnding(code2)) {
      effects.exit("escapeMarker");
      effects.exit("hardBreakEscape");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content2;
  let text2;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content2 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text2 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [
      ["enter", content2, context],
      ["enter", text2, context],
      ["exit", text2, context],
      ["exit", content2, context]
    ]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok2, nok) {
  const self2 = this;
  let size = 0;
  return start;
  function start(code2) {
    effects.enter("atxHeading");
    effects.enter("atxHeadingSequence");
    return fenceOpenInside(code2);
  }
  function fenceOpenInside(code2) {
    if (code2 === 35 && size++ < 6) {
      effects.consume(code2);
      return fenceOpenInside;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingSequence");
      return self2.interrupt ? ok2(code2) : headingBreak(code2);
    }
    return nok(code2);
  }
  function headingBreak(code2) {
    if (code2 === 35) {
      effects.enter("atxHeadingSequence");
      return sequence(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("atxHeading");
      return ok2(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, headingBreak, "whitespace")(code2);
    }
    effects.enter("atxHeadingText");
    return data(code2);
  }
  function sequence(code2) {
    if (code2 === 35) {
      effects.consume(code2);
      return sequence;
    }
    effects.exit("atxHeadingSequence");
    return headingBreak(code2);
  }
  function data(code2) {
    if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingText");
      return headingBreak(code2);
    }
    effects.consume(code2);
    return data;
  }
}
const htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
const htmlRawNames = ["pre", "script", "style", "textarea"];
const htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
const nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok2, nok) {
  const self2 = this;
  let kind;
  let startTag;
  let buffer;
  let index2;
  let marker;
  return start;
  function start(code2) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationStart;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      kind = 3;
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer = String.fromCharCode(code2);
      startTag = true;
      return tagName;
    }
    return nok(code2);
  }
  function declarationStart(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      kind = 2;
      return commentOpenInside;
    }
    if (code2 === 91) {
      effects.consume(code2);
      kind = 5;
      buffer = "CDATA[";
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      kind = 4;
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function commentOpenInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function cdataOpenInside(code2) {
    if (code2 === buffer.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer.length ? self2.interrupt ? ok2 : continuation : cdataOpenInside;
    }
    return nok(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer = String.fromCharCode(code2);
      return tagName;
    }
    return nok(code2);
  }
  function tagName(code2) {
    if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      if (code2 !== 47 && startTag && htmlRawNames.includes(buffer.toLowerCase())) {
        kind = 1;
        return self2.interrupt ? ok2(code2) : continuation(code2);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        kind = 6;
        if (code2 === 47) {
          effects.consume(code2);
          return basicSelfClosing;
        }
        return self2.interrupt ? ok2(code2) : continuation(code2);
      }
      kind = 7;
      return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code2) : startTag ? completeAttributeNameBefore(code2) : completeClosingTagAfter(code2);
    }
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      buffer += String.fromCharCode(code2);
      return tagName;
    }
    return nok(code2);
  }
  function basicSelfClosing(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return self2.interrupt ? ok2 : continuation;
    }
    return nok(code2);
  }
  function completeClosingTagAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeClosingTagAfter;
    }
    return completeEnd(code2);
  }
  function completeAttributeNameBefore(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return completeEnd;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameBefore;
    }
    return completeEnd(code2);
  }
  function completeAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code2);
  }
  function completeAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code2);
  }
  function completeAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    marker = null;
    return completeAttributeValueUnquoted(code2);
  }
  function completeAttributeValueQuoted(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    if (code2 === marker) {
      effects.consume(code2);
      return completeAttributeValueQuotedAfter;
    }
    effects.consume(code2);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
      return completeAttributeNameAfter(code2);
    }
    effects.consume(code2);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code2) {
    if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
      return completeAttributeNameBefore(code2);
    }
    return nok(code2);
  }
  function completeEnd(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return completeAfter;
    }
    return nok(code2);
  }
  function completeAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAfter;
    }
    return code2 === null || markdownLineEnding(code2) ? continuation(code2) : nok(code2);
  }
  function continuation(code2) {
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationCommentInside;
    }
    if (code2 === 60 && kind === 1) {
      effects.consume(code2);
      return continuationRawTagOpen;
    }
    if (code2 === 62 && kind === 4) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 63 && kind === 3) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    if (code2 === 93 && kind === 5) {
      effects.consume(code2);
      return continuationCharacterDataInside;
    }
    if (markdownLineEnding(code2) && (kind === 6 || kind === 7)) {
      return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      return continuationAtLineEnding(code2);
    }
    effects.consume(code2);
    return continuation;
  }
  function continuationAtLineEnding(code2) {
    effects.exit("htmlFlowData");
    return htmlContinueStart(code2);
  }
  function htmlContinueStart(code2) {
    if (code2 === null) {
      return done(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt({
        tokenize: htmlLineEnd,
        partial: true
      }, htmlContinueStart, done)(code2);
    }
    effects.enter("htmlFlowData");
    return continuation(code2);
  }
  function htmlLineEnd(effects2, ok3, nok2) {
    return start2;
    function start2(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self2.parser.lazy[self2.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function continuationCommentInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationRawTagOpen(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationRawEndTag(code2) {
    if (code2 === 62 && htmlRawNames.includes(buffer.toLowerCase())) {
      effects.consume(code2);
      return continuationClose;
    }
    if (asciiAlpha(code2) && buffer.length < 8) {
      effects.consume(code2);
      buffer += String.fromCharCode(code2);
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationCharacterDataInside(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationDeclarationInside(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationClose(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("htmlFlowData");
      return done(code2);
    }
    effects.consume(code2);
    return continuationClose;
  }
  function done(code2) {
    effects.exit("htmlFlow");
    return ok2(code2);
  }
}
function tokenizeNextBlank(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.exit("htmlFlowData");
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok2, nok);
  }
}
const htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok2, nok) {
  const self2 = this;
  let marker;
  let buffer;
  let index2;
  let returnState;
  return start;
  function start(code2) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationOpen;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instruction;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    return nok(code2);
  }
  function declarationOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentOpen;
    }
    if (code2 === 91) {
      effects.consume(code2);
      buffer = "CDATA[";
      index2 = 0;
      return cdataOpen;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return declaration;
    }
    return nok(code2);
  }
  function commentOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentStart;
    }
    return nok(code2);
  }
  function commentStart(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentStartDash;
    }
    return comment(code2);
  }
  function commentStartDash(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    return comment(code2);
  }
  function comment(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = comment;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return comment;
  }
  function commentClose(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return end;
    }
    return comment(code2);
  }
  function cdataOpen(code2) {
    if (code2 === buffer.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer.length ? cdata : cdataOpen;
    }
    return nok(code2);
  }
  function cdata(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = cdata;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return cdata;
  }
  function cdataClose(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function cdataEnd(code2) {
    if (code2 === 62) {
      return end(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function declaration(code2) {
    if (code2 === null || code2 === 62) {
      return end(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = declaration;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return declaration;
  }
  function instruction(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instructionClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = instruction;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return instruction;
  }
  function instructionClose(code2) {
    return code2 === 62 ? end(code2) : instruction(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return nok(code2);
  }
  function tagClose(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return tagCloseBetween(code2);
  }
  function tagCloseBetween(code2) {
    if (markdownLineEnding(code2)) {
      returnState = tagCloseBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagCloseBetween;
    }
    return end(code2);
  }
  function tagOpen(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenBetween(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return end;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenBetween;
    }
    return end(code2);
  }
  function tagOpenAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code2);
  }
  function tagOpenAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code2);
  }
  function tagOpenAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code2);
    marker = void 0;
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueQuotedAfter(code2) {
    if (code2 === 62 || code2 === 47 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueUnquoted;
  }
  function atLineEnding(code2) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, afterPrefix, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  function afterPrefix(code2) {
    effects.enter("htmlTextData");
    return returnState(code2);
  }
  function end(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok2;
    }
    return nok(code2);
  }
}
const labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
const resourceConstruct = {
  tokenize: tokenizeResource
};
const fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
const collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  let token;
  while (++index2 < events.length) {
    token = events[index2][1];
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2);
      token.type = "data";
      index2++;
    }
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset = 0;
  let token;
  let open;
  let close;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index2;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const label = {
    type: "label",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close][1].end)
  };
  const text2 = {
    type: "labelText",
    start: Object.assign({}, events[open + offset + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  };
  media = [
    ["enter", group, context],
    ["enter", label, context]
  ];
  media = push(media, events.slice(open + 1, open + offset + 3));
  media = push(media, [["enter", text2, context]]);
  media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
  media = push(media, [
    ["exit", text2, context],
    events[close - 2],
    events[close - 1],
    ["exit", label, context]
  ]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok2, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
      labelStart = self2.events[index2][1];
      break;
    }
  }
  return start;
  function start(code2) {
    if (!labelStart) {
      return nok(code2);
    }
    if (labelStart._inactive)
      return balanced(code2);
    defined = self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize({
      start: labelStart.end,
      end: self2.now()
    })));
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return afterLabelEnd;
  }
  function afterLabelEnd(code2) {
    if (code2 === 40) {
      return effects.attempt(resourceConstruct, ok2, defined ? ok2 : balanced)(code2);
    }
    if (code2 === 91) {
      return effects.attempt(fullReferenceConstruct, ok2, defined ? effects.attempt(collapsedReferenceConstruct, ok2, balanced) : balanced)(code2);
    }
    return defined ? ok2(code2) : balanced(code2);
  }
  function balanced(code2) {
    labelStart._balanced = true;
    return nok(code2);
  }
}
function tokenizeResource(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code2);
    effects.exit("resourceMarker");
    return factoryWhitespace(effects, open);
  }
  function open(code2) {
    if (code2 === 41) {
      return end(code2);
    }
    return factoryDestination(effects, destinationAfter, nok, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code2);
  }
  function destinationAfter(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, between)(code2) : end(code2);
  }
  function between(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(effects, factoryWhitespace(effects, end), nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code2);
    }
    return end(code2);
  }
  function end(code2) {
    if (code2 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok2;
    }
    return nok(code2);
  }
}
function tokenizeFullReference(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    return factoryLabel.call(self2, effects, afterLabel, nok, "reference", "referenceMarker", "referenceString")(code2);
  }
  function afterLabel(code2) {
    return self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) ? ok2(code2) : nok(code2);
  }
}
function tokenizeCollapsedReference(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code2);
    effects.exit("referenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok2;
    }
    return nok(code2);
  }
}
const labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code2);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 91) {
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok2) {
  return start;
  function start(code2) {
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, ok2, "linePrefix");
  }
}
const thematicBreak$1 = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok2, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code2) {
    effects.enter("thematicBreak");
    marker = code2;
    return atBreak(code2);
  }
  function atBreak(code2) {
    if (code2 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, atBreak, "whitespace")(code2);
    }
    if (size < 3 || code2 !== null && !markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.exit("thematicBreak");
    return ok2(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return atBreak(code2);
  }
}
const list$1 = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
const listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
const indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};
function tokenizeListStart(effects, ok2, nok) {
  const self2 = this;
  const tail = self2.events[self2.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code2) {
    const kind = self2.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self2.containerState.marker || code2 === self2.containerState.marker : asciiDigit(code2)) {
      if (!self2.containerState.type) {
        self2.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code2 === 42 || code2 === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code2) : atMarker(code2);
      }
      if (!self2.interrupt || code2 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code2);
      }
    }
    return nok(code2);
  }
  function inside(code2) {
    if (asciiDigit(code2) && ++size < 10) {
      effects.consume(code2);
      return inside;
    }
    if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code2 === self2.containerState.marker : code2 === 41 || code2 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code2);
    }
    return nok(code2);
  }
  function atMarker(code2) {
    effects.enter("listItemMarker");
    effects.consume(code2);
    effects.exit("listItemMarker");
    self2.containerState.marker = self2.containerState.marker || code2;
    return effects.check(blankLine, self2.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
  }
  function onBlank(code2) {
    self2.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code2);
  }
  function otherPrefix(code2) {
    if (markdownSpace(code2)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code2);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code2);
  }
  function endOfPrefix(code2) {
    self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok2(code2);
  }
}
function tokenizeListContinuation(effects, ok2, nok) {
  const self2 = this;
  self2.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code2) {
    self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
    return factorySpace(effects, ok2, "listItemIndent", self2.containerState.size + 1)(code2);
  }
  function notBlank(code2) {
    if (self2.containerState.furtherBlankLines || !markdownSpace(code2)) {
      self2.containerState.furtherBlankLines = void 0;
      self2.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code2);
    }
    self2.containerState.furtherBlankLines = void 0;
    self2.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
  }
  function notInCurrentItem(code2) {
    self2.containerState._closeFlow = true;
    self2.interrupt = void 0;
    return factorySpace(effects, effects.attempt(list$1, ok2, nok), "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
  }
}
function tokenizeIndent(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok2(code2) : nok(code2);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
  }
}
const setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content2;
  let text2;
  let definition2;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content2 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text2 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading2 = {
    type: "setextHeading",
    start: Object.assign({}, events[text2][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  events[text2][1].type = "setextHeadingText";
  if (definition2) {
    events.splice(text2, 0, ["enter", heading2, context]);
    events.splice(definition2 + 1, 0, ["exit", events[content2][1], context]);
    events[content2][1].end = Object.assign({}, events[definition2][1].end);
  } else {
    events[content2][1] = heading2;
  }
  events.push(["exit", heading2, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok2, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  let marker;
  let paragraph2;
  while (index2--) {
    if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
      paragraph2 = self2.events[index2][1].type === "paragraph";
      break;
    }
  }
  return start;
  function start(code2) {
    if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph2)) {
      effects.enter("setextHeadingLine");
      effects.enter("setextHeadingLineSequence");
      marker = code2;
      return closingSequence(code2);
    }
    return nok(code2);
  }
  function closingSequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return closingSequence;
    }
    effects.exit("setextHeadingLineSequence");
    return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code2);
  }
  function closingSequenceEnd(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("setextHeadingLine");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const flow$1 = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self2 = this;
  const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content$1, afterConstruct)), "linePrefix")));
  return initial;
  function atBlankEnding(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    self2.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    self2.currentConstruct = void 0;
    return initial;
  }
}
const resolver = {
  resolveAll: createResolver()
};
const string$1 = initializeFactory("string");
const text$2 = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
  };
  function initializeText(effects) {
    const self2 = this;
    const constructs2 = this.parser.constructs[field];
    const text2 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code2) {
      return atBreak(code2) ? text2(code2) : notText(code2);
    }
    function notText(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("data");
      effects.consume(code2);
      return data;
    }
    function data(code2) {
      if (atBreak(code2)) {
        effects.exit("data");
        return text2(code2);
      }
      effects.consume(code2);
      return data;
    }
    function atBreak(code2) {
      if (code2 === null) {
        return true;
      }
      const list2 = constructs2[code2];
      let index2 = -1;
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self2, self2.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1)
          ;
        else {
          index2++;
          break;
        }
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data.end)
        };
        data.end = Object.assign({}, token.start);
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}
function createTokenizer(parser, initialize, from) {
  let point2 = Object.assign(from ? Object.assign({}, from) : {
    line: 1,
    column: 1,
    offset: 0
  }, {
    _index: 0,
    _bufferIndex: -1
  });
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main2();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point2);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main2() {
    let chunkIndex;
    while (point2._index < chunks.length) {
      const chunk = chunks[point2._index];
      if (typeof chunk === "string") {
        chunkIndex = point2._index;
        if (point2._bufferIndex < 0) {
          point2._bufferIndex = 0;
        }
        while (point2._index === chunkIndex && point2._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point2._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code2) {
    state = state(code2);
  }
  function consume(code2) {
    if (markdownLineEnding(code2)) {
      point2.line++;
      point2.column = 1;
      point2.offset += code2 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code2 !== -1) {
      point2.column++;
      point2.offset++;
    }
    if (point2._bufferIndex < 0) {
      point2._index++;
    } else {
      point2._bufferIndex++;
      if (point2._bufferIndex === chunks[point2._index].length) {
        point2._bufferIndex = -1;
        point2._index++;
      }
    }
    context.previous = code2;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit2(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map) {
        return start;
        function start(code2) {
          const def = code2 !== null && map[code2];
          const all2 = code2 !== null && map.null;
          const list2 = [
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list2)(code2);
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code2) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok2, nok)(code2);
        }
      }
      function ok2(code2) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code2) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point2 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point2.line in columnStart && point2.column < 2) {
      point2.column = columnStart[point2.line];
      point2.offset += columnStart[point2.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}
const document$1 = {
  [42]: list$1,
  [43]: list$1,
  [45]: list$1,
  [48]: list$1,
  [49]: list$1,
  [50]: list$1,
  [51]: list$1,
  [52]: list$1,
  [53]: list$1,
  [54]: list$1,
  [55]: list$1,
  [56]: list$1,
  [57]: list$1,
  [62]: blockQuote
};
const contentInitial = {
  [91]: definition
};
const flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
const flow = {
  [35]: headingAtx,
  [42]: thematicBreak$1,
  [45]: [setextUnderline, thematicBreak$1],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak$1,
  [96]: codeFenced,
  [126]: codeFenced
};
const string = {
  [38]: characterReference,
  [92]: characterEscape
};
const text$1 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
const insideSpan = {
  null: [attention, resolver]
};
const attentionMarkers = {
  null: [42, 95]
};
const disable = {
  null: []
};
var defaultConstructs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  document: document$1,
  contentInitial,
  flowInitial,
  flow,
  string,
  text: text$1,
  insideSpan,
  attentionMarkers,
  disable
}, Symbol.toStringTag, { value: "Module" }));
function parse$3(options = {}) {
  const constructs2 = combineExtensions([defaultConstructs].concat(options.extensions || []));
  const parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create2(content$2),
    document: create2(document$2),
    flow: create2(flow$1),
    string: create2(string$1),
    text: create2(text$2)
  };
  return parser;
  function create2(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}
const search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code2;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code2 = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code2) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer)
        chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}
function decodeNumericCharacterReference(value, base2) {
  const code2 = Number.parseInt(value, base2);
  if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
    return "\uFFFD";
  }
  return String.fromCharCode(code2);
}
const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}
const own$6 = {}.hasOwnProperty;
const fromMarkdown = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(postprocess(parse$3(options).document().write(preprocess()(value, encoding, true))));
};
function compiler(options = {}) {
  const config = configure({
    transforms: [],
    canContainEols: [
      "emphasis",
      "fragment",
      "heading",
      "paragraph",
      "strong"
    ],
    enter: {
      autolink: opener(link2),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading2),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis2),
      hardBreakEscape: opener(hardBreak2),
      hardBreakTrailing: opener(hardBreak2),
      htmlFlow: opener(html2, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html2, buffer),
      htmlTextData: onenterdata,
      image: opener(image2),
      label: buffer,
      link: opener(link2),
      listItem: opener(listItem2),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list2, onenterlistordered),
      listUnordered: opener(list2),
      paragraph: opener(paragraph2),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading2),
      strong: opener(strong2),
      thematicBreak: opener(thematicBreak2)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  }, options.mdastExtensions || []);
  const data = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const listStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit: exit2,
      buffer,
      resume,
      setData,
      getData
    };
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own$6.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(Object.assign({
          sliceSerialize: events[index2][2].sliceSerialize
        }, context), events[index2][1]);
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(events.length > 0 ? events[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: point2(events.length > 0 ? events[events.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem3;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
        if (event[0] === "enter") {
          containerBalance++;
        } else {
          containerBalance--;
        }
        atMarker = void 0;
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index2;
          }
          atMarker = void 0;
        }
      } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace")
        ;
      else {
        atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem3) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent")
              ;
            else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem3._spread = true;
          }
          listItem3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
          events.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          listItem3 = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start)
          };
          events.splice(index2, 0, ["enter", listItem3, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  function setData(key, value) {
    data[key] = value;
  }
  function getData(key) {
    return data[key];
  }
  function point2(d2) {
    return {
      line: d2.line,
      column: d2.column,
      offset: d2.offset
    };
  }
  function opener(create2, and) {
    return open;
    function open(token) {
      enter.call(this, create2(token), token);
      if (and)
        and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point2(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and)
        and.call(this, token);
      exit2.call(this, token);
    }
  }
  function exit2(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
        start: token.start,
        end: token.end
      }) + "): it\u2019s not open");
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point2(token.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true);
  }
  function onenterlistitemvalue(token) {
    if (getData("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      setData("expectingFirstListItemValue");
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.meta = data2;
  }
  function onexitcodefencedfence() {
    if (getData("flowCodeInside"))
      return;
    this.buffer();
    setData("flowCodeInside", true);
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    setData("flowCodeInside");
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data2;
  }
  function onexitatxheadingsequence(token) {
    const node = this.stack[this.stack.length - 1];
    if (!node.depth) {
      const depth = this.sliceSerialize(token).length;
      node.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true);
  }
  function onexitsetextheadinglinesequence(token) {
    const node = this.stack[this.stack.length - 1];
    node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding");
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text2();
      tail.position = {
        start: point2(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (getData("atHardBreak")) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      setData("atHardBreak");
      return;
    }
    if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    setData("atHardBreak", true);
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexitlink() {
    const context = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      context.type += "Reference";
      context.referenceType = getData("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitimage() {
    const context = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      context.type += "Reference";
      context.referenceType = getData("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitlabeltext(token) {
    const ancestor = this.stack[this.stack.length - 2];
    const string2 = this.sliceSerialize(token);
    ancestor.label = decodeString(string2);
    ancestor.identifier = normalizeIdentifier(string2).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node = this.stack[this.stack.length - 1];
    setData("inReference", true);
    if (node.type === "link") {
      node.children = fragment.children;
    } else {
      node.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data2;
  }
  function onexitresource() {
    setData("inReference");
  }
  function onenterreference() {
    setData("referenceType", "collapsed");
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    setData("referenceType", "full");
  }
  function onexitcharacterreferencemarker(token) {
    setData("characterReferenceType", token.type);
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type = getData("characterReferenceType");
    let value;
    if (type) {
      value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
      setData("characterReferenceType");
    } else {
      value = decodeNamedCharacterReference(data2);
    }
    const tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node = this.stack[this.stack.length - 1];
    node.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node = this.stack[this.stack.length - 1];
    node.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading2() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html2() {
    return {
      type: "html",
      value: ""
    };
  }
  function image2() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link2() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list2(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: []
    };
  }
  function listItem2(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph2() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text2() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
  return combined;
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own$6.call(extension2, key)) {
      const list2 = key === "canContainEols" || key === "transforms";
      const maybe = own$6.call(combined, key) ? combined[key] : void 0;
      const left = maybe || (combined[key] = list2 ? [] : {});
      const right = extension2[key];
      if (right) {
        if (list2) {
          combined[key] = [...left, ...right];
        } else {
          Object.assign(left, right);
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
      start: left.start,
      end: left.end
    }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is open");
  } else {
    throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is still open");
  }
}
function remarkParse(options) {
  const parser = (doc) => {
    const settings = this.data("settings");
    return fromMarkdown(doc, Object.assign({}, settings, options, {
      extensions: this.data("micromarkExtensions") || [],
      mdastExtensions: this.data("fromMarkdownExtensions") || []
    }));
  };
  Object.assign(this, { Parser: parser });
}
var u$1 = function(type, props, value) {
  var node = { type: String(type) };
  if ((value === void 0 || value === null) && (typeof props === "string" || Array.isArray(props))) {
    value = props;
  } else {
    Object.assign(node, props);
  }
  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== void 0 && value !== null) {
    node.value = String(value);
  }
  return node;
};
const own$5 = {}.hasOwnProperty;
function unknown(h2, node) {
  const data = node.data || {};
  if ("value" in node && !(own$5.call(data, "hName") || own$5.call(data, "hProperties") || own$5.call(data, "hChildren"))) {
    return h2.augment(node, u$1("text", node.value));
  }
  return h2(node, "div", all(h2, node));
}
function one(h2, node, parent) {
  const type = node && node.type;
  let fn;
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }
  if (own$5.call(h2.handlers, type)) {
    fn = h2.handlers[type];
  } else if (h2.passThrough && h2.passThrough.includes(type)) {
    fn = returnNode;
  } else {
    fn = h2.unknownHandler;
  }
  return (typeof fn === "function" ? fn : unknown)(h2, node, parent);
}
function returnNode(h2, node) {
  return "children" in node ? __spreadProps(__spreadValues({}, node), { children: all(h2, node) }) : node;
}
function all(h2, parent) {
  const values = [];
  if ("children" in parent) {
    const nodes = parent.children;
    let index2 = -1;
    while (++index2 < nodes.length) {
      const result = one(h2, nodes[index2], parent);
      if (result) {
        if (index2 && nodes[index2 - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }
          if (!Array.isArray(result) && result.type === "element") {
            const head = result.children[0];
            if (head && head.type === "text") {
              head.value = head.value.replace(/^\s+/, "");
            }
          }
        }
        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }
  return values;
}
const convert = function(test) {
  if (test === void 0 || test === null) {
    return ok;
  }
  if (typeof test === "string") {
    return typeFactory(test);
  }
  if (typeof test === "object") {
    return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
  }
  if (typeof test === "function") {
    return castFactory(test);
  }
  throw new Error("Expected function, string, or object as test");
};
function anyFactory(tests) {
  const checks2 = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks2[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks2.length) {
      if (checks2[index3].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters));
  }
}
function ok() {
  return true;
}
function color$1(d2) {
  return d2;
}
const CONTINUE$1 = true;
const SKIP$1 = "skip";
const EXIT$1 = false;
const visitParents$1 = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  const is = convert(test);
  const step = reverse ? -1 : 1;
  factory2(tree, null, [])();
  function factory2(node, index2, parents) {
    const value = typeof node === "object" && node !== null ? node : {};
    let name;
    if (typeof value.type === "string") {
      name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
      Object.defineProperty(visit2, "name", {
        value: "node (" + color$1(value.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = [];
      let subresult;
      let offset;
      let grandparents;
      if (!test || is(node, index2, parents[parents.length - 1] || null)) {
        result = toResult$1(visitor(node, parents));
        if (result[0] === EXIT$1) {
          return result;
        }
      }
      if (node.children && result[0] !== SKIP$1) {
        offset = (reverse ? node.children.length : -1) + step;
        grandparents = parents.concat(node);
        while (offset > -1 && offset < node.children.length) {
          subresult = factory2(node.children[offset], offset, grandparents)();
          if (subresult[0] === EXIT$1) {
            return subresult;
          }
          offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
        }
      }
      return result;
    }
  }
};
function toResult$1(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE$1, value];
  }
  return [value];
}
const visit$2 = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  visitParents$1(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
  }
};
const pointStart = point("start");
const pointEnd = point("end");
function point(type) {
  return point2;
  function point2(node) {
    const point3 = node && node.position && node.position[type] || {};
    return {
      line: point3.line || null,
      column: point3.column || null,
      offset: point3.offset > -1 ? point3.offset : null
    };
  }
}
function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}
function color(d2) {
  return d2;
}
const CONTINUE = true;
const SKIP = "skip";
const EXIT = false;
const visitParents = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  var is = convert(test);
  var step = reverse ? -1 : 1;
  factory2(tree, null, [])();
  function factory2(node, index2, parents) {
    var value = typeof node === "object" && node !== null ? node : {};
    var name;
    if (typeof value.type === "string") {
      name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      var result = [];
      var subresult;
      var offset;
      var grandparents;
      if (!test || is(node, index2, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if (node.children && result[0] !== SKIP) {
        offset = (reverse ? node.children.length : -1) + step;
        grandparents = parents.concat(node);
        while (offset > -1 && offset < node.children.length) {
          subresult = factory2(node.children[offset], offset, grandparents)();
          if (subresult[0] === EXIT) {
            return subresult;
          }
          offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
        }
      }
      return result;
    }
  }
};
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}
const visit$1 = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
  }
};
const own$4 = {}.hasOwnProperty;
function definitions(node) {
  const cache = /* @__PURE__ */ Object.create(null);
  if (!node || !node.type) {
    throw new Error("mdast-util-definitions expected node");
  }
  visit$1(node, "definition", ondefinition);
  return getDefinition;
  function ondefinition(definition2) {
    const id = clean(definition2.identifier);
    if (id && !own$4.call(cache, id)) {
      cache[id] = definition2;
    }
  }
  function getDefinition(identifier) {
    const id = clean(identifier);
    return id && own$4.call(cache, id) ? cache[id] : null;
  }
}
function clean(value) {
  return String(value || "").toUpperCase();
}
const characterReferences = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function encode$1(value) {
  return value.replace(/["&<>]/g, replace);
  function replace(value2) {
    return "&" + characterReferences[value2] + ";";
  }
}
function sanitizeUri(url, protocol) {
  const value = encode$1(normalizeUri(url || ""));
  if (!protocol) {
    return value;
  }
  const colon = value.indexOf(":");
  const questionMark = value.indexOf("?");
  const numberSign = value.indexOf("#");
  const slash = value.indexOf("/");
  if (colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || protocol.test(value.slice(0, colon))) {
    return value;
  }
  return "";
}
function normalizeUri(value) {
  const result = [];
  let index2 = -1;
  let start = 0;
  let skip = 0;
  while (++index2 < value.length) {
    const code2 = value.charCodeAt(index2);
    let replace = "";
    if (code2 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
      skip = 2;
    } else if (code2 < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code2))) {
        replace = String.fromCharCode(code2);
      }
    } else if (code2 > 55295 && code2 < 57344) {
      const next = value.charCodeAt(index2 + 1);
      if (code2 < 56320 && next > 56319 && next < 57344) {
        replace = String.fromCharCode(code2, next);
        skip = 1;
      } else {
        replace = "\uFFFD";
      }
    } else {
      replace = String.fromCharCode(code2);
    }
    if (replace) {
      result.push(value.slice(start, index2), encodeURIComponent(replace));
      start = index2 + skip + 1;
      replace = "";
    }
    if (skip) {
      index2 += skip;
      skip = 0;
    }
  }
  return result.join("") + value.slice(start);
}
function wrap(nodes, loose) {
  const result = [];
  let index2 = -1;
  if (loose) {
    result.push(u$1("text", "\n"));
  }
  while (++index2 < nodes.length) {
    if (index2)
      result.push(u$1("text", "\n"));
    result.push(nodes[index2]);
  }
  if (loose && nodes.length > 0) {
    result.push(u$1("text", "\n"));
  }
  return result;
}
function footer(h2) {
  let index2 = -1;
  const listItems = [];
  while (++index2 < h2.footnoteOrder.length) {
    const def = h2.footnoteById[h2.footnoteOrder[index2].toUpperCase()];
    if (!def) {
      continue;
    }
    const content2 = all(h2, def);
    const id = String(def.identifier);
    const safeId = sanitizeUri(id.toLowerCase());
    let referenceIndex = 0;
    const backReferences = [];
    while (++referenceIndex <= h2.footnoteCounts[id]) {
      const backReference = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + h2.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
          dataFootnoteBackref: true,
          className: ["data-footnote-backref"],
          ariaLabel: h2.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      if (referenceIndex > 1) {
        backReference.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(referenceIndex) }]
        });
      }
      if (backReferences.length > 0) {
        backReferences.push({ type: "text", value: " " });
      }
      backReferences.push(backReference);
    }
    const tail = content2[content2.length - 1];
    if (tail && tail.type === "element" && tail.tagName === "p") {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === "text") {
        tailTail.value += " ";
      } else {
        tail.children.push({ type: "text", value: " " });
      }
      tail.children.push(...backReferences);
    } else {
      content2.push(...backReferences);
    }
    const listItem2 = {
      type: "element",
      tagName: "li",
      properties: { id: h2.clobberPrefix + "fn-" + safeId },
      children: wrap(content2, true)
    };
    if (def.position) {
      listItem2.position = def.position;
    }
    listItems.push(listItem2);
  }
  if (listItems.length === 0) {
    return null;
  }
  return {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: true, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: "h2",
        properties: { id: "footnote-label", className: ["sr-only"] },
        children: [u$1("text", h2.footnoteLabel)]
      },
      { type: "text", value: "\n" },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: wrap(listItems, true)
      },
      { type: "text", value: "\n" }
    ]
  };
}
function blockquote(h2, node) {
  return h2(node, "blockquote", wrap(all(h2, node), true));
}
function hardBreak(h2, node) {
  return [h2(node, "br"), u$1("text", "\n")];
}
function code(h2, node) {
  const value = node.value ? node.value + "\n" : "";
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  const props = {};
  if (lang) {
    props.className = ["language-" + lang];
  }
  const code2 = h2(node, "code", props, [u$1("text", value)]);
  if (node.meta) {
    code2.data = { meta: node.meta };
  }
  return h2(node.position, "pre", [code2]);
}
function strikethrough(h2, node) {
  return h2(node, "del", all(h2, node));
}
function emphasis(h2, node) {
  return h2(node, "em", all(h2, node));
}
function footnoteReference(h2, node) {
  const id = String(node.identifier);
  const safeId = sanitizeUri(id.toLowerCase());
  const index2 = h2.footnoteOrder.indexOf(id);
  let counter;
  if (index2 === -1) {
    h2.footnoteOrder.push(id);
    h2.footnoteCounts[id] = 1;
    counter = h2.footnoteOrder.length;
  } else {
    h2.footnoteCounts[id]++;
    counter = index2 + 1;
  }
  const reuseCounter = h2.footnoteCounts[id];
  return h2(node, "sup", [
    h2(node.position, "a", {
      href: "#" + h2.clobberPrefix + "fn-" + safeId,
      id: h2.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
      dataFootnoteRef: true,
      ariaDescribedBy: "footnote-label"
    }, [u$1("text", String(counter))])
  ]);
}
function footnote(h2, node) {
  const footnoteById = h2.footnoteById;
  let no = 1;
  while (no in footnoteById)
    no++;
  const identifier = String(no);
  footnoteById[identifier] = {
    type: "footnoteDefinition",
    identifier,
    children: [{ type: "paragraph", children: node.children }],
    position: node.position
  };
  return footnoteReference(h2, {
    type: "footnoteReference",
    identifier,
    position: node.position
  });
}
function heading(h2, node) {
  return h2(node, "h" + node.depth, all(h2, node));
}
function html$2(h2, node) {
  return h2.dangerous ? h2.augment(node, u$1("raw", node.value)) : null;
}
var encodeCache = {};
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = encodeCache[exclude] = [];
  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    if (/^[0-9a-z]$/i.test(ch)) {
      cache.push(ch);
    } else {
      cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
    }
  }
  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }
  return cache;
}
function encode(string2, exclude, keepEscaped) {
  var i, l2, code2, nextCode, cache, result = "";
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }
  if (typeof keepEscaped === "undefined") {
    keepEscaped = true;
  }
  cache = getEncodeCache(exclude);
  for (i = 0, l2 = string2.length; i < l2; i++) {
    code2 = string2.charCodeAt(i);
    if (keepEscaped && code2 === 37 && i + 2 < l2) {
      if (/^[0-9a-f]{2}$/i.test(string2.slice(i + 1, i + 3))) {
        result += string2.slice(i, i + 3);
        i += 2;
        continue;
      }
    }
    if (code2 < 128) {
      result += cache[code2];
      continue;
    }
    if (code2 >= 55296 && code2 <= 57343) {
      if (code2 >= 55296 && code2 <= 56319 && i + 1 < l2) {
        nextCode = string2.charCodeAt(i + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string2[i] + string2[i + 1]);
          i++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string2[i]);
  }
  return result;
}
encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_1 = encode;
function revert(h2, node) {
  const subtype = node.referenceType;
  let suffix = "]";
  if (subtype === "collapsed") {
    suffix += "[]";
  } else if (subtype === "full") {
    suffix += "[" + (node.label || node.identifier) + "]";
  }
  if (node.type === "imageReference") {
    return u$1("text", "![" + node.alt + suffix);
  }
  const contents = all(h2, node);
  const head = contents[0];
  if (head && head.type === "text") {
    head.value = "[" + head.value;
  } else {
    contents.unshift(u$1("text", "["));
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === "text") {
    tail.value += suffix;
  } else {
    contents.push(u$1("text", suffix));
  }
  return contents;
}
function imageReference(h2, node) {
  const def = h2.definition(node.identifier);
  if (!def) {
    return revert(h2, node);
  }
  const props = { src: encode_1(def.url || ""), alt: node.alt };
  if (def.title !== null && def.title !== void 0) {
    props.title = def.title;
  }
  return h2(node, "img", props);
}
function image(h2, node) {
  const props = { src: encode_1(node.url), alt: node.alt };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h2(node, "img", props);
}
function inlineCode(h2, node) {
  return h2(node, "code", [u$1("text", node.value.replace(/\r?\n|\r/g, " "))]);
}
function linkReference(h2, node) {
  const def = h2.definition(node.identifier);
  if (!def) {
    return revert(h2, node);
  }
  const props = { href: encode_1(def.url || "") };
  if (def.title !== null && def.title !== void 0) {
    props.title = def.title;
  }
  return h2(node, "a", props, all(h2, node));
}
function link(h2, node) {
  const props = { href: encode_1(node.url) };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h2(node, "a", props, all(h2, node));
}
function listItem(h2, node, parent) {
  const result = all(h2, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  const wrapped = [];
  if (typeof node.checked === "boolean") {
    let paragraph2;
    if (result[0] && result[0].type === "element" && result[0].tagName === "p") {
      paragraph2 = result[0];
    } else {
      paragraph2 = h2(null, "p", []);
      result.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift(u$1("text", " "));
    }
    paragraph2.children.unshift(h2(null, "input", {
      type: "checkbox",
      checked: node.checked,
      disabled: true
    }));
    props.className = ["task-list-item"];
  }
  let index2 = -1;
  while (++index2 < result.length) {
    const child = result[index2];
    if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
      wrapped.push(u$1("text", "\n"));
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      wrapped.push(...child.children);
    } else {
      wrapped.push(child);
    }
  }
  const tail = result[result.length - 1];
  if (tail && (loose || !("tagName" in tail) || tail.tagName !== "p")) {
    wrapped.push(u$1("text", "\n"));
  }
  return h2(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  let index2 = -1;
  while (!loose && ++index2 < children.length) {
    loose = listItemLoose(children[index2]);
  }
  return Boolean(loose);
}
function listItemLoose(node) {
  const spread = node.spread;
  return spread === void 0 || spread === null ? node.children.length > 1 : spread;
}
function list(h2, node) {
  const props = {};
  const name = node.ordered ? "ol" : "ul";
  const items = all(h2, node);
  let index2 = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  while (++index2 < items.length) {
    const item = items[index2];
    if (item.type === "element" && item.tagName === "li" && item.properties && Array.isArray(item.properties.className) && item.properties.className.includes("task-list-item")) {
      props.className = ["contains-task-list"];
      break;
    }
  }
  return h2(node, name, props, wrap(items, true));
}
function paragraph(h2, node) {
  return h2(node, "p", all(h2, node));
}
function root(h2, node) {
  return h2.augment(node, u$1("root", wrap(all(h2, node))));
}
function strong(h2, node) {
  return h2(node, "strong", all(h2, node));
}
function table(h2, node) {
  const rows = node.children;
  let index2 = -1;
  const align = node.align || [];
  const result = [];
  while (++index2 < rows.length) {
    const row = rows[index2].children;
    const name = index2 === 0 ? "th" : "td";
    const out = [];
    let cellIndex = -1;
    const length = node.align ? align.length : row.length;
    while (++cellIndex < length) {
      const cell = row[cellIndex];
      out.push(h2(cell, name, { align: align[cellIndex] }, cell ? all(h2, cell) : []));
    }
    result[index2] = h2(rows[index2], "tr", wrap(out, true));
  }
  return h2(node, "table", wrap([h2(result[0].position, "thead", wrap([result[0]], true))].concat(result[1] ? h2({
    start: pointStart(result[1]),
    end: pointEnd(result[result.length - 1])
  }, "tbody", wrap(result.slice(1), true)) : []), true));
}
function text(h2, node) {
  return h2.augment(node, u$1("text", String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, "$1")));
}
function thematicBreak(h2, node) {
  return h2(node, "hr");
}
const handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  footnote,
  heading,
  html: html$2,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  root,
  strong,
  table,
  text,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};
function ignore() {
  return null;
}
const own$3 = {}.hasOwnProperty;
function factory(tree, options) {
  const settings = options || {};
  const dangerous = settings.allowDangerousHtml || false;
  const footnoteById = {};
  h2.dangerous = dangerous;
  h2.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
  h2.footnoteLabel = settings.footnoteLabel || "Footnotes";
  h2.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
  h2.definition = definitions(tree);
  h2.footnoteById = footnoteById;
  h2.footnoteOrder = [];
  h2.footnoteCounts = {};
  h2.augment = augment;
  h2.handlers = __spreadValues(__spreadValues({}, handlers), settings.handlers);
  h2.unknownHandler = settings.unknownHandler;
  h2.passThrough = settings.passThrough;
  visit$2(tree, "footnoteDefinition", (definition2) => {
    const id = String(definition2.identifier).toUpperCase();
    if (!own$3.call(footnoteById, id)) {
      footnoteById[id] = definition2;
    }
  });
  return h2;
  function augment(left, right) {
    if (left && "data" in left && left.data) {
      const data = left.data;
      if (data.hName) {
        if (right.type !== "element") {
          right = {
            type: "element",
            tagName: "",
            properties: {},
            children: []
          };
        }
        right.tagName = data.hName;
      }
      if (right.type === "element" && data.hProperties) {
        right.properties = __spreadValues(__spreadValues({}, right.properties), data.hProperties);
      }
      if ("children" in right && right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }
    if (left) {
      const ctx = "type" in left ? left : { position: left };
      if (!generated(ctx)) {
        right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }
    return right;
  }
  function h2(node, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = {};
    }
    return augment(node, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || []
    });
  }
}
function toHast(tree, options) {
  const h2 = factory(tree, options);
  const node = one(h2, tree, null);
  const foot = footer(h2);
  if (foot) {
    node.children.push(u$1("text", "\n"), foot);
  }
  return Array.isArray(node) ? { type: "root", children: node } : node;
}
const remarkRehype = function(destination, options) {
  return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
};
var remarkRehype$1 = remarkRehype;
function bridge(destination, options) {
  return (node, file, next) => {
    destination.run(toHast(node, options), file, (error) => {
      next(error);
    });
  };
}
function mutate(options) {
  return (node) => toHast(node, options);
}
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
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
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var PropTypes = propTypes.exports;
class Schema {
  constructor(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
      this.space = space;
    }
  }
}
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;
function merge(definitions2, space) {
  const property = {};
  const normal = {};
  let index2 = -1;
  while (++index2 < definitions2.length) {
    Object.assign(property, definitions2[index2].property);
    Object.assign(normal, definitions2[index2].normal);
  }
  return new Schema(property, normal, space);
}
function normalize(value) {
  return value.toLowerCase();
}
class Info {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
}
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
var types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  overloadedBoolean,
  number,
  spaceSeparated,
  commaSeparated,
  commaOrSpaceSeparated
}, Symbol.toStringTag, { value: "Module" }));
const checks = Object.keys(types);
class DefinedInfo extends Info {
  constructor(property, attribute, mask, space) {
    let index2 = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check = checks[index2];
        mark(this, checks[index2], (mask & types[check]) === types[check]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
const own$2 = {}.hasOwnProperty;
function create(definition2) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition2.properties) {
    if (own$2.call(definition2.properties, prop)) {
      const value = definition2.properties[prop];
      const info = new DefinedInfo(prop, definition2.transform(definition2.attributes || {}, prop), value, definition2.space);
      if (definition2.mustUseProperty && definition2.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition2.space);
}
const xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
const xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
const xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});
const aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});
const html$1 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
const svg$1 = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});
const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
const hastToReact = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
};
const html = merge([xml, xlink, xmlns, aria, html$1], "html");
const svg = merge([xml, xlink, xmlns, aria, svg$1], "svg");
function rehypeFilter(options) {
  if (options.allowedElements && options.disallowedElements) {
    throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");
  }
  if (options.allowedElements || options.disallowedElements || options.allowElement) {
    return (tree) => {
      visit$2(tree, "element", (node, index2, parent_) => {
        const parent = parent_;
        let remove;
        if (options.allowedElements) {
          remove = !options.allowedElements.includes(node.tagName);
        } else if (options.disallowedElements) {
          remove = options.disallowedElements.includes(node.tagName);
        }
        if (!remove && options.allowElement && typeof index2 === "number") {
          remove = !options.allowElement(node, index2, parent);
        }
        if (remove && typeof index2 === "number") {
          if (options.unwrapDisallowed && node.children) {
            parent.children.splice(index2, 1, ...node.children);
          } else {
            parent.children.splice(index2, 1);
          }
          return index2;
        }
        return void 0;
      });
    };
  }
}
var reactIs = { exports: {} };
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f$1 = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k$1 = Symbol.for("react.server_context"), l$1 = Symbol.for("react.forward_ref"), m$1 = Symbol.for("react.suspense"), n$1 = Symbol.for("react.suspense_list"), p$1 = Symbol.for("react.memo"), q$1 = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u = Symbol.for("react.module.reference");
function v(a) {
  if (typeof a === "object" && a !== null) {
    var r = a.$$typeof;
    switch (r) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f$1:
          case e:
          case m$1:
          case n$1:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k$1:
              case h:
              case l$1:
              case q$1:
              case p$1:
              case g:
                return a;
              default:
                return r;
            }
        }
      case c:
        return r;
    }
  }
}
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = g;
reactIs_production_min.Element = b;
reactIs_production_min.ForwardRef = l$1;
reactIs_production_min.Fragment = d;
reactIs_production_min.Lazy = q$1;
reactIs_production_min.Memo = p$1;
reactIs_production_min.Portal = c;
reactIs_production_min.Profiler = f$1;
reactIs_production_min.StrictMode = e;
reactIs_production_min.Suspense = m$1;
reactIs_production_min.SuspenseList = n$1;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return v(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return v(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return v(a) === l$1;
};
reactIs_production_min.isFragment = function(a) {
  return v(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return v(a) === q$1;
};
reactIs_production_min.isMemo = function(a) {
  return v(a) === p$1;
};
reactIs_production_min.isPortal = function(a) {
  return v(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return v(a) === f$1;
};
reactIs_production_min.isStrictMode = function(a) {
  return v(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return v(a) === m$1;
};
reactIs_production_min.isSuspenseList = function(a) {
  return v(a) === n$1;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d || a === f$1 || a === e || a === m$1 || a === n$1 || a === t || typeof a === "object" && a !== null && (a.$$typeof === q$1 || a.$$typeof === p$1 || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l$1 || a.$$typeof === u || a.getModuleId !== void 0) ? true : false;
};
reactIs_production_min.typeOf = v;
{
  reactIs.exports = reactIs_production_min;
}
var ReactIs = reactIs.exports;
function whitespace(thing) {
  var value = thing && typeof thing === "object" && thing.type === "text" ? thing.value || "" : thing;
  return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}
function stringify$1(values) {
  return values.join(" ").trim();
}
function stringify(values, options) {
  var settings = options || {};
  if (values[values.length - 1] === "") {
    values = values.concat("");
  }
  return values.join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
var inlineStyleParser = function(style, options) {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style)
    return [];
  options = options || {};
  var lineno = 1;
  var column = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines)
      lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  function position2() {
    var start = { line: lineno, column };
    return function(node) {
      node.position = new Position(start);
      whitespace2();
      return node;
    };
  }
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column };
    this.source = options.source;
  }
  Position.prototype.content = style;
  function error(msg) {
    var err = new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;
    if (options.silent)
      ;
    else {
      throw err;
    }
  }
  function match(re) {
    var m2 = re.exec(style);
    if (!m2)
      return;
    var str = m2[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m2;
  }
  function whitespace2() {
    match(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c2;
    rules = rules || [];
    while (c2 = comment()) {
      if (c2 !== false) {
        rules.push(c2);
      }
    }
    return rules;
  }
  function comment() {
    var pos = position2();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1))
      return;
    var i = 2;
    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }
    i += 2;
    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error("End of comment missing");
    }
    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos = position2();
    var prop = match(PROPERTY_REGEX);
    if (!prop)
      return;
    comment();
    if (!match(COLON_REGEX))
      return error("property missing ':'");
    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace2();
  return declarations();
};
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
var parse$2 = inlineStyleParser;
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== "string") {
    return output;
  }
  var declaration;
  var declarations = parse$2(style);
  var hasIterator = typeof iterator === "function";
  var property;
  var value;
  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }
  return output;
}
var styleToObject = StyleToObject;
const own$1 = {}.hasOwnProperty;
const tableElements = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
function childrenToReact(context, node) {
  const children = [];
  let childIndex = -1;
  let child;
  while (++childIndex < node.children.length) {
    child = node.children[childIndex];
    if (child.type === "element") {
      children.push(toReact(context, child, childIndex, node));
    } else if (child.type === "text") {
      if (node.type !== "element" || !tableElements.has(node.tagName) || !whitespace(child)) {
        children.push(child.value);
      }
    } else if (child.type === "raw" && !context.options.skipHtml) {
      children.push(child.value);
    }
  }
  return children;
}
function toReact(context, node, index2, parent) {
  const options = context.options;
  const parentSchema = context.schema;
  const name = node.tagName;
  const properties = {};
  let schema = parentSchema;
  let property;
  if (parentSchema.space === "html" && name === "svg") {
    schema = svg;
    context.schema = schema;
  }
  if (node.properties) {
    for (property in node.properties) {
      if (own$1.call(node.properties, property)) {
        addProperty(properties, property, node.properties[property], context);
      }
    }
  }
  if (name === "ol" || name === "ul") {
    context.listDepth++;
  }
  const children = childrenToReact(context, node);
  if (name === "ol" || name === "ul") {
    context.listDepth--;
  }
  context.schema = parentSchema;
  const position2 = node.position || {
    start: { line: null, column: null, offset: null },
    end: { line: null, column: null, offset: null }
  };
  const component = options.components && own$1.call(options.components, name) ? options.components[name] : name;
  const basic = typeof component === "string" || component === React.Fragment;
  if (!ReactIs.isValidElementType(component)) {
    throw new TypeError(`Component for name \`${name}\` not defined or is not renderable`);
  }
  properties.key = [
    name,
    position2.start.line,
    position2.start.column,
    index2
  ].join("-");
  if (name === "a" && options.linkTarget) {
    properties.target = typeof options.linkTarget === "function" ? options.linkTarget(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null) : options.linkTarget;
  }
  if (name === "a" && options.transformLinkUri) {
    properties.href = options.transformLinkUri(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null);
  }
  if (!basic && name === "code" && parent.type === "element" && parent.tagName !== "pre") {
    properties.inline = true;
  }
  if (!basic && (name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6")) {
    properties.level = Number.parseInt(name.charAt(1), 10);
  }
  if (name === "img" && options.transformImageUri) {
    properties.src = options.transformImageUri(String(properties.src || ""), String(properties.alt || ""), typeof properties.title === "string" ? properties.title : null);
  }
  if (!basic && name === "li" && parent.type === "element") {
    const input = getInputElement(node);
    properties.checked = input && input.properties ? Boolean(input.properties.checked) : null;
    properties.index = getElementsBeforeCount(parent, node);
    properties.ordered = parent.tagName === "ol";
  }
  if (!basic && (name === "ol" || name === "ul")) {
    properties.ordered = name === "ol";
    properties.depth = context.listDepth;
  }
  if (name === "td" || name === "th") {
    if (properties.align) {
      if (!properties.style)
        properties.style = {};
      properties.style.textAlign = properties.align;
      delete properties.align;
    }
    if (!basic) {
      properties.isHeader = name === "th";
    }
  }
  if (!basic && name === "tr" && parent.type === "element") {
    properties.isHeader = Boolean(parent.tagName === "thead");
  }
  if (options.sourcePos) {
    properties["data-sourcepos"] = flattenPosition(position2);
  }
  if (!basic && options.rawSourcePos) {
    properties.sourcePosition = node.position;
  }
  if (!basic && options.includeElementIndex) {
    properties.index = getElementsBeforeCount(parent, node);
    properties.siblingCount = getElementsBeforeCount(parent);
  }
  if (!basic) {
    properties.node = node;
  }
  return children.length > 0 ? React.createElement(component, properties, children) : React.createElement(component, properties);
}
function getInputElement(node) {
  let index2 = -1;
  while (++index2 < node.children.length) {
    const child = node.children[index2];
    if (child.type === "element" && child.tagName === "input") {
      return child;
    }
  }
  return null;
}
function getElementsBeforeCount(parent, node) {
  let index2 = -1;
  let count = 0;
  while (++index2 < parent.children.length) {
    if (parent.children[index2] === node)
      break;
    if (parent.children[index2].type === "element")
      count++;
  }
  return count;
}
function addProperty(props, prop, value, ctx) {
  const info = find(ctx.schema, prop);
  let result = value;
  if (result === null || result === void 0 || result !== result) {
    return;
  }
  if (Array.isArray(result)) {
    result = info.commaSeparated ? stringify(result) : stringify$1(result);
  }
  if (info.property === "style" && typeof result === "string") {
    result = parseStyle(result);
  }
  if (info.space && info.property) {
    props[own$1.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
  } else if (info.attribute) {
    props[info.attribute] = result;
  }
}
function parseStyle(value) {
  const result = {};
  try {
    styleToObject(value, iterator);
  } catch {
  }
  return result;
  function iterator(name, v2) {
    const k2 = name.slice(0, 4) === "-ms-" ? `ms-${name.slice(4)}` : name;
    result[k2.replace(/-([a-z])/g, styleReplacer)] = v2;
  }
}
function styleReplacer(_, $1) {
  return $1.toUpperCase();
}
function flattenPosition(pos) {
  return [
    pos.start.line,
    ":",
    pos.start.column,
    "-",
    pos.end.line,
    ":",
    pos.end.column
  ].map((d2) => String(d2)).join("");
}
const own = {}.hasOwnProperty;
const changelog = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md";
const deprecated = {
  plugins: { to: "plugins", id: "change-plugins-to-remarkplugins" },
  renderers: { to: "components", id: "change-renderers-to-components" },
  astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
  allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
  escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
  source: { to: "children", id: "change-source-to-children" },
  allowNode: {
    to: "allowElement",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  allowedTypes: {
    to: "allowedElements",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  disallowedTypes: {
    to: "disallowedElements",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  includeNodeIndex: {
    to: "includeElementIndex",
    id: "change-includenodeindex-to-includeelementindex"
  }
};
function ReactMarkdown(options) {
  for (const key in deprecated) {
    if (own.call(deprecated, key) && own.call(options, key)) {
      const deprecation = deprecated[key];
      console.warn(`[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : "remove"} \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`);
      delete deprecated[key];
    }
  }
  const processor = unified().use(remarkParse).use(options.remarkPlugins || []).use(remarkRehype$1, __spreadProps(__spreadValues({}, options.remarkRehypeOptions), {
    allowDangerousHtml: true
  })).use(options.rehypePlugins || []).use(rehypeFilter, options);
  const file = new VFile();
  if (typeof options.children === "string") {
    file.value = options.children;
  } else if (options.children !== void 0 && options.children !== null) {
    console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`);
  }
  const hastNode = processor.runSync(processor.parse(file), file);
  if (hastNode.type !== "root") {
    throw new TypeError("Expected a `root` node");
  }
  let result = React.createElement(React.Fragment, {}, childrenToReact({ options, schema: html, listDepth: 0 }, hastNode));
  if (options.className) {
    result = React.createElement("div", { className: options.className }, result);
  }
  return result;
}
ReactMarkdown.defaultProps = { transformLinkUri: uriTransformer };
ReactMarkdown.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  allowElement: PropTypes.func,
  allowedElements: PropTypes.arrayOf(PropTypes.string),
  disallowedElements: PropTypes.arrayOf(PropTypes.string),
  unwrapDisallowed: PropTypes.bool,
  remarkPlugins: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.any)
    ]))
  ])),
  rehypePlugins: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.any)
    ]))
  ])),
  sourcePos: PropTypes.bool,
  rawSourcePos: PropTypes.bool,
  skipHtml: PropTypes.bool,
  includeElementIndex: PropTypes.bool,
  transformLinkUri: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  linkTarget: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  transformImageUri: PropTypes.func,
  components: PropTypes.object
};
var Loading$1 = "";
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
var f = React, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c2, a, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  g2 !== void 0 && (e2 = "" + g2);
  a.key !== void 0 && (e2 = "" + a.key);
  a.ref !== void 0 && (h2 = a.ref);
  for (b2 in a)
    m.call(a, b2) && !p.hasOwnProperty(b2) && (d2[b2] = a[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a = c2.defaultProps, a)
      d2[b2] === void 0 && (d2[b2] = a[b2]);
  return { $$typeof: k, type: c2, key: e2, ref: h2, props: d2, _owner: n.current };
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
const Loading = (_a) => {
  var _b = _a, {
    className,
    Ref
  } = _b, props = __objRest(_b, [
    "className",
    "Ref"
  ]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
    className: classNames("Loading")
  }, props), {
    ref: Ref,
    children: /* @__PURE__ */ jsxs("div", {
      className: "Container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "Ring"
      }), /* @__PURE__ */ jsx("div", {
        className: "Ring"
      }), /* @__PURE__ */ jsx("div", {
        className: "Ring"
      })]
    })
  }));
};
const Brief = function({
  text: text2
}) {
  return /* @__PURE__ */ jsxs("header", {
    children: ["\u{1F4D6} ", text2]
  });
};
const Toggle = (_c) => {
  var _d = _c, {
    className,
    children,
    Ref
  } = _d, props = __objRest(_d, [
    "className",
    "children",
    "Ref"
  ]);
  return /* @__PURE__ */ jsxs("details", __spreadProps(__spreadValues({
    className: classNames(className)
  }, props), {
    ref: Ref,
    open: true,
    children: [/* @__PURE__ */ jsx("summary", {
      children: /* @__PURE__ */ jsx(MD, {
        children: props.summary
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "Content",
      children
    })]
  }));
};
const MD = (_e) => {
  var _f = _e, {
    className,
    children,
    Ref
  } = _f, props = __objRest(_f, [
    "className",
    "children",
    "Ref"
  ]);
  let content2 = "";
  if (Array.isArray(children))
    for (let i = 0; i < children.length; i++)
      content2 += children[i];
  else
    content2 = children;
  content2 = content2.replaceAll(/\\n/g, "\n");
  return /* @__PURE__ */ jsx(ReactMarkdown, {
    components: {
      code(_a) {
        var _b = _a, {
          node,
          inline,
          className: className2,
          children: children2
        } = _b, props2 = __objRest(_b, [
          "node",
          "inline",
          "className",
          "children"
        ]);
        return /* @__PURE__ */ jsx("code", __spreadProps(__spreadValues({
          className: classNames(className2, "notranslate")
        }, props2), {
          children: children2
        }));
      }
    },
    children: content2
  });
};
const CodeBlock = (_g) => {
  var _h = _g, {
    className,
    Ref,
    code: code2,
    language,
    hl
  } = _h, props = __objRest(_h, [
    "className",
    "Ref",
    "code",
    "language",
    "hl"
  ]);
  const [html2, setHTML] = useState(null);
  useEffect(() => {
    if (hl) {
      const html22 = hl.codeToHtml(code2, {
        lang: language
      });
      setHTML(html22);
    }
  }, [hl]);
  return /* @__PURE__ */ jsx("pre", __spreadProps(__spreadValues({
    className: classNames("language-" + language, className)
  }, props), {
    ref: Ref,
    children: html2 === null || hl == null ? /* @__PURE__ */ jsx(Loading, {}) : /* @__PURE__ */ jsx("code", {
      className: "notranslate",
      dangerouslySetInnerHTML: {
        __html: html2
      }
    })
  }));
};
const Footer = (_i) => {
  var _j = _i, {
    className,
    Ref,
    link: link2,
    children
  } = _j, props = __objRest(_j, [
    "className",
    "Ref",
    "link",
    "children"
  ]);
  return /* @__PURE__ */ jsx("footer", __spreadProps(__spreadValues({
    className: classNames(className)
  }, props), {
    ref: Ref,
    children: link2 ? /* @__PURE__ */ jsx(MD, {
      children: "\u{1F44B} Thanks for read! The chinese version is [here]()."
    }) : children
  }));
};
var main$1 = { exports: {} };
(function(module, exports) {
  !function(t2, n2) {
    module.exports = n2();
  }(commonjsGlobal, function() {
    return t2 = { 770: function(t3, n3, e2) {
      var r = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(n3, "__esModule", { value: true }), n3.setDefaultDebugCall = n3.createOnigScanner = n3.createOnigString = n3.loadWASM = n3.OnigScanner = n3.OnigString = void 0;
      const i = r(e2(418));
      let o = null, a = false;
      class f2 {
        constructor(t4) {
          const n4 = t4.length, e3 = f2._utf8ByteLength(t4), r2 = e3 !== n4, i2 = r2 ? new Uint32Array(n4 + 1) : null;
          r2 && (i2[n4] = e3);
          const o2 = r2 ? new Uint32Array(e3 + 1) : null;
          r2 && (o2[e3] = n4);
          const a2 = new Uint8Array(e3);
          let s2 = 0;
          for (let e4 = 0; e4 < n4; e4++) {
            const f3 = t4.charCodeAt(e4);
            let u3 = f3, c3 = false;
            if (f3 >= 55296 && f3 <= 56319 && e4 + 1 < n4) {
              const n5 = t4.charCodeAt(e4 + 1);
              n5 >= 56320 && n5 <= 57343 && (u3 = 65536 + (f3 - 55296 << 10) | n5 - 56320, c3 = true);
            }
            r2 && (i2[e4] = s2, c3 && (i2[e4 + 1] = s2), u3 <= 127 ? o2[s2 + 0] = e4 : u3 <= 2047 ? (o2[s2 + 0] = e4, o2[s2 + 1] = e4) : u3 <= 65535 ? (o2[s2 + 0] = e4, o2[s2 + 1] = e4, o2[s2 + 2] = e4) : (o2[s2 + 0] = e4, o2[s2 + 1] = e4, o2[s2 + 2] = e4, o2[s2 + 3] = e4)), u3 <= 127 ? a2[s2++] = u3 : u3 <= 2047 ? (a2[s2++] = 192 | (1984 & u3) >>> 6, a2[s2++] = 128 | (63 & u3) >>> 0) : u3 <= 65535 ? (a2[s2++] = 224 | (61440 & u3) >>> 12, a2[s2++] = 128 | (4032 & u3) >>> 6, a2[s2++] = 128 | (63 & u3) >>> 0) : (a2[s2++] = 240 | (1835008 & u3) >>> 18, a2[s2++] = 128 | (258048 & u3) >>> 12, a2[s2++] = 128 | (4032 & u3) >>> 6, a2[s2++] = 128 | (63 & u3) >>> 0), c3 && e4++;
          }
          this.utf16Length = n4, this.utf8Length = e3, this.utf16Value = t4, this.utf8Value = a2, this.utf16OffsetToUtf8 = i2, this.utf8OffsetToUtf16 = o2;
        }
        static _utf8ByteLength(t4) {
          let n4 = 0;
          for (let e3 = 0, r2 = t4.length; e3 < r2; e3++) {
            const i2 = t4.charCodeAt(e3);
            let o2 = i2, a2 = false;
            if (i2 >= 55296 && i2 <= 56319 && e3 + 1 < r2) {
              const n5 = t4.charCodeAt(e3 + 1);
              n5 >= 56320 && n5 <= 57343 && (o2 = 65536 + (i2 - 55296 << 10) | n5 - 56320, a2 = true);
            }
            n4 += o2 <= 127 ? 1 : o2 <= 2047 ? 2 : o2 <= 65535 ? 3 : 4, a2 && e3++;
          }
          return n4;
        }
        createString(t4) {
          const n4 = t4._omalloc(this.utf8Length);
          return t4.HEAPU8.set(this.utf8Value, n4), n4;
        }
      }
      class s {
        constructor(t4) {
          if (this.id = ++s.LAST_ID, !o)
            throw new Error("Must invoke loadWASM first.");
          this._onigBinding = o, this.content = t4;
          const n4 = new f2(t4);
          this.utf16Length = n4.utf16Length, this.utf8Length = n4.utf8Length, this.utf16OffsetToUtf8 = n4.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n4.utf8OffsetToUtf16, this.utf8Length < 1e4 && !s._sharedPtrInUse ? (s._sharedPtr || (s._sharedPtr = o._omalloc(1e4)), s._sharedPtrInUse = true, o.HEAPU8.set(n4.utf8Value, s._sharedPtr), this.ptr = s._sharedPtr) : this.ptr = n4.createString(o);
        }
        convertUtf8OffsetToUtf16(t4) {
          return this.utf8OffsetToUtf16 ? t4 < 0 ? 0 : t4 > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[t4] : t4;
        }
        convertUtf16OffsetToUtf8(t4) {
          return this.utf16OffsetToUtf8 ? t4 < 0 ? 0 : t4 > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[t4] : t4;
        }
        dispose() {
          this.ptr === s._sharedPtr ? s._sharedPtrInUse = false : this._onigBinding._ofree(this.ptr);
        }
      }
      n3.OnigString = s, s.LAST_ID = 0, s._sharedPtr = 0, s._sharedPtrInUse = false;
      class u2 {
        constructor(t4) {
          if (!o)
            throw new Error("Must invoke loadWASM first.");
          const n4 = [], e3 = [];
          for (let r3 = 0, i3 = t4.length; r3 < i3; r3++) {
            const i4 = new f2(t4[r3]);
            n4[r3] = i4.createString(o), e3[r3] = i4.utf8Length;
          }
          const r2 = o._omalloc(4 * t4.length);
          o.HEAPU32.set(n4, r2 / 4);
          const i2 = o._omalloc(4 * t4.length);
          o.HEAPU32.set(e3, i2 / 4);
          const a2 = o._createOnigScanner(r2, i2, t4.length);
          for (let e4 = 0, r3 = t4.length; e4 < r3; e4++)
            o._ofree(n4[e4]);
          o._ofree(i2), o._ofree(r2), a2 === 0 && function(t5) {
            throw new Error(t5.UTF8ToString(t5._getLastOnigError()));
          }(o), this._onigBinding = o, this._ptr = a2;
        }
        dispose() {
          this._onigBinding._freeOnigScanner(this._ptr);
        }
        findNextMatchSync(t4, n4, e3) {
          let r2 = a, i2 = 0;
          if (typeof e3 == "number" ? (8 & e3 && (r2 = true), i2 = e3) : typeof e3 == "boolean" && (r2 = e3), typeof t4 == "string") {
            t4 = new s(t4);
            const e4 = this._findNextMatchSync(t4, n4, r2, i2);
            return t4.dispose(), e4;
          }
          return this._findNextMatchSync(t4, n4, r2, i2);
        }
        _findNextMatchSync(t4, n4, e3, r2) {
          const i2 = this._onigBinding;
          let o2;
          if (o2 = e3 ? i2._findNextOnigScannerMatchDbg(this._ptr, t4.id, t4.ptr, t4.utf8Length, t4.convertUtf16OffsetToUtf8(n4), r2) : i2._findNextOnigScannerMatch(this._ptr, t4.id, t4.ptr, t4.utf8Length, t4.convertUtf16OffsetToUtf8(n4), r2), o2 === 0)
            return null;
          const a2 = i2.HEAPU32;
          let f3 = o2 / 4;
          const s2 = a2[f3++], u3 = a2[f3++];
          let c3 = [];
          for (let n5 = 0; n5 < u3; n5++) {
            const e4 = t4.convertUtf8OffsetToUtf16(a2[f3++]), r3 = t4.convertUtf8OffsetToUtf16(a2[f3++]);
            c3[n5] = { start: e4, end: r3, length: r3 - e4 };
          }
          return { index: s2, captureIndices: c3 };
        }
      }
      n3.OnigScanner = u2;
      let c2 = false, l2 = null;
      n3.loadWASM = function(t4) {
        if (c2)
          return l2;
        let n4, e3, r2, a2;
        if (c2 = true, function(t5) {
          return typeof t5.instantiator == "function";
        }(t4))
          n4 = t4.instantiator, e3 = t4.print;
        else {
          let r3;
          !function(t5) {
            return t5.data !== void 0;
          }(t4) ? r3 = t4 : (r3 = t4.data, e3 = t4.print), n4 = function(t5) {
            return typeof Response != "undefined" && t5 instanceof Response;
          }(r3) ? typeof WebAssembly.instantiateStreaming == "function" ? function(t5) {
            return (n5) => WebAssembly.instantiateStreaming(t5, n5);
          }(r3) : function(t5) {
            return async (n5) => {
              const e4 = await t5.arrayBuffer();
              return WebAssembly.instantiate(e4, n5);
            };
          }(r3) : function(t5) {
            return (n5) => WebAssembly.instantiate(t5, n5);
          }(r3);
        }
        return l2 = new Promise((t5, n5) => {
          r2 = t5, a2 = n5;
        }), function(t5, n5, e4, r3) {
          i.default({ print: n5, instantiateWasm: (n6, e5) => {
            if (typeof performance == "undefined") {
              const t6 = () => Date.now();
              n6.env.emscripten_get_now = t6, n6.wasi_snapshot_preview1.emscripten_get_now = t6;
            }
            return t5(n6).then((t6) => e5(t6.instance), r3), {};
          } }).then((t6) => {
            o = t6, e4();
          });
        }(n4, e3, r2, a2), l2;
      }, n3.createOnigString = function(t4) {
        return new s(t4);
      }, n3.createOnigScanner = function(t4) {
        return new u2(t4);
      }, n3.setDefaultDebugCall = function(t4) {
        a = t4;
      };
    }, 418: (t3) => {
      var n3 = (typeof document != "undefined" && document.currentScript && document.currentScript.src, function(t4) {
        var n4, e2, r = (t4 = t4 || {}) !== void 0 ? t4 : {};
        r.ready = new Promise(function(t5, r2) {
          n4 = t5, e2 = r2;
        });
        var i, o = {};
        for (i in r)
          r.hasOwnProperty(i) && (o[i] = r[i]);
        var a, u2 = false, l2 = "";
        function p2(t5) {
          return r.locateFile ? r.locateFile(t5, l2) : l2 + t5;
        }
        a = function(t5) {
          var n5;
          return typeof readbuffer == "function" ? new Uint8Array(readbuffer(t5)) : (v2(typeof (n5 = read(t5, "binary")) == "object"), n5);
        }, typeof scriptArgs != "undefined" ? scriptArgs : arguments !== void 0 && arguments, typeof onig_print != "undefined" && (typeof console == "undefined" && (console = {}), console.log = onig_print, console.warn = console.error = typeof printErr != "undefined" ? printErr : onig_print);
        var h2 = r.print || console.log.bind(console), d2 = r.printErr || console.warn.bind(console);
        for (i in o)
          o.hasOwnProperty(i) && (r[i] = o[i]);
        o = null, r.arguments && r.arguments, r.thisProgram && r.thisProgram, r.quit && r.quit;
        var g2, _;
        r.wasmBinary && (g2 = r.wasmBinary), r.noExitRuntime, typeof WebAssembly != "object" && z("no native wasm support detected");
        var y = false;
        function v2(t5, n5) {
          t5 || z("Assertion failed: " + n5);
        }
        var w, S, A, b2 = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
        function O(t5, n5, e3) {
          for (var r2 = n5 + e3, i2 = n5; t5[i2] && !(i2 >= r2); )
            ++i2;
          if (i2 - n5 > 16 && t5.subarray && b2)
            return b2.decode(t5.subarray(n5, i2));
          for (var o2 = ""; n5 < i2; ) {
            var a2 = t5[n5++];
            if (128 & a2) {
              var f2 = 63 & t5[n5++];
              if ((224 & a2) != 192) {
                var s = 63 & t5[n5++];
                if ((a2 = (240 & a2) == 224 ? (15 & a2) << 12 | f2 << 6 | s : (7 & a2) << 18 | f2 << 12 | s << 6 | 63 & t5[n5++]) < 65536)
                  o2 += String.fromCharCode(a2);
                else {
                  var u3 = a2 - 65536;
                  o2 += String.fromCharCode(55296 | u3 >> 10, 56320 | 1023 & u3);
                }
              } else
                o2 += String.fromCharCode((31 & a2) << 6 | f2);
            } else
              o2 += String.fromCharCode(a2);
          }
          return o2;
        }
        function U(t5, n5) {
          return t5 ? O(S, t5, n5) : "";
        }
        function x(t5, n5) {
          return t5 % n5 > 0 && (t5 += n5 - t5 % n5), t5;
        }
        function P(t5) {
          w = t5, r.HEAP8 = new Int8Array(t5), r.HEAP16 = new Int16Array(t5), r.HEAP32 = A = new Int32Array(t5), r.HEAPU8 = S = new Uint8Array(t5), r.HEAPU16 = new Uint16Array(t5), r.HEAPU32 = new Uint32Array(t5), r.HEAPF32 = new Float32Array(t5), r.HEAPF64 = new Float64Array(t5);
        }
        typeof TextDecoder != "undefined" && new TextDecoder("utf-16le"), r.INITIAL_MEMORY;
        var T, R = [], E = [], M = [], L = [];
        function I() {
          if (r.preRun)
            for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; )
              N(r.preRun.shift());
          $(R);
        }
        function D() {
          $(E);
        }
        function W() {
          $(M);
        }
        function C() {
          if (r.postRun)
            for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; )
              k2(r.postRun.shift());
          $(L);
        }
        function N(t5) {
          R.unshift(t5);
        }
        function k2(t5) {
          L.unshift(t5);
        }
        E.push({ func: function() {
          ut();
        } });
        var B = 0, j = null;
        function F(t5) {
          B++, r.monitorRunDependencies && r.monitorRunDependencies(B);
        }
        function V(t5) {
          if (B--, r.monitorRunDependencies && r.monitorRunDependencies(B), B == 0 && j) {
            var n5 = j;
            j = null, n5();
          }
        }
        function z(t5) {
          r.onAbort && r.onAbort(t5), d2(t5 += ""), y = true, t5 = "abort(" + t5 + "). Build with -s ASSERTIONS=1 for more info.";
          var n5 = new WebAssembly.RuntimeError(t5);
          throw e2(n5), n5;
        }
        function q2(t5, n5) {
          return String.prototype.startsWith ? t5.startsWith(n5) : t5.indexOf(n5) === 0;
        }
        r.preloadedImages = {}, r.preloadedAudios = {};
        var Y = "data:application/octet-stream;base64,";
        function G(t5) {
          return q2(t5, Y);
        }
        var J, K = "onig.wasm";
        function Q(t5) {
          try {
            if (t5 == K && g2)
              return new Uint8Array(g2);
            if (a)
              return a(t5);
            throw "both async and sync fetching of the wasm failed";
          } catch (t6) {
            z(t6);
          }
        }
        function X() {
          return g2 || !u2 || typeof fetch != "function" ? Promise.resolve().then(function() {
            return Q(K);
          }) : fetch(K, { credentials: "same-origin" }).then(function(t5) {
            if (!t5.ok)
              throw "failed to load wasm binary file at '" + K + "'";
            return t5.arrayBuffer();
          }).catch(function() {
            return Q(K);
          });
        }
        function Z() {
          var t5 = { env: st, wasi_snapshot_preview1: st };
          function n5(t6, n6) {
            var e3 = t6.exports;
            r.asm = e3, P((_ = r.asm.memory).buffer), T = r.asm.__indirect_function_table, V();
          }
          function i2(t6) {
            n5(t6.instance);
          }
          function o2(n6) {
            return X().then(function(n7) {
              return WebAssembly.instantiate(n7, t5);
            }).then(n6, function(t6) {
              d2("failed to asynchronously prepare wasm: " + t6), z(t6);
            });
          }
          if (F(), r.instantiateWasm)
            try {
              return r.instantiateWasm(t5, n5);
            } catch (t6) {
              return d2("Module.instantiateWasm callback failed with error: " + t6), false;
            }
          return (g2 || typeof WebAssembly.instantiateStreaming != "function" || G(K) || typeof fetch != "function" ? o2(i2) : fetch(K, { credentials: "same-origin" }).then(function(n6) {
            return WebAssembly.instantiateStreaming(n6, t5).then(i2, function(t6) {
              return d2("wasm streaming compile failed: " + t6), d2("falling back to ArrayBuffer instantiation"), o2(i2);
            });
          })).catch(e2), {};
        }
        function $(t5) {
          for (; t5.length > 0; ) {
            var n5 = t5.shift();
            if (typeof n5 != "function") {
              var e3 = n5.func;
              typeof e3 == "number" ? n5.arg === void 0 ? T.get(e3)() : T.get(e3)(n5.arg) : e3(n5.arg === void 0 ? null : n5.arg);
            } else
              n5(r);
          }
        }
        function tt(t5, n5, e3) {
          S.copyWithin(t5, n5, n5 + e3);
        }
        function nt() {
          return S.length;
        }
        function et(t5) {
          try {
            return _.grow(t5 - w.byteLength + 65535 >>> 16), P(_.buffer), 1;
          } catch (t6) {
          }
        }
        function rt(t5) {
          var n5 = nt(), e3 = 2147483648;
          if (t5 > e3)
            return false;
          for (var r2 = 1; r2 <= 4; r2 *= 2) {
            var i2 = n5 * (1 + 0.2 / r2);
            if (i2 = Math.min(i2, t5 + 100663296), et(Math.min(e3, x(Math.max(t5, i2), 65536))))
              return true;
          }
          return false;
        }
        G(K) || (K = p2(K)), J = typeof dateNow != "undefined" ? dateNow : function() {
          return performance.now();
        };
        var it = { mappings: {}, buffers: [null, [], []], printChar: function(t5, n5) {
          var e3 = it.buffers[t5];
          n5 === 0 || n5 === 10 ? ((t5 === 1 ? h2 : d2)(O(e3, 0)), e3.length = 0) : e3.push(n5);
        }, varargs: void 0, get: function() {
          return it.varargs += 4, A[it.varargs - 4 >> 2];
        }, getStr: function(t5) {
          return U(t5);
        }, get64: function(t5, n5) {
          return t5;
        } };
        function ot(t5, n5, e3, r2) {
          for (var i2 = 0, o2 = 0; o2 < e3; o2++) {
            for (var a2 = A[n5 + 8 * o2 >> 2], f2 = A[n5 + (8 * o2 + 4) >> 2], s = 0; s < f2; s++)
              it.printChar(t5, S[a2 + s]);
            i2 += f2;
          }
          return A[r2 >> 2] = i2, 0;
        }
        function at(t5) {
        }
        var ft, st = { emscripten_get_now: J, emscripten_memcpy_big: tt, emscripten_resize_heap: rt, fd_write: ot, setTempRet0: at }, ut = (Z(), r.___wasm_call_ctors = function() {
          return (ut = r.___wasm_call_ctors = r.asm.__wasm_call_ctors).apply(null, arguments);
        });
        function ct(t5) {
          function e3() {
            ft || (ft = true, r.calledRun = true, y || (D(), W(), n4(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), C()));
          }
          B > 0 || (I(), B > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              r.setStatus("");
            }, 1), e3();
          }, 1)) : e3()));
        }
        if (r.___errno_location = function() {
          return (r.___errno_location = r.asm.__errno_location).apply(null, arguments);
        }, r._omalloc = function() {
          return (r._omalloc = r.asm.omalloc).apply(null, arguments);
        }, r._ofree = function() {
          return (r._ofree = r.asm.ofree).apply(null, arguments);
        }, r._getLastOnigError = function() {
          return (r._getLastOnigError = r.asm.getLastOnigError).apply(null, arguments);
        }, r._createOnigScanner = function() {
          return (r._createOnigScanner = r.asm.createOnigScanner).apply(null, arguments);
        }, r._freeOnigScanner = function() {
          return (r._freeOnigScanner = r.asm.freeOnigScanner).apply(null, arguments);
        }, r._findNextOnigScannerMatch = function() {
          return (r._findNextOnigScannerMatch = r.asm.findNextOnigScannerMatch).apply(null, arguments);
        }, r._findNextOnigScannerMatchDbg = function() {
          return (r._findNextOnigScannerMatchDbg = r.asm.findNextOnigScannerMatchDbg).apply(null, arguments);
        }, r.stackSave = function() {
          return (r.stackSave = r.asm.stackSave).apply(null, arguments);
        }, r.stackRestore = function() {
          return (r.stackRestore = r.asm.stackRestore).apply(null, arguments);
        }, r.stackAlloc = function() {
          return (r.stackAlloc = r.asm.stackAlloc).apply(null, arguments);
        }, r.dynCall_jiji = function() {
          return (r.dynCall_jiji = r.asm.dynCall_jiji).apply(null, arguments);
        }, r.UTF8ToString = U, j = function t5() {
          ft || ct(), ft || (j = t5);
        }, r.run = ct, r.preInit)
          for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; )
            r.preInit.pop()();
        return ct(), t4.ready;
      });
      t3.exports = n3;
    } }, n2 = {}, function e2(r) {
      var i = n2[r];
      if (i !== void 0)
        return i.exports;
      var o = n2[r] = { exports: {} };
      return t2[r].call(o.exports, o, o.exports, e2), o.exports;
    }(770);
    var t2, n2;
  });
})(main$1);
var main = { exports: {} };
(function(module, exports) {
  !function(e2, t2) {
    module.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2) {
      var t2 = {};
      function n2(r) {
        if (t2[r])
          return t2[r].exports;
        var i = t2[r] = { i: r, l: false, exports: {} };
        return e2[r].call(i.exports, i, i.exports, n2), i.l = true, i.exports;
      }
      return n2.m = e2, n2.c = t2, n2.d = function(e3, t3, r) {
        n2.o(e3, t3) || Object.defineProperty(e3, t3, { enumerable: true, get: r });
      }, n2.r = function(e3) {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
      }, n2.t = function(e3, t3) {
        if (1 & t3 && (e3 = n2(e3)), 8 & t3)
          return e3;
        if (4 & t3 && typeof e3 == "object" && e3 && e3.__esModule)
          return e3;
        var r = /* @__PURE__ */ Object.create(null);
        if (n2.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e3 }), 2 & t3 && typeof e3 != "string")
          for (var i in e3)
            n2.d(r, i, function(t4) {
              return e3[t4];
            }.bind(null, i));
        return r;
      }, n2.n = function(e3) {
        var t3 = e3 && e3.__esModule ? function() {
          return e3.default;
        } : function() {
          return e3;
        };
        return n2.d(t3, "a", t3), t3;
      }, n2.o = function(e3, t3) {
        return Object.prototype.hasOwnProperty.call(e3, t3);
      }, n2.p = "", n2(n2.s = 3);
    }([function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r = n2(1), i = n2(5), o = n2(6), s = n2(2), a = typeof performance == "undefined" ? function() {
        return Date.now();
      } : function() {
        return performance.now();
      };
      t2.createGrammar = function(e3, t3, n3, r2, i2, o2) {
        return new v2(e3, t3, n3, r2, i2, o2);
      };
      var c2 = function(e3) {
        this.scopeName = e3;
      };
      t2.FullScopeDependency = c2;
      var u2 = function() {
        function e3(e4, t3) {
          this.scopeName = e4, this.include = t3;
        }
        return e3.prototype.toKey = function() {
          return this.scopeName + "#" + this.include;
        }, e3;
      }();
      t2.PartialScopeDependency = u2;
      var l2 = function() {
        function e3() {
          this.full = [], this.partial = [], this.visitedRule = /* @__PURE__ */ new Set(), this._seenFull = /* @__PURE__ */ new Set(), this._seenPartial = /* @__PURE__ */ new Set();
        }
        return e3.prototype.add = function(e4) {
          e4 instanceof c2 ? this._seenFull.has(e4.scopeName) || (this._seenFull.add(e4.scopeName), this.full.push(e4)) : this._seenPartial.has(e4.toKey()) || (this._seenPartial.add(e4.toKey()), this.partial.push(e4));
        }, e3;
      }();
      function h2(e3, t3, n3, i2, o2) {
        for (var s2 = 0, a2 = i2; s2 < a2.length; s2++) {
          var l3 = a2[s2];
          if (!e3.visitedRule.has(l3)) {
            e3.visitedRule.add(l3);
            var d3 = l3.repository ? r.mergeObjects({}, o2, l3.repository) : o2;
            Array.isArray(l3.patterns) && h2(e3, t3, n3, l3.patterns, d3);
            var g3 = l3.include;
            if (g3)
              if (g3 === "$base" || g3 === t3.scopeName)
                f2(e3, t3, t3);
              else if (g3 === "$self" || g3 === n3.scopeName)
                f2(e3, t3, n3);
              else if (g3.charAt(0) === "#")
                p2(e3, t3, n3, g3.substring(1), d3);
              else {
                var m3 = g3.indexOf("#");
                if (m3 >= 0) {
                  var _2 = g3.substring(0, m3), y2 = g3.substring(m3 + 1);
                  _2 === t3.scopeName ? p2(e3, t3, t3, y2, d3) : _2 === n3.scopeName ? p2(e3, t3, n3, y2, d3) : e3.add(new u2(_2, g3.substring(m3 + 1)));
                } else
                  e3.add(new c2(g3));
              }
          }
        }
      }
      function p2(e3, t3, n3, r2, i2) {
        (i2 === void 0 && (i2 = n3.repository), i2 && i2[r2]) && h2(e3, t3, n3, [i2[r2]], i2);
      }
      function f2(e3, t3, n3) {
        if (n3.patterns && Array.isArray(n3.patterns) && h2(e3, t3, n3, n3.patterns, n3.repository), n3.injections) {
          var r2 = [];
          for (var i2 in n3.injections)
            r2.push(n3.injections[i2]);
          h2(e3, t3, n3, r2, n3.repository);
        }
      }
      function d2(e3, t3) {
        if (!e3)
          return false;
        if (e3 === t3)
          return true;
        var n3 = t3.length;
        return e3.length > n3 && e3.substr(0, n3) === t3 && e3[n3] === ".";
      }
      function g2(e3, t3) {
        if (t3.length < e3.length)
          return false;
        var n3 = 0;
        return e3.every(function(e4) {
          for (var r2 = n3; r2 < t3.length; r2++)
            if (d2(t3[r2], e4))
              return n3 = r2 + 1, true;
          return false;
        });
      }
      function m2(e3, t3, n3, r2, s2) {
        for (var a2 = o.createMatchers(t3, g2), c3 = i.RuleFactory.getCompiledRuleId(n3, r2, s2.repository), u3 = 0, l3 = a2; u3 < l3.length; u3++) {
          var h3 = l3[u3];
          e3.push({ matcher: h3.matcher, ruleId: c3, grammar: s2, priority: h3.priority });
        }
      }
      t2.ScopeDependencyCollector = l2, t2.collectSpecificDependencies = p2, t2.collectDependencies = f2;
      var _ = function(e3, t3, n3, r2) {
        this.scopeName = e3, this.languageId = t3, this.tokenType = n3, this.themeData = r2;
      };
      t2.ScopeMetadata = _;
      var y = function() {
        function e3(t3, n3, r2) {
          if (this._initialLanguage = t3, this._themeProvider = n3, this._cache = /* @__PURE__ */ new Map(), this._defaultMetaData = new _("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]), this._embeddedLanguages = /* @__PURE__ */ Object.create(null), r2)
            for (var i2 = Object.keys(r2), o2 = 0, s2 = i2.length; o2 < s2; o2++) {
              var a2 = i2[o2], c3 = r2[a2];
              typeof c3 == "number" && c3 !== 0 ? this._embeddedLanguages[a2] = c3 : console.warn("Invalid embedded language found at scope " + a2 + ": <<" + c3 + ">>");
            }
          var u3 = Object.keys(this._embeddedLanguages).map(function(t4) {
            return e3._escapeRegExpCharacters(t4);
          });
          u3.length === 0 ? this._embeddedLanguagesRegex = null : (u3.sort(), u3.reverse(), this._embeddedLanguagesRegex = new RegExp("^((" + u3.join(")|(") + "))($|\\.)", ""));
        }
        return e3.prototype.onDidChangeTheme = function() {
          this._cache = /* @__PURE__ */ new Map(), this._defaultMetaData = new _("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]);
        }, e3.prototype.getDefaultMetadata = function() {
          return this._defaultMetaData;
        }, e3._escapeRegExpCharacters = function(e4) {
          return e4.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
        }, e3.prototype.getMetadataForScope = function(t3) {
          if (t3 === null)
            return e3._NULL_SCOPE_METADATA;
          var n3 = this._cache.get(t3);
          return n3 || (n3 = this._doGetMetadataForScope(t3), this._cache.set(t3, n3), n3);
        }, e3.prototype._doGetMetadataForScope = function(e4) {
          var t3 = this._scopeToLanguage(e4), n3 = this._toStandardTokenType(e4), r2 = this._themeProvider.themeMatch(e4);
          return new _(e4, t3, n3, r2);
        }, e3.prototype._scopeToLanguage = function(e4) {
          if (!e4)
            return 0;
          if (!this._embeddedLanguagesRegex)
            return 0;
          var t3 = e4.match(this._embeddedLanguagesRegex);
          if (!t3)
            return 0;
          var n3 = this._embeddedLanguages[t3[1]] || 0;
          return n3 || 0;
        }, e3.prototype._toStandardTokenType = function(t3) {
          var n3 = t3.match(e3.STANDARD_TOKEN_TYPE_REGEXP);
          if (!n3)
            return 0;
          switch (n3[1]) {
            case "comment":
              return 1;
            case "string":
              return 2;
            case "regex":
              return 4;
            case "meta.embedded":
              return 8;
          }
          throw new Error("Unexpected match for standard token type!");
        }, e3._NULL_SCOPE_METADATA = new _("", 0, 0, null), e3.STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/, e3;
      }(), v2 = function() {
        function e3(e4, t3, n3, r2, i2, s2) {
          if (this._scopeMetadataProvider = new y(t3, i2, n3), this._onigLib = s2, this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = i2, this._grammar = C(e4, null), this._injections = null, this._tokenTypeMatchers = [], r2)
            for (var a2 = 0, c3 = Object.keys(r2); a2 < c3.length; a2++)
              for (var u3 = c3[a2], l3 = 0, h3 = o.createMatchers(u3, g2); l3 < h3.length; l3++) {
                var p3 = h3[l3];
                this._tokenTypeMatchers.push({ matcher: p3.matcher, type: r2[u3] });
              }
        }
        return e3.prototype.dispose = function() {
          for (var e4 = 0, t3 = this._ruleId2desc; e4 < t3.length; e4++) {
            var n3 = t3[e4];
            n3 && n3.dispose();
          }
        }, e3.prototype.createOnigScanner = function(e4) {
          return this._onigLib.createOnigScanner(e4);
        }, e3.prototype.createOnigString = function(e4) {
          return this._onigLib.createOnigString(e4);
        }, e3.prototype.onDidChangeTheme = function() {
          this._scopeMetadataProvider.onDidChangeTheme();
        }, e3.prototype.getMetadataForScope = function(e4) {
          return this._scopeMetadataProvider.getMetadataForScope(e4);
        }, e3.prototype.getInjections = function() {
          var e4 = this;
          if (this._injections === null) {
            this._injections = [];
            var t3 = this._grammar.injections;
            if (t3)
              for (var n3 in t3)
                m2(this._injections, n3, t3[n3], this, this._grammar);
            if (this._grammarRepository) {
              var r2 = this._grammarRepository.injections(this._grammar.scopeName);
              r2 && r2.forEach(function(t4) {
                var n4 = e4.getExternalGrammar(t4);
                if (n4) {
                  var r3 = n4.injectionSelector;
                  r3 && m2(e4._injections, r3, n4, e4, n4);
                }
              });
            }
            this._injections.sort(function(e5, t4) {
              return e5.priority - t4.priority;
            });
          }
          return this._injections;
        }, e3.prototype.registerRule = function(e4) {
          var t3 = ++this._lastRuleId, n3 = e4(t3);
          return this._ruleId2desc[t3] = n3, n3;
        }, e3.prototype.getRule = function(e4) {
          return this._ruleId2desc[e4];
        }, e3.prototype.getExternalGrammar = function(e4, t3) {
          if (this._includedGrammars[e4])
            return this._includedGrammars[e4];
          if (this._grammarRepository) {
            var n3 = this._grammarRepository.lookup(e4);
            if (n3)
              return this._includedGrammars[e4] = C(n3, t3 && t3.$base), this._includedGrammars[e4];
          }
          return null;
        }, e3.prototype.tokenizeLine = function(e4, t3) {
          var n3 = this._tokenize(e4, t3, false);
          return { tokens: n3.lineTokens.getResult(n3.ruleStack, n3.lineLength), ruleStack: n3.ruleStack };
        }, e3.prototype.tokenizeLine2 = function(e4, t3) {
          var n3 = this._tokenize(e4, t3, true);
          return { tokens: n3.lineTokens.getBinaryResult(n3.ruleStack, n3.lineLength), ruleStack: n3.ruleStack };
        }, e3.prototype._tokenize = function(e4, t3, n3) {
          var r2;
          if (this._rootId === -1 && (this._rootId = i.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository)), t3 && t3 !== I.NULL)
            r2 = false, t3.reset();
          else {
            r2 = true;
            var o2 = this._scopeMetadataProvider.getDefaultMetadata(), s2 = o2.themeData[0], a2 = P.set(0, o2.languageId, o2.tokenType, s2.fontStyle, s2.foreground, s2.background), c3 = this.getRule(this._rootId).getName(null, null), u3 = this._scopeMetadataProvider.getMetadataForScope(c3), l3 = x.mergeMetadata(a2, null, u3), h3 = new x(null, c3 === null ? "unknown" : c3, l3);
            t3 = new I(null, this._rootId, -1, -1, false, null, h3, h3);
          }
          e4 += "\n";
          var p3 = this.createOnigString(e4), f3 = p3.content.length, d3 = new T(n3, e4, this._tokenTypeMatchers), g3 = S(this, p3, r2, 0, t3, d3, true);
          return b2(p3), { lineLength: f3, lineTokens: d3, ruleStack: g3 };
        }, e3;
      }();
      function b2(e3) {
        typeof e3.dispose == "function" && e3.dispose();
      }
      function C(e3, t3) {
        return (e3 = r.clone(e3)).repository = e3.repository || {}, e3.repository.$self = { $vscodeTextmateLocation: e3.$vscodeTextmateLocation, patterns: e3.patterns, name: e3.scopeName }, e3.repository.$base = t3 || e3.repository.$self, e3;
      }
      function w(e3, t3, n3, r2, i2, o2, s2) {
        if (o2.length !== 0) {
          for (var a2 = t3.content, c3 = Math.min(o2.length, s2.length), u3 = [], l3 = s2[0].end, h3 = 0; h3 < c3; h3++) {
            var p3 = o2[h3];
            if (p3 !== null) {
              var f3 = s2[h3];
              if (f3.length !== 0) {
                if (f3.start > l3)
                  break;
                for (; u3.length > 0 && u3[u3.length - 1].endPos <= f3.start; )
                  i2.produceFromScopes(u3[u3.length - 1].scopes, u3[u3.length - 1].endPos), u3.pop();
                if (u3.length > 0 ? i2.produceFromScopes(u3[u3.length - 1].scopes, f3.start) : i2.produce(r2, f3.start), p3.retokenizeCapturedWithRuleId) {
                  var d3 = p3.getName(a2, s2), g3 = r2.contentNameScopesList.push(e3, d3), m3 = p3.getContentName(a2, s2), _2 = g3.push(e3, m3), y2 = r2.push(p3.retokenizeCapturedWithRuleId, f3.start, -1, false, null, g3, _2), v3 = e3.createOnigString(a2.substring(0, f3.end));
                  S(e3, v3, n3 && f3.start === 0, f3.start, y2, i2, false), b2(v3);
                } else {
                  var C2 = p3.getName(a2, s2);
                  if (C2 !== null) {
                    var w2 = (u3.length > 0 ? u3[u3.length - 1].scopes : r2.contentNameScopesList).push(e3, C2);
                    u3.push(new A(w2, f3.end));
                  }
                }
              }
            }
          }
          for (; u3.length > 0; )
            i2.produceFromScopes(u3[u3.length - 1].scopes, u3[u3.length - 1].endPos), u3.pop();
        }
      }
      function k2(e3) {
        for (var t3 = [], n3 = 0, r2 = e3.rules.length; n3 < r2; n3++)
          t3.push("   - " + e3.rules[n3] + ": " + e3.debugRegExps[n3]);
        return t3.join("\n");
      }
      function R(e3, t3, n3, r2, i2, o2) {
        var c3 = function(e4, t4, n4, r3, i3, o3) {
          var c4 = i3.getRule(e4), u4 = c4.compile(e4, i3.endRule, n4, r3 === o3), l4 = 0;
          s.DebugFlags.InDebugMode && (l4 = a());
          var h4 = u4.scanner.findNextMatchSync(t4, r3);
          if (s.DebugFlags.InDebugMode) {
            var p4 = a() - l4;
            p4 > 5 && console.warn("Rule " + c4.debugName + " (" + c4.id + ") matching took " + p4 + " against '" + t4 + "'"), h4 && console.log("matched rule id: " + u4.rules[h4.index] + " from " + h4.captureIndices[0].start + " to " + h4.captureIndices[0].end);
          }
          return h4 ? { captureIndices: h4.captureIndices, matchedRuleId: u4.rules[h4.index] } : null;
        }(e3, t3, n3, r2, i2, o2), u3 = e3.getInjections();
        if (u3.length === 0)
          return c3;
        var l3 = function(e4, t4, n4, r3, i3, o3, a2) {
          for (var c4, u4 = Number.MAX_VALUE, l4 = null, h4 = 0, p4 = o3.contentNameScopesList.generateScopes(), f3 = 0, d3 = e4.length; f3 < d3; f3++) {
            var g3 = e4[f3];
            if (g3.matcher(p4)) {
              var m3 = t4.getRule(g3.ruleId).compile(t4, null, r3, i3 === a2), _2 = m3.scanner.findNextMatchSync(n4, i3);
              if (s.DebugFlags.InDebugMode && (console.log("  scanning for injections"), console.log(k2(m3))), _2) {
                var y2 = _2.captureIndices[0].start;
                if (!(y2 >= u4) && (u4 = y2, l4 = _2.captureIndices, c4 = m3.rules[_2.index], h4 = g3.priority, u4 === i3))
                  break;
              }
            }
          }
          return l4 ? { priorityMatch: h4 === -1, captureIndices: l4, matchedRuleId: c4 } : null;
        }(u3, e3, t3, n3, r2, i2, o2);
        if (!l3)
          return c3;
        if (!c3)
          return l3;
        var h3 = c3.captureIndices[0].start, p3 = l3.captureIndices[0].start;
        return p3 < h3 || l3.priorityMatch && p3 === h3 ? l3 : c3;
      }
      function S(e3, t3, n3, r2, o2, a2, c3) {
        var u3 = t3.content.length, l3 = false, h3 = -1;
        if (c3) {
          var p3 = function(e4, t4, n4, r3, o3, a3) {
            for (var c4 = o3.beginRuleCapturedEOL ? 0 : -1, u4 = [], l4 = o3; l4; l4 = l4.pop()) {
              var h4 = l4.getRule(e4);
              h4 instanceof i.BeginWhileRule && u4.push({ rule: h4, stack: l4 });
            }
            for (var p4 = u4.pop(); p4; p4 = u4.pop()) {
              var f4 = p4.rule.compileWhile(e4, p4.stack.endRule, n4, c4 === r3), d3 = f4.scanner.findNextMatchSync(t4, r3);
              if (s.DebugFlags.InDebugMode && (console.log("  scanning for while rule"), console.log(k2(f4))), !d3) {
                s.DebugFlags.InDebugMode && console.log("  popping " + p4.rule.debugName + " - " + p4.rule.debugWhileRegExp), o3 = p4.stack.pop();
                break;
              }
              if (f4.rules[d3.index] !== -2) {
                o3 = p4.stack.pop();
                break;
              }
              d3.captureIndices && d3.captureIndices.length && (a3.produce(p4.stack, d3.captureIndices[0].start), w(e4, t4, n4, p4.stack, a3, p4.rule.whileCaptures, d3.captureIndices), a3.produce(p4.stack, d3.captureIndices[0].end), c4 = d3.captureIndices[0].end, d3.captureIndices[0].end > r3 && (r3 = d3.captureIndices[0].end, n4 = false));
            }
            return { stack: o3, linePos: r3, anchorPosition: c4, isFirstLine: n4 };
          }(e3, t3, n3, r2, o2, a2);
          o2 = p3.stack, r2 = p3.linePos, n3 = p3.isFirstLine, h3 = p3.anchorPosition;
        }
        for (; !l3; )
          f3();
        function f3() {
          s.DebugFlags.InDebugMode && (console.log(""), console.log("@@scanNext " + r2 + ": |" + t3.content.substr(r2).replace(/\n$/, "\\n") + "|"));
          var c4 = R(e3, t3, n3, r2, o2, h3);
          if (!c4)
            return s.DebugFlags.InDebugMode && console.log("  no more matches."), a2.produce(o2, u3), void (l3 = true);
          var p4 = c4.captureIndices, f4 = c4.matchedRuleId, d3 = !!(p4 && p4.length > 0) && p4[0].end > r2;
          if (f4 === -1) {
            var g3 = o2.getRule(e3);
            s.DebugFlags.InDebugMode && console.log("  popping " + g3.debugName + " - " + g3.debugEndRegExp), a2.produce(o2, p4[0].start), o2 = o2.setContentNameScopesList(o2.nameScopesList), w(e3, t3, n3, o2, a2, g3.endCaptures, p4), a2.produce(o2, p4[0].end);
            var m3 = o2;
            if (o2 = o2.pop(), h3 = m3.getAnchorPos(), !d3 && m3.getEnterPos() === r2)
              return s.DebugFlags.InDebugMode && console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing"), o2 = m3, a2.produce(o2, u3), void (l3 = true);
          } else {
            var _2 = e3.getRule(f4);
            a2.produce(o2, p4[0].start);
            var y2 = o2, v3 = _2.getName(t3.content, p4), b3 = o2.contentNameScopesList.push(e3, v3);
            if (o2 = o2.push(f4, r2, h3, p4[0].end === u3, null, b3, b3), _2 instanceof i.BeginEndRule) {
              var C2 = _2;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C2.debugName + " - " + C2.debugBeginRegExp), w(e3, t3, n3, o2, a2, C2.beginCaptures, p4), a2.produce(o2, p4[0].end), h3 = p4[0].end;
              var k3 = C2.getContentName(t3.content, p4), S2 = b3.push(e3, k3);
              if (o2 = o2.setContentNameScopesList(S2), C2.endHasBackReferences && (o2 = o2.setEndRule(C2.getEndWithResolvedBackReferences(t3.content, p4))), !d3 && y2.hasSameRuleAs(o2))
                return s.DebugFlags.InDebugMode && console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o2 = o2.pop(), a2.produce(o2, u3), void (l3 = true);
            } else if (_2 instanceof i.BeginWhileRule) {
              C2 = _2;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C2.debugName), w(e3, t3, n3, o2, a2, C2.beginCaptures, p4), a2.produce(o2, p4[0].end), h3 = p4[0].end;
              k3 = C2.getContentName(t3.content, p4), S2 = b3.push(e3, k3);
              if (o2 = o2.setContentNameScopesList(S2), C2.whileHasBackReferences && (o2 = o2.setEndRule(C2.getWhileWithResolvedBackReferences(t3.content, p4))), !d3 && y2.hasSameRuleAs(o2))
                return s.DebugFlags.InDebugMode && console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o2 = o2.pop(), a2.produce(o2, u3), void (l3 = true);
            } else {
              var P2 = _2;
              if (s.DebugFlags.InDebugMode && console.log("  matched " + P2.debugName + " - " + P2.debugMatchRegExp), w(e3, t3, n3, o2, a2, P2.captures, p4), a2.produce(o2, p4[0].end), o2 = o2.pop(), !d3)
                return s.DebugFlags.InDebugMode && console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping"), o2 = o2.safePop(), a2.produce(o2, u3), void (l3 = true);
            }
          }
          p4[0].end > r2 && (r2 = p4[0].end, n3 = false);
        }
        return o2;
      }
      t2.Grammar = v2;
      var P = function() {
        function e3() {
        }
        return e3.toBinaryStr = function(e4) {
          for (var t3 = e4.toString(2); t3.length < 32; )
            t3 = "0" + t3;
          return t3;
        }, e3.printMetadata = function(t3) {
          var n3 = e3.getLanguageId(t3), r2 = e3.getTokenType(t3), i2 = e3.getFontStyle(t3), o2 = e3.getForeground(t3), s2 = e3.getBackground(t3);
          console.log({ languageId: n3, tokenType: r2, fontStyle: i2, foreground: o2, background: s2 });
        }, e3.getLanguageId = function(e4) {
          return (255 & e4) >>> 0;
        }, e3.getTokenType = function(e4) {
          return (1792 & e4) >>> 8;
        }, e3.getFontStyle = function(e4) {
          return (14336 & e4) >>> 11;
        }, e3.getForeground = function(e4) {
          return (8372224 & e4) >>> 14;
        }, e3.getBackground = function(e4) {
          return (4286578688 & e4) >>> 23;
        }, e3.set = function(t3, n3, r2, i2, o2, s2) {
          var a2 = e3.getLanguageId(t3), c3 = e3.getTokenType(t3), u3 = e3.getFontStyle(t3), l3 = e3.getForeground(t3), h3 = e3.getBackground(t3);
          return n3 !== 0 && (a2 = n3), r2 !== 0 && (c3 = r2 === 8 ? 0 : r2), i2 !== -1 && (u3 = i2), o2 !== 0 && (l3 = o2), s2 !== 0 && (h3 = s2), (a2 << 0 | c3 << 8 | u3 << 11 | l3 << 14 | h3 << 23) >>> 0;
        }, e3;
      }();
      t2.StackElementMetadata = P;
      var x = function() {
        function e3(e4, t3, n3) {
          this.parent = e4, this.scope = t3, this.metadata = n3;
        }
        return e3._equals = function(e4, t3) {
          for (; ; ) {
            if (e4 === t3)
              return true;
            if (!e4 && !t3)
              return true;
            if (!e4 || !t3)
              return false;
            if (e4.scope !== t3.scope || e4.metadata !== t3.metadata)
              return false;
            e4 = e4.parent, t3 = t3.parent;
          }
        }, e3.prototype.equals = function(t3) {
          return e3._equals(this, t3);
        }, e3._matchesScope = function(e4, t3, n3) {
          return t3 === e4 || e4.substring(0, n3.length) === n3;
        }, e3._matches = function(e4, t3) {
          if (t3 === null)
            return true;
          for (var n3 = t3.length, r2 = 0, i2 = t3[r2], o2 = i2 + "."; e4; ) {
            if (this._matchesScope(e4.scope, i2, o2)) {
              if (++r2 === n3)
                return true;
              o2 = (i2 = t3[r2]) + ".";
            }
            e4 = e4.parent;
          }
          return false;
        }, e3.mergeMetadata = function(e4, t3, n3) {
          if (n3 === null)
            return e4;
          var r2 = -1, i2 = 0, o2 = 0;
          if (n3.themeData !== null)
            for (var s2 = 0, a2 = n3.themeData.length; s2 < a2; s2++) {
              var c3 = n3.themeData[s2];
              if (this._matches(t3, c3.parentScopes)) {
                r2 = c3.fontStyle, i2 = c3.foreground, o2 = c3.background;
                break;
              }
            }
          return P.set(e4, n3.languageId, n3.tokenType, r2, i2, o2);
        }, e3._push = function(t3, n3, r2) {
          for (var i2 = 0, o2 = r2.length; i2 < o2; i2++) {
            var s2 = r2[i2], a2 = n3.getMetadataForScope(s2), c3 = e3.mergeMetadata(t3.metadata, t3, a2);
            t3 = new e3(t3, s2, c3);
          }
          return t3;
        }, e3.prototype.push = function(t3, n3) {
          return n3 === null ? this : n3.indexOf(" ") >= 0 ? e3._push(this, t3, n3.split(/ /g)) : e3._push(this, t3, [n3]);
        }, e3._generateScopes = function(e4) {
          for (var t3 = [], n3 = 0; e4; )
            t3[n3++] = e4.scope, e4 = e4.parent;
          return t3.reverse(), t3;
        }, e3.prototype.generateScopes = function() {
          return e3._generateScopes(this);
        }, e3;
      }();
      t2.ScopeListElement = x;
      var I = function() {
        function e3(e4, t3, n3, r2, i2, o2, s2, a2) {
          this.parent = e4, this.depth = this.parent ? this.parent.depth + 1 : 1, this.ruleId = t3, this._enterPos = n3, this._anchorPos = r2, this.beginRuleCapturedEOL = i2, this.endRule = o2, this.nameScopesList = s2, this.contentNameScopesList = a2;
        }
        return e3._structuralEquals = function(e4, t3) {
          for (; ; ) {
            if (e4 === t3)
              return true;
            if (!e4 && !t3)
              return true;
            if (!e4 || !t3)
              return false;
            if (e4.depth !== t3.depth || e4.ruleId !== t3.ruleId || e4.endRule !== t3.endRule)
              return false;
            e4 = e4.parent, t3 = t3.parent;
          }
        }, e3._equals = function(e4, t3) {
          return e4 === t3 || !!this._structuralEquals(e4, t3) && e4.contentNameScopesList.equals(t3.contentNameScopesList);
        }, e3.prototype.clone = function() {
          return this;
        }, e3.prototype.equals = function(t3) {
          return t3 !== null && e3._equals(this, t3);
        }, e3._reset = function(e4) {
          for (; e4; )
            e4._enterPos = -1, e4._anchorPos = -1, e4 = e4.parent;
        }, e3.prototype.reset = function() {
          e3._reset(this);
        }, e3.prototype.pop = function() {
          return this.parent;
        }, e3.prototype.safePop = function() {
          return this.parent ? this.parent : this;
        }, e3.prototype.push = function(t3, n3, r2, i2, o2, s2, a2) {
          return new e3(this, t3, n3, r2, i2, o2, s2, a2);
        }, e3.prototype.getEnterPos = function() {
          return this._enterPos;
        }, e3.prototype.getAnchorPos = function() {
          return this._anchorPos;
        }, e3.prototype.getRule = function(e4) {
          return e4.getRule(this.ruleId);
        }, e3.prototype._writeString = function(e4, t3) {
          return this.parent && (t3 = this.parent._writeString(e4, t3)), e4[t3++] = "(" + this.ruleId + ", TODO-" + this.nameScopesList + ", TODO-" + this.contentNameScopesList + ")", t3;
        }, e3.prototype.toString = function() {
          var e4 = [];
          return this._writeString(e4, 0), "[" + e4.join(",") + "]";
        }, e3.prototype.setContentNameScopesList = function(e4) {
          return this.contentNameScopesList === e4 ? this : this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, e4);
        }, e3.prototype.setEndRule = function(t3) {
          return this.endRule === t3 ? this : new e3(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, t3, this.nameScopesList, this.contentNameScopesList);
        }, e3.prototype.hasSameRuleAs = function(e4) {
          return this.ruleId === e4.ruleId;
        }, e3.NULL = new e3(null, 0, 0, 0, false, null, null, null), e3;
      }();
      t2.StackElement = I;
      var A = function(e3, t3) {
        this.scopes = e3, this.endPos = t3;
      };
      t2.LocalStackElement = A;
      var T = function() {
        function e3(e4, t3, n3) {
          this._emitBinaryTokens = e4, this._tokenTypeOverrides = n3, s.DebugFlags.InDebugMode ? this._lineText = t3 : this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
        }
        return e3.prototype.produce = function(e4, t3) {
          this.produceFromScopes(e4.contentNameScopesList, t3);
        }, e3.prototype.produceFromScopes = function(e4, t3) {
          if (!(this._lastTokenEndIndex >= t3)) {
            if (this._emitBinaryTokens) {
              for (var n3 = e4.metadata, r2 = 0, i2 = this._tokenTypeOverrides; r2 < i2.length; r2++) {
                var o2 = i2[r2];
                o2.matcher(e4.generateScopes()) && (n3 = P.set(n3, 0, L(o2.type), -1, 0, 0));
              }
              return this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === n3 || (this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(n3)), void (this._lastTokenEndIndex = t3);
            }
            var a2 = e4.generateScopes();
            if (s.DebugFlags.InDebugMode) {
              console.log("  token: |" + this._lineText.substring(this._lastTokenEndIndex, t3).replace(/\n$/, "\\n") + "|");
              for (var c3 = 0; c3 < a2.length; c3++)
                console.log("      * " + a2[c3]);
            }
            this._tokens.push({ startIndex: this._lastTokenEndIndex, endIndex: t3, scopes: a2 }), this._lastTokenEndIndex = t3;
          }
        }, e3.prototype.getResult = function(e4, t3) {
          return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === t3 - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(e4, t3), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
        }, e3.prototype.getBinaryResult = function(e4, t3) {
          this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === t3 - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(e4, t3), this._binaryTokens[this._binaryTokens.length - 2] = 0);
          for (var n3 = new Uint32Array(this._binaryTokens.length), r2 = 0, i2 = this._binaryTokens.length; r2 < i2; r2++)
            n3[r2] = this._binaryTokens[r2];
          return n3;
        }, e3;
      }();
      function L(e3) {
        switch (e3) {
          case 4:
            return 4;
          case 2:
            return 2;
          case 1:
            return 1;
          case 0:
          default:
            return 8;
        }
      }
    }, function(e2, t2, n2) {
      function r(e3) {
        return Array.isArray(e3) ? function(e4) {
          for (var t3 = [], n3 = 0, i2 = e4.length; n3 < i2; n3++)
            t3[n3] = r(e4[n3]);
          return t3;
        }(e3) : typeof e3 == "object" ? function(e4) {
          var t3 = {};
          for (var n3 in e4)
            t3[n3] = r(e4[n3]);
          return t3;
        }(e3) : e3;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.clone = function(e3) {
        return r(e3);
      }, t2.mergeObjects = function(e3) {
        for (var t3 = [], n3 = 1; n3 < arguments.length; n3++)
          t3[n3 - 1] = arguments[n3];
        return t3.forEach(function(t4) {
          for (var n4 in t4)
            e3[n4] = t4[n4];
        }), e3;
      }, t2.basename = function e3(t3) {
        var n3 = ~t3.lastIndexOf("/") || ~t3.lastIndexOf("\\");
        return n3 === 0 ? t3 : ~n3 == t3.length - 1 ? e3(t3.substring(0, t3.length - 1)) : t3.substr(1 + ~n3);
      };
      var i = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/, o = function() {
        function e3() {
        }
        return e3.hasCaptures = function(e4) {
          return e4 !== null && i.test(e4);
        }, e3.replaceCaptures = function(e4, t3, n3) {
          return e4.replace(i, function(e5, r2, i2, o2) {
            var s = n3[parseInt(r2 || i2, 10)];
            if (!s)
              return e5;
            for (var a = t3.substring(s.start, s.end); a[0] === "."; )
              a = a.substring(1);
            switch (o2) {
              case "downcase":
                return a.toLowerCase();
              case "upcase":
                return a.toUpperCase();
              default:
                return a;
            }
          });
        }, e3;
      }();
      t2.RegexSource = o;
    }, function(e2, t2, n2) {
      (function(e3) {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DebugFlags = { InDebugMode: e3 !== void 0 && !!e3.env.VSCODE_TEXTMATE_DEBUG };
      }).call(this, n2(7));
    }, function(e2, t2, n2) {
      var r = this && this.__awaiter || function(e3, t3, n3, r2) {
        return new (n3 || (n3 = Promise))(function(i2, o2) {
          function s2(e4) {
            try {
              c3(r2.next(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function a2(e4) {
            try {
              c3(r2.throw(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function c3(e4) {
            var t4;
            e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          c3((r2 = r2.apply(e3, t3 || [])).next());
        });
      }, i = this && this.__generator || function(e3, t3) {
        var n3, r2, i2, o2, s2 = { label: 0, sent: function() {
          if (1 & i2[0])
            throw i2[1];
          return i2[1];
        }, trys: [], ops: [] };
        return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, typeof Symbol == "function" && (o2[Symbol.iterator] = function() {
          return this;
        }), o2;
        function a2(o3) {
          return function(a3) {
            return function(o4) {
              if (n3)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n3 = 1, r2 && (i2 = 2 & o4[0] ? r2.return : o4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, o4[1])).done)
                    return i2;
                  switch (r2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return s2.label++, { value: o4[1], done: false };
                    case 5:
                      s2.label++, r2 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = s2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || o4[0] !== 6 && o4[0] !== 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (o4[0] === 3 && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        s2.label = o4[1];
                        break;
                      }
                      if (o4[0] === 6 && s2.label < i2[1]) {
                        s2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && s2.label < i2[2]) {
                        s2.label = i2[2], s2.ops.push(o4);
                        break;
                      }
                      i2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, s2);
                } catch (e4) {
                  o4 = [6, e4], r2 = 0;
                } finally {
                  n3 = i2 = 0;
                }
              if (5 & o4[0])
                throw o4[1];
              return { value: o4[0] ? o4[1] : void 0, done: true };
            }([o3, a3]);
          };
        }
      };
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(4), s = n2(8), a = n2(11), c2 = n2(0), u2 = function() {
        function e3(e4) {
          this._options = e4, this._syncRegistry = new o.SyncRegistry(a.Theme.createFromRawTheme(e4.theme, e4.colorMap), e4.onigLib), this._ensureGrammarCache = /* @__PURE__ */ new Map();
        }
        return e3.prototype.dispose = function() {
          this._syncRegistry.dispose();
        }, e3.prototype.setTheme = function(e4, t3) {
          this._syncRegistry.setTheme(a.Theme.createFromRawTheme(e4, t3));
        }, e3.prototype.getColorMap = function() {
          return this._syncRegistry.getColorMap();
        }, e3.prototype.loadGrammarWithEmbeddedLanguages = function(e4, t3, n3) {
          return this.loadGrammarWithConfiguration(e4, t3, { embeddedLanguages: n3 });
        }, e3.prototype.loadGrammarWithConfiguration = function(e4, t3, n3) {
          return this._loadGrammar(e4, t3, n3.embeddedLanguages, n3.tokenTypes);
        }, e3.prototype.loadGrammar = function(e4) {
          return this._loadGrammar(e4, 0, null, null);
        }, e3.prototype._doLoadSingleGrammar = function(e4) {
          return r(this, void 0, void 0, function() {
            var t3, n3;
            return i(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return [4, this._options.loadGrammar(e4)];
                case 1:
                  return (t3 = r2.sent()) && (n3 = typeof this._options.getInjections == "function" ? this._options.getInjections(e4) : void 0, this._syncRegistry.addGrammar(t3, n3)), [2];
              }
            });
          });
        }, e3.prototype._loadSingleGrammar = function(e4) {
          return r(this, void 0, void 0, function() {
            return i(this, function(t3) {
              return this._ensureGrammarCache.has(e4) || this._ensureGrammarCache.set(e4, this._doLoadSingleGrammar(e4)), [2, this._ensureGrammarCache.get(e4)];
            });
          });
        }, e3.prototype._collectDependenciesForDep = function(e4, t3, n3) {
          var r2 = this._syncRegistry.lookup(n3.scopeName);
          if (r2) {
            n3 instanceof c2.FullScopeDependency ? c2.collectDependencies(t3, this._syncRegistry.lookup(e4), r2) : c2.collectSpecificDependencies(t3, this._syncRegistry.lookup(e4), r2, n3.include);
            var i2 = this._syncRegistry.injections(n3.scopeName);
            if (i2)
              for (var o2 = 0, s2 = i2; o2 < s2.length; o2++) {
                var a2 = s2[o2];
                t3.add(new c2.FullScopeDependency(a2));
              }
          } else if (n3.scopeName === e4)
            throw new Error("No grammar provided for <" + e4 + ">");
        }, e3.prototype._loadGrammar = function(e4, t3, n3, o2) {
          return r(this, void 0, void 0, function() {
            var r2, s2, a2, u3, l2, h2, p2, f2, d2, g2, m2, _, y = this;
            return i(this, function(i2) {
              switch (i2.label) {
                case 0:
                  r2 = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Set(), r2.add(e4), a2 = [new c2.FullScopeDependency(e4)], i2.label = 1;
                case 1:
                  return a2.length > 0 ? (u3 = a2, a2 = [], [4, Promise.all(u3.map(function(e5) {
                    return y._loadSingleGrammar(e5.scopeName);
                  }))]) : [3, 3];
                case 2:
                  for (i2.sent(), l2 = new c2.ScopeDependencyCollector(), h2 = 0, p2 = u3; h2 < p2.length; h2++)
                    _ = p2[h2], this._collectDependenciesForDep(e4, l2, _);
                  for (f2 = 0, d2 = l2.full; f2 < d2.length; f2++)
                    _ = d2[f2], r2.has(_.scopeName) || (r2.add(_.scopeName), a2.push(_));
                  for (g2 = 0, m2 = l2.partial; g2 < m2.length; g2++)
                    _ = m2[g2], r2.has(_.scopeName) || s2.has(_.toKey()) || (s2.add(_.toKey()), a2.push(_));
                  return [3, 1];
                case 3:
                  return [2, this.grammarForScopeName(e4, t3, n3, o2)];
              }
            });
          });
        }, e3.prototype.addGrammar = function(e4, t3, n3, o2) {
          return t3 === void 0 && (t3 = []), n3 === void 0 && (n3 = 0), o2 === void 0 && (o2 = null), r(this, void 0, void 0, function() {
            return i(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return this._syncRegistry.addGrammar(e4, t3), [4, this.grammarForScopeName(e4.scopeName, n3, o2)];
                case 1:
                  return [2, r2.sent()];
              }
            });
          });
        }, e3.prototype.grammarForScopeName = function(e4, t3, n3, r2) {
          return t3 === void 0 && (t3 = 0), n3 === void 0 && (n3 = null), r2 === void 0 && (r2 = null), this._syncRegistry.grammarForScopeName(e4, t3, n3, r2);
        }, e3;
      }();
      t2.Registry = u2, t2.INITIAL = c2.StackElement.NULL, t2.parseRawGrammar = s.parseRawGrammar;
    }, function(e2, t2, n2) {
      var r = this && this.__awaiter || function(e3, t3, n3, r2) {
        return new (n3 || (n3 = Promise))(function(i2, o2) {
          function s2(e4) {
            try {
              c2(r2.next(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function a(e4) {
            try {
              c2(r2.throw(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function c2(e4) {
            var t4;
            e4.done ? i2(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
              e5(t4);
            })).then(s2, a);
          }
          c2((r2 = r2.apply(e3, t3 || [])).next());
        });
      }, i = this && this.__generator || function(e3, t3) {
        var n3, r2, i2, o2, s2 = { label: 0, sent: function() {
          if (1 & i2[0])
            throw i2[1];
          return i2[1];
        }, trys: [], ops: [] };
        return o2 = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o2[Symbol.iterator] = function() {
          return this;
        }), o2;
        function a(o3) {
          return function(a2) {
            return function(o4) {
              if (n3)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n3 = 1, r2 && (i2 = 2 & o4[0] ? r2.return : o4[0] ? r2.throw || ((i2 = r2.return) && i2.call(r2), 0) : r2.next) && !(i2 = i2.call(r2, o4[1])).done)
                    return i2;
                  switch (r2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                    case 0:
                    case 1:
                      i2 = o4;
                      break;
                    case 4:
                      return s2.label++, { value: o4[1], done: false };
                    case 5:
                      s2.label++, r2 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = s2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || o4[0] !== 6 && o4[0] !== 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (o4[0] === 3 && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                        s2.label = o4[1];
                        break;
                      }
                      if (o4[0] === 6 && s2.label < i2[1]) {
                        s2.label = i2[1], i2 = o4;
                        break;
                      }
                      if (i2 && s2.label < i2[2]) {
                        s2.label = i2[2], s2.ops.push(o4);
                        break;
                      }
                      i2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, s2);
                } catch (e4) {
                  o4 = [6, e4], r2 = 0;
                } finally {
                  n3 = i2 = 0;
                }
              if (5 & o4[0])
                throw o4[1];
              return { value: o4[0] ? o4[1] : void 0, done: true };
            }([o3, a2]);
          };
        }
      };
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(0), s = function() {
        function e3(e4, t3) {
          this._theme = e4, this._grammars = {}, this._rawGrammars = {}, this._injectionGrammars = {}, this._onigLibPromise = t3;
        }
        return e3.prototype.dispose = function() {
          for (var e4 in this._grammars)
            this._grammars.hasOwnProperty(e4) && this._grammars[e4].dispose();
        }, e3.prototype.setTheme = function(e4) {
          var t3 = this;
          this._theme = e4, Object.keys(this._grammars).forEach(function(e5) {
            t3._grammars[e5].onDidChangeTheme();
          });
        }, e3.prototype.getColorMap = function() {
          return this._theme.getColorMap();
        }, e3.prototype.addGrammar = function(e4, t3) {
          this._rawGrammars[e4.scopeName] = e4, t3 && (this._injectionGrammars[e4.scopeName] = t3);
        }, e3.prototype.lookup = function(e4) {
          return this._rawGrammars[e4];
        }, e3.prototype.injections = function(e4) {
          return this._injectionGrammars[e4];
        }, e3.prototype.getDefaults = function() {
          return this._theme.getDefaults();
        }, e3.prototype.themeMatch = function(e4) {
          return this._theme.match(e4);
        }, e3.prototype.grammarForScopeName = function(e4, t3, n3, s2) {
          return r(this, void 0, void 0, function() {
            var r2, a, c2, u2, l2;
            return i(this, function(i2) {
              switch (i2.label) {
                case 0:
                  return this._grammars[e4] ? [3, 2] : (r2 = this._rawGrammars[e4]) ? (a = this._grammars, c2 = e4, u2 = o.createGrammar, l2 = [r2, t3, n3, s2, this], [4, this._onigLibPromise]) : [2, null];
                case 1:
                  a[c2] = u2.apply(void 0, l2.concat([i2.sent()])), i2.label = 2;
                case 2:
                  return [2, this._grammars[e4]];
              }
            });
          });
        }, e3;
      }();
      t2.SyncRegistry = s;
    }, function(e2, t2, n2) {
      var r, i = this && this.__extends || (r = function(e3, t3) {
        return (r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n3 in t4)
            t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
        })(e3, t3);
      }, function(e3, t3) {
        function n3() {
          this.constructor = e3;
        }
        r(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n3.prototype = t3.prototype, new n3());
      });
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(1), s = /\\(\d+)/, a = /\\(\d+)/g, c2 = function() {
        function e3(e4, t3, n3) {
          this.debugRegExps = t3, this.rules = n3, this.scanner = e4.createOnigScanner(t3);
        }
        return e3.prototype.dispose = function() {
          typeof this.scanner.dispose == "function" && this.scanner.dispose();
        }, e3;
      }();
      t2.CompiledRule = c2;
      var u2 = function() {
        function e3(e4, t3, n3, r2) {
          this.$location = e4, this.id = t3, this._name = n3 || null, this._nameIsCapturing = o.RegexSource.hasCaptures(this._name), this._contentName = r2 || null, this._contentNameIsCapturing = o.RegexSource.hasCaptures(this._contentName);
        }
        return Object.defineProperty(e3.prototype, "debugName", { get: function() {
          var e4 = this.$location ? o.basename(this.$location.filename) + ":" + this.$location.line : "unknown";
          return this.constructor.name + "#" + this.id + " @ " + e4;
        }, enumerable: true, configurable: true }), e3.prototype.getName = function(e4, t3) {
          return this._nameIsCapturing && this._name !== null && e4 !== null && t3 !== null ? o.RegexSource.replaceCaptures(this._name, e4, t3) : this._name;
        }, e3.prototype.getContentName = function(e4, t3) {
          return this._contentNameIsCapturing && this._contentName !== null ? o.RegexSource.replaceCaptures(this._contentName, e4, t3) : this._contentName;
        }, e3;
      }();
      t2.Rule = u2;
      var l2 = function(e3) {
        function t3(t4, n3, r2, i2, o2) {
          var s2 = e3.call(this, t4, n3, r2, i2) || this;
          return s2.retokenizeCapturedWithRuleId = o2, s2;
        }
        return i(t3, e3), t3.prototype.dispose = function() {
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          throw new Error("Not supported!");
        }, t3.prototype.compile = function(e4, t4, n3, r2) {
          throw new Error("Not supported!");
        }, t3;
      }(u2);
      t2.CaptureRule = l2;
      var h2 = function() {
        function e3(e4, t3, n3) {
          if (n3 === void 0 && (n3 = true), n3)
            if (e4) {
              for (var r2 = e4.length, i2 = 0, o2 = [], a2 = false, c3 = 0; c3 < r2; c3++) {
                if (e4.charAt(c3) === "\\" && c3 + 1 < r2) {
                  var u3 = e4.charAt(c3 + 1);
                  u3 === "z" ? (o2.push(e4.substring(i2, c3)), o2.push("$(?!\\n)(?<!\\n)"), i2 = c3 + 2) : u3 !== "A" && u3 !== "G" || (a2 = true), c3++;
                }
              }
              this.hasAnchor = a2, i2 === 0 ? this.source = e4 : (o2.push(e4.substring(i2, r2)), this.source = o2.join(""));
            } else
              this.hasAnchor = false, this.source = e4;
          else
            this.hasAnchor = false, this.source = e4;
          this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t3, this.hasBackReferences = s.test(this.source);
        }
        return e3.prototype.clone = function() {
          return new e3(this.source, this.ruleId, true);
        }, e3.prototype.setSource = function(e4) {
          this.source !== e4 && (this.source = e4, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
        }, e3.prototype.resolveBackReferences = function(e4, t3) {
          var n3 = t3.map(function(t4) {
            return e4.substring(t4.start, t4.end);
          });
          return a.lastIndex = 0, this.source.replace(a, function(e5, t4) {
            return (n3[parseInt(t4, 10)] || "").replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
          });
        }, e3.prototype._buildAnchorCache = function() {
          var e4, t3, n3, r2, i2 = [], o2 = [], s2 = [], a2 = [];
          for (e4 = 0, t3 = this.source.length; e4 < t3; e4++)
            n3 = this.source.charAt(e4), i2[e4] = n3, o2[e4] = n3, s2[e4] = n3, a2[e4] = n3, n3 === "\\" && e4 + 1 < t3 && ((r2 = this.source.charAt(e4 + 1)) === "A" ? (i2[e4 + 1] = "\uFFFF", o2[e4 + 1] = "\uFFFF", s2[e4 + 1] = "A", a2[e4 + 1] = "A") : r2 === "G" ? (i2[e4 + 1] = "\uFFFF", o2[e4 + 1] = "G", s2[e4 + 1] = "\uFFFF", a2[e4 + 1] = "G") : (i2[e4 + 1] = r2, o2[e4 + 1] = r2, s2[e4 + 1] = r2, a2[e4 + 1] = r2), e4++);
          return { A0_G0: i2.join(""), A0_G1: o2.join(""), A1_G0: s2.join(""), A1_G1: a2.join("") };
        }, e3.prototype.resolveAnchors = function(e4, t3) {
          return this.hasAnchor && this._anchorCache ? e4 ? t3 ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t3 ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0 : this.source;
        }, e3;
      }();
      t2.RegExpSource = h2;
      var p2 = function() {
        function e3() {
          this._items = [], this._hasAnchors = false, this._cached = null, this._anchorCache = { A0_G0: null, A0_G1: null, A1_G0: null, A1_G1: null };
        }
        return e3.prototype.dispose = function() {
          this._disposeCaches();
        }, e3.prototype._disposeCaches = function() {
          this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
        }, e3.prototype.push = function(e4) {
          this._items.push(e4), this._hasAnchors = this._hasAnchors || e4.hasAnchor;
        }, e3.prototype.unshift = function(e4) {
          this._items.unshift(e4), this._hasAnchors = this._hasAnchors || e4.hasAnchor;
        }, e3.prototype.length = function() {
          return this._items.length;
        }, e3.prototype.setSource = function(e4, t3) {
          this._items[e4].source !== t3 && (this._disposeCaches(), this._items[e4].setSource(t3));
        }, e3.prototype.compile = function(e4, t3, n3) {
          if (this._hasAnchors)
            return t3 ? n3 ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A1_G0) : n3 ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A0_G0);
          if (!this._cached) {
            var r2 = this._items.map(function(e5) {
              return e5.source;
            });
            this._cached = new c2(e4, r2, this._items.map(function(e5) {
              return e5.ruleId;
            }));
          }
          return this._cached;
        }, e3.prototype._resolveAnchors = function(e4, t3, n3) {
          var r2 = this._items.map(function(e5) {
            return e5.resolveAnchors(t3, n3);
          });
          return new c2(e4, r2, this._items.map(function(e5) {
            return e5.ruleId;
          }));
        }, e3;
      }();
      t2.RegExpSourceList = p2;
      var f2 = function(e3) {
        function t3(t4, n3, r2, i2, o2) {
          var s2 = e3.call(this, t4, n3, r2, null) || this;
          return s2._match = new h2(i2, s2.id), s2.captures = o2, s2._cachedCompiledPatterns = null, s2;
        }
        return i(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t3.prototype, "debugMatchRegExp", { get: function() {
          return "" + this._match.source;
        }, enumerable: true, configurable: true }), t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          t4.push(this._match);
        }, t3.prototype.compile = function(e4, t4, n3, r2) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r2);
        }, t3;
      }(u2);
      t2.MatchRule = f2;
      var d2 = function(e3) {
        function t3(t4, n3, r2, i2, o2) {
          var s2 = e3.call(this, t4, n3, r2, i2) || this;
          return s2.patterns = o2.patterns, s2.hasMissingPatterns = o2.hasMissingPatterns, s2._cachedCompiledPatterns = null, s2;
        }
        return i(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          var r2, i2;
          for (r2 = 0, i2 = this.patterns.length; r2 < i2; r2++)
            e4.getRule(this.patterns[r2]).collectPatternsRecursive(e4, t4, false);
        }, t3.prototype.compile = function(e4, t4, n3, r2) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r2);
        }, t3;
      }(u2);
      t2.IncludeOnlyRule = d2;
      var g2 = function(e3) {
        function t3(t4, n3, r2, i2, o2, s2, a2, c3, u3, l3) {
          var p3 = e3.call(this, t4, n3, r2, i2) || this;
          return p3._begin = new h2(o2, p3.id), p3.beginCaptures = s2, p3._end = new h2(a2 || "\uFFFF", -1), p3.endHasBackReferences = p3._end.hasBackReferences, p3.endCaptures = c3, p3.applyEndPatternLast = u3 || false, p3.patterns = l3.patterns, p3.hasMissingPatterns = l3.hasMissingPatterns, p3._cachedCompiledPatterns = null, p3;
        }
        return i(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t3.prototype, "debugBeginRegExp", { get: function() {
          return "" + this._begin.source;
        }, enumerable: true, configurable: true }), Object.defineProperty(t3.prototype, "debugEndRegExp", { get: function() {
          return "" + this._end.source;
        }, enumerable: true, configurable: true }), t3.prototype.getEndWithResolvedBackReferences = function(e4, t4) {
          return this._end.resolveBackReferences(e4, t4);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          if (n3) {
            var r2, i2 = void 0;
            for (i2 = 0, r2 = this.patterns.length; i2 < r2; i2++)
              e4.getRule(this.patterns[i2]).collectPatternsRecursive(e4, t4, false);
          } else
            t4.push(this._begin);
        }, t3.prototype.compile = function(e4, t4, n3, r2) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true), this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end)), this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t4) : this._cachedCompiledPatterns.setSource(0, t4)), this._cachedCompiledPatterns.compile(e4, n3, r2);
        }, t3;
      }(u2);
      t2.BeginEndRule = g2;
      var m2 = function(e3) {
        function t3(t4, n3, r2, i2, o2, s2, a2, c3, u3) {
          var l3 = e3.call(this, t4, n3, r2, i2) || this;
          return l3._begin = new h2(o2, l3.id), l3.beginCaptures = s2, l3.whileCaptures = c3, l3._while = new h2(a2, -2), l3.whileHasBackReferences = l3._while.hasBackReferences, l3.patterns = u3.patterns, l3.hasMissingPatterns = u3.hasMissingPatterns, l3._cachedCompiledPatterns = null, l3._cachedCompiledWhilePatterns = null, l3;
        }
        return i(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
        }, Object.defineProperty(t3.prototype, "debugBeginRegExp", { get: function() {
          return "" + this._begin.source;
        }, enumerable: true, configurable: true }), Object.defineProperty(t3.prototype, "debugWhileRegExp", { get: function() {
          return "" + this._while.source;
        }, enumerable: true, configurable: true }), t3.prototype.getWhileWithResolvedBackReferences = function(e4, t4) {
          return this._while.resolveBackReferences(e4, t4);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          if (n3) {
            var r2, i2 = void 0;
            for (i2 = 0, r2 = this.patterns.length; i2 < r2; i2++)
              e4.getRule(this.patterns[i2]).collectPatternsRecursive(e4, t4, false);
          } else
            t4.push(this._begin);
        }, t3.prototype.compile = function(e4, t4, n3, r2) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r2);
        }, t3.prototype.compileWhile = function(e4, t4, n3, r2) {
          return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new p2(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t4 || "\uFFFF"), this._cachedCompiledWhilePatterns.compile(e4, n3, r2);
        }, t3;
      }(u2);
      t2.BeginWhileRule = m2;
      var _ = function() {
        function e3() {
        }
        return e3.createCaptureRule = function(e4, t3, n3, r2, i2) {
          return e4.registerRule(function(e5) {
            return new l2(t3, e5, n3, r2, i2);
          });
        }, e3.getCompiledRuleId = function(t3, n3, r2) {
          return t3.id || n3.registerRule(function(i2) {
            if (t3.id = i2, t3.match)
              return new f2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.match, e3._compileCaptures(t3.captures, n3, r2));
            if (t3.begin === void 0) {
              t3.repository && (r2 = o.mergeObjects({}, r2, t3.repository));
              var s2 = t3.patterns;
              return s2 === void 0 && t3.include && (s2 = [{ include: t3.include }]), new d2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, e3._compilePatterns(s2, n3, r2));
            }
            return t3.while ? new m2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, t3.begin, e3._compileCaptures(t3.beginCaptures || t3.captures, n3, r2), t3.while, e3._compileCaptures(t3.whileCaptures || t3.captures, n3, r2), e3._compilePatterns(t3.patterns, n3, r2)) : new g2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, t3.begin, e3._compileCaptures(t3.beginCaptures || t3.captures, n3, r2), t3.end, e3._compileCaptures(t3.endCaptures || t3.captures, n3, r2), t3.applyEndPatternLast, e3._compilePatterns(t3.patterns, n3, r2));
          }), t3.id;
        }, e3._compileCaptures = function(t3, n3, r2) {
          var i2 = [];
          if (t3) {
            var o2 = 0;
            for (var s2 in t3) {
              if (s2 !== "$vscodeTextmateLocation")
                (c3 = parseInt(s2, 10)) > o2 && (o2 = c3);
            }
            for (var a2 = 0; a2 <= o2; a2++)
              i2[a2] = null;
            for (var s2 in t3)
              if (s2 !== "$vscodeTextmateLocation") {
                var c3 = parseInt(s2, 10), u3 = 0;
                t3[s2].patterns && (u3 = e3.getCompiledRuleId(t3[s2], n3, r2)), i2[c3] = e3.createCaptureRule(n3, t3[s2].$vscodeTextmateLocation, t3[s2].name, t3[s2].contentName, u3);
              }
          }
          return i2;
        }, e3._compilePatterns = function(t3, n3, r2) {
          var i2 = [];
          if (t3)
            for (var o2 = 0, s2 = t3.length; o2 < s2; o2++) {
              var a2 = t3[o2], c3 = -1;
              if (a2.include)
                if (a2.include.charAt(0) === "#") {
                  var u3 = r2[a2.include.substr(1)];
                  u3 && (c3 = e3.getCompiledRuleId(u3, n3, r2));
                } else if (a2.include === "$base" || a2.include === "$self")
                  c3 = e3.getCompiledRuleId(r2[a2.include], n3, r2);
                else {
                  var l3 = null, h3 = null, p3 = a2.include.indexOf("#");
                  p3 >= 0 ? (l3 = a2.include.substring(0, p3), h3 = a2.include.substring(p3 + 1)) : l3 = a2.include;
                  var f3 = n3.getExternalGrammar(l3, r2);
                  if (f3)
                    if (h3) {
                      var _2 = f3.repository[h3];
                      _2 && (c3 = e3.getCompiledRuleId(_2, n3, f3.repository));
                    } else
                      c3 = e3.getCompiledRuleId(f3.repository.$self, n3, f3.repository);
                }
              else
                c3 = e3.getCompiledRuleId(a2, n3, r2);
              if (c3 !== -1) {
                var y = n3.getRule(c3), v2 = false;
                if ((y instanceof d2 || y instanceof g2 || y instanceof m2) && y.hasMissingPatterns && y.patterns.length === 0 && (v2 = true), v2)
                  continue;
                i2.push(c3);
              }
            }
          return { patterns: i2, hasMissingPatterns: (t3 ? t3.length : 0) !== i2.length };
        }, e3;
      }();
      t2.RuleFactory = _;
    }, function(e2, t2, n2) {
      function r(e3) {
        return !!e3 && !!e3.match(/[\w\.:]+/);
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.createMatchers = function(e3, t3) {
        for (var n3, i, o, s = [], a = (o = (i = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g).exec(n3 = e3), { next: function() {
          if (!o)
            return null;
          var e4 = o[0];
          return o = i.exec(n3), e4;
        } }), c2 = a.next(); c2 !== null; ) {
          var u2 = 0;
          if (c2.length === 2 && c2.charAt(1) === ":") {
            switch (c2.charAt(0)) {
              case "R":
                u2 = 1;
                break;
              case "L":
                u2 = -1;
                break;
              default:
                console.log("Unknown priority " + c2 + " in scope selector");
            }
            c2 = a.next();
          }
          var l2 = p2();
          if (s.push({ matcher: l2, priority: u2 }), c2 !== ",")
            break;
          c2 = a.next();
        }
        return s;
        function h2() {
          if (c2 === "-") {
            c2 = a.next();
            var e4 = h2();
            return function(t4) {
              return !!e4 && !e4(t4);
            };
          }
          if (c2 === "(") {
            c2 = a.next();
            var n4 = function() {
              var e5 = [], t4 = p2();
              for (; t4 && (e5.push(t4), c2 === "|" || c2 === ","); ) {
                do {
                  c2 = a.next();
                } while (c2 === "|" || c2 === ",");
                t4 = p2();
              }
              return function(t5) {
                return e5.some(function(e6) {
                  return e6(t5);
                });
              };
            }();
            return c2 === ")" && (c2 = a.next()), n4;
          }
          if (r(c2)) {
            var i2 = [];
            do {
              i2.push(c2), c2 = a.next();
            } while (r(c2));
            return function(e5) {
              return t3(i2, e5);
            };
          }
          return null;
        }
        function p2() {
          for (var e4 = [], t4 = h2(); t4; )
            e4.push(t4), t4 = h2();
          return function(t5) {
            return e4.every(function(e5) {
              return e5(t5);
            });
          };
        }
      };
    }, function(e2, t2) {
      var n2, r, i = e2.exports = {};
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(e3) {
        if (n2 === setTimeout)
          return setTimeout(e3, 0);
        if ((n2 === o || !n2) && setTimeout)
          return n2 = setTimeout, setTimeout(e3, 0);
        try {
          return n2(e3, 0);
        } catch (t3) {
          try {
            return n2.call(null, e3, 0);
          } catch (t4) {
            return n2.call(this, e3, 0);
          }
        }
      }
      !function() {
        try {
          n2 = typeof setTimeout == "function" ? setTimeout : o;
        } catch (e3) {
          n2 = o;
        }
        try {
          r = typeof clearTimeout == "function" ? clearTimeout : s;
        } catch (e3) {
          r = s;
        }
      }();
      var c2, u2 = [], l2 = false, h2 = -1;
      function p2() {
        l2 && c2 && (l2 = false, c2.length ? u2 = c2.concat(u2) : h2 = -1, u2.length && f2());
      }
      function f2() {
        if (!l2) {
          var e3 = a(p2);
          l2 = true;
          for (var t3 = u2.length; t3; ) {
            for (c2 = u2, u2 = []; ++h2 < t3; )
              c2 && c2[h2].run();
            h2 = -1, t3 = u2.length;
          }
          c2 = null, l2 = false, function(e4) {
            if (r === clearTimeout)
              return clearTimeout(e4);
            if ((r === s || !r) && clearTimeout)
              return r = clearTimeout, clearTimeout(e4);
            try {
              r(e4);
            } catch (t4) {
              try {
                return r.call(null, e4);
              } catch (t5) {
                return r.call(this, e4);
              }
            }
          }(e3);
        }
      }
      function d2(e3, t3) {
        this.fun = e3, this.array = t3;
      }
      function g2() {
      }
      i.nextTick = function(e3) {
        var t3 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n3 = 1; n3 < arguments.length; n3++)
            t3[n3 - 1] = arguments[n3];
        u2.push(new d2(e3, t3)), u2.length !== 1 || l2 || a(f2);
      }, d2.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g2, i.addListener = g2, i.once = g2, i.off = g2, i.removeListener = g2, i.removeAllListeners = g2, i.emit = g2, i.prependListener = g2, i.prependOnceListener = g2, i.listeners = function(e3) {
        return [];
      }, i.binding = function(e3) {
        throw new Error("process.binding is not supported");
      }, i.cwd = function() {
        return "/";
      }, i.chdir = function(e3) {
        throw new Error("process.chdir is not supported");
      }, i.umask = function() {
        return 0;
      };
    }, function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r = n2(9), i = n2(2), o = n2(10);
      t2.parseRawGrammar = function(e3, t3) {
        return t3 === void 0 && (t3 = null), t3 !== null && /\.json$/.test(t3) ? function(e4, t4) {
          if (i.DebugFlags.InDebugMode)
            return o.parse(e4, t4, true);
          return JSON.parse(e4);
        }(e3, t3) : function(e4, t4) {
          if (i.DebugFlags.InDebugMode)
            return r.parseWithLocation(e4, t4, "$vscodeTextmateLocation");
          return r.parse(e4);
        }(e3, t3);
      };
    }, function(e2, t2, n2) {
      function r(e3, t3, n3) {
        var r2 = e3.length, i = 0, o = 1, s = 0;
        function a(t4) {
          if (n3 === null)
            i += t4;
          else
            for (; t4 > 0; ) {
              e3.charCodeAt(i) === 10 ? (i++, o++, s = 0) : (i++, s++), t4--;
            }
        }
        function c2(e4) {
          n3 === null ? i = e4 : a(e4 - i);
        }
        function u2() {
          for (; i < r2; ) {
            var t4 = e3.charCodeAt(i);
            if (t4 !== 32 && t4 !== 9 && t4 !== 13 && t4 !== 10)
              break;
            a(1);
          }
        }
        function l2(t4) {
          return e3.substr(i, t4.length) === t4 && (a(t4.length), true);
        }
        function h2(t4) {
          var n4 = e3.indexOf(t4, i);
          c2(n4 !== -1 ? n4 + t4.length : r2);
        }
        function p2(t4) {
          var n4 = e3.indexOf(t4, i);
          if (n4 !== -1) {
            var o2 = e3.substring(i, n4);
            return c2(n4 + t4.length), o2;
          }
          o2 = e3.substr(i);
          return c2(r2), o2;
        }
        r2 > 0 && e3.charCodeAt(0) === 65279 && (i = 1);
        var f2 = 0, d2 = null, g2 = [], m2 = [], _ = null;
        function y(e4, t4) {
          g2.push(f2), m2.push(d2), f2 = e4, d2 = t4;
        }
        function v2() {
          if (g2.length === 0)
            return b2("illegal state stack");
          f2 = g2.pop(), d2 = m2.pop();
        }
        function b2(t4) {
          throw new Error("Near offset " + i + ": " + t4 + " ~~~" + e3.substr(i, 50) + "~~~");
        }
        var C, w, k2, R = function() {
          if (_ === null)
            return b2("missing <key>");
          var e4 = {};
          n3 !== null && (e4[n3] = { filename: t3, line: o, char: s }), d2[_] = e4, _ = null, y(1, e4);
        }, S = function() {
          if (_ === null)
            return b2("missing <key>");
          var e4 = [];
          d2[_] = e4, _ = null, y(2, e4);
        }, P = function() {
          var e4 = {};
          n3 !== null && (e4[n3] = { filename: t3, line: o, char: s }), d2.push(e4), y(1, e4);
        }, x = function() {
          var e4 = [];
          d2.push(e4), y(2, e4);
        };
        function I() {
          if (f2 !== 1)
            return b2("unexpected </dict>");
          v2();
        }
        function A() {
          return f2 === 1 || f2 !== 2 ? b2("unexpected </array>") : void v2();
        }
        function T(e4) {
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function L(e4) {
          if (isNaN(e4))
            return b2("cannot parse float");
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function M(e4) {
          if (isNaN(e4))
            return b2("cannot parse integer");
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function G(e4) {
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function D(e4) {
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function N(e4) {
          if (f2 === 1) {
            if (_ === null)
              return b2("missing <key>");
            d2[_] = e4, _ = null;
          } else
            f2 === 2 ? d2.push(e4) : d2 = e4;
        }
        function E(e4) {
          if (e4.isClosed)
            return "";
          var t4 = p2("</");
          return h2(">"), t4.replace(/&#([0-9]+);/g, function(e5, t5) {
            return String.fromCodePoint(parseInt(t5, 10));
          }).replace(/&#x([0-9a-f]+);/g, function(e5, t5) {
            return String.fromCodePoint(parseInt(t5, 16));
          }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function(e5) {
            switch (e5) {
              case "&amp;":
                return "&";
              case "&lt;":
                return "<";
              case "&gt;":
                return ">";
              case "&quot;":
                return '"';
              case "&apos;":
                return "'";
            }
            return e5;
          });
        }
        for (; i < r2 && (u2(), !(i >= r2)); ) {
          var O = e3.charCodeAt(i);
          if (a(1), O !== 60)
            return b2("expected <");
          if (i >= r2)
            return b2("unexpected end of input");
          var j = e3.charCodeAt(i);
          if (j !== 63)
            if (j !== 33) {
              if (j === 47) {
                if (a(1), u2(), l2("plist")) {
                  h2(">");
                  continue;
                }
                if (l2("dict")) {
                  h2(">"), I();
                  continue;
                }
                if (l2("array")) {
                  h2(">"), A();
                  continue;
                }
                return b2("unexpected closed tag");
              }
              var F = (w = void 0, k2 = void 0, w = p2(">"), k2 = false, w.charCodeAt(w.length - 1) === 47 && (k2 = true, w = w.substring(0, w.length - 1)), { name: w.trim(), isClosed: k2 });
              switch (F.name) {
                case "dict":
                  f2 === 1 ? R() : f2 === 2 ? P() : (d2 = {}, n3 !== null && (d2[n3] = { filename: t3, line: o, char: s }), y(1, d2)), F.isClosed && I();
                  continue;
                case "array":
                  f2 === 1 ? S() : f2 === 2 ? x() : y(2, d2 = []), F.isClosed && A();
                  continue;
                case "key":
                  C = E(F), f2 !== 1 ? b2("unexpected <key>") : _ !== null ? b2("too many <key>") : _ = C;
                  continue;
                case "string":
                  T(E(F));
                  continue;
                case "real":
                  L(parseFloat(E(F)));
                  continue;
                case "integer":
                  M(parseInt(E(F), 10));
                  continue;
                case "date":
                  G(new Date(E(F)));
                  continue;
                case "data":
                  D(E(F));
                  continue;
                case "true":
                  E(F), N(true);
                  continue;
                case "false":
                  E(F), N(false);
                  continue;
              }
              if (!/^plist/.test(F.name))
                return b2("unexpected opened tag " + F.name);
            } else {
              if (a(1), l2("--")) {
                h2("-->");
                continue;
              }
              h2(">");
            }
          else
            a(1), h2("?>");
        }
        return d2;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.parseWithLocation = function(e3, t3, n3) {
        return r(e3, t3, n3);
      }, t2.parse = function(e3) {
        return r(e3, null, null);
      };
    }, function(e2, t2, n2) {
      function r(e3, t3) {
        throw new Error("Near offset " + e3.pos + ": " + t3 + " ~~~" + e3.source.substr(e3.pos, 50) + "~~~");
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.parse = function(e3, t3, n3) {
        var a = new i(e3), c2 = new o(), u2 = 0, l2 = null, h2 = [], p2 = [];
        function f2() {
          h2.push(u2), p2.push(l2);
        }
        function d2() {
          u2 = h2.pop(), l2 = p2.pop();
        }
        function g2(e4) {
          r(a, e4);
        }
        for (; s(a, c2); ) {
          if (u2 === 0) {
            if (l2 !== null && g2("too many constructs in root"), c2.type === 3) {
              l2 = {}, n3 && (l2.$vscodeTextmateLocation = c2.toLocation(t3)), f2(), u2 = 1;
              continue;
            }
            if (c2.type === 2) {
              l2 = [], f2(), u2 = 4;
              continue;
            }
            g2("unexpected token in root");
          }
          if (u2 === 2) {
            if (c2.type === 5) {
              d2();
              continue;
            }
            if (c2.type === 7) {
              u2 = 3;
              continue;
            }
            g2("expected , or }");
          }
          if (u2 === 1 || u2 === 3) {
            if (u2 === 1 && c2.type === 5) {
              d2();
              continue;
            }
            if (c2.type === 1) {
              var m2 = c2.value;
              if (s(a, c2) && c2.type === 6 || g2("expected colon"), s(a, c2) || g2("expected value"), u2 = 2, c2.type === 1) {
                l2[m2] = c2.value;
                continue;
              }
              if (c2.type === 8) {
                l2[m2] = null;
                continue;
              }
              if (c2.type === 9) {
                l2[m2] = true;
                continue;
              }
              if (c2.type === 10) {
                l2[m2] = false;
                continue;
              }
              if (c2.type === 11) {
                l2[m2] = parseFloat(c2.value);
                continue;
              }
              if (c2.type === 2) {
                var _ = [];
                l2[m2] = _, f2(), u2 = 4, l2 = _;
                continue;
              }
              if (c2.type === 3) {
                var y = {};
                n3 && (y.$vscodeTextmateLocation = c2.toLocation(t3)), l2[m2] = y, f2(), u2 = 1, l2 = y;
                continue;
              }
            }
            g2("unexpected token in dict");
          }
          if (u2 === 5) {
            if (c2.type === 4) {
              d2();
              continue;
            }
            if (c2.type === 7) {
              u2 = 6;
              continue;
            }
            g2("expected , or ]");
          }
          if (u2 === 4 || u2 === 6) {
            if (u2 === 4 && c2.type === 4) {
              d2();
              continue;
            }
            if (u2 = 5, c2.type === 1) {
              l2.push(c2.value);
              continue;
            }
            if (c2.type === 8) {
              l2.push(null);
              continue;
            }
            if (c2.type === 9) {
              l2.push(true);
              continue;
            }
            if (c2.type === 10) {
              l2.push(false);
              continue;
            }
            if (c2.type === 11) {
              l2.push(parseFloat(c2.value));
              continue;
            }
            if (c2.type === 2) {
              _ = [];
              l2.push(_), f2(), u2 = 4, l2 = _;
              continue;
            }
            if (c2.type === 3) {
              y = {};
              n3 && (y.$vscodeTextmateLocation = c2.toLocation(t3)), l2.push(y), f2(), u2 = 1, l2 = y;
              continue;
            }
            g2("unexpected token in array");
          }
          g2("unknown state");
        }
        return p2.length !== 0 && g2("unclosed constructs"), l2;
      };
      var i = function(e3) {
        this.source = e3, this.pos = 0, this.len = e3.length, this.line = 1, this.char = 0;
      }, o = function() {
        function e3() {
          this.value = null, this.type = 0, this.offset = -1, this.len = -1, this.line = -1, this.char = -1;
        }
        return e3.prototype.toLocation = function(e4) {
          return { filename: e4, line: this.line, char: this.char };
        }, e3;
      }();
      function s(e3, t3) {
        t3.value = null, t3.type = 0, t3.offset = -1, t3.len = -1, t3.line = -1, t3.char = -1;
        for (var n3, i2 = e3.source, o2 = e3.pos, s2 = e3.len, a = e3.line, c2 = e3.char; ; ) {
          if (o2 >= s2)
            return false;
          if ((n3 = i2.charCodeAt(o2)) !== 32 && n3 !== 9 && n3 !== 13) {
            if (n3 !== 10)
              break;
            o2++, a++, c2 = 0;
          } else
            o2++, c2++;
        }
        if (t3.offset = o2, t3.line = a, t3.char = c2, n3 === 34) {
          for (t3.type = 1, o2++, c2++; ; ) {
            if (o2 >= s2)
              return false;
            if (n3 = i2.charCodeAt(o2), o2++, c2++, n3 !== 92) {
              if (n3 === 34)
                break;
            } else
              o2++, c2++;
          }
          t3.value = i2.substring(t3.offset + 1, o2 - 1).replace(/\\u([0-9A-Fa-f]{4})/g, function(e4, t4) {
            return String.fromCodePoint(parseInt(t4, 16));
          }).replace(/\\(.)/g, function(t4, n4) {
            switch (n4) {
              case '"':
                return '"';
              case "\\":
                return "\\";
              case "/":
                return "/";
              case "b":
                return "\b";
              case "f":
                return "\f";
              case "n":
                return "\n";
              case "r":
                return "\r";
              case "t":
                return "	";
              default:
                r(e3, "invalid escape sequence");
            }
            throw new Error("unreachable");
          });
        } else if (n3 === 91)
          t3.type = 2, o2++, c2++;
        else if (n3 === 123)
          t3.type = 3, o2++, c2++;
        else if (n3 === 93)
          t3.type = 4, o2++, c2++;
        else if (n3 === 125)
          t3.type = 5, o2++, c2++;
        else if (n3 === 58)
          t3.type = 6, o2++, c2++;
        else if (n3 === 44)
          t3.type = 7, o2++, c2++;
        else if (n3 === 110) {
          if (t3.type = 8, o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 117)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 108)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 108)
            return false;
          o2++, c2++;
        } else if (n3 === 116) {
          if (t3.type = 9, o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 114)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 117)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 101)
            return false;
          o2++, c2++;
        } else if (n3 === 102) {
          if (t3.type = 10, o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 97)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 108)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 115)
            return false;
          if (o2++, c2++, (n3 = i2.charCodeAt(o2)) !== 101)
            return false;
          o2++, c2++;
        } else
          for (t3.type = 11; ; ) {
            if (o2 >= s2)
              return false;
            if (!((n3 = i2.charCodeAt(o2)) === 46 || n3 >= 48 && n3 <= 57 || n3 === 101 || n3 === 69 || n3 === 45 || n3 === 43))
              break;
            o2++, c2++;
          }
        return t3.len = o2 - t3.offset, t3.value === null && (t3.value = i2.substr(t3.offset, t3.len)), e3.pos = o2, e3.line = a, e3.char = c2, true;
      }
    }, function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r = function(e3, t3, n3, r2, i2, o2) {
        this.scope = e3, this.parentScopes = t3, this.index = n3, this.fontStyle = r2, this.foreground = i2, this.background = o2;
      };
      function i(e3) {
        return !!/^#[0-9a-f]{6}$/i.test(e3) || (!!/^#[0-9a-f]{8}$/i.test(e3) || (!!/^#[0-9a-f]{3}$/i.test(e3) || !!/^#[0-9a-f]{4}$/i.test(e3)));
      }
      function o(e3) {
        if (!e3)
          return [];
        if (!e3.settings || !Array.isArray(e3.settings))
          return [];
        for (var t3 = e3.settings, n3 = [], o2 = 0, s2 = 0, a2 = t3.length; s2 < a2; s2++) {
          var c3 = t3[s2];
          if (c3.settings) {
            var u3 = void 0;
            if (typeof c3.scope == "string")
              u3 = c3.scope.replace(/^[,]+/, "").replace(/[,]+$/, "").split(",");
            else
              u3 = Array.isArray(c3.scope) ? c3.scope : [""];
            var l3 = -1;
            if (typeof c3.settings.fontStyle == "string") {
              l3 = 0;
              for (var h3 = 0, p3 = (g2 = c3.settings.fontStyle.split(" ")).length; h3 < p3; h3++) {
                switch (g2[h3]) {
                  case "italic":
                    l3 |= 1;
                    break;
                  case "bold":
                    l3 |= 2;
                    break;
                  case "underline":
                    l3 |= 4;
                }
              }
            }
            var f2 = null;
            typeof c3.settings.foreground == "string" && i(c3.settings.foreground) && (f2 = c3.settings.foreground);
            var d2 = null;
            typeof c3.settings.background == "string" && i(c3.settings.background) && (d2 = c3.settings.background);
            for (h3 = 0, p3 = u3.length; h3 < p3; h3++) {
              var g2, m2 = (g2 = u3[h3].trim().split(" "))[g2.length - 1], _ = null;
              g2.length > 1 && (_ = g2.slice(0, g2.length - 1)).reverse(), n3[o2++] = new r(m2, _, s2, l3, f2, d2);
            }
          }
        }
        return n3;
      }
      function s(e3, t3) {
        e3.sort(function(e4, t4) {
          var n4 = u2(e4.scope, t4.scope);
          return n4 !== 0 || (n4 = l2(e4.parentScopes, t4.parentScopes)) !== 0 ? n4 : e4.index - t4.index;
        });
        for (var n3 = 0, r2 = "#000000", i2 = "#ffffff"; e3.length >= 1 && e3[0].scope === ""; ) {
          var o2 = e3.shift();
          o2.fontStyle !== -1 && (n3 = o2.fontStyle), o2.foreground !== null && (r2 = o2.foreground), o2.background !== null && (i2 = o2.background);
        }
        for (var s2 = new a(t3), f2 = new h2(0, null, n3, s2.getId(r2), s2.getId(i2)), d2 = new p2(new h2(0, null, -1, 0, 0), []), g2 = 0, m2 = e3.length; g2 < m2; g2++) {
          var _ = e3[g2];
          d2.insert(0, _.scope, _.parentScopes, _.fontStyle, s2.getId(_.foreground), s2.getId(_.background));
        }
        return new c2(s2, f2, d2);
      }
      t2.ParsedThemeRule = r, t2.parseTheme = o;
      var a = function() {
        function e3(e4) {
          if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(e4)) {
            this._isFrozen = true;
            for (var t3 = 0, n3 = e4.length; t3 < n3; t3++)
              this._color2id[e4[t3]] = t3, this._id2color[t3] = e4[t3];
          } else
            this._isFrozen = false;
        }
        return e3.prototype.getId = function(e4) {
          if (e4 === null)
            return 0;
          e4 = e4.toUpperCase();
          var t3 = this._color2id[e4];
          if (t3)
            return t3;
          if (this._isFrozen)
            throw new Error("Missing color in color map - " + e4);
          return t3 = ++this._lastColorId, this._color2id[e4] = t3, this._id2color[t3] = e4, t3;
        }, e3.prototype.getColorMap = function() {
          return this._id2color.slice(0);
        }, e3;
      }();
      t2.ColorMap = a;
      var c2 = function() {
        function e3(e4, t3, n3) {
          this._colorMap = e4, this._root = n3, this._defaults = t3, this._cache = {};
        }
        return e3.createFromRawTheme = function(e4, t3) {
          return this.createFromParsedTheme(o(e4), t3);
        }, e3.createFromParsedTheme = function(e4, t3) {
          return s(e4, t3);
        }, e3.prototype.getColorMap = function() {
          return this._colorMap.getColorMap();
        }, e3.prototype.getDefaults = function() {
          return this._defaults;
        }, e3.prototype.match = function(e4) {
          return this._cache.hasOwnProperty(e4) || (this._cache[e4] = this._root.match(e4)), this._cache[e4];
        }, e3;
      }();
      function u2(e3, t3) {
        return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
      }
      function l2(e3, t3) {
        if (e3 === null && t3 === null)
          return 0;
        if (!e3)
          return -1;
        if (!t3)
          return 1;
        var n3 = e3.length, r2 = t3.length;
        if (n3 === r2) {
          for (var i2 = 0; i2 < n3; i2++) {
            var o2 = u2(e3[i2], t3[i2]);
            if (o2 !== 0)
              return o2;
          }
          return 0;
        }
        return n3 - r2;
      }
      t2.Theme = c2, t2.strcmp = u2, t2.strArrCmp = l2;
      var h2 = function() {
        function e3(e4, t3, n3, r2, i2) {
          this.scopeDepth = e4, this.parentScopes = t3, this.fontStyle = n3, this.foreground = r2, this.background = i2;
        }
        return e3.prototype.clone = function() {
          return new e3(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
        }, e3.cloneArr = function(e4) {
          for (var t3 = [], n3 = 0, r2 = e4.length; n3 < r2; n3++)
            t3[n3] = e4[n3].clone();
          return t3;
        }, e3.prototype.acceptOverwrite = function(e4, t3, n3, r2) {
          this.scopeDepth > e4 ? console.log("how did this happen?") : this.scopeDepth = e4, t3 !== -1 && (this.fontStyle = t3), n3 !== 0 && (this.foreground = n3), r2 !== 0 && (this.background = r2);
        }, e3;
      }();
      t2.ThemeTrieElementRule = h2;
      var p2 = function() {
        function e3(e4, t3, n3) {
          t3 === void 0 && (t3 = []), n3 === void 0 && (n3 = {}), this._mainRule = e4, this._rulesWithParentScopes = t3, this._children = n3;
        }
        return e3._sortBySpecificity = function(e4) {
          return e4.length === 1 || e4.sort(this._cmpBySpecificity), e4;
        }, e3._cmpBySpecificity = function(e4, t3) {
          if (e4.scopeDepth === t3.scopeDepth) {
            var n3 = e4.parentScopes, r2 = t3.parentScopes, i2 = n3 === null ? 0 : n3.length, o2 = r2 === null ? 0 : r2.length;
            if (i2 === o2)
              for (var s2 = 0; s2 < i2; s2++) {
                var a2 = n3[s2].length, c3 = r2[s2].length;
                if (a2 !== c3)
                  return c3 - a2;
              }
            return o2 - i2;
          }
          return t3.scopeDepth - e4.scopeDepth;
        }, e3.prototype.match = function(t3) {
          if (t3 === "")
            return e3._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
          var n3, r2, i2 = t3.indexOf(".");
          return i2 === -1 ? (n3 = t3, r2 = "") : (n3 = t3.substring(0, i2), r2 = t3.substring(i2 + 1)), this._children.hasOwnProperty(n3) ? this._children[n3].match(r2) : e3._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }, e3.prototype.insert = function(t3, n3, r2, i2, o2, s2) {
          if (n3 !== "") {
            var a2, c3, u3, l3 = n3.indexOf(".");
            l3 === -1 ? (a2 = n3, c3 = "") : (a2 = n3.substring(0, l3), c3 = n3.substring(l3 + 1)), this._children.hasOwnProperty(a2) ? u3 = this._children[a2] : (u3 = new e3(this._mainRule.clone(), h2.cloneArr(this._rulesWithParentScopes)), this._children[a2] = u3), u3.insert(t3 + 1, c3, r2, i2, o2, s2);
          } else
            this._doInsertHere(t3, r2, i2, o2, s2);
        }, e3.prototype._doInsertHere = function(e4, t3, n3, r2, i2) {
          if (t3 !== null) {
            for (var o2 = 0, s2 = this._rulesWithParentScopes.length; o2 < s2; o2++) {
              var a2 = this._rulesWithParentScopes[o2];
              if (l2(a2.parentScopes, t3) === 0)
                return void a2.acceptOverwrite(e4, n3, r2, i2);
            }
            n3 === -1 && (n3 = this._mainRule.fontStyle), r2 === 0 && (r2 = this._mainRule.foreground), i2 === 0 && (i2 = this._mainRule.background), this._rulesWithParentScopes.push(new h2(e4, t3, n3, r2, i2));
          } else
            this._mainRule.acceptOverwrite(e4, n3, r2, i2);
        }, e3;
      }();
      t2.ThemeTrieElement = p2;
    }]);
  });
})(main);
const languages = [
  {
    id: "abap",
    scopeName: "source.abap",
    path: "abap.tmLanguage.json",
    samplePath: "abap.sample"
  },
  {
    id: "actionscript-3",
    scopeName: "source.actionscript.3",
    path: "actionscript-3.tmLanguage.json",
    samplePath: "actionscript-3.sample"
  },
  {
    id: "ada",
    scopeName: "source.ada",
    path: "ada.tmLanguage.json",
    samplePath: "ada.sample"
  },
  {
    id: "apache",
    scopeName: "source.apacheconf",
    path: "apache.tmLanguage.json"
  },
  {
    id: "apex",
    scopeName: "source.apex",
    path: "apex.tmLanguage.json",
    samplePath: "apex.sample"
  },
  {
    id: "apl",
    scopeName: "source.apl",
    path: "apl.tmLanguage.json",
    embeddedLangs: ["html", "xml", "css", "javascript", "json"]
  },
  {
    id: "applescript",
    scopeName: "source.applescript",
    path: "applescript.tmLanguage.json",
    samplePath: "applescript.sample"
  },
  {
    id: "asm",
    scopeName: "source.asm.x86_64",
    path: "asm.tmLanguage.json",
    samplePath: "asm.sample"
  },
  {
    id: "astro",
    scopeName: "text.html.astro",
    path: "astro.tmLanguage.json",
    samplePath: "astro.sample",
    embeddedLangs: ["css", "javascript", "less", "sass", "scss", "stylus", "typescript", "tsx"]
  },
  {
    id: "awk",
    scopeName: "source.awk",
    path: "awk.tmLanguage.json",
    samplePath: "awk.sample"
  },
  {
    id: "ballerina",
    scopeName: "source.ballerina",
    path: "ballerina.tmLanguage.json",
    samplePath: "ballerina.sample"
  },
  {
    id: "bat",
    scopeName: "source.batchfile",
    path: "bat.tmLanguage.json",
    samplePath: "bat.sample",
    aliases: ["batch"]
  },
  {
    id: "berry",
    scopeName: "source.berry",
    path: "berry.tmLanguage.json",
    samplePath: "berry.sample",
    aliases: ["be"]
  },
  {
    id: "bibtex",
    scopeName: "text.bibtex",
    path: "bibtex.tmLanguage.json"
  },
  {
    id: "bicep",
    scopeName: "source.bicep",
    path: "bicep.tmLanguage.json",
    samplePath: "bicep.sample"
  },
  {
    id: "c",
    scopeName: "source.c",
    path: "c.tmLanguage.json",
    samplePath: "c.sample"
  },
  {
    id: "clojure",
    scopeName: "source.clojure",
    path: "clojure.tmLanguage.json",
    samplePath: "clojure.sample",
    aliases: ["clj"]
  },
  {
    id: "cobol",
    scopeName: "source.cobol",
    path: "cobol.tmLanguage.json",
    samplePath: "cobol.sample",
    embeddedLangs: ["sql", "html", "java"]
  },
  {
    id: "codeql",
    scopeName: "source.ql",
    path: "codeql.tmLanguage.json",
    samplePath: "codeql.sample",
    aliases: ["ql"]
  },
  {
    id: "coffee",
    scopeName: "source.coffee",
    path: "coffee.tmLanguage.json",
    samplePath: "coffee.sample",
    embeddedLangs: ["javascript"]
  },
  {
    id: "cpp",
    scopeName: "source.cpp",
    path: "cpp.tmLanguage.json",
    samplePath: "cpp.sample",
    embeddedLangs: ["sql"]
  },
  {
    id: "crystal",
    scopeName: "source.crystal",
    path: "crystal.tmLanguage.json",
    samplePath: "crystal.sample",
    embeddedLangs: ["html", "sql", "css", "c", "javascript", "shellscript"]
  },
  {
    id: "csharp",
    scopeName: "source.cs",
    path: "csharp.tmLanguage.json",
    samplePath: "csharp.sample",
    aliases: ["c#"]
  },
  {
    id: "css",
    scopeName: "source.css",
    path: "css.tmLanguage.json",
    samplePath: "css.sample"
  },
  {
    id: "cue",
    scopeName: "source.cue",
    path: "cue.tmLanguage.json",
    samplePath: "cue.sample"
  },
  {
    id: "d",
    scopeName: "source.d",
    path: "d.tmLanguage.json",
    samplePath: "d.sample"
  },
  {
    id: "dart",
    scopeName: "source.dart",
    path: "dart.tmLanguage.json",
    samplePath: "dart.sample"
  },
  {
    id: "diff",
    scopeName: "source.diff",
    path: "diff.tmLanguage.json",
    samplePath: "diff.sample"
  },
  {
    id: "docker",
    scopeName: "source.dockerfile",
    path: "docker.tmLanguage.json",
    samplePath: "docker.sample"
  },
  {
    id: "dream-maker",
    scopeName: "source.dm",
    path: "dream-maker.tmLanguage.json"
  },
  {
    id: "elixir",
    scopeName: "source.elixir",
    path: "elixir.tmLanguage.json",
    samplePath: "elixir.sample",
    embeddedLangs: ["html"]
  },
  {
    id: "elm",
    scopeName: "source.elm",
    path: "elm.tmLanguage.json",
    samplePath: "elm.sample"
  },
  {
    id: "erb",
    scopeName: "text.html.erb",
    path: "erb.tmLanguage.json",
    samplePath: "erb.sample",
    embeddedLangs: ["html", "ruby"]
  },
  {
    id: "erlang",
    scopeName: "source.erlang",
    path: "erlang.tmLanguage.json",
    samplePath: "erlang.sample"
  },
  {
    id: "fish",
    scopeName: "source.fish",
    path: "fish.tmLanguage.json",
    samplePath: "fish.sample"
  },
  {
    id: "fsharp",
    scopeName: "source.fsharp",
    path: "fsharp.tmLanguage.json",
    samplePath: "fsharp.sample",
    aliases: ["f#"],
    embeddedLangs: ["markdown"]
  },
  {
    id: "gherkin",
    scopeName: "text.gherkin.feature",
    path: "gherkin.tmLanguage.json"
  },
  {
    id: "git-commit",
    scopeName: "text.git-commit",
    path: "git-commit.tmLanguage.json",
    embeddedLangs: ["diff"]
  },
  {
    id: "git-rebase",
    scopeName: "text.git-rebase",
    path: "git-rebase.tmLanguage.json",
    embeddedLangs: ["shellscript"]
  },
  {
    id: "gnuplot",
    scopeName: "source.gnuplot",
    path: "gnuplot.tmLanguage.json"
  },
  {
    id: "go",
    scopeName: "source.go",
    path: "go.tmLanguage.json",
    samplePath: "go.sample"
  },
  {
    id: "graphql",
    scopeName: "source.graphql",
    path: "graphql.tmLanguage.json",
    embeddedLangs: ["javascript", "typescript", "jsx", "tsx"]
  },
  {
    id: "groovy",
    scopeName: "source.groovy",
    path: "groovy.tmLanguage.json"
  },
  {
    id: "hack",
    scopeName: "source.hack",
    path: "hack.tmLanguage.json",
    embeddedLangs: ["html", "sql"]
  },
  {
    id: "haml",
    scopeName: "text.haml",
    path: "haml.tmLanguage.json",
    embeddedLangs: ["ruby", "javascript", "sass", "coffee", "markdown", "css"]
  },
  {
    id: "handlebars",
    scopeName: "text.html.handlebars",
    path: "handlebars.tmLanguage.json",
    aliases: ["hbs"],
    embeddedLangs: ["html", "css", "javascript", "yaml"]
  },
  {
    id: "haskell",
    scopeName: "source.haskell",
    path: "haskell.tmLanguage.json"
  },
  {
    id: "hcl",
    scopeName: "source.hcl",
    path: "hcl.tmLanguage.json"
  },
  {
    id: "hlsl",
    scopeName: "source.hlsl",
    path: "hlsl.tmLanguage.json"
  },
  {
    id: "html",
    scopeName: "text.html.basic",
    path: "html.tmLanguage.json",
    samplePath: "html.sample",
    embeddedLangs: ["javascript", "css"]
  },
  {
    id: "ini",
    scopeName: "source.ini",
    path: "ini.tmLanguage.json"
  },
  {
    id: "java",
    scopeName: "source.java",
    path: "java.tmLanguage.json",
    samplePath: "java.sample"
  },
  {
    id: "javascript",
    scopeName: "source.js",
    path: "javascript.tmLanguage.json",
    samplePath: "javascript.sample",
    aliases: ["js"]
  },
  {
    id: "jinja-html",
    scopeName: "text.html.jinja",
    path: "jinja-html.tmLanguage.json",
    embeddedLangs: ["html"]
  },
  {
    id: "json",
    scopeName: "source.json",
    path: "json.tmLanguage.json"
  },
  {
    id: "jsonc",
    scopeName: "source.json.comments",
    path: "jsonc.tmLanguage.json"
  },
  {
    id: "jsonnet",
    scopeName: "source.jsonnet",
    path: "jsonnet.tmLanguage.json"
  },
  {
    id: "jssm",
    scopeName: "source.jssm",
    path: "jssm.tmLanguage.json",
    samplePath: "jssm.sample",
    aliases: ["fsl"]
  },
  {
    id: "jsx",
    scopeName: "source.js.jsx",
    path: "jsx.tmLanguage.json"
  },
  {
    id: "julia",
    scopeName: "source.julia",
    path: "julia.tmLanguage.json",
    embeddedLangs: ["cpp", "python", "javascript", "r", "sql"]
  },
  {
    id: "jupyter",
    scopeName: "source.jupyter",
    path: "jupyter.tmLanguage.json",
    embeddedLangs: ["json"]
  },
  {
    id: "kotlin",
    scopeName: "source.kotlin",
    path: "kotlin.tmLanguage.json"
  },
  {
    id: "latex",
    scopeName: "text.tex.latex",
    path: "latex.tmLanguage.json",
    embeddedLangs: ["tex", "css", "html", "java", "javascript", "typescript", "lua", "python", "julia", "ruby", "xml", "yaml", "cpp", "haskell", "scala", "gnuplot"]
  },
  {
    id: "less",
    scopeName: "source.css.less",
    path: "less.tmLanguage.json",
    embeddedLangs: ["css"]
  },
  {
    id: "lisp",
    scopeName: "source.lisp",
    path: "lisp.tmLanguage.json"
  },
  {
    id: "logo",
    scopeName: "source.logo",
    path: "logo.tmLanguage.json"
  },
  {
    id: "lua",
    scopeName: "source.lua",
    path: "lua.tmLanguage.json",
    embeddedLangs: ["c"]
  },
  {
    id: "make",
    scopeName: "source.makefile",
    path: "make.tmLanguage.json",
    aliases: ["makefile"]
  },
  {
    id: "markdown",
    scopeName: "text.html.markdown",
    path: "markdown.tmLanguage.json",
    aliases: ["md"],
    embeddedLangs: ["css", "html", "ini", "java", "lua", "make", "perl", "r", "ruby", "php", "sql", "vb", "xml", "xsl", "yaml", "bat", "clojure", "coffee", "c", "cpp", "diff", "docker", "git-commit", "git-rebase", "go", "groovy", "pug", "javascript", "json", "jsonc", "less", "objective-c", "swift", "scss", "raku", "powershell", "python", "rust", "scala", "shellscript", "typescript", "tsx", "csharp", "fsharp", "dart", "handlebars", "erlang", "elixir", "latex", "bibtex"]
  },
  {
    id: "marko",
    scopeName: "text.marko",
    path: "marko.tmLanguage.json",
    samplePath: "marko.sample",
    embeddedLangs: ["css", "less", "scss", "javascript"]
  },
  {
    id: "matlab",
    scopeName: "source.matlab",
    path: "matlab.tmLanguage.json"
  },
  {
    id: "mdx",
    scopeName: "text.html.markdown.jsx",
    path: "mdx.tmLanguage.json",
    embeddedLangs: ["jsx", "markdown"]
  },
  {
    id: "nginx",
    scopeName: "source.nginx",
    path: "nginx.tmLanguage.json",
    embeddedLangs: ["lua"]
  },
  {
    id: "nim",
    scopeName: "source.nim",
    path: "nim.tmLanguage.json",
    embeddedLangs: ["c", "html", "xml", "javascript", "css", "markdown"]
  },
  {
    id: "nix",
    scopeName: "source.nix",
    path: "nix.tmLanguage.json"
  },
  {
    id: "objective-c",
    scopeName: "source.objc",
    path: "objective-c.tmLanguage.json",
    aliases: ["objc"]
  },
  {
    id: "objective-cpp",
    scopeName: "source.objcpp",
    path: "objective-cpp.tmLanguage.json"
  },
  {
    id: "ocaml",
    scopeName: "source.ocaml",
    path: "ocaml.tmLanguage.json"
  },
  {
    id: "pascal",
    scopeName: "source.pascal",
    path: "pascal.tmLanguage.json"
  },
  {
    id: "perl",
    scopeName: "source.perl",
    path: "perl.tmLanguage.json",
    embeddedLangs: ["html", "xml", "css", "javascript", "sql"]
  },
  {
    id: "php",
    scopeName: "source.php",
    path: "php.tmLanguage.json",
    embeddedLangs: ["html", "xml", "sql", "javascript", "json", "css"]
  },
  {
    id: "plsql",
    scopeName: "source.plsql.oracle",
    path: "plsql.tmLanguage.json"
  },
  {
    id: "postcss",
    scopeName: "source.css.postcss",
    path: "postcss.tmLanguage.json"
  },
  {
    id: "powershell",
    scopeName: "source.powershell",
    path: "powershell.tmLanguage.json",
    aliases: ["ps", "ps1"]
  },
  {
    id: "prisma",
    scopeName: "source.prisma",
    path: "prisma.tmLanguage.json",
    samplePath: "prisma.sample"
  },
  {
    id: "prolog",
    scopeName: "source.prolog",
    path: "prolog.tmLanguage.json"
  },
  {
    id: "pug",
    scopeName: "text.pug",
    path: "pug.tmLanguage.json",
    aliases: ["jade"],
    embeddedLangs: ["javascript", "css", "sass", "stylus", "coffee", "html"]
  },
  {
    id: "puppet",
    scopeName: "source.puppet",
    path: "puppet.tmLanguage.json"
  },
  {
    id: "purescript",
    scopeName: "source.purescript",
    path: "purescript.tmLanguage.json"
  },
  {
    id: "python",
    scopeName: "source.python",
    path: "python.tmLanguage.json",
    samplePath: "python.sample",
    aliases: ["py"]
  },
  {
    id: "r",
    scopeName: "source.r",
    path: "r.tmLanguage.json"
  },
  {
    id: "raku",
    scopeName: "source.perl.6",
    path: "raku.tmLanguage.json",
    aliases: ["perl6"]
  },
  {
    id: "razor",
    scopeName: "text.aspnetcorerazor",
    path: "razor.tmLanguage.json",
    embeddedLangs: ["html", "csharp"]
  },
  {
    id: "rel",
    scopeName: "source.rel",
    path: "rel.tmLanguage.json",
    samplePath: "rel.sample"
  },
  {
    id: "riscv",
    scopeName: "source.riscv",
    path: "riscv.tmLanguage.json"
  },
  {
    id: "ruby",
    scopeName: "source.ruby",
    path: "ruby.tmLanguage.json",
    samplePath: "ruby.sample",
    aliases: ["rb"],
    embeddedLangs: ["html", "xml", "sql", "css", "c", "javascript", "shellscript", "lua"]
  },
  {
    id: "rust",
    scopeName: "source.rust",
    path: "rust.tmLanguage.json",
    aliases: ["rs"]
  },
  {
    id: "sas",
    scopeName: "source.sas",
    path: "sas.tmLanguage.json",
    embeddedLangs: ["sql"]
  },
  {
    id: "sass",
    scopeName: "source.sass",
    path: "sass.tmLanguage.json"
  },
  {
    id: "scala",
    scopeName: "source.scala",
    path: "scala.tmLanguage.json"
  },
  {
    id: "scheme",
    scopeName: "source.scheme",
    path: "scheme.tmLanguage.json"
  },
  {
    id: "scss",
    scopeName: "source.css.scss",
    path: "scss.tmLanguage.json",
    embeddedLangs: ["css"]
  },
  {
    id: "shaderlab",
    scopeName: "source.shaderlab",
    path: "shaderlab.tmLanguage.json",
    aliases: ["shader"],
    embeddedLangs: ["hlsl"]
  },
  {
    id: "shellscript",
    scopeName: "source.shell",
    path: "shellscript.tmLanguage.json",
    aliases: ["shell", "bash", "sh", "zsh"],
    embeddedLangs: ["ruby", "python", "applescript", "html", "markdown"]
  },
  {
    id: "smalltalk",
    scopeName: "source.smalltalk",
    path: "smalltalk.tmLanguage.json"
  },
  {
    id: "solidity",
    scopeName: "source.solidity",
    path: "solidity.tmLanguage.json"
  },
  {
    id: "sparql",
    scopeName: "source.sparql",
    path: "sparql.tmLanguage.json",
    samplePath: "sparql.sample",
    embeddedLangs: ["turtle"]
  },
  {
    id: "sql",
    scopeName: "source.sql",
    path: "sql.tmLanguage.json"
  },
  {
    id: "ssh-config",
    scopeName: "source.ssh-config",
    path: "ssh-config.tmLanguage.json"
  },
  {
    id: "stata",
    scopeName: "source.stata",
    path: "stata.tmLanguage.json",
    samplePath: "stata.sample",
    embeddedLangs: ["sql"]
  },
  {
    id: "stylus",
    scopeName: "source.stylus",
    path: "stylus.tmLanguage.json",
    aliases: ["styl"]
  },
  {
    id: "svelte",
    scopeName: "source.svelte",
    path: "svelte.tmLanguage.json",
    embeddedLangs: ["javascript", "typescript", "coffee", "stylus", "sass", "css", "scss", "less", "postcss", "pug", "markdown"]
  },
  {
    id: "swift",
    scopeName: "source.swift",
    path: "swift.tmLanguage.json"
  },
  {
    id: "system-verilog",
    scopeName: "source.systemverilog",
    path: "system-verilog.tmLanguage.json"
  },
  {
    id: "tasl",
    scopeName: "source.tasl",
    path: "tasl.tmLanguage.json",
    samplePath: "tasl.sample"
  },
  {
    id: "tcl",
    scopeName: "source.tcl",
    path: "tcl.tmLanguage.json"
  },
  {
    id: "tex",
    scopeName: "text.tex",
    path: "tex.tmLanguage.json",
    embeddedLangs: ["r"]
  },
  {
    id: "toml",
    scopeName: "source.toml",
    path: "toml.tmLanguage.json"
  },
  {
    id: "tsx",
    scopeName: "source.tsx",
    path: "tsx.tmLanguage.json",
    samplePath: "tsx.sample"
  },
  {
    id: "turtle",
    scopeName: "source.turtle",
    path: "turtle.tmLanguage.json",
    samplePath: "turtle.sample"
  },
  {
    id: "twig",
    scopeName: "text.html.twig",
    path: "twig.tmLanguage.json",
    embeddedLangs: ["css", "javascript", "php", "python", "ruby"]
  },
  {
    id: "typescript",
    scopeName: "source.ts",
    path: "typescript.tmLanguage.json",
    aliases: ["ts"]
  },
  {
    id: "vb",
    scopeName: "source.asp.vb.net",
    path: "vb.tmLanguage.json",
    aliases: ["cmd"]
  },
  {
    id: "verilog",
    scopeName: "source.verilog",
    path: "verilog.tmLanguage.json"
  },
  {
    id: "vhdl",
    scopeName: "source.vhdl",
    path: "vhdl.tmLanguage.json"
  },
  {
    id: "viml",
    scopeName: "source.viml",
    path: "viml.tmLanguage.json",
    aliases: ["vim", "vimscript"]
  },
  {
    id: "vue-html",
    scopeName: "text.html.vue-html",
    path: "vue-html.tmLanguage.json",
    embeddedLangs: ["vue", "javascript"]
  },
  {
    id: "vue",
    scopeName: "source.vue",
    path: "vue.tmLanguage.json",
    embeddedLangs: ["json", "markdown", "pug", "haml", "vue-html", "sass", "scss", "less", "stylus", "postcss", "css", "typescript", "coffee", "javascript"]
  },
  {
    id: "wasm",
    scopeName: "source.wat",
    path: "wasm.tmLanguage.json"
  },
  {
    id: "wenyan",
    scopeName: "source.wenyan",
    path: "wenyan.tmLanguage.json",
    aliases: ["\u6587\u8A00"]
  },
  {
    id: "xml",
    scopeName: "text.xml",
    path: "xml.tmLanguage.json",
    embeddedLangs: ["java"]
  },
  {
    id: "xsl",
    scopeName: "text.xml.xsl",
    path: "xsl.tmLanguage.json",
    embeddedLangs: ["xml"]
  },
  {
    id: "yaml",
    scopeName: "source.yaml",
    path: "yaml.tmLanguage.json"
  },
  {
    id: "zenscript",
    scopeName: "source.zenscript",
    path: "zenscript.tmLanguage.json",
    samplePath: "zenscript.sample"
  }
];
var FontStyle;
(function(FontStyle2) {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
})(FontStyle || (FontStyle = {}));
class StackElementMetadata {
  static toBinaryStr(metadata) {
    let r = metadata.toString(2);
    while (r.length < 32) {
      r = "0" + r;
    }
    return r;
  }
  static printMetadata(metadata) {
    let languageId = StackElementMetadata.getLanguageId(metadata);
    let tokenType = StackElementMetadata.getTokenType(metadata);
    let fontStyle = StackElementMetadata.getFontStyle(metadata);
    let foreground = StackElementMetadata.getForeground(metadata);
    let background = StackElementMetadata.getBackground(metadata);
    console.log({
      languageId,
      tokenType,
      fontStyle,
      foreground,
      background
    });
  }
  static getLanguageId(metadata) {
    return (metadata & 255) >>> 0;
  }
  static getTokenType(metadata) {
    return (metadata & 1792) >>> 8;
  }
  static getFontStyle(metadata) {
    return (metadata & 14336) >>> 11;
  }
  static getForeground(metadata) {
    return (metadata & 8372224) >>> 14;
  }
  static getBackground(metadata) {
    return (metadata & 4286578688) >>> 23;
  }
  static set(metadata, languageId, tokenType, fontStyle, foreground, background) {
    let _languageId = StackElementMetadata.getLanguageId(metadata);
    let _tokenType = StackElementMetadata.getTokenType(metadata);
    let _fontStyle = StackElementMetadata.getFontStyle(metadata);
    let _foreground = StackElementMetadata.getForeground(metadata);
    let _background = StackElementMetadata.getBackground(metadata);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 0) {
      _tokenType = tokenType === 8 ? 0 : tokenType;
    }
    if (fontStyle !== FontStyle.NotSet) {
      _fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _fontStyle << 11 | _foreground << 14 | _background << 23) >>> 0;
  }
}
function trimEndSlash(str) {
  if (str.endsWith("/") || str.endsWith("\\"))
    return str.slice(0, -1);
  return str;
}
function trimStartDot(str) {
  if (str.startsWith("./"))
    return str.slice(2);
  return str;
}
function dirname(str) {
  const parts = str.split(/[\/\\]/g);
  return parts[parts.length - 2];
}
function join(...parts) {
  return parts.map(trimEndSlash).map(trimStartDot).join("/");
}
function groupBy(elements, keyGetter) {
  const map = /* @__PURE__ */ new Map();
  for (const element2 of elements) {
    const key = keyGetter(element2);
    if (map.has(key)) {
      const group = map.get(key);
      group.push(element2);
    } else {
      map.set(key, [element2]);
    }
  }
  return map;
}
function createScanner(text2, ignoreTrivia) {
  if (ignoreTrivia === void 0) {
    ignoreTrivia = false;
  }
  var len = text2.length;
  var pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    var digits = 0;
    var value2 = 0;
    while (digits < count || !exact) {
      var ch = text2.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    var start = pos;
    if (text2.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text2.length && text2.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
        while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text2.substring(start, pos);
      }
    }
    var end = pos;
    if (pos < text2.length && (text2.charCodeAt(pos) === 69 || text2.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text2.length && text2.charCodeAt(pos) === 43 || text2.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
        while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text2.substring(start, end);
  }
  function scanString() {
    var result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text2.substring(start, pos);
        scanError = 2;
        break;
      }
      var ch = text2.charCodeAt(pos);
      if (ch === 34) {
        result += text2.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text2.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        var ch2 = text2.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            var ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text2.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    var code2 = text2.charCodeAt(pos);
    if (isWhiteSpace(code2)) {
      do {
        pos++;
        value += String.fromCharCode(code2);
        code2 = text2.charCodeAt(pos);
      } while (isWhiteSpace(code2));
      return token = 15;
    }
    if (isLineBreak(code2)) {
      pos++;
      value += String.fromCharCode(code2);
      if (code2 === 13 && text2.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code2) {
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        var start = pos - 1;
        if (text2.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text2.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text2.substring(start, pos);
          return token = 12;
        }
        if (text2.charCodeAt(pos + 1) === 42) {
          pos += 2;
          var safeLength = len - 1;
          var commentClosed = false;
          while (pos < safeLength) {
            var ch = text2.charCodeAt(pos);
            if (ch === 42 && text2.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text2.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text2.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code2);
        pos++;
        return token = 16;
      case 45:
        value += String.fromCharCode(code2);
        pos++;
        if (pos === len || !isDigit(text2.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      default:
        while (pos < len && isUnknownContentCharacter(code2)) {
          pos++;
          code2 = text2.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text2.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code2);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code2) {
    if (isWhiteSpace(code2) || isLineBreak(code2)) {
      return false;
    }
    switch (code2) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    var result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: function() {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function() {
      return token;
    },
    getTokenValue: function() {
      return value;
    },
    getTokenOffset: function() {
      return tokenOffset;
    },
    getTokenLength: function() {
      return pos - tokenOffset;
    },
    getTokenStartLine: function() {
      return lineStartOffset;
    },
    getTokenStartCharacter: function() {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function() {
      return scanError;
    }
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch === 5760 || ch >= 8192 && ch <= 8203 || ch === 8239 || ch === 8287 || ch === 12288 || ch === 65279;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function parse$1(text2, errors, options) {
  if (errors === void 0) {
    errors = [];
  }
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var currentProperty = null;
  var currentParent = [];
  var previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  var visitor = {
    onObjectBegin: function() {
      var object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: function(name) {
      currentProperty = name;
    },
    onObjectEnd: function() {
      currentParent = previousParents.pop();
    },
    onArrayBegin: function() {
      var array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: function() {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: function(error, offset, length) {
      errors.push({ error, offset, length });
    }
  };
  visit(text2, visitor, options);
  return currentParent[0];
}
function visit(text2, visitor, options) {
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var _scanner = createScanner(text2, false);
  function toNoArgVisit(visitFunction) {
    return visitFunction ? function() {
      return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? function(arg) {
      return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  var disallowComments = options && options.disallowComments;
  var allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      var token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError(14);
          break;
        case 5:
          handleError(15);
          break;
        case 3:
          handleError(13);
          break;
        case 1:
          if (!disallowComments) {
            handleError(11);
          }
          break;
        case 2:
          handleError(12);
          break;
        case 6:
          handleError(16);
          break;
      }
      switch (token) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError(10);
          } else {
            onComment();
          }
          break;
        case 16:
          handleError(1);
          break;
        case 15:
        case 14:
          break;
        default:
          return token;
      }
    }
  }
  function handleError(error, skipUntilAfter, skipUntil) {
    if (skipUntilAfter === void 0) {
      skipUntilAfter = [];
    }
    if (skipUntil === void 0) {
      skipUntil = [];
    }
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token = _scanner.getToken();
      while (token !== 17) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString(isValue) {
    var value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        var tokenValue = _scanner.getTokenValue();
        var value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(2);
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError(3, [], [2, 5]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError(4, [], [2, 5]);
      }
    } else {
      handleError(5, [], [2, 5]);
    }
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    var needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseProperty()) {
        handleError(4, [], [2, 5]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError(7, [2], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    var needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseValue()) {
        handleError(4, [], [4, 5]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (_scanner.getToken() !== 4) {
      handleError(8, [4], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}
var parse = parse$1;
const isWebWorker = typeof self !== "undefined" && typeof self.WorkerGlobalScope !== "undefined";
const isBrowser = isWebWorker || typeof window !== "undefined" && typeof window.document !== "undefined" && typeof fetch !== "undefined";
let CDN_ROOT = "";
function setCDN(root2) {
  CDN_ROOT = root2;
}
let _onigurumaPromise = null;
async function getOniguruma() {
  if (!_onigurumaPromise) {
    let loader;
    if (isBrowser) {
      {
        loader = main$1.exports.loadWASM({
          data: await fetch(_resolvePath("dist/onig.wasm")).then((r) => r.arrayBuffer())
        });
      }
    } else {
      const path2 = require("path");
      const wasmPath = path2.join(require.resolve("vscode-oniguruma"), "../onig.wasm");
      const fs = require("fs");
      const wasmBin = fs.readFileSync(wasmPath).buffer;
      loader = main$1.exports.loadWASM(wasmBin);
    }
    _onigurumaPromise = loader.then(() => {
      return {
        createOnigScanner(patterns) {
          return main$1.exports.createOnigScanner(patterns);
        },
        createOnigString(s) {
          return main$1.exports.createOnigString(s);
        }
      };
    });
  }
  return _onigurumaPromise;
}
function _resolvePath(filepath) {
  if (isBrowser) {
    if (!CDN_ROOT) {
      console.warn("[Shiki] no CDN provider found, use `setCDN()` to specify the CDN for loading the resources before calling `getHighlighter()`");
    }
    return `${CDN_ROOT}${filepath}`;
  } else {
    const path2 = require("path");
    if (path2.isAbsolute(filepath)) {
      return filepath;
    } else {
      return path2.resolve(__dirname, "..", filepath);
    }
  }
}
async function _fetchAssets(filepath) {
  const path2 = _resolvePath(filepath);
  if (isBrowser) {
    return await fetch(path2).then((r) => r.text());
  } else {
    const fs = require("fs");
    return await fs.promises.readFile(path2, "utf-8");
  }
}
async function _fetchJSONAssets(filepath) {
  const errors = [];
  const rawTheme = parse(await _fetchAssets(filepath), errors, {
    allowTrailingComma: true
  });
  if (errors.length) {
    throw errors[0];
  }
  return rawTheme;
}
async function fetchTheme(themePath) {
  let theme = await _fetchJSONAssets(themePath);
  const shikiTheme = toShikiTheme(theme);
  if (shikiTheme.include) {
    const includedTheme = await fetchTheme(join(dirname(themePath), shikiTheme.include));
    if (includedTheme.settings) {
      shikiTheme.settings = includedTheme.settings.concat(shikiTheme.settings);
    }
    if (includedTheme.bg && !shikiTheme.bg) {
      shikiTheme.bg = includedTheme.bg;
    }
    if (includedTheme.colors) {
      shikiTheme.colors = Object.assign(Object.assign({}, includedTheme.colors), shikiTheme.colors);
    }
    delete shikiTheme.include;
  }
  return shikiTheme;
}
async function fetchGrammar(filepath) {
  return await _fetchJSONAssets(filepath);
}
function repairTheme(theme) {
  if (!theme.settings)
    theme.settings = [];
  if (theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope) {
    return;
  }
  theme.settings.unshift({
    settings: {
      foreground: theme.fg,
      background: theme.bg
    }
  });
}
function toShikiTheme(rawTheme) {
  const type = rawTheme.type || "dark";
  const shikiTheme = Object.assign(Object.assign({ name: rawTheme.name, type }, rawTheme), getThemeDefaultColors(rawTheme));
  if (rawTheme.include) {
    shikiTheme.include = rawTheme.include;
  }
  if (rawTheme.tokenColors) {
    shikiTheme.settings = rawTheme.tokenColors;
    delete shikiTheme.tokenColors;
  }
  repairTheme(shikiTheme);
  return shikiTheme;
}
const VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
const VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
function getThemeDefaultColors(theme) {
  var _a, _b, _c, _d, _e, _f;
  let fg, bg;
  let settings = theme.settings ? theme.settings : theme.tokenColors;
  const globalSetting = settings ? settings.find((s) => {
    return !s.name && !s.scope;
  }) : void 0;
  if ((_a = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _a === void 0 ? void 0 : _a.foreground) {
    fg = globalSetting.settings.foreground;
  }
  if ((_b = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _b === void 0 ? void 0 : _b.background) {
    bg = globalSetting.settings.background;
  }
  if (!fg && ((_d = (_c = theme) === null || _c === void 0 ? void 0 : _c.colors) === null || _d === void 0 ? void 0 : _d["editor.foreground"])) {
    fg = theme.colors["editor.foreground"];
  }
  if (!bg && ((_f = (_e = theme) === null || _e === void 0 ? void 0 : _e.colors) === null || _f === void 0 ? void 0 : _f["editor.background"])) {
    bg = theme.colors["editor.background"];
  }
  if (!fg) {
    fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
  }
  if (!bg) {
    bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
  }
  return {
    fg,
    bg
  };
}
class Resolver {
  constructor(onigLibPromise, onigLibName) {
    this.languagesPath = "languages/";
    this.languageMap = {};
    this.scopeToLangMap = {};
    this._onigLibPromise = onigLibPromise;
    this._onigLibName = onigLibName;
  }
  get onigLib() {
    return this._onigLibPromise;
  }
  getOnigLibName() {
    return this._onigLibName;
  }
  getLangRegistration(langIdOrAlias) {
    return this.languageMap[langIdOrAlias];
  }
  async loadGrammar(scopeName) {
    const lang = this.scopeToLangMap[scopeName];
    if (!lang) {
      return null;
    }
    if (lang.grammar) {
      return lang.grammar;
    }
    const g2 = await fetchGrammar(languages.includes(lang) ? `${this.languagesPath}${lang.path}` : lang.path);
    lang.grammar = g2;
    return g2;
  }
  addLanguage(l2) {
    this.languageMap[l2.id] = l2;
    if (l2.aliases) {
      l2.aliases.forEach((a) => {
        this.languageMap[a] = l2;
      });
    }
    this.scopeToLangMap[l2.scopeName] = l2;
  }
}
function tokenizeWithTheme(theme, colorMap, fileContents, grammar, options) {
  let lines = fileContents.split(/\r\n|\r|\n/);
  let ruleStack = main.exports.INITIAL;
  let actual = [];
  let final = [];
  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, ruleStack);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    let result = grammar.tokenizeLine2(line, ruleStack);
    let tokensLength = result.tokens.length / 2;
    for (let j = 0; j < tokensLength; j++) {
      let startIndex = result.tokens[2 * j];
      let nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
      if (startIndex === nextStartIndex) {
        continue;
      }
      let metadata = result.tokens[2 * j + 1];
      let foreground = StackElementMetadata.getForeground(metadata);
      let foregroundColor = colorMap[foreground];
      let fontStyle = StackElementMetadata.getFontStyle(metadata);
      let explanation = [];
      if (options.includeExplanation) {
        let offset = 0;
        while (startIndex + offset < nextStartIndex) {
          let tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          let tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
          offset += tokenWithScopesText.length;
          explanation.push({
            content: tokenWithScopesText,
            scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
          });
          tokensWithScopesIndex++;
        }
      }
      actual.push({
        content: line.substring(startIndex, nextStartIndex),
        color: foregroundColor,
        fontStyle,
        explanation
      });
    }
    final.push(actual);
    actual = [];
    ruleStack = result.ruleStack;
  }
  return final;
}
function explainThemeScopes(theme, scopes) {
  let result = [];
  for (let i = 0, len = scopes.length; i < len; i++) {
    let parentScopes = scopes.slice(0, i);
    let scope = scopes[i];
    result[i] = {
      scopeName: scope,
      themeMatches: explainThemeScope(theme, scope, parentScopes)
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  let selectorPrefix = selector + ".";
  if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix) {
    return true;
  }
  return false;
}
function matches(selector, selectorParentScopes, scope, parentScopes) {
  if (!matchesOne(selector, scope)) {
    return false;
  }
  let selectorParentIndex = selectorParentScopes.length - 1;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex])) {
      selectorParentIndex--;
    }
    parentIndex--;
  }
  if (selectorParentIndex === -1) {
    return true;
  }
  return false;
}
function explainThemeScope(theme, scope, parentScopes) {
  let result = [], resultLen = 0;
  for (let i = 0, len = theme.settings.length; i < len; i++) {
    let setting = theme.settings[i];
    let selectors;
    if (typeof setting.scope === "string") {
      selectors = setting.scope.split(/,/).map((scope2) => scope2.trim());
    } else if (Array.isArray(setting.scope)) {
      selectors = setting.scope;
    } else {
      continue;
    }
    for (let j = 0, lenJ = selectors.length; j < lenJ; j++) {
      let rawSelector = selectors[j];
      let rawSelectorPieces = rawSelector.split(/ /);
      let selector = rawSelectorPieces[rawSelectorPieces.length - 1];
      let selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);
      if (matches(selector, selectorParentScopes, scope, parentScopes)) {
        result[resultLen++] = setting;
        j = lenJ;
      }
    }
  }
  return result;
}
function renderToHtml(lines, options = {}) {
  var _a;
  const bg = options.bg || "#fff";
  const optionsByLineNumber = groupBy((_a = options.lineOptions) !== null && _a !== void 0 ? _a : [], (option) => option.line);
  let html2 = "";
  html2 += `<pre class="shiki" style="background-color: ${bg}">`;
  if (options.langId) {
    html2 += `<div class="language-id">${options.langId}</div>`;
  }
  html2 += `<code>`;
  lines.forEach((l2, lineIndex) => {
    var _a2;
    const lineNumber = lineIndex + 1;
    const lineOptions = (_a2 = optionsByLineNumber.get(lineNumber)) !== null && _a2 !== void 0 ? _a2 : [];
    const lineClasses = getLineClasses(lineOptions).join(" ");
    html2 += `<span class="${lineClasses}">`;
    l2.forEach((token) => {
      const cssDeclarations = [`color: ${token.color || options.fg}`];
      if (token.fontStyle & FontStyle.Italic) {
        cssDeclarations.push("font-style: italic");
      }
      if (token.fontStyle & FontStyle.Bold) {
        cssDeclarations.push("font-weight: bold");
      }
      if (token.fontStyle & FontStyle.Underline) {
        cssDeclarations.push("text-decoration: underline");
      }
      html2 += `<span style="${cssDeclarations.join("; ")}">${escapeHtml(token.content)}</span>`;
    });
    html2 += `</span>
`;
  });
  html2 = html2.replace(/\n*$/, "");
  html2 += `</code></pre>`;
  return html2;
}
const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHtml(html2) {
  return html2.replace(/[&<>"']/g, (chr) => htmlEscapes[chr]);
}
function getLineClasses(lineOptions) {
  var _a;
  const lineClasses = /* @__PURE__ */ new Set(["line"]);
  for (const lineOption of lineOptions) {
    for (const lineClass of (_a = lineOption.classes) !== null && _a !== void 0 ? _a : []) {
      lineClasses.add(lineClass);
    }
  }
  return Array.from(lineClasses);
}
class Registry extends main.exports.Registry {
  constructor(_resolver) {
    super(_resolver);
    this._resolver = _resolver;
    this.themesPath = "themes/";
    this._resolvedThemes = {};
    this._resolvedGrammars = {};
  }
  getTheme(theme) {
    if (typeof theme === "string") {
      return this._resolvedThemes[theme];
    } else {
      return theme;
    }
  }
  async loadTheme(theme) {
    if (typeof theme === "string") {
      if (!this._resolvedThemes[theme]) {
        this._resolvedThemes[theme] = await fetchTheme(`${this.themesPath}${theme}.json`);
      }
      return this._resolvedThemes[theme];
    } else {
      theme = toShikiTheme(theme);
      if (theme.name) {
        this._resolvedThemes[theme.name] = theme;
      }
      return theme;
    }
  }
  async loadThemes(themes) {
    return await Promise.all(themes.map((theme) => this.loadTheme(theme)));
  }
  getLoadedThemes() {
    return Object.keys(this._resolvedThemes);
  }
  getGrammar(name) {
    return this._resolvedGrammars[name];
  }
  async loadLanguage(lang) {
    const g2 = await this.loadGrammar(lang.scopeName);
    this._resolvedGrammars[lang.id] = g2;
    if (lang.aliases) {
      lang.aliases.forEach((la) => {
        this._resolvedGrammars[la] = g2;
      });
    }
  }
  async loadLanguages(langs) {
    for (const lang of langs) {
      this._resolver.addLanguage(lang);
    }
    for (const lang of langs) {
      await this.loadLanguage(lang);
    }
  }
  getLoadedLanguages() {
    return Object.keys(this._resolvedGrammars);
  }
}
function resolveLang(lang) {
  return typeof lang === "string" ? languages.find((l2) => {
    var _a;
    return l2.id === lang || ((_a = l2.aliases) === null || _a === void 0 ? void 0 : _a.includes(lang));
  }) : lang;
}
function resolveOptions(options) {
  var _a;
  let _languages = languages;
  let _themes = options.themes || [];
  if ((_a = options.langs) === null || _a === void 0 ? void 0 : _a.length) {
    _languages = options.langs.map(resolveLang);
  }
  if (options.theme) {
    _themes.unshift(options.theme);
  }
  if (!_themes.length) {
    _themes = ["nord"];
  }
  return { _languages, _themes };
}
async function getHighlighter(options) {
  var _a, _b;
  const { _languages, _themes } = resolveOptions(options);
  const _resolver = new Resolver(getOniguruma(), "vscode-oniguruma");
  const _registry = new Registry(_resolver);
  if ((_a = options.paths) === null || _a === void 0 ? void 0 : _a.themes) {
    _registry.themesPath = options.paths.themes;
  }
  if ((_b = options.paths) === null || _b === void 0 ? void 0 : _b.languages) {
    _resolver.languagesPath = options.paths.languages;
  }
  const themes = await _registry.loadThemes(_themes);
  const _defaultTheme = themes[0];
  let _currentTheme;
  await _registry.loadLanguages(_languages);
  const COLOR_REPLACEMENTS = {
    "#000001": "var(--shiki-color-text)",
    "#000002": "var(--shiki-color-background)",
    "#000004": "var(--shiki-token-constant)",
    "#000005": "var(--shiki-token-string)",
    "#000006": "var(--shiki-token-comment)",
    "#000007": "var(--shiki-token-keyword)",
    "#000008": "var(--shiki-token-parameter)",
    "#000009": "var(--shiki-token-function)",
    "#000010": "var(--shiki-token-string-expression)",
    "#000011": "var(--shiki-token-punctuation)",
    "#000012": "var(--shiki-token-link)"
  };
  function fixCssVariablesTheme(theme, colorMap) {
    theme.bg = COLOR_REPLACEMENTS[theme.bg] || theme.bg;
    theme.fg = COLOR_REPLACEMENTS[theme.fg] || theme.fg;
    colorMap.forEach((val, i) => {
      colorMap[i] = COLOR_REPLACEMENTS[val] || val;
    });
  }
  function getTheme(theme) {
    const _theme = theme ? _registry.getTheme(theme) : _defaultTheme;
    if (!_theme) {
      throw Error(`No theme registration for ${theme}`);
    }
    if (!_currentTheme || _currentTheme.name !== _theme.name) {
      _registry.setTheme(_theme);
      _currentTheme = _theme;
    }
    const _colorMap = _registry.getColorMap();
    if (_theme.name === "css-variables") {
      fixCssVariablesTheme(_theme, _colorMap);
    }
    return { _theme, _colorMap };
  }
  function getGrammar(lang) {
    const _grammar = _registry.getGrammar(lang);
    if (!_grammar) {
      throw Error(`No language registration for ${lang}`);
    }
    return { _grammar };
  }
  function codeToThemedTokens(code2, lang = "text", theme, options2 = { includeExplanation: true }) {
    if (isPlaintext(lang)) {
      const lines = code2.split(/\r\n|\r|\n/);
      return [...lines.map((line) => [{ content: line }])];
    }
    const { _grammar } = getGrammar(lang);
    const { _theme, _colorMap } = getTheme(theme);
    return tokenizeWithTheme(_theme, _colorMap, code2, _grammar, options2);
  }
  function codeToHtml(code2, arg1 = "text", arg2) {
    let options2;
    if (typeof arg1 === "object") {
      options2 = arg1;
    } else {
      options2 = {
        lang: arg1,
        theme: arg2
      };
    }
    const tokens = codeToThemedTokens(code2, options2.lang, options2.theme, {
      includeExplanation: false
    });
    const { _theme } = getTheme(options2.theme);
    return renderToHtml(tokens, {
      fg: _theme.fg,
      bg: _theme.bg,
      lineOptions: options2 === null || options2 === void 0 ? void 0 : options2.lineOptions
    });
  }
  async function loadTheme(theme) {
    await _registry.loadTheme(theme);
  }
  async function loadLanguage(lang) {
    const _lang = resolveLang(lang);
    _resolver.addLanguage(_lang);
    await _registry.loadLanguage(_lang);
  }
  function getLoadedThemes() {
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    return _registry.getLoadedLanguages();
  }
  function getBackgroundColor(theme) {
    const { _theme } = getTheme(theme);
    return _theme.bg;
  }
  function getForegroundColor(theme) {
    const { _theme } = getTheme(theme);
    return _theme.fg;
  }
  return {
    codeToThemedTokens,
    codeToHtml,
    getTheme: (theme) => {
      return getTheme(theme)._theme;
    },
    loadTheme,
    loadLanguage,
    getBackgroundColor,
    getForegroundColor,
    getLoadedThemes,
    getLoadedLanguages
  };
}
function isPlaintext(lang) {
  return !lang || ["plaintext", "txt", "text"].includes(lang);
}
var css = ".TOCIllustration{align-items:center;display:flex;justify-content:center;margin:30px 0;text-align:center}.TOCIllustration ul{list-style:none;padding:0}.TOCIllustration a,.TOCIllustration li,.TOCIllustration nav,.TOCIllustration ul{border-radius:5px;box-shadow:0 0 10px 1px #3eb0ef60;line-height:2rem;margin:15px;padding:5px 10px}.TOCIllustration a{border:none;display:block;text-decoration:none}";
const MDXMeta = {
  title: "Write a table of contents from scratch!",
  readTime: 4,
  brief: "Follow this post,we will create a beautiful table of contents ! \u2728",
  tags: ["component"],
  cover: "",
  directory: "Write_a_table_of_contents_from_scratch",
  author: {
    id: 1,
    name: "Spark Elf",
    profile: "All fantasy can bloom in your hand !",
    website: "www.SparkElf.com",
    avatar: ""
  }
};
const TOCIllustration = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "TOCIllustration notranslate",
    children: /* @__PURE__ */ jsxs("nav", {
      children: ["nav", /* @__PURE__ */ jsxs("ul", {
        children: ["ul", /* @__PURE__ */ jsxs("li", {
          children: ["li", /* @__PURE__ */ jsx("a", {
            id: "TOCIllustration-1",
            href: "#TOCIllustration-1",
            children: "a\u{1F448}"
          }), /* @__PURE__ */ jsxs("ul", {
            children: ["ul", /* @__PURE__ */ jsxs("li", {
              children: ["li", /* @__PURE__ */ jsx("a", {
                id: "TOCIllustration-2",
                href: "#TOCIllustration-2",
                children: "a\u{1F448}"
              })]
            }), /* @__PURE__ */ jsxs("li", {
              children: ["li", /* @__PURE__ */ jsx("a", {
                id: "TOCIllustration-3",
                href: "#TOCIllustration-3",
                children: "a\u{1F448}"
              })]
            })]
          })]
        })]
      })]
    })
  });
};
const content = () => {
  const [hl, setHL] = useState(null);
  useEffect(() => {
    setCDN(window.serverURL + "/static/shiki/");
    getHighlighter({
      theme: "material-palenight",
      langs: ["tsx", "css"]
    }).then((hl2) => setHL(hl2));
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("style", {
      children: css
    }), /* @__PURE__ */ jsx(Brief, {
      text: MDXMeta.brief
    }), /* @__PURE__ */ jsx(MD, {
      children: "### Interface\\n The toc component expose 3 interface which describe the behavior of it :\\n #### `getHeadingElements` \\n Collect specified dom node as headings.For me ,it is `h1~h6`,which are children of `.Markdown`.\\n #### `processHeadingElements`\\n Turn the headings into a nested data structure and you can custom the algorithm here.\\n #### `refresh`\\n Recommend to assign the article reference to it,so that toc will regenerated according to the new article content.\\n ### Implementation\\n"
    }), /* @__PURE__ */ jsx(Toggle, {
      summary: "`getHeadingElements`",
      children: /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "tsx",
        code: `export const getHeadingElementsDefault=()=>{
    let postNode = document.querySelector(".Markdown")
    return Array.from(postNode.querySelectorAll("h1,h2,h3,h4,h5,h6"))//\u8F6C\u6362\u4E3A\u6570\u7EC4\u65B9\u4FBF\u4F7F\u7528map\u64CD\u4F5C
}`
      })
    }), /* @__PURE__ */ jsxs(Toggle, {
      summary: "`processHeadingElements`",
      children: [/* @__PURE__ */ jsxs(MD, {
        children: ["We traverse the collected headings.\\n\\n The parent node of the first round is a special empty node , and the node traversed in each round is used as the parent node of the next round.\\n\\n In each round , we compare the hierarchy between parent node and child node , then we should backtrace to find the correct parent in case the parent node is higher than the child node , like`", `h5->h3`, "` , which shows a wrong nested case."]
      }), /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "tsx",
        code: `export const processHeadingElementsDefault = (headingElements) => {
    const nestedHeadings = {
        parent: null,
        children: []
    };
    let rank = {
        "H1": 1, "H2": 2, "H3": 3, "H4": 4, "H5": 5, "H6": 6,
    }
    let parent: any = nestedHeadings
    headingElements.forEach((heading, index) => {
        heading.id = "SparkTOC-" + index//\u6CE8\u610Fjs\u9ED8\u8BA4\u5F15\u7528\uFF0C\u8FD9\u4E2A\u64CD\u4F5C\u4F1A\u76F4\u63A5\u4FEE\u6539dom\u5143\u7D20
        const { innerText: title, id } = heading;

        while (parent.parent != null && rank[parent.domNode.nodeName] >= rank[heading.nodeName])//\u56DE\u6EAF
            parent = parent.parent
        let node = {
            parent: parent,
            domNode: heading,
            children: []
        }
        parent.children.push(node)
        parent = node
    });
    return nestedHeadings
}`
      })]
    }), /* @__PURE__ */ jsxs(Toggle, {
      summary: "`refresh`",
      children: [/* @__PURE__ */ jsx(MD, {
        children: "Now,we can combine these two hooks with the refresh control:\\n"
      }), /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "tsx",
        code: `const useHeadings = (getHeadingElements, getNestedHeadings,refresh) => {
    const [nestedHeadings, setNestedHeadings] = useState(null);
    console.log(refresh)
    useEffect(() => {
        console.log('\u6267\u884CuseHeadings')
        const headingElements = getHeadingElements()
        const newNestedHeadings = getNestedHeadings(headingElements);//\u81EA\u5DF1\u51B3\u5B9A\u5D4C\u5957\u65B9\u5F0F
        setNestedHeadings(newNestedHeadings);
    }, [refresh]);

    return [nestedHeadings, setNestedHeadings];
}`
      })]
    }), /* @__PURE__ */ jsxs(Toggle, {
      summary: "`render`",
      children: [/* @__PURE__ */ jsx(MD, {
        children: "The toc html struct is look like below illustration : \\n"
      }), /* @__PURE__ */ jsx(TOCIllustration, {}), /* @__PURE__ */ jsxs(MD, {
        children: ["The `", `<ul/>`, "` determines the nested hierarchy of the toc items , and the `", `<li><a/></li>`, "` make up a toc item.Up to now , we can easily write out the render code:\\n"]
      }), /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "tsx",
        code: `export const TableOfContents:FunctionComponent<TableOfContentsProps,HTMLElement> = ({
    getHeadingElements=getHeadingElementsDefault,
    processHeadingElements = processHeadingElementsDefault,
    refresh = null,
    onSelect,
    className,
    ...props
}) => {//\u8BE5\u7EC4\u4EF6\u5FC5\u987B\u7B49\u6587\u7AE0\u52A0\u8F7D\u7ED3\u675F\u540E\u518D\u6E32\u67D3
    const [nestedHeadings, setNestedHeadings] = useHeadings(getHeadingElements, processHeadingElements,refresh)
    const renderTOCNodes = (node) => {
        //console.log('\u5F53\u524D\u8282\u70B9', node)
        if (node.children.length == 0)//\u53F6\u5B50\u8282\u70B9
        {
            return (
                <a href={\`#\${node.domNode.id}\`} className={node.domNode.id == props.select ? "Active" : ""} onClick={() =>onSelect(node.domNode)}>
                    {node.domNode.innerText}
                </a>
            )
        }

        let jsxNodes = []
        for (let i = 0; i < node.children.length; i++)
            jsxNodes.push((<li key={i}>{renderTOCNodes(node.children[i])}</li>))
        //\u9012\u5F52\u5B8C\u6210
        //console.log(node)
        return (
            <>
                {node.domNode == null ? null :(<a href={\`#\${node.domNode.id}\`} className={node.domNode.id == props.select ? "Active" : ""} onClick={() => onSelect(node.domNode)}>
                    {node.domNode.innerText}
                </a>)}
                <ul>
                    {jsxNodes}
                </ul>
            </>
        )
    }
    return (
        <nav className={classNames('TOC',className)}>
            <header>TOC</header>
            {nestedHeadings == null||nestedHeadings.children.length===0 ? null : renderTOCNodes(nestedHeadings)}
        </nav>
    );
}`
      })]
    }), /* @__PURE__ */ jsx(MD, {
      children: "### Go further\\n #### Improve scorll behavior by css\\n We can use `scroll-margin-top: xxx;` to keep the space between the title and the top of the page,make the scroll more smooth by `scroll-behavior: smooth;`:\\n"
    }), /* @__PURE__ */ jsx(Toggle, {
      summary: "code",
      children: /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "css",
        code: `html,body{
    scroll-behavior:smooth;/*use on your scroll box*/
}
p,h1,h2,h3,h4,h5,h6{
    scroll-margin-top:20vh;/*use on your scroll element*/
}`
      })
    }), /* @__PURE__ */ jsx(MD, {
      children: "#### Track the title currently browsing\\n For a better user experience,we hope that toc can automatically update the title of the currently browsing content when the page is scrolling.\\n\\n To get it , we can simply attach a scroll listener to the page , get the y attribute of each title in each scroll, once y falls into the specified interval , we will update the actived heading.\\n\\n But in 2022, we can use `IntersectionObserver` instead of rolling monitoring to get a better performance. More comparison info is here : [Scroll listener vs Intersection Observers: a performance comparison](https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6)\\n\\n We use the rootMargin option to create a rectangular monitoring area with 5% page height in the viewport, update the actived heading when the title slides over the monitoring area.\\n\\n The monitoring area should be properly narrow to prevent multiple headings in the area at the same time.\\n\\n In the specific implementation , the top and bottom values of rootMargin are negative , which may be a bit counterintuitive . But in fact , you can think like this : the margin of negative number is equal to padding.If you are still confused about how `IntersectionObserver` works, you can debug it manually [here](https://codepen.io/ljc-dev/pen/vYyLVdR).\\n\\n Finally, don't forget to clean up the monitor instance when the component is unmounted."
    }), /* @__PURE__ */ jsx(Toggle, {
      summary: "code",
      children: /* @__PURE__ */ jsx(CodeBlock, {
        hl,
        language: "tsx",
        code: `export const processHeadingElementsDefault = (headingElements,onSelect) => {
    const nestedHeadings = {
        parent: null,
        children: []
    };
    let rank = {
        "H1": 1, "H2": 2, "H3": 3, "H4": 4, "H5": 5, "H6": 6,
    }
    let parent: any = nestedHeadings
    //\u8DDF\u8E2A\u5F53\u524D\u6B63\u5728\u6D4F\u89C8\u7684\u6807\u9898
    const observer = new IntersectionObserver(entries => {
        for (let i = 0; i < entries.length; i++)
            if (entries[i].isIntersecting) onSelect(entries[i].target)
        console.log(entries)
    }, {
        rootMargin:'-20% 0% -75% 0%'//\u5C3D\u91CF\u72ED\u5C0F \u987A\u5E8F\u662F\u4E0A\u53F3\u4E0B\u5DE6 \u7F3A\u70B9\u662F\u6EDA\u52A8\u592A\u5FEB\u4F1A\u5931\u6548
    })
    headingElements.forEach((heading, index) => {
        heading.id = "SparkTOC-" + index//\u6CE8\u610Fjs\u9ED8\u8BA4\u5F15\u7528\uFF0C\u8FD9\u4E2A\u64CD\u4F5C\u4F1A\u76F4\u63A5\u4FEE\u6539dom\u5143\u7D20
        const { innerText: title, id } = heading;

        while (parent.parent != null && rank[parent.domNode.nodeName] >= rank[heading.nodeName])//\u56DE\u6EAF
            parent = parent.parent
        let node = {
            parent: parent,
            domNode: heading,
            children: []
        }
        parent.children.push(node)
        parent = node
        //\u8DDF\u8E2A\u5F53\u524D\u6B63\u5728\u6D4F\u89C8\u7684\u6807\u9898
        observer.observe(heading)
    });
    return [nestedHeadings,observer] as [typeof nestedHeadings,IntersectionObserver]
};
const useHeadings = (getHeadingElements:typeof getHeadingElementsDefault, processHeadingElements:typeof processHeadingElementsDefault,refresh,onSelect) => {
    const [nestedHeadings, setNestedHeadings] = useState(null);
    console.log(refresh)
    useEffect(() => {
        const headingElements = getHeadingElements()
        const [newNestedHeadings,observer] = processHeadingElements(headingElements,onSelect);//\u81EA\u5DF1\u51B3\u5B9A\u5D4C\u5957\u65B9\u5F0F
        setNestedHeadings(newNestedHeadings);
        return ()=>observer.disconnect()
    }, [refresh]);
    return [nestedHeadings, setNestedHeadings];
}`
      })
    }), /* @__PURE__ */ jsx(Footer, {
      link: "s"
    })]
  });
};
const MDX = content;
export { MDX, MDXMeta };
