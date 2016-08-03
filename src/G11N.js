/**
 * @author cswleocsw <cswleo@gmail.com>
 */
import "babel-polyfill"
import 'whatwg-fetch'
import get from 'lodash.get'
import Loader from 'Loader'

const toString = Object.prototype.toString

export default class G11N {
  constructor(options = {}) {
    this.namespace = options.namespace || 'translation'
    this.maps = options.maps || {}
    this.loader = new Loader()
  }

  /**
   * 綁定語系資料
   *
   * @param data
   * @param namespace
   */
  bind(data, namespace = this.namespace) {
    if (typeof data === 'object') {
      this.maps[namespace] = Object.assign(this.maps[namespace] || {}, data)
    }
  }

  /**
   * 取回對應語系資料
   *
   * @param query
   * @param namespace
   * @returns { string }
   */
  t(query, namespace = this.namespace) {
    this.loader.start()
    if (toString.call(query) === '[object String]') {
      return get(this.maps, namespace ? `${namespace}.${query}` : query, query)
    }
  }

  // /**
  //  * 自動載入 json 語系檔
  //  *
  //  * @param url
  //  * @param namespace
  //  */
  //
  // imports(file, namespace = this.namespace) {
  //   let files = isArray(file) ? file : [file]
  //   files = files.map((file) => jsonSuffix(file))
  //
  //   files.forEach((file) => {
  //
  //   })
  // }
}
