import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // environment variable
  const isProduction = process.env.NODE_ENV === 'production';
  const env = loadEnv(mode, process.cwd(), '');

  const BASE_URL = isProduction ? env.VITE_BASE_URL : '/';
  // const BASE_URL = isProduction ? '/VueMap-Explorer/' : '/';


  // check mode
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  console.log('BASE vite: ', BASE_URL);


  return {
    base: BASE_URL,
    plugins: [
      vue(),
      isProduction ? null : vueDevTools(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'VueMap Explorer',
          short_name: 'VueMap',
          description: 'An interactive map explorer built with Vue.js',
          theme_color: '#ffffff',
          start_url: BASE_URL,
          display: 'standalone',
          background_color: '#ffffff',
          icons: [
            {
              src: 'img/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'img/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      })
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
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
          // notFound: './404.html',
        }
      }
    }
  }
});
