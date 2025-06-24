import './assets/main.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuth } from '@/composables/useAuth'

import App from './App.vue'
import router from './router'

const { checkAuth } = useAuth()
const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

checkAuth().then(() => {
  app.use(router)
  app.use(vuetify)

  app.mount('#app')
})
