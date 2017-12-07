const initState = {
  path: '/',
  file: ''
}

const mutations = {
  SET_PATH(state, path) {
    state.path = path
  },
  SET_FILE(state, file) {
    state.file = file
  }
}

const getters = {
}

const actions = {
  setFile(store, file) {
    store.commit('SET_FILE', file)
  },
  setPath(store, path) {
    store.commit('SET_PATH', path)
  }
}

export const state = {
  state: initState,
  mutations: mutations,
  getters: getters,
  actions: actions
}

// import { mapActions, mapGetters } from 'vuex'

export const mixins = {
  computed: {
    // ...mapGetters([]),
    gFile: {
      get: function() { return this.$store.state.file.file },
      set: function(val) { this.$store.dispatch('setFile', val) }
    },
    gPath: {
      get: function() { return this.$store.state.file.path },
      set: function(val) { this.$store.dispatch('setPath', val) }
    }
  },
  methods: {
  // ...mapActions([])
  }
}
