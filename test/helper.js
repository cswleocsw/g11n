import Promise from 'promise'

export function response(statusCode, body) {
  const res = new window.Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-type': 'application/json' }
  })
  if (res.status >= 400 && res.status <= 599) {
    return new Promise.reject(res)
  } else {
    return new Promise.resolve(res)
  }
}
