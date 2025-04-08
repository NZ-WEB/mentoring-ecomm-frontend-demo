import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});
app.use(VueQueryPlugin, { queryClient });
app.use(autoAnimatePlugin);

app.mount('#app');
