<template lang="pug">

  div(:class="{'display-preview': preview, 'display-full': display}")
    template(v-if="display")
      iframe(:src="iframeSrc", @load="handleIframeLoaded")

    template(v-else)
      strong {{iframeSrc}}

</template>

<script>
  export default {
    props: ['cell', 'display', 'preview'],
    data () {
      return {}
    },
    computed: {
      iframeSrc () {
        return this.cell.content
      }
    },
    methods: {
      handleIframeLoaded (event) {
        console.log(event)
      }
    }
  }
</script>

<style lang="stylus" scoped>

  div
    padding 1em
    width 100%
    height 100%
    background-color white
    background-size contain
    background-repeat no-repeat
    background-position center

  iframe
    border: 0
    padding: 0
    margin: 0
    width: 100%
    height: 100%
    background-color: white
    background-size: contain
    background-repeat: no-repeat
    background-position: center

</style>
