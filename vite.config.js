import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// environment variable
const isProduction = process.env.NODE_ENV === 'production';
const BASE = isProduction ? '/VueMap-Explorer/' : '/';

// check mode
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('BASE vite: ', BASE);


// https://vitejs.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      views: fileURLToPath(new URL('./src/views', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  },
});
