import type { App } from 'vue'
import elementPlugin from './element'

export default {
  install: (app: App) => {
    elementPlugin(app)
  }
}
