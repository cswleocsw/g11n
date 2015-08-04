import 'babel/polyfill';
import assign from 'object-assign';
import { isArray, isObject, isString, jsonSuffix, ajax, get } from './utils'

export default class G11N {
    constructor() {
        this.namespace = 'translation';
        this.placeholder = /\{%([^%]+)%\}/g;
        this.maps = {};
    }

    t(str, obj = {}, ns = this.namespace) {
        ns = isString(obj) ? obj : ns;

        const data = this.maps[ns] || {};

        let item = get(data, str, str);

        let key;

        // 占位符處理
        if (isObject(obj) && isString(item)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    item = item.replace(key, obj[key])
                }
            }
        }

        return item
    }

    bind(obj, ns = this.namespace) {
        if (obj) {
            this.maps[ns] = assign(this.maps[ns] || {}, obj);
        }
        return this;
    }

    imports(obj, ns = this.namespace) {
        const g11n = this;

        const items = isArray(obj) ? obj : [obj];

        items.forEach((url) => {
            url = jsonSuffix(url);

            if (url) {
                ajax(url, {
                    success: (json) => {
                        g11n.bind(json, ns);
                    },

                    error: (xhr) => {
                        throw new Error(xhr.statusText);
                    }
                });
            }
        });

        return this;
    }

    render(str, ns = this.namespace) {
        const g11n = this;
        const data = this.maps[ns] || {};
        return ('' + str).replace(g11n.placeholder, function (m, $1) {
            return get(data, $1, $1);
        });
    }
}
