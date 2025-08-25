import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: 'ignore-dynamic-imports',
      resolveId(source) {
        // Ignore absolute dynamic imports that can't be bundled
        if (source.startsWith('/applications/files/')) {
          return { id: source, external: true };
        }
      },
      transform(code, id) {
        // Replace problematic dynamic imports with stubs
        if (id.includes('modules/application/index.js')) {
          return code.replace(
            /import\(`\/applications\/files\/\$\{spaceId\}\/\$\{applicationId\}\/\$\{encodedPath\}`\)/g,
            'Promise.resolve({ default: {} })'
          );
        }
        return null;
      }
    }
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
          ignoreDynamicRequires: true,
          requireReturnsDefault: 'auto'
        }),
        nodeResolve({
          preferBuiltins: false,
          browser: true,
          resolveOnly: (module) => {
            // Don't resolve serverless module externally
            if (module.includes('serverless')) {
              return true;
            }
            return !module.includes('node_modules');
          }
        })
      ]
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    sourcemap: false
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs'],
    preferBuiltins: false,
    alias: {
      'assistos': resolve(__dirname, 'index.js'),
      './serverless': resolve(__dirname, 'modules/util/serverless/serverless-client.mjs')
    }
  }
});