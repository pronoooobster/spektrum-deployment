import { createApp } from 'vue'
import App from './App.vue'

// import router
import router from './router'

// create the app and mount the router 
createApp(App).use(router).mount('#app')
