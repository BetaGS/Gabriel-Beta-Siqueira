import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Em desenvolvimento, /api vai para o back-end Python (uvicorn main:app --port 8000)
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
