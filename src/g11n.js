// functions
var _ = require('lodash'),
    $ = require('jquery'),
    config = require('config');

var opts = ['namespace', 'placeholder'];

function jsonSuffix(str) {
    return /^(.)+\.json$/.test(str) ? str : (str + '.json');
}

/**
 * G11N 建構式
 *
 * @param options
 * @constructor
 */
var G11N = function (options) {
    options || (options = {});
    _.extend(this, config, _.pick(options, opts), {maps: {}});
};

G11N.prototype = {
    /**
     * 取出相對應的資料
     *
     * @param str
     * @param obj
     * @param namespace
     * @returns {*}
     */
    t: function (str, obj, namespace) {
        obj = obj || {};

        var ns = namespace || this.namespace;

        if (_.isString(obj)) {
            ns = obj;
        }

        var data = this.maps[ns] || {};

        item = _.get(data, str, str);


        var item, key;
        if (_.isObject(obj) && _.isString(item)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    item = item.replace(key, obj[key])
                }
            }
        }

        return item
    },

    /**
     * 快速取代字串
     *
     * @param str
     * @param namespace
     * @returns {string}
     */
    render: function (str, namespace) {
        var ns = namespace || this.namespace;

        var data = this.maps[ns] || {};

        return ('' + str).replace(/\{%([^%]+)%\}/g, function (m, $1) {
            return _.get(data, $1, $1);
        });
    },

    /**
     * 綁定語系資料
     *
     * @param obj
     * @param namespace
     * @returns {G11N}
     */
    bind: function (obj, namespace) {
        if (obj) {
            var ns = namespace || this.namespace;
            this.maps[ns] = _.extend(this.maps[ns] || {}, obj);
        }
        return this;
    },

    /**
     * 載入語系 json 檔案
     *
     * @param obj
     * @param namespace
     * @returns {G11N}
     */
    imports: function (obj, namespace) {
        var g11n = this,
            ns = namespace || this.namespace;

        var items = _.isArray(obj) ? obj : [obj];

        _.each(items, function (url) {
            url = jsonSuffix(url);

            if (url) {
                $.ajax({
                    url: url,
                    async: false
                })

                    .done(function (json) {
                        g11n.bind(json, ns);
                    })

                    .fail(function (xhr) {
                        throw new Error(xhr.statusText);
                    });

            }
        });

        return this;
    }
};

module.exports = G11N;
