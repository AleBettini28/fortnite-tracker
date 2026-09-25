import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fortnite-api': {
        target: 'https://fortnite-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fortnite-api/, ''),
      },
    },
  },
})
