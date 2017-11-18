<template lang="pug">
  h5(class="section-header" :style="styles") {{ text }}
    slot
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    first: Boolean,
    text: String
  },
  computed: {
    styles () {
      const styles = {}
      if (this.first) {
        styles['margin-top'] = 0
      }
      return styles
    }
  }
}
</script>

<style lang="stylus">
  @require '../../node_modules/vuetify/src/stylus/settings/_colors'
  .section-header
    letter-spacing: 2px
    text-align: left !important
    // white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    position: relative
    padding-top: .5rem
    padding-bottom: .5rem
    display: flex
    align-items: center

    &:after
      content: ''
      position: absolute
      left: 0
      bottom: 0
      width: 100px
      height: 3px
      background: $blue.darken-2 !important
</style>
