import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        company: path.resolve(import.meta.dirname, 'company/index.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
        terms: path.resolve(import.meta.dirname, 'terms/index.html'),
      },
    },
  },
})
