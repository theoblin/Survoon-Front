import './assets/main.scss'
import './assets/navbar.scss'
import './assets/profile.scss'
import './assets/surveyItem.scss'
import './assets/surveyList.scss'
import './assets/modale.scss'
import './assets/surveyEdit.scss'
import './assets/survey.scss'
import './assets/surveyQuestion.scss'
import './assets/reco.scss'
import './assets/satis.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
