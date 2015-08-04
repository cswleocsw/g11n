const toString = Object.prototype.toString;
const hasOwnProperty    = Object.prototype.hasOwnProperty;

export function isObject(obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

export function isString(obj) {
    return toString.call(obj) === '[object String]';
}

export function isArray(obj) {
    return toString.call(obj) === '[object Array]';
}

export function isFunction(obj) {
    return typeof obj == 'function' || false;
}

export function isNull(obj) {
    return obj === null;
}

export function jsonSuffix(str) {
    return /^(.)+\.json$/.test(str) ? str : (str + '.json');
}

export function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}

export function ajax(url, options) {
    if (url) {
        const xhr = new XMLHttpRequest();

        const { success, error } = options;

        const handle = () => {
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
            throw 'XMLHttpRequest not supported.'
        }
    }
}

export function get(obj, key, def) {
    if (isNull(key)) return obj;
    if (has(obj, key)) return obj[key];

    key.split('.').forEach((segment) => {
        if (!isObject(obj) || !has(obj, segment)) {
            obj = def;
            return false;
        }
        has(obj, segment) && (obj = obj[segment]);
    });

    return obj;
}