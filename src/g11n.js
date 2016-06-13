import 'whatwg-fetch';
import { isString, get, isObject, isArray } from 'lodash';
import request from 'superagent';

function jsonSuffix(str) {
  return /^(.)+\.json$/.test(str) ? str : (str + '.json');
}

export default class G11N {
  constructor(options = {}) {
    this._namespace = options.namespace || 'translation';
    this._maps = options.maps || {};
    this._imports = {};
  }

  /**
   *
   * @param data
   * @param namespace
   */
  bind(data, namespace = this._namespace) {
    if (data) {
      this._maps[namespace] = Object.assign(this._maps[namespace] || {}, data);
    }
  }

  /**
   *
   */
  t(query, namespace = this._namespace) {
    return get(this._maps, namespace ? `${namespace}.${query}` : query, query);
  }

  imports(url, namespace = this.namespace) {
    const urls = isArray(url) ? url : [ url ];

    urls.forEach((link) => {
      let linkWithSuffix = jsonSuffix(link);
      if (linkWithSuffix && !this._imports[linkWithSuffix]) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', linkWithSuffix, false);
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              this.bind(JSON.parse(xhr.response), namespace)
            } else {
              throw new Error({ statusCode: xhr.status })
            }
          }
        };
        xhr.send();
      }
    });
  }
}