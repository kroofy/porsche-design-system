import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import { pdsPlayground } from './vite-plugin-pds';

const here = (path: string) => resolve(fileURLToPath(new URL('.', import.meta.url)), path);

export default defineConfig({
  base: './',
  plugins: [
    pdsPlayground({
      componentsRoot: here('../components'),
      cdnBaseUrl: process.env.PDS_CDN_BASE_URL ?? 'https://cdn.ui.porsche.com/porsche-design-system',
    }),
    react({ include: /\.(jsx|tsx)$/ }),
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('upstream-') } } }),
    svelte({ preprocess: preprocess({ typescript: true }) }),
  ],
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'vue', 'svelte'],
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: here('index.html'),
        frame: here('frame.html'),
      },
    },
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    hmr: { overlay: false },
    fs: { allow: [here('../..')] },
  },
  preview: { port: 5174, host: '0.0.0.0' },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'vue'],
    exclude: ['@angular/core', '@angular/common', '@angular/compiler', '@angular/platform-browser'],
  },
});
