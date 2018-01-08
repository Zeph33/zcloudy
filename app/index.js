import Router from 'vue-router'
import routes from './routes'
import createLocalState from './store/localstorage'
import { store } from './store'
import mixins from './mixins'
import App from './App'
import components from './components'
import Inter from './components/inter'
import * as utils from './utils'
import zHttp from './api/remote'
import locales from './locales'

Vue.use(Inter)
const inter = new Inter({
  locale: 'en',
  locales
})

mixins(Vue)
Vue.prototype.$http = window.zHttp = new zHttp()
Vue.prototype.$utils = window.utils = utils

// add components
components.forEach(component => Vue.component(component.name, component))
// add all mixins storage
createLocalState({ modules: ['settings'] })(store)
// createLocalState({})(store)

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  saveScrollPosition: true
})

export const app = new Vue({
  el: '#app',
  inter,
  router,
  store,
  render: h => h(App)
})
