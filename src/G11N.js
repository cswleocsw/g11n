/**
 * @author cswleocsw <cswleo@gmail.com>
 */
import get from 'lodash.get'
import Loader from 'Loader'
import { isString, jsonSuffix } from './utils'

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
    return get(this.maps, namespace ? `${namespace}.${query}` : query, query)
  }

  /**
   * 自動載入 json 語系檔
   *
   * @param url
   * @param namespace
   */
  imports(file, namespace = this.namespace) {
    let files = Array.isArray(file) ? file : [file]
    files.forEach((file) => {
      this.loader.load(jsonSuffix(file), null, (file) => {
        if (file && file.data && !file.error) {
          this.bind(file.data, namespace)
        }
      })
    })
    this.loader.start()
  }
}
