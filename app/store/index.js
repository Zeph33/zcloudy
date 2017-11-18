import Vuex from 'vuex'
import {state as settings, mixins as settingsMix} from './settings'
// import Vue from 'vue'

window && window.Vue && window.Vue.use(Vuex)

export const mixins = [settingsMix]
export const store = new Vuex.Store({
  modules: {
     settings
  }
})