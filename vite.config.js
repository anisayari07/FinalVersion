import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  server: {
    allowedHosts: ['937b-197-30-214-103.ngrok-free.app']
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer'], // Polyfill the buffer module
    }),
  ],
});