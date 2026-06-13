import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
