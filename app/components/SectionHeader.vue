<script>
export default {
  name: 'SectionHeader',
  props: {
    top: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 5
    },
    nomargin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles () {
      const styles = {}
      if (this.nomargin) {
        styles['margin'] = '0'
      }
      if (this.top>0) {
        styles['margin-top'] = this.top+'px'
      }
      return styles
    }
  },
  render(h) {
    return h(
      'h' + this.level,   // tag name
      {
        'class': {
          'section-header': true,
          'primary--after': true
        },
        style: this.styles
      },
      [
        this.text,
        this.$slots.default // array of children
      ]
    )
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
