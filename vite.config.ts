import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());

   return {
       plugins: [
           vue(),
           Components({
               resolvers: [
                   PrimeVueResolver(),
               ]
           }),
       ],
       server: {
           port: 3000,
           proxy: {
               "/api": {
                   target: env.VITE_DATABASE_API,
                   changeOrigin: true,
                   rewrite: (path) => path.replace(/^\/api/, ''),
                   secure: false,
               },
           }
       }
   }
})
