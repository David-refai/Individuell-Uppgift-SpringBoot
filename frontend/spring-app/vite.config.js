import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginAnalyzer from 'vite-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginAnalyzer()], // Use a single `plugins` array

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
