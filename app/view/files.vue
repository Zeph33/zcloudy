<template lang="pug">
  div
    SectionHeader(nomargin)
      v-breadcrumbs(large)
        v-breadcrumbs-item(v-for="(path, idx) in arPath" @click.native="moveToPathIndex(idx)") {{ path }}
    v-data-table.elevation-1(v-model="selected" select-all :headers="headers" :items="gContent" :custom-sort="customSort" :rows-per-page-items="[25,50,{ text: 'All', value: -1 }]")
      template(slot="items" slot-scope="props")
        td: v-checkbox(primary hide-details v-model="props.selected")
        td.headline.click(@click="openItem(props.item)")
          v-icon.pa-2(:color="itemColor(props.item)" large) {{ itemIcon(props.item) }}
          | {{ props.item.id }}
        td.text-xs-right {{ props.item.isfile ? $utils.humanSize(props.item.size) : '' }}
        td.text-xs-right {{ new Date(props.item.birthtime).toLocaleString() }}
        td.text-xs-right {{ new Date(props.item.mtime).toLocaleString() }}
</template>

<script>
export default {
  name: "Files",
  data () {
    return {
      selected: [],
      // content: [],
      headers: [
        {text:'Name', value:'id'},
        {text:'Size', value:'size'},
        {text:'Created', value:'birthtime'},
        {text:'Modified', value:'mtime'}
      ]
    }
  },
  computed: {
    arPath() {
      return ('Home'+this.gPath).split('/')
    },
    files() {
      return this.gContent.filter((e) => e.isfile)
    },
    folders() {
      return this.gContent.filter((e) => !e.isfile)
    }
  },
  mounted() {
    this.$app.setPath('/')
  },
  methods: {
    // loadFile() {
    //   this.$http.Get('file'+this.gFile)
    //     .then( )
    // },
    moveToPathIndex(idx) {
      this.$app.setPath( idx == 0 ?  '/' : '/' + this.arPath.slice(1,idx+1).join('/')  + '/')
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    itemIcon(item) {
      return item.isfile ? 'insert_drive_file' : 'folder'
    },
    itemColor(item) {
      return item.isfile ? 'green darken-3' : 'primary'
    },
    openItem(item) {
      if(item.isfile) {
        this.$utils.downloadURI('file' + this.gPath + item.id, item.id)
        this.$app.setFile(this.gPath + item.id)
      } else {
        this.$app.setPath( this.gPath + item.id + '/')
      }
    },
    customSort(items, index, isDescending) {
      if (index === null) return items

      return items.sort((a, b) => {
        if(a.isfile != b.isfile) {
          return isDescending ? (a.isfile ? -1 : 1) : (a.isfile ? 1 : -1)
        }
        
        let sortA = this.$utils.getObjectValueByPath(a, index)
        let sortB = this.$utils.getObjectValueByPath(b, index)

        if (isDescending) {
          [sortA, sortB] = [sortB, sortA]
        }

        // Check if both are numbers
        if (!isNaN(sortA) && !isNaN(sortB)) {
          return sortA - sortB
        }

        // Check if both cannot be evaluated
        if (sortA === null && sortB === null) {
          return 0
        }

        [sortA, sortB] = [sortA, sortB]
          .map(s => (
            (s || '').toString().toLocaleLowerCase()
          ))
        if (sortA > sortB) return 1
        if (sortA < sortB) return -1
        return 0
      })
    }
  }
};
</script>
<<style lang="stylus">
</style>

