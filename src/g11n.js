'use strict';

// functions
var _ = require('./tools');

// default setting
var defaults = {
    namespace: 'translation',
    placeholder: /\{%([^%]+)%\}/g
};

var attrs = _.keys(defaults);

var G11N = function (options) {
    options || (options = {});
    var settings = null;
    settings = _.assign(defaults, _.pick(options, attrs));
    this.getConfig = function () {
        return settings;
    };
    this.langs = {translation: {}};
};

G11N.prototype = {
    t: function (str, obj, namespace) {
        var  data, item, key;
        obj || (obj = {});
        namespace || (namespace = this.namespace());
        _.isString(obj) && (namespace = obj);
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
        namespace || (namespace = this.namespace());
        var data = this.langs[namespace] || {};
        return ('' + str).replace(/\{%([^%]+)%\}/g, function (m, $1) {
            return _.get(data, $1, $1);
        });
    },

    bind: function (obj, namespace) {
        namespace || (namespace = this.namespace());
        obj && (this.langs[namespace] = _.assign(this.langs[namespace] || {}, obj));
        return this;
    },

    imports: function (obj, namespace) {
        namespace || (namespace = this.namespace());
        var  g11n = this, regex = /^(.)+\.json$/;
        var lists = _.isArray(obj) ? obj : [obj]
        for (var i = 0, L = lists.length; i < L; ++i) {
            var url = lists[i];
            if (url) {
                ! regex.test(url) && (url += '.json');
                _.ajax(url, {
                    success: function (json) {
                        g11n.bind(json, namespace)
                    }});
            }
        }
        return this;
    },

    namespace: function () {
        return _.get(this.getConfig(), 'namespace');
    },

    dump: function () {
        return this.langs;
    }
};

module.exports = G11N;
