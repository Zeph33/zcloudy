import Vuex from 'vuex'
import {state as settings, mixins as settingsMix} from './settings'
import {state as file, mixins as fileMix} from './file'
import {state as app, mixins as appMix} from './app'
// import Vue from 'vue'

window && window.Vue && window.Vue.use(Vuex)

export const mixins = [settingsMix, fileMix, appMix]
export const store = new Vuex.Store({
  modules: {
    app,
    settings,
    file
  }
})