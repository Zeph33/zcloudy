import { mixins } from '../store'
import mixinMsg from './messagebox'
mixins.push(mixinMsg)
export { mixins }

export default function(vue) {
  mixins.forEach( mixin => vue.mixin(mixin) )
}