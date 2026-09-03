#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../src', import.meta.url)));
const port = Number(process.env.PLAYGROUND_PORT ?? 3333);
const host = process.env.PLAYGROUND_HOST ?? '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.map': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

const STUB_ESM = '/* playground no longer bootstraps Stencil */\n';
const STUB_IIFE = '/* playground no longer bootstraps Stencil */\n';

const safeJoin = (pathname) => {
  const decoded = decodeURIComponent(pathname.split('?')[0]);
  const rel = decoded.replace(/^\/+/, '');
  const abs = normalize(join(root, rel));
  if (abs !== root && !abs.startsWith(root + sep)) return null;
  return abs;
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, {
    'Cache-Control': 'no-cache',
    ...headers,
  });
  res.end(body);
};

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  let pathname = url.pathname;

  if (pathname === '/build/porsche-design-system.esm.js') {
    send(res, 200, STUB_ESM, { 'Content-Type': 'text/javascript; charset=utf-8' });
    return;
  }
  if (pathname === '/build/porsche-design-system.js') {
    send(res, 200, STUB_IIFE, { 'Content-Type': 'text/javascript; charset=utf-8' });
    return;
  }

  if (pathname === '/' || pathname === '') pathname = '/index.html';

  const file = safeJoin(pathname);
  if (!file) {
    send(res, 403, 'Forbidden');
    return;
  }

  if (!existsSync(file) || !statSync(file).isFile()) {
    send(res, 404, 'Not found');
    return;
  }

  const type = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
  });
  createReadStream(file).pipe(res);
});

server.listen(port, host, () => {
  console.warn(`playground http://localhost:${port}/`);
});
