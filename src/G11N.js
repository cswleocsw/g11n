/**
 * @author cswleocsw <cswleo@gmail.com>
 */
import EventEmitter from 'events'
import get from 'lodash.get'
import Loader from 'Loader'
import { isString, jsonSuffix } from './utils'

const Event = {
  LOAD_COMPLETE: 'LOAD_COMPLETE'
}

export default class G11N extends EventEmitter {
  constructor(options = {}) {
    super()
    this.namespace = options.namespace || 'translation'
    this.maps = options.maps || {}
    this.loader = new Loader()
    this.loader.on(Loader.Event.LOAD_COMPLETE, () => this.emit(Event.LOAD_COMPLETE))
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
  t(query, obj = {}, namespace = this.namespace) {
    if (!isString(query)) {
      return
    }

    let str = `${get(this.maps, `${namespace}.${query}`, query)}`

    // 占位符處理
    if (typeof obj === 'object' && str) {
      Object.keys(obj).forEach((key) => {
        str = str.replace(key, obj[key])
      })
    }

    return str
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

G11N.Event = Event
