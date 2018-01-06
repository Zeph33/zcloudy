import messagebox from '../components/messagebox.vue'
import {merge} from '../utils'

export default {
  data() {
    return {
      zMsgBox: {
        show: false,
        title: '',
        text: '',
        callbackClose: null,
        box: null
      }
    }
  },
  methods: {
    dlgInfo(title, text, opt = {}) {
      return this.ShowMsgBox(title, text, merge({ icon:'info' }, opt))
    },
    dlgError(title, text, opt = {}) {
      return this.ShowMsgBox(title, text, merge({ icon: 'error' }, opt))
    },
    dlgWarning(title, text, opt = {}) {
      return this.ShowMsgBox(title, text, merge({ icon: 'warning' }, opt))
    },
    ShowMsgBox(title, text, options = {}) {
      if (!this.zMsgBox.box) {
        this.genMessageBox(merge({ overlay: options.modal ? true : false }, options))
      }
      return new Promise((resolve, _reject) => {
        this.zMsgBox.callbackClose = resolve
        this.zMsgBox.title = title
        this.zMsgBox.text = text
        this.$nextTick(() => this.zMsgBox.show = true)
      })
    },
    genMessageBox(opt={}) {
      var msgBox = this.zMsgBox
      let box = Vue.extend({
        components: {
          messagebox
        },
        render(h) {
          return h('messagebox', {
            ref: 'messagebox',
            attrs: {
              value: msgBox.show
            },
            on: {
              input: v => {
                msgBox.show = v
                if (!v) {
                  const lastCallBack = msgBox.callbackClose
                  const name = msgBox.box.$children[0].btnCloseName
                  msgBox.callbackClose = null
                  msgBox.box.$destroy()
                  delete msgBox.box
                  if (lastCallBack) {
                    Vue.nextTick(() => lastCallBack(name))
                  }
                }
              }
            },
            props: merge({title: msgBox.title, text: msgBox.text,}, opt)
          })
        }
      })
      this.zMsgBox.box = new box({
        parent: this
      })
      this.zMsgBox.box.$mount()
    }
  }

}