/**
 * @author cswleocsw <cswleo@gmail.com>
 */
import 'whatwg-fetch'
import get from 'lodash.get'
import log4js from 'log4js-free'

let logger = log4js.getLogger('G11N')

function isString(str) {
  return typeof str === 'string'
}

export default class G11N {
  constructor(options = {}) {
    this.namespace = options.namespace ||'translation'
    this.placeholder = options.placeholder || /\{%([^%]+)%\}/g
    this.storage = {}
  }

  t(query, options = {}) {
    if (!isString(query)) {
      return ''
    }

    let namespace = options.namespace || this.namespace

    let str = get(this.storage, `${namespace}.${query}`)

    if (str === undefined) {
      str = ''
      logger.warn('g11n: query result is undefined, please check your query path or file is correct!')
    }

    // string replace
    if (typeof options.replaces === 'object' && str) {
      Object.keys(options.replaces).forEach((key) => {
        str = str.replace(key, options.replaces[key])
      })
    }

    return str
  }

  imports(options = {}, callback) {
    let files = options.files || []
    let namespace = options.namespace || this.namespace

    let leng = files.length
    let loaded = 0


    if (leng > 0) {
      Promise.all(files.map((file) => fetch(file)))
        .then((values) => {
          values.forEach((res) => {
            if (res.status >= 200 && res.status < 300) {
              res.json().then((data) => {
                loaded++
                this.storage[namespace] = Object.assign({}, this.storage[namespace] || {}, data)
                if (loaded === leng && callback && typeof callback === 'function') {
                  callback()
                }
              })
            }
          })
        })
        .catch((err) => {
          logger.warn(err)
        })
    }
  }

  render(template, options = {}) {
    let path = options.path || ''
    let namespace = options.namespace || this.namespace
    let placeholder = options.placeholder || this.placeholder
    let data = get(this.storage, `${namespace}.${path}`, {})
    return template.replace(placeholder, (m, $1) => get(data, $1, $1))
  }
}
