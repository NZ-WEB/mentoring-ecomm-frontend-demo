import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(autoAnimatePlugin);

app.mount('#app');
