import Router from 'vue-router'
import routes from './routes'
import createLocalState from './store/localstorage'
import {store, mixins } from './store'
import App from './App'
import components from './components'

// add components
components.forEach(component => Vue.component(component.name, component))
// add all mixins storage
mixins.forEach( mixin => Vue.mixin(mixin) )

createLocalState({ states: ['settings'] })(store)

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  saveScrollPosition: true
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
