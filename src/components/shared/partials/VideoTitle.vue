<template lang="pug">
  span {{ videoTitle }}
</template>

<script>
  import path from 'path'
  import url from 'url'
  import superagent from 'superagent'
  import buildVars from '../../../lib/build-vars'
  import he from 'he'

  const fetchTitle = function (source) {
    return Promise.resolve()
      .then(() => {
        if (source.indexOf('http') !== 0) return
        if (path.extname(url.parse(source).path) === '.mp4') return
        return superagent.get(`${buildVars().apiHost}/proxy?url=${encodeURIComponent(source)}`)
          .then(result => {
            let title = result.text.match(/<title[^>]*>([^<]+)<\/title>/)[1]
            return he.decode(title)
          })
          .catch(err => {
            console.warn(`Error getting title for ${source}: ${err.message}`)
            return source
          })
      })
  }

  export {
    fetchTitle
  }

  export default {
    props: ['source'],
    data () {
      return {
        videoTitle: undefined
      }
    },
    mounted () {
      const _this = this
      fetchTitle(this.source).then(title => {
        _this.videoTitle = title
      })
    }
  }
</script>
