import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
    },
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries for better caching
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'radix-ui': ['@radix-ui/react-tooltip', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'animations': ['framer-motion', 'animejs'],
          'utils': ['@tanstack/react-query', 'clsx', 'class-variance-authority'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps only in dev
    sourcemap: false,
    // Optimize CSS code splitting
    cssCodeSplit: true,
    // Asset inline size - increase to reduce requests
    assetsInlineLimit: 4096,
    // Reduce report compression
    reportCompressedSize: false,
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
  },
});
