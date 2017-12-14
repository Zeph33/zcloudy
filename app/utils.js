'use strict'
export { isObject, isEmpty, isArray, isBoolean, hasProperty, toString, objSet, objGet, merge, zHttp }

function hasProperty(obj, prop) {
  if (obj == null) {
    return false
  }
  //to handle objects with null prototypes (too edge case?)
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function isEmpty(value) {
  if (!value || (isArray(value) && value.length === 0)) return true
  if (typeof value !== 'string') {
    for (var i in value) {
      if (hasProperty(value, i)) {
        return false
      }
    }
    return true
  }
  return false
}

function toString(type) {
  return Object.prototype.toString.call(type)
}

function isObject(obj) {
  return typeof obj === 'object' && toString(obj) === "[object Object]"
}

const isArray = Array.isArray || function (obj) {
  return toString(obj) === '[object Array]'
}

function isBoolean(obj) {
  return typeof obj === 'boolean' || toString(obj) === '[object Boolean]'
}

function getKey(key) {
  const ik = parseInt(key)
  return ik.toString === key ? ik : key
}

function objSet(obj, path, value) {
  if (typeof path === 'number') path = [path]
  if (!path || path.length === 0)  return obj
  if (typeof path === 'string') return objSet(obj, path.split('.').map(getKey), value)

  const curPath = path[0]
  const curVal = obj[curPath]
  if (path.length === 1) {
    obj[curPath] = value
    return curVal
  }

  if (curVal === void 0) {
    //check if we assume an array
    obj[curPath] = typeof path[1] === 'number' ? [] : {}
  }

  return objSet(obj[curPath], path.slice(1), value)
}

function objGet(obj, path, defaultValue) {
  if (typeof path === 'number') path = [path]
  if (!path || path.length === 0) return obj
  if (obj == null) return defaultValue
  if (typeof path === 'string') return objGet(obj, path.split('.'), defaultValue)

  const curPath = getKey(path[0])
  const nextObj =obj[curPath]

  if (nextObj === void 0) return defaultValue
  if (path.length === 1)  return nextObj

  return objGet(obj[curPath], path.slice(1), defaultValue)
}

function assign(to, from) {
  if (to === from) return to
  from = Object(from)
  for (var key in from) {
    to[key] = to.hasOwnProperty(key) && isObject(to[key]) ? assign(Object(to[key]), from[key]) : from[key]
  }
  return to
}

function merge(target) {
  target = (target === null || target === undefined) ? {} : Object(target)
  for (var s = 1; s < arguments.length; s++) {
    assign(target, JSON.parse(JSON.stringify(arguments[s])))
  }
  return target
}


function zHttp(url, options) {
  let opt = merge({
    transport: new XMLHttpRequest(),
    method: 'POST',
    data: '',
    content: 'application/json',
    useCache: false
  }, options || {})
  if (!opt.useCache)
    url += (url.indexOf('?', 0) === -1 ? '?' : '&') + 'dummy=' + (new Date()).getTime()
  return new Promise((resolve, reject) => {
    const xhr = opt.transport
    xhr.open(opt.method, url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const status = xhr.status
        if(status >= 200 && status < 300 || status === 304) {
          resolve(xhr.getResponseHeader('content-type').split(';', 2)[0] == 'application/json' ? JSON.parse(xhr.responseText) : xhr.responseText, xhr)
        } else {
          reject(xhr)
        }
      }        
    }
    xhr.send(JSON.stringify(opt.data))
  })    
}

zHttp.request = function( type, url, options) {
  let opt = options || {}
  opt.method = type
  return new zHttp(url,opt)
}
zHttp.Get = function(url, opt) {
  return zHttp.request('GET',url, opt)
}
zHttp.Post = function(url, opt) {
  return zHttp.request('POST',url, opt)
}
zHttp.Del = function(url, opt) {
  return zHttp.request('DELETE',url, opt)
}
