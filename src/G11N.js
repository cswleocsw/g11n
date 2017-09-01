/**
 * @author cswleocsw <cswleo@gmail.com>
 */
import 'whatwg-fetch'
import get from 'lodash.get'
import log4js from 'log4js-free'

let logger = log4js.getLogger('G11N')
logger.setLevel('ERROR')

function isString(str) {
  return typeof str === 'string'
}

function jsonSuffix(str) {
  const regex = /^(.)+\.json(\?.+)$/

  if (regex.test(str)) {
    return str
  }

  return `${str}.json`
}

export default class G11N {
  constructor(options = {}) {
    this.namespace = options.namespace || 'translation'
    this.placeholder = options.placeholder || /\{%([^%]+)%\}/g
    this.storage = {}

    if (options.debug) {
      logger.setLevel('DEBUG')
    }
  }

  t(query, options = {}) {
    if (!isString(query)) {
      return ''
    }

    let namespace = options.namespace || this.namespace

    let str = get(this.storage, `${namespace}.${query}`)

    if (str === undefined) {
      str = ''
      logger.warn(`g11n: query ${query} result is undefined, please check your query path or file is correct!`)
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

    if (files.length === 0) {
      throw new Error('import files is empty')
    }

    files = files.map((file) => jsonSuffix(file))

    let loaded = 0

    return new Promise((resolve, reject) => {
      files.forEach((file) => {
        fetch(file)
          .then((res) => {
            if (res.ok) {
              res.json()
                .then((data) => {
                  loaded++
                  this.storage[namespace] = Object.assign({}, this.storage[namespace] || {}, data)
                  if (loaded === files.length) {
                    if (callback && typeof callback === 'function') {
                      callback()
                    }
                    resolve(this)
                  }
                })
                .catch((err) => {
                  reject(err)
                })
            } else {
              reject({
                status: res.status,
                statusText: res.statusText
              })
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }

  render(template, options = {}) {
    let path = options.path || ''
    let namespace = options.namespace || this.namespace
    let placeholder = options.placeholder || this.placeholder
    let data = get(this.storage, `${namespace}.${path}`, {})
    return template.replace(placeholder, (m, $1) => get(data, $1, $1))
  }
}
