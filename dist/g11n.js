(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["G11N"] = factory();
	else
		root["G11N"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _objectAssign = __webpack_require__(1);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _utils = __webpack_require__(2);

	var G11N = (function () {
	    function G11N() {
	        _classCallCheck(this, G11N);

	        this.namespace = 'translation';
	        this.placeholder = /\{%([^%]+)%\}/g;
	        this.maps = {};
	        this._imports = {};
	    }

	    _createClass(G11N, [{
	        key: 't',
	        value: function t(str) {
	            var obj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var ns = arguments.length <= 2 || arguments[2] === undefined ? this.namespace : arguments[2];

	            ns = (0, _utils.isString)(obj) ? obj : ns;

	            var data = this.maps[ns] || {};

	            var item = (0, _utils.get)(data, str, str);

	            var key = undefined;

	            // 占位符處理
	            if ((0, _utils.isObject)(obj) && (0, _utils.isString)(item)) {
	                for (key in obj) {
	                    if (obj.hasOwnProperty(key)) {
	                        item = item.replace(key, obj[key]);
	                    }
	                }
	            }

	            return item;
	        }
	    }, {
	        key: 'bind',
	        value: function bind(obj) {
	            var ns = arguments.length <= 1 || arguments[1] === undefined ? this.namespace : arguments[1];

	            if (obj) {
	                this.maps[ns] = (0, _objectAssign2['default'])(this.maps[ns] || {}, obj);
	            }
	            return this;
	        }
	    }, {
	        key: 'imports',
	        value: function imports(obj) {
	            var _this = this;

	            var ns = arguments.length <= 1 || arguments[1] === undefined ? this.namespace : arguments[1];

	            var g11n = this;

	            var items = (0, _utils.isArray)(obj) ? obj : [obj];

	            items.forEach(function (url) {
	                url = (0, _utils.jsonSuffix)(url);

	                if (url && !_this._imports[url]) {
	                    (0, _utils.ajax)(url, {
	                        success: function success(json) {
	                            g11n.bind(json, ns);
	                        },

	                        error: function error(xhr) {
	                            throw new Error(xhr.statusText);
	                        },

	                        complete: function complete() {
	                            g11n._imports[url] = true;
	                        }
	                    });
	                }
	            });

	            return this;
	        }
	    }, {
	        key: 'render',
	        value: function render(str) {
	            var ns = arguments.length <= 1 || arguments[1] === undefined ? this.namespace : arguments[1];

	            var g11n = this;
	            var data = this.maps[ns] || {};
	            return ('' + str).replace(g11n.placeholder, function (m, $1) {
	                return (0, _utils.get)(data, $1, $1);
	            });
	        }
	    }]);

	    return G11N;
	})();

	exports['default'] = G11N;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.isNull = isNull;
	exports.jsonSuffix = jsonSuffix;
	exports.has = has;
	exports.ajax = ajax;
	exports.get = get;
	var toString = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function isObject(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	}

	function isString(obj) {
	    return toString.call(obj) === '[object String]';
	}

	function isArray(obj) {
	    return toString.call(obj) === '[object Array]';
	}

	function isFunction(obj) {
	    return typeof obj == 'function' || false;
	}

	function isNull(obj) {
	    return obj === null;
	}

	function jsonSuffix(str) {
	    return (/^(.)+\.json$/.test(str) ? str : str + '.json'
	    );
	}

	function has(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	}

	function ajax(url, options) {
	    if (url) {
	        (function () {
	            var xhr = new XMLHttpRequest();

	            var success = options.success;
	            var error = options.error;

	            var handle = function handle() {
	                if (xhr.readyState !== 4) return;

	                if (xhr.status === 200) {
	                    isFunction(success) && success(JSON.parse(xhr.responseText));
	                } else {
	                    isFunction(error) && error(xhr);
	                }
	            };

	            if (xhr) {
	                xhr.onreadystatechange = handle;
	                xhr.open('GET', url, false);
	                xhr.send();
	            } else {
	                throw 'XMLHttpRequest not supported.';
	            }
	        })();
	    }
	}

	function get(obj, key, def) {
	    if (isNull(key)) return obj;
	    if (has(obj, key)) return obj[key];

	    key.split('.').forEach(function (segment) {
	        if (!isObject(obj) || !has(obj, segment)) {
	            obj = def;
	            return false;
	        }
	        has(obj, segment) && (obj = obj[segment]);
	    });

	    return obj;
	}

/***/ }
/******/ ])
});
;