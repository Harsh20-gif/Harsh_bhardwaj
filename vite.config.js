import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Harsh_bhardwaj/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'motion-vendor': ['framer-motion', 'lenis'],
          'three-vendor': ['three', '@react-three/fiber'],
        },
      },
    },
  },
});
