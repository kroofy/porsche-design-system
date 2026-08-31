import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { mitosisCompareAdapters } from './src/vite-plugins';

const assetsRoot = resolve(fileURLToPath(new URL('../components/src/assets', import.meta.url)));
const MIME: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function pdsAssets(): Plugin {
  return {
    name: 'pds-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/pds-assets/')) return next();
        const rel = decodeURIComponent(url.slice('/pds-assets/'.length).split('?')[0]);
        const file = normalize(join(assetsRoot, rel));
        if (!file.startsWith(assetsRoot) || !existsSync(file) || !statSync(file).isFile()) {
          res.statusCode = 404;
          res.end('not found');
          return;
        }
        res.setHeader('Content-Type', MIME[extname(file).toLowerCase()] ?? 'application/octet-stream');
        createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [
    pdsAssets(),
    mitosisCompareAdapters(),
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: [['styled-jsx/babel', { optimizeForSpeed: true }]],
      },
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('p-'),
        },
      },
    }),
    svelte({
      preprocess: preprocess({ typescript: true }),
    }),
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
    dedupe: ['react', 'react-dom', 'vue'],
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    hmr: { overlay: false },
    fs: {
      allow: [resolve(fileURLToPath(new URL('../..', import.meta.url)))],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'vue', 'styled-jsx/style'],
    exclude: ['@angular/core', '@angular/common', '@angular/compiler', '@angular/platform-browser'],
  },
});
