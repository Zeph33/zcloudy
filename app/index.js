import Router from 'vue-router'
import routes from './config/routes'
import routerHooks from './config/routes/hooks'
import store from './vuex-store'
import App from './App'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  saveScrollPosition: true
})

// Add the loginRequired hook before each state transition
// router.beforeEach(routerHooks.loginRequired)
// const router = null
// const store = null

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
