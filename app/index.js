import Router from 'vue-router'
import routes from './routes'
import createLocalState from './store/localstorage'
import { store } from './store'
import mixins from './mixins'
import App from './App'
import components from './components'
import * as utils from './utils'
import zHttp from './api/remote'

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
  router,
  store,
  render: h => h(App)
})
