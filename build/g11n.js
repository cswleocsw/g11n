(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
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

	var _ = __webpack_require__(1);

	var config = {
	    namespace: 'translation',
	    placeholder: /\{%([^%]+)%\}/g
	};

	var G11N = function (options) {
	    options || (options = {});
	    this.langs = { translation: {} };
	    this.config = _.assign(config, options);
	};

	G11N.prototype = {
	    t: function (str, obj, namespace) {
	        var data, item, key;
	        obj || (obj = {});
	        namespace || (namespace = config.namespace);
	        if (_.isString(obj)) {
	            namespace = obj
	        }
	        data = this.langs[namespace] || {};
	        item = _.get(data, str, str);
	        if (_.isObject(obj) && _.isString(item)) {
	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    item = item.replace(key, obj[key])
	                }
	            }
	        }
	        return item
	    },

	    render: function (str, namespace) {
	        var data;
	        namespace || (namespace = this.config.namespace);
	        data = this.langs[namespace] || {};
	        return ('' + str).replace(/\{%([^%]+)%\}/g, function (m, $1) {
	            return _.get(data, $1, $1);
	        });
	    },

	    bind: function (obj, namespace) {
	        namespace || (namespace = config.namespace);
	        obj && (this.langs[namespace] = obj);
	        return this;
	    }
	};

	module.exports = G11N;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = {};

	var toString = Object.prototype.toString;

	var hasOwn = Object.prototype.hasOwnProperty;

	_.has = function (obj, key) {
	    return hasOwn.call(obj, key);
	};

	_.isNull = function (obj) {
	    return obj === null;
	};

	_.isString = function (obj) {
	    return toString.call(obj) === '[object String]';
	};

	_.isArray = function (obj) {
	    return toString.call(obj) === '[object Array]';
	};

	_.isFunction = function (obj) {
	    return typeof obj === 'function' || false;
	};

	_.isObject = function (obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};

	_.each = function (obj, cb) {
	    var arrays, length, index;
	    if (_.isArray(obj)) {
	        arrays = obj || [];
	        length = arrays.length;
	        index = -1;
	        while (++index < length) {
	            if (cb(arrays[index], index, obj) === false) {
	                break;
	            }
	        }
	    }
	};

	_.get = function (obj, key, def) {
	    if (_.isNull(key)) return obj;
	    if (_.has(obj, key)) return obj[key];

	    _.each(key.split('.'), function (segment) {
	        if (! _.isObject(obj) || ! _.has(obj, segment)) {
	            obj = def;
	            return false;
	        }
	        _.has(obj, segment) && (obj = obj[segment]);
	    });

	    return obj;
	};

	_.keys = Object.keys || function keys(obj) {
	    var attr;
	    if (! _.isObject(obj)) return [];
	    var keys = [];
	    for (attr in obj) {
	        if (obj.hasOwnProperty(attr))
	            keys.push(attr);
	    }
	    return keys;
	};

	_.assign = function (obj) {
	    var index, source;
	    var length = arguments.length;
	    if (length < 2 || obj == null) return obj;
	    for (index = 1; index < length; index++) {
	        source = arguments[index];
	        _.each(_.keys(source), function (key) {
	            obj[key] = source[key];
	        });
	    }
	    return obj;
	};

	module.exports = _;


/***/ }
/******/ ])
});
;