// Simple 1kB i18n library for Vue.js https://vue-inter.egoist.moe
// https://github.com/egoist/vue-inter
// licence MIT

// Modified return default language if no translate find or path 
import defaultTemplate from './template'
import getProp from './get-prop'

let Vue
export default class Inter {
  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        this.$inter =
          this.$options.inter || (this.$parent && this.$parent.$inter)
        if (this.$inter) {
          this.$i = this.$inter.get.bind(this.$inter)
        }
      }
    })
  }

  constructor({ locale, locales, template = defaultTemplate }) {
    if (process.env.NODE_ENV === 'development' && !Vue) {
      throw new Error('You have to install `vue-inter` first: Vue.use(Inter)')
    }

    this.template = template
    this.locales = locales
    this.default = locale

    Vue.util.defineReactive(this, '__locale', locale)
  }

  get locale() {
    return this.__locale
  }

  get(path, ...data) {
    let localeData = this.locales[this.locale]
    if(!localeData) {
      if(process.env.NODE_ENV === 'development') {
        console.error(`[vue-inter] Locale "${this.locale}" was not found`)
      }
      localeData = this.locales[this.default]
    }
    let message = getProp(localeData, path)
    if(!message) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[vue-inter] No message under "${path}" was found`)
      }
      if(this.default != this.locale) {
        message = getProp(this.locales[this.default], path)
      }
    }
    return message ? this.template(message, ...data) : '?? ' + path + ' ??'
  }

  setLocale(locale) {
    this.__locale = locale
    return this
  }
}
