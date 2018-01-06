<template lang="pug">
  v-dialog(ref="dialog" v-model="show" :transition="transition" :persistent="modal" :hide-overlay="!overlay" :max-width="maxWidth")
    v-card
      v-card-title
        SectionHeader(nomargin) {{ title }}
      v-card-text.subheading
        v-layout(row wrap)
          v-flex(v-if="icon" xs1): v-icon(size="40px" :color="coloricon") {{ icon }}
          v-flex(offset-xs1 :class="{xs10: icon, xs11: !icon}") {{ firstText }}
            ul: li(v-for="msg in arRest") {{ msg }}
      v-divider
      v-card-actions
        v-spacer
        v-btn(v-for="(name, idx) in btn" :key="idx" color="primary" flat @click="close(name)") {{ name }}
</template>
<script>
import { isArray } from '../utils'
import SectionHeader from './SectionHeader.vue'
export default {
  name: 'MessageBox',
  components: { SectionHeader },
  props: {
    title: {
      type: String,
      default: 'GCDI'
    },
    text: {
      type: [String, Array],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconcolor: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: null,
    },
    overlay: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: [String, Number],
      default: 500
    },
    transition: {
      type: String,
      default: 'dialog-transition'
    },
    btn: {
      type: Array,
      default: () => ['Fermer']
    }
  },
  data() {
    return {
      lazyValue: this.value,
      btnCloseName: ''
    }
  },
  computed: {
    show: {
      get: function() {return this.lazyValue},
      set: function(v) {
        this.lazyValue = v
        this.$nextTick( () => {
          setTimeout( () => this.$emit('input', this.lazyValue), this.$refs.dialog.overlayTransitionDuration)
        })
      }
    },
    firstText() {
      return isArray(this.text) ? (this.text.length>0 ? this.text[0] : '') : this.text
    },
    arRest() {
      return isArray(this.text) && this.text.length>1 ? this.text.slice(1) : []
    },
    coloricon() {
      return this.iconcolor ? this.iconcolor : this.icon
    }
  },
  watch: {
    value(val) { this.lazyValue = val}
  },
  methods: {
    close(name) {
      this.btnCloseName = name
      this.show = false
    }
  }
}
</script>

<style lang="stylus">
</style>
