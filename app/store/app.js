const initState = {
  content: []
}

const mutations = {
  SET_CONTENT(state, content) {
    state.content = content
  }
}

const getters = {
  gContent(state) { return state.content }
}

const actions = {
  gSetContent(store, content) {
    store.commit('SET_CONTENT', content)
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
      'gContent'])
  },
  methods: {
    ...mapActions(['gSetContent'])
  }
}
