/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as dotenv from 'dotenv';

// Load environment variables
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
    outDir: 'dist', // Ensure built files are placed in the correct directory
    assetsDir: 'assets', // Ensures assets (JS, CSS) are correctly referenced
    manifest: true, // Helps Amplify properly recognize asset files
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    historyApiFallback: true, // Ensures React Router works correctly
  }
});
