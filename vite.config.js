import { defineConfig } from 'vite';
import { resolve } from 'path';
import dynamicImport from '@originjs/vite-plugin-dynamic-import';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    dynamicImport(),
    commonjs()
  ],
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
        globals: {}
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});