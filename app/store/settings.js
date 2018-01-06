const initState = {
  title: 'Paramètres de l\'application ...',
  mini: false
}

const mutations = {
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_MINI(state, mini) {
    state.mini = mini
  }
}

const getters = {
  test(state) { return state.test },
  navMini(state) { return state.mini },
  appTitle(state) { return state.title }
}

const actions = {
  setNavMini(store, mini) {
    store.commit('SET_MINI', mini === true)
  },
  setAppTitle(store, title) {
    store.commit('SET_TITLE', title)
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
      'appTitle'])
  },
  methods: mapActions(['setNavMini', 'setAppTitle'])
}
