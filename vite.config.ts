import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(path.dirname(import.meta.url), 'src/app'),
      '@assets': path.resolve(path.dirname(import.meta.url), 'src/assets'),
      '@entities': path.resolve(path.dirname(import.meta.url), 'src/entities'),
      '@pages': path.resolve(path.dirname(import.meta.url), 'src/pages'),
      '@shared': path.resolve(path.dirname(import.meta.url), 'src/shared'),
      '@widgets': path.resolve(path.dirname(import.meta.url), 'src/widgets'),
    },
  },
});
