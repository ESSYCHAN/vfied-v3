import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015'
  },
  server: {
    port: 3000
  }
});