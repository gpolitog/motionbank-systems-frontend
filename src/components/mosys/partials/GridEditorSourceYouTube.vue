<template lang="pug">

  q-list.youtube-source-container

    q-list-header
      q-input(v-model="searchTerm")

    q-item-separator

    // loading, nothing here
    template(v-if="loadingVideos")
      q-item
        q-item-side
          q-spinner(style="margin-right: 1em")
        q-item-main Loading videos for »{{lastSearchTerm}}«
      q-item-separator
    template(v-else-if="searchResults.length === 0")
      q-item No Videos Found!

    // videos, annotations
    template(v-if="searchResults.length > 0")
      template(v-for="(video, i) in searchResults")
        template(v-if="i > 0")
          q-item-separator
        q-item(draggable="true", @dragstart="event => {handleVideoItemDragStart(event, video)}")
          q-item-side
            template(v-if="video.snippet.thumbnails.default")
              img(:src="video.snippet.thumbnails.default.url", style="width: 100%; max-width: 50px")
            template(v-else)
              q-icon(name="local movies", style="font-size: 1.8rem")
          q-item-main
            a(@click.prevent="event => {handleVideoItemClick(event, video)}") {{video.snippet.title.substring(0, 100)}}

</template>

<script>
  import { QInput, QIcon, QBtn, QList, QListHeader, QItem, QItemSide, QItemMain, QItemSeparator, QScrollArea, QSpinner } from 'quasar-framework'
  import superagent from 'superagent'

  const YOUTUBE_API_KEY = 'AIzaSyCMfeZXhTec0elm19N_2TTBHNZR2hpl-5Q'
  const apiBase = 'https://www.googleapis.com'
  const apiSearchVideos = '/youtube/v3/search'

  export default {
    components: {
      QInput, QIcon, QBtn, QList, QListHeader, QItem, QItemSide, QItemMain, QItemSeparator, QScrollArea, QSpinner
    },
    data () {
      return {
        searchTerm: '',
        searchResults: [],
        loadingVideos: false,
        lastSearchTerm: ''
      }
    },
    watch: {
      searchTerm () {
        if (!this.loadingVideos) {
          this.loadVideos()
        }
      }
    },
    methods: {
      loadVideos () {
        const _this = this
        if (this.searchTerm.length >= 3) {
          this.loadingVideos = true
          this.lastSearchTerm = this.searchTerm
          superagent
            .get(apiBase + apiSearchVideos, {
              q: this.searchTerm,
              part: 'snippet',
              maxResults: 30,
              key: YOUTUBE_API_KEY
            })
            .then(results => {
              _this.searchResults = results.body.items
              _this.checkNewSearchTerm()
            })
            .catch(() => {
              console.log('Failed to load YouTube results for', _this.searchTerm)
              _this.checkNewSearchTerm()
            })
        }
        else if (this.searchTerm.length === 0) {
          this.searchResults = []
          this.lastSearchTerm = ''
        }
      },
      checkNewSearchTerm () {
        if (this.searchTerm !== this.lastSearchTerm) {
          this.loadVideos()
        }
        else {
          this.loadingVideos = false
        }
      },
      handleVideoItemClick (event, video) {
      },
      handleVideoItemDragStart (event, video) {
        let videoCell = {
          uuid: null,
          type: 'Video',
          x: 1,
          y: 1,
          width: 1,
          height: 1,
          content: 'https://www.youtube.com/watch?v=' + video.id.videoId
        }
        event.dataTransfer.setData('text/plain', JSON.stringify(videoCell))
      }
    }
  }
</script>

<style scoped lang="stylus">

  .q-list-header
    padding-left 0

    .q-input
      padding-left 1em
      padding-right 1em

    .q-input:before
    .q-input:after
      display none

  .q-input
    padding-left 0

</style>
