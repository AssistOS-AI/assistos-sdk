import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'AssistOS',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'assistos-sdk.mjs' : 'assistos-sdk.umd.js'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    sourcemap: false
  }
});