'use strict';

var _ = require('./tools');

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
        namespace || (namespace = this.config.namespace);
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
        namespace || (namespace = this.config.namespace);
        obj && (this.langs[namespace] = obj);
        return this;
    }
};

module.exports = G11N;
