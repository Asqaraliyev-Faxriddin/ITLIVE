import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    // SPA fallback: barcha unknown routes index.html ga yo'naltiriladi
    historyApiFallback: true
  }
})
