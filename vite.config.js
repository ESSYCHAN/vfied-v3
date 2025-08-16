// vite.config.js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 5167,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    global: 'globalThis'
  }
});