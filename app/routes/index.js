/**
 * Import your routes from different modules here. Eg:
 *
 * import authRoutes from auth
 */
import calendars from '../view/calendars.vue'
import contacts from '../view/contacts.vue'
import files from '../view/files.vue'
import pictures from '../view/pictures.vue'
import settings from '../view/settings.vue'
import error from '../view/error.vue'
import start from '../view/start.vue'

let routes = [
  { path: '/',         name: 'start',    component: start},
  { path: '/calendars',name: 'calendars',component: calendars},
  { path: '/contacts', name: 'contacts', component: contacts},
  { path: '/files',    name: 'files',    component: files},
  { path: '/pictures', name: 'pictures', component: pictures},
  { path: '/settings', name: 'settings', component: settings},
  { path: '*',         name: 'error',    component: error }
]

/**
 * Add your sub-routes here. One way to do so is:
 *
 * routes = [...routes, ...authRoutes]
 */

export default routes
