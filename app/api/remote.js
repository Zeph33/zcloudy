import {merge} from '../utils'

export default class {
  constructor(baseUrl=false) {
    this.baseUrl = baseUrl || window.location.protocol + '//' + window.location.host + '/'
  }
  request( type, url, options) {
    let opt = merge({
      transport: new XMLHttpRequest(),
      method: 'POST',
      data: '',
      content: 'application/json',
      useCache: false
    }, options || {})
    opt.method = type
    if(url.indexOf('http')!=0) {
      url = this.baseUrl + url
    }
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
  Get(url, opt) {
    return this.request('GET',url, opt)
  }
  Post(url, opt) {
    return this.request('POST',url, opt)
  }
  Del(url, opt) {
    return this.request('DELETE',url, opt)
  }
}