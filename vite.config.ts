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
        about: path.resolve(import.meta.dirname, 'about/index.html'),
        sites: path.resolve(import.meta.dirname, 'sites/index.html'),
        websitesRedirect: path.resolve(
          import.meta.dirname,
          'websites/index.html',
        ),
        websiteRedirect: path.resolve(
          import.meta.dirname,
          'website/index.html',
        ),
        companyRedirect: path.resolve(
          import.meta.dirname,
          'company/index.html',
        ),
        support: path.resolve(import.meta.dirname, 'support/index.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
        terms: path.resolve(import.meta.dirname, 'terms/index.html'),
      },
    },
  },
})
