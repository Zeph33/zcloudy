<template lang="pug">
    v-alert#error(color="error" icon="warning" value="true")
        h3 Page not found
        blockquote It would appear that #[br] #[code {{ path }}] #[br]could not be found
</template>

<script>
export default {
  name: "Error",
  computed: {
    path: function() {return this.$route.path }
  }
};
</script>
<<style lang="stylus">
#error
  color: black
  .icon
    font-size: 6rem
    // margin-top: 50px
</style>

