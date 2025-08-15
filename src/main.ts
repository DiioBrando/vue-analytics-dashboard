import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/router.ts";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {VueQueryPlugin, QueryClient, QueryCache, MutationCache} from '@tanstack/vue-query';

const app = createApp(App);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            console.log(error.message);
        }
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            console.log(error.message);
        }
    }),
});

app
    .use(router)
    .use(VueQueryPlugin,{
        queryClient
    })
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .mount('#app');