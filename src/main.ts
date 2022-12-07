import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import {createPinia} from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {faCircle}  from '@fortawesome/free-solid-svg-icons'

library.add(faCircle)

let app = createApp(App)
app.use(elementplus)
app.use(router)
app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
