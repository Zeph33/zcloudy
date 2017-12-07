import Vuex from 'vuex'
import {state as settings, mixins as settingsMix} from './settings'
import {state as file, mixins as fileMix} from './file'
// import Vue from 'vue'

window && window.Vue && window.Vue.use(Vuex)

export const mixins = [settingsMix, fileMix]
export const store = new Vuex.Store({
  modules: {
    settings,
    file
  }
})