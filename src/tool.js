export function isString(str) {
  return typeof str === 'string'
}

export function jsonSuffix(str) {
  const regex = /^(.)+\.json(\?.+)?$/

  if (regex.test(str)) {
    return str
  }

  return `${str}.json`
}
