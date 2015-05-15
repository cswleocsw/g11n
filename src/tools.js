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
