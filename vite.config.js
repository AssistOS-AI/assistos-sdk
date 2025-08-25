import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    commonjs({
      include: [/./],
      transformMixedEsModules: true,
      ignoreDynamicRequires: false,
      requireReturnsDefault: 'auto'
    }),
    nodeResolve({
      preferBuiltins: false,
      browser: true
    })
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
        globals: {},
        inlineDynamicImports: true,
        exports: 'named'
      },
      plugins: [
        commonjs({
          include: [/./],
          transformMixedEsModules: true,
          ignoreDynamicRequires: false,
          requireReturnsDefault: 'auto'
        }),
        nodeResolve({
          preferBuiltins: false,
          browser: true
        })
      ]
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    sourcemap: false
  },
  resolve: {
    extensions: ['.js', '.json'],
    preferBuiltins: false
  }
});