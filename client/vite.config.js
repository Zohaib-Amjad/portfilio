import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Windows can temporarily lock large image assets; avoid crashing HMR
    // while the logo remains available to Vite's normal asset pipeline.
    watch: {
      ignored: ['**/src/assets/**'],
    },
  },
})
