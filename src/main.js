import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import moviesStore from './store/moviesStore'


createApp(App).use(router,store,moviesStore).mount('#app')

