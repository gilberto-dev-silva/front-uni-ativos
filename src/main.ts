import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/base.css'
import '@/assets/tailwind.css'
import '@/assets/scss/main.scss'
import 'primeicons/primeicons.css'
import { Icon } from '@iconify/vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.component('iconify-icon', Icon)
app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')
