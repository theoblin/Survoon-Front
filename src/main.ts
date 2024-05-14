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
import './assets/notification.scss'
import './assets/text.scss'
import './assets/input.scss'
import './assets/colors.scss'
import './assets/login.scss'
import './assets/signup.scss'
import './assets/font.scss'
import './assets/button.scss'
import './assets/loading.scss'
import './assets/resetPassword.scss'
import './assets/select.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import router from './router'
import {faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faClock, faClockRotateLeft, faList, faLock, faLockOpen, faPlus, faSquareXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare);
library.add(faEye);
library.add(faPlus);
library.add(faClock);
library.add(faList);
library.add(faClockRotateLeft);
library.add(faChartLine);
library.add(faLock);
library.add(faLockOpen);
library.add(faSquareXmark);

const app = createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
