const toString = Object.prototype.toString

/**
 * 加上 .json 後綴
 * @param str
 * @returns {string}
 */
export function jsonSuffix(str) {
    return /^(.)+\.json$/.test(str) ? str : (str + '.json')
}

/**
 * 字串類型檢楂
 * @param str
 * @returns {boolean}
 */
export function isString(str) {
  return toString.call(str) === '[object String]'
}
