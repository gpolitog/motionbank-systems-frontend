<template lang="pug">
  video-player(class="video-player-box vjs-big-play-centered",
   ref="videoPlayer",
   :options="playerOptions",
   :playsinline="true",
   customEventName="customstatechangedeventname",
   @play="onPlayerEvent('play', $event)",
   @pause="onPlayerEvent('pause', $event)",
   @ended="onPlayerEvent('ended', $event)",
   @waiting="onPlayerEvent('waiting', $event)",
   @playing="onPlayerEvent('playing', $event)",
   @loadeddata="onPlayerEvent('data', $event)",
   @timeupdate="onPlayerEvent('time', $event.currentTime())",
   @canplay="onPlayerEvent('canplay', $event)",
   @canplaythrough="onPlayerEvent('canplaythrough', $event)",
   @statechanged="playerStateChange($event)",
   @ready="onPlayerReady")
</template>

<script>
  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')
  require('videojs-youtube')
  require('videojs-vimeo/src/Vimeo')
  require('videojs-framebyframe')

  import { videoPlayer } from 'vue-video-player'

  export default {
    components: {
      videoPlayer
    },
    data () {
      return {
        type: undefined,
        playerOptions: {
          fluid: true,
          width: 640,
          techOrder: ['html5'],
          language: 'en',
          playbackRates: [0.25, 0.5, 1.0, 1.5, 2.0],
          sources: [],
          poster: undefined,
          controlBar: {
            remainingTime: true
          },
          plugins: {
            framebyframe: {
              fps: 23.98, // FIXME: 25.0 ?!?, make "smart"
              steps: [
                {text: '-1s', step: -24},
                {text: '-1f', step: -1},
                {text: '+1f', step: 1},
                {text: '+1s', step: 24}
              ]
            }
          }
        }
      }
    },
    props: ['src'],
    mounted () {
      if (!this.src) return
      this.type = this.guessType(this.src)
      if (this.type === 'video/youtube') {
        this.playerOptions.techOrder = ['youtube']
      }
      else if (this.type === 'video/vimeo') {
        this.playerOptions.techOrder = ['vimeo']
      }
      this.setSources([{ type: this.type, src: this.src.source }])
    },
    watch: {
      src (val) {
        this.type = this.guessType(val)
        if (val) {
          if (this.type === 'video/youtube') {
            this.playerOptions.techOrder = ['youtube']
          }
          else if (this.type === 'video/vimeo') {
            this.playerOptions.techOrder = ['vimeo']
          }
          this.setSources([{type: this.type, src: val.source}])
        }
      }
    },
    computed: {
      player () {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      guessType (val) {
        if (val.source.indexOf('youtube.com') > -1 || val.source.indexOf('youtu.be') > -1) {
          return 'video/youtube'
        }
        else if (val.source.indexOf('vimeo.com') > -1) {
          return 'video/vimeo'
        }
        return null
      },
      onPlayerReady (player) {
        this.$emit('ready', player)
        if (this.type === 'video/youtube') {
          // console.log('youtube tech', player.tech_.ytPlayer)
        }
        else if (this.type === 'video/vimeo') {
          // console.log('vimeo tech', player.tech_)
        }
        else {
          // console.log('html5 tech', player.tech_)
        }
      },
      onPlayerEvent (type, player) {
        this.$emit(type, player)
      },
      onPlayerStateChange (player) {
        this.$emit('state-change', player)
      },
      setSources (sources, poster = undefined) {
        if (!Array.isArray(sources)) {
          sources = [sources]
        }
        this.playerOptions.sources = sources
        this.playerOptions.poster = poster
      }
    }
  }
</script>
