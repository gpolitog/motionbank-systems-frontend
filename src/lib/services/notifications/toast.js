import { Toast } from 'quasar-framework'

function toast (msg, type = null, opts = {}) {
  const toast = Object.assign({
    html: msg,
    color: 'white',
    bgColor: 'dark',
    timeout: 4000
  }, opts)
  switch (type) {
    case 'success':
      toast.icon = toast.icon || 'done'
      Toast.create.positive(toast)
      break
    case 'error':
      toast.icon = toast.icon || 'error'
      Toast.create.negative(toast)
      break
    case 'warn':
      toast.icon = toast.icon || 'warning'
      Toast.create.warning(toast)
      break
    case 'info':
      toast.icon = toast.icon || 'info'
      Toast.create.info(toast)
      break
    default:
      Toast.create(toast)
      break
  }
}

export default toast
