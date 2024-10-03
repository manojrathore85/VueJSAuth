import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/admin-lte/dist/assets/img/*',
          dest: 'img'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',  // General build output directory
  },  
  define: {
    __VUE_OPTIONS_API__: true, // or false if you're not using the Options API
    __VUE_PROD_DEVTOOLS__: false, // disable devtools in production
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true // to avoid the warning
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

