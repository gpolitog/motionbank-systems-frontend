<template lang="pug">
  form-main(v-model="payload", :schema="schema")
</template>

<script>
  import FormMain from '../../shared/forms/FormMain'
  import { QBtn } from 'quasar-framework'
  import { required } from 'vuelidate/lib/validators'
  import { DateTime } from 'luxon'
  export default {
    components: {
      FormMain,
      QBtn
    },
    props: ['redirectTo'],
    mounted () {
      const context = this
      if (this.$route.params.id) {
        this.$store.dispatch('annotations/get', this.$route.params.id)
          .then(result => {
            context.payload = {
              url: result.body.source
            }
          })
      }
    },
    data () {
      const context = this
      return {
        // FIXME: i know this is bullshit!!! (but i hope it works for now)
        apiPayload: undefined,
        payload: undefined,
        schema: {
          fields: {
            url: {
              fullWidth: true,
              type: 'text',
              label: 'labels.video_url',
              errorLabel: 'errors.field_required',
              validators: {
                required
              }
            }
          },
          submit: {
            handler () {
              context.apiPayload = {
                body: {
                  source: context.payload.url,
                  type: 'Video',
                  purpose: 'linking'
                },
                author: context.$store.state.auth.payload.userId,
                target: {
                  id: context.$route.params.groupId || context.groupId,
                  type: 'Map',
                  selector: {
                    type: 'DateTime',
                    value: DateTime.local().toString()
                  }
                }
              }
              return Promise.resolve()
                .then(() => {
                  if (context.payload.uuid) {
                    return context.$store.dispatch('annotations/patch', [context.payload.uuid, context.apiPayload])
                  }
                  return context.$store.dispatch('annotations/create', context.apiPayload)
                })
                .then(() => {
                  console.log(context.$route.params)
                  context.$router.push(`/piecemaker/groups/${context.$route.params.groupId}/videos`)
                })
            }
          }
        }
      }
    }
  }
</script>
