import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia';
import { fetchConfigFromFirestore } from './services/apiConfig';

import 'ldrs/ping';

const app = createApp(App)

const pinia = createPinia()

// Update api config before load the app
fetchConfigFromFirestore().then(() => {
    app.use(router);
    app.use(pinia);
    app.mount('#app');
  });
