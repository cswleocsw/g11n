import 'whatwg-fetch';
import { isString, get, isObject, isArray } from 'lodash';

/**
 * 加上 .json 後綴
 * @param str
 * @returns {string}
 */
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
   * 綁定語系資料
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
   * 取回對應語系資料
   *
   * @param query
   * @param namespace
   * @returns { string }
   */
  t(query, namespace = this._namespace) {
    return get(this._maps, namespace ? `${namespace}.${query}` : query, query);
  }

  /**
   * 自動載入 json 語系檔
   *
   * @param url
   * @param namespace
   */
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