<template lang="pug">
  div
    SectionHeader {{ $i('nav.pictures') }}
    v-container(fluid grid-list-md)
      v-layout(row wrap)
        v-flex(xs6 sm4 md3 lg2 xl1 v-for="n in 9" :key="n")
          v-card(flat tile)
            v-card-media(
              :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
              height="150px")
</template>

<script>
export default {
  name: "Pictures",
  data () {
    return {}
  },
  computed: {
  },
  methods: { 
  }
};
</script>
<<style lang="stylus">
</style>

