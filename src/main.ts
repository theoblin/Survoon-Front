import './assets/main.scss'
import './assets/navbar.scss'
import './assets/profile.scss'
import './assets/surveyItem.scss'
import './assets/surveyList.scss'
import './assets/modale.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
