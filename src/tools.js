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
        if (!_.isObject(obj) || !_.has(obj, segment)) {
            obj = def;
            return false;
        }
        _.has(obj, segment) && (obj = obj[segment]);
    });

    return obj;
};

_.keys = Object.keys || function (obj) {
        var attr;
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (attr in obj) {
            if (obj.hasOwnProperty(attr))
                keys.push(attr);
        }
        return keys;
    };

_.values = function (obj) {
    var attr, values = [];
    ;
    if (!_.isObject(obj)) return values;
    for (attr in obj) {
        if (obj.hasOwnProperty(attr))
            values.push(obj[attr]);
    }
    return values;
};

_.extend = function (child, parent, deep) {
    var attr;
    deep || (deep = false);
    child || (child = {});
    for (attr in parent) {
        if (_.has(parent, attr)) {
            if (deep && _.isObject(parent[attr])) {
                child[attr] = (_.isArray(parent[attr])) ? [] : {};
                _.extend(child[attr], parent[attr]);
            } else {
                child[attr] = parent[attr];
            }
        }
    }
    return child;
};

_.assign = function (obj) {
    var index, source;
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (index = 1; index < length; index++) {
        source = arguments[index];
        obj = _.extend(obj, source);
    }
    return obj;
};

_.pick = function (obj, items) {
    var result = {}, keys, key, value;
    if (_.isNull(obj)) return result;
    keys = _.values(items);
    for (var i = 0, L = keys.length; i < L; i++) {
        key = keys[i];
        value = obj[key];
        if (_.has(obj, key)) result[key] = value;
    }
    return result;
};

_.ajax = function (url , callbacks) {
    if (url) {
        var xhr = new XMLHttpRequest();
        var handle = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                _.isFunction(callbacks.success) && callbacks.success(JSON.parse(xhr.responseText));
            } else {
                _.isFunction(callbacks.error) && callbacks.error(xhr);
            }
        };

        if (xhr) {
            xhr.onreadystatechange = handle;
            xhr.open('GET', url, false);
            xhr.send();
        } else {
            throw 'XMLHttpRequest not supported.'
        }
    }
};

module.exports = _;
