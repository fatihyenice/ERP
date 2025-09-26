import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from './routes/routes';
import { createRouter, createWebHistory } from 'vue-router'; 
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(pinia);
app.use(router);
app.mount("#app"); 
