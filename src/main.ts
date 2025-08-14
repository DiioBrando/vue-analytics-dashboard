import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/router.ts";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .mount('#app');