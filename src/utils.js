/**
 * 加上 .json 後綴
 * @param str
 * @returns {string}
 */
export function jsonSuffix(str) {
    return /^(.)+\.json$/.test(str) ? str : (str + '.json')
}
