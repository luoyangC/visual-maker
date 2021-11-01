import { createApp } from 'vue'
import { store, key } from './store'

import App from './App.vue'

import '@/assets/icon/iconfont.js'
import '@/assets/style/index.scss'

import myPlugins from './plugins'
import myCommons from './commons'

const app = createApp(App)
app.use(myPlugins)
app.use(myCommons)
app.use(store, key)
app.mount('#app')
