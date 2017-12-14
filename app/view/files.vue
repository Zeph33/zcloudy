<template lang="pug">
  div
    SectionHeader(nomargin)
      v-breadcrumbs(large)
        v-breadcrumbs-item(v-for="(path, idx) in arPath" :key="idx") {{ path }}
    v-data-table.elevation-1(:headers="headers" :items="content" :custom-sort="customSort" :rows-per-page-items="[25,50,{ text: 'All', value: -1 }]")
      template(slot="items" slot-scope="props")
        td {{ props.item.id }}
        td.text-xs-right {{ props.item.size }}
        td.text-xs-right {{ props.item.birthtime }}
        td.text-xs-right {{ props.item.mtime }}
</template>

<script>
import { getObjectValueByPath } from '../utils'
export default {
  name: "Files",
  data () {
    return {
      content: [],
      headers: [
        {text:'Name', value:'id'},
        {text:'Taille', value:'size'},
        {text:'Create', value:'birthtime'},
        {text:'Modified', value:'mtime'}
      ]
    }
  },
  computed: {
    arPath() {
      return ('Home'+this.gPath).split('/')
    },
    files() {
      return this.content.filter((e) => e.isfile)
    },
    folders() {
      return this.content.filter((e) => !e.isfile)
    }
  },
  mounted() {
    this.$http.Get('folder'+this.gPath)
      .then( (data) => this.content = data)
  },
  methods: { 
    customSort(items, index, isDescending) {
      if (index === null) return items

      return items.sort((a, b) => {
        if(a.isfile != b.isfile) {
          return isDescending ? (a.isfile ? -1 : 1) : (a.isfile ? 1 : -1)
        }
        
        let sortA = getObjectValueByPath(a, index)
        let sortB = getObjectValueByPath(b, index)

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

