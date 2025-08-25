import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImport from '@originjs/vite-plugin-dynamic-import';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    commonjs(),
    dynamicImport()
  ],
  resolve: {
    alias: {
      './serverless': resolve(__dirname, 'modules/util/serverless')
    }
  },
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
