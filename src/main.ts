import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'

let app = createApp(App)
app.use(elementplus)
app.use(router)
app.mount('#app')
