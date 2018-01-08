const initState = {
  title: 'Paramètres de l\'application ...',
  mini: false,
  locale: 'en'
}

const mutations = {
  SET_LOCALE(state, locale) {
    state.locale = locale
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_MINI(state, mini) {
    state.mini = mini
  }
}

const getters = {
  appLocale(state) { return state.locale },
  navMini(state) { return state.mini },
  appTitle(state) { return state.title }
}

const actions = {
  setNavMini(store, mini) {
    store.commit('SET_MINI', mini === true)
  },
  setAppTitle(store, title) {
    store.commit('SET_TITLE', title)
  },
  setAppLocale(store, locale) {
    store.commit('SET_LOCALE', locale)
  }
}

export const state = {
  state: initState,
  mutations: mutations,
  getters: getters,
  actions: actions
}

import { mapActions, mapGetters } from 'vuex'

export const mixins = {
  computed: {
    ...mapGetters([
      'navMini',
      'appTitle',
      'appLocale'])
  },
  methods: mapActions(['setNavMini', 'setAppTitle', 'setAppLocale'])
}
