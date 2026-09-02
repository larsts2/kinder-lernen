import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Output to docs/ so GitHub Pages can serve it directly from the main branch
    outDir: 'docs',
    rollupOptions: {
      output: {
        // Single JS file, single CSS file — easy to share/open directly
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app.js',
        assetFileNames: 'assets/app.css',
      },
    },
  },
})
