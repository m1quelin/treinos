import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' faz o build funcionar no GitHub Pages em qualquer nome de repositório
export default defineConfig({
  plugins: [react()],
  base: './',
})
