import { isString, get, isObject, isArray } from 'lodash'

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

  imports(obj, ns = this.namespace) {
    const items = isArray(obj) ? obj : [obj];

    items.forEach((url) => {
      url = jsonSuffix(url);

      if (url && !this._imports[url]) {
        fetch(url)
          .then((res) => {
            console.log(res)
            this._imports[url] = true;
          })
          .catch((err) => {
            console.log(err)
          });
      }
    });
  }
}