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
import './assets/slider.scss'
import './assets/surveyView.scss'
import './assets/filters.scss'
import './assets/end.scss'

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import router from './router'
import {faEye, faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faClock,faRectangleList, faClockRotateLeft, faList, faLock, faLockOpen, faPlus, faSquareXmark,faSquarePollVertical,faFloppyDisk, faTrash, faLink, faGears, faArrowLeft, faHourglassStart, faGrip, faGripLines, faBrush, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


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
library.add(faSquarePollVertical);
library.add(faFloppyDisk);
library.add(faTrash);
library.add(faLink);
library.add(faGears);
library.add(faArrowLeft);
library.add(faHourglassStart);
library.add(faGrip);
library.add(faGripLines);
library.add(faRectangleList);
library.add(faBrush);
library.add(faArrowDownWideShort);

const app = createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)

app.mount('#app')
