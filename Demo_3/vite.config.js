// @ts-ignore
import { DEV_SUPEROFFICE_URL } from "./src/superoffice-config/superoffice-url";
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  server: {
        proxy: {
          '/api': {
            target: DEV_SUPEROFFICE_URL,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
        }
      },
    },
  build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "index.css") return "style.css";
            return assetInfo.name || "style.css";
          },
          entryFileNames: "build.js"
        }
      }
    },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
