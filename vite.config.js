import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'AssistOS_SDK',
      fileName: (format) => `assistos-sdk.${format}.js`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      output: {
        // UMD builds require a global name
        name: 'AssistOS_SDK',
        // Set the output directory to the root, so the GH action can find it
        dir: './dist'
      }
    }
  }
});
