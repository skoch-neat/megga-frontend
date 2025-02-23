/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_COGNITO_DOMAIN: process.env.VITE_COGNITO_DOMAIN,
          VITE_COGNITO_IDP_URL: process.env.VITE_COGNITO_IDP_URL,
          VITE_COGNITO_TOKEN_URL: process.env.VITE_COGNITO_TOKEN_URL,
          VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
        },
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    }
  }
});
