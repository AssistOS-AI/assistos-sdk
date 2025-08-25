import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [commonjs()],
  build: {
    lib: {
      entry: {
        'assistos-sdk': 'index.js'
      },
      name: 'AssistOS_SDK',
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'es' ? 'mjs' : 'umd.js'}`
      }
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named'
      }
    }
  }
});
