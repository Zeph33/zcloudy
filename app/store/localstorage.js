import * as util from '../utils'

const defaultReducer = (state, paths) => (
  paths.length === 0 ? state : paths.reduce((substate, path) => {
    util.objSet(substate, path, util.objGet(state, path))
    return substate
  }, {})
)

export default function createLocalState({
  key = 'vuex',
  paths = [],
  modules = [],
  delKey = key => window.localStorage.removeItem(key),
  getState = key => JSON.parse(window.localStorage.getItem(key)),
  setState = (key, state) => window.localStorage.setItem(key, JSON.stringify(state)),
  reducer = defaultReducer
} = {}) {
  return store => {
    let save = {}
    const mutationsModule = {}
    // create object modules mutations and retrieve state value
    // { module1: [mutation1, mutation2...], ... , moduleN: [mutationN, ...]}
    store._modules.root.forEachChild((v, mod) => {

      v.forEachMutation((f, mutation) => (mutationsModule[mutation] = mod))
      // Only add if in modules array  or no modules specified
      if (modules.length === 0 || modules.indexOf(mod) !== -1) {
        save[mod] = getState(key + '_' + mod)
        // if null save empty object ... no erase default state
        if (save[mod] === null) save[mod] = {}
      } else { // else delete key old save
        delKey(key + '_' + mod)
      }
    })

    // no module use key only
    if (mutationsModule.length === 0) save = getState(key)
    // replace store with save
    store.replaceState(util.merge({}, store.state, save))

    // hook mutation
    store.subscribe((mutation, state) => {
      let useKey = key // key for save
      let useState = state // state to save
      const type = mutation.type.substring(mutation.type.indexOf('/') + 1)
      if (mutationsModule.hasOwnProperty(type)) {
        // check if is saved module
        if (modules.length > 0 && modules.indexOf(mutationsModule[type]) === -1) {
          return // not saved, exit nothing ...
        }
        // Change key et state to save
        useKey = key + '_' + mutationsModule[type]
        useState = state[mutationsModule[type]]
      }
      setState(useKey, reducer(useState, paths))
    })
  }
}
