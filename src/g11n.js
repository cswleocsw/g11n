import 'whatwg-fetch'
import get from 'lodash.get'
import { isString, jsonSuffix } from './tool'

export default class G11N {
  constructor(options = {}) {
    this.namespace = options.namespace || 'translation'
    this.placeholder = options.placeholder || /\{%([^%]+)%\}/g
    this.storage = {}
  }

  t(query, options = {}) {
    if (!isString(query)) {
      return ''
    }

    const namespace = options.namespace || this.namespace

    let str = get(this.storage, `${namespace}.${query}`)

    if (str === undefined) {
      str = ''
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
    const namespace = options.namespace || this.namespace

    if (files.length === 0) {
      throw new Error('import files is empty')
    }

    files = files.map(file => jsonSuffix(file))

    let loaded = 0

    return new Promise((resolve, reject) => {
      files.forEach((file) => {
        fetch(file)
          .then((res) => {
            if (res.ok) {
              res.json()
                .then((data) => {
                  loaded += 1
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
              reject(new Error(`status: ${res.status} statusText: ${res.statusText}`))
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }

  render(template, options = {}) {
    const path = options.path || ''
    const namespace = options.namespace || this.namespace
    const placeholder = options.placeholder || this.placeholder
    const seach = path ? `${namespace}.${path}` : namespace
    const data = get(this.storage, seach, {})

    return template.replace(placeholder, (m, $1) => get(data, $1, $1))
  }
}
