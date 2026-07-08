import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
  server: {
    proxy: {
      // Proxy all /api/* requests to the Express backend in development.
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
        secure:       false,
      },
      // Proxy WebSocket connections for interactive execution
      '/ws': {
        target:    'ws://localhost:3001',
        ws:        true,           // <-- enable WebSocket proxying
        changeOrigin: true,
        secure:    false,
      },
    },
  },
})
