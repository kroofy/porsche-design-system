import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import type { Plugin } from 'vite';

const DEV_CDN = 'http://localhost:3001';
const MIME: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};
const DEPS_ID = 'virtual:pds-lit-deps';

/** Lite sources hardcode the local dev CDN; the playground rewrites it to `cdnBaseUrl`. */
const rewriteCdn = (code: string, cdnBaseUrl: string) => code.replaceAll(DEV_CDN, cdnBaseUrl);

/** Map every `p-*` tag to the `p-*` tags its .lite.tsx renders, so the Lit frame loads only that closure. */
const litDeps = (mitosisRoot: string) => {
  const deps: Record<string, string[]> = {};
  for (const dir of readdirSync(mitosisRoot)) {
    const folder = join(mitosisRoot, dir);
    if (dir.startsWith('_') || !statSync(folder).isDirectory()) continue;
    const lite = readdirSync(folder).find((name) => name.endsWith('.lite.tsx'));
    if (!lite) continue;
    const source = readFileSync(join(folder, lite), 'utf8');
    const used = new Set([...source.matchAll(/<p-([a-z0-9-]+)/g)].map((match) => match[1]).filter((tag) => tag !== dir));
    deps[dir] = [...used].sort();
  }
  return deps;
};

export function pdsPlayground({
  componentsRoot,
  cdnBaseUrl,
}: {
  componentsRoot: string;
  cdnBaseUrl: string;
}): Plugin {
  const mitosisRoot = resolve(componentsRoot, 'mitosis');
  const assetsRoot = resolve(componentsRoot, 'src/assets');
  const assetFiles = () => [
    ...readdirSync(assetsRoot).filter((name) => /^p-.+\.iife\.js$/.test(name)),
    'lights.jpg',
  ];
  const readAsset = (name: string) => {
    const buffer = readFileSync(join(assetsRoot, name));
    return name.endsWith('.js') ? rewriteCdn(buffer.toString('utf8'), cdnBaseUrl) : buffer;
  };

  return {
    name: 'pds-playground',
    resolveId(id) {
      return id === DEPS_ID ? `\0${DEPS_ID}` : null;
    },
    load(id) {
      return id === `\0${DEPS_ID}` ? `export default ${JSON.stringify(litDeps(mitosisRoot))};` : null;
    },
    transform(code, id) {
      if (!id.split('?')[0].includes(`${sep}components${sep}mitosis${sep}`) || !code.includes(DEV_CDN)) return null;
      return { code: rewriteCdn(code, cdnBaseUrl), map: null };
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!url.startsWith('/pds-assets/')) return next();
        const name = decodeURIComponent(url.slice('/pds-assets/'.length));
        const file = normalize(join(assetsRoot, name));
        if (!file.startsWith(assetsRoot + sep) || !existsSync(file) || !statSync(file).isFile()) {
          res.statusCode = 404;
          res.end('not found');
          return;
        }
        res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream');
        res.end(readAsset(name));
      });
    },
    generateBundle() {
      for (const name of assetFiles()) {
        this.emitFile({ type: 'asset', fileName: `pds-assets/${name}`, source: readAsset(name) });
      }
    },
  };
}
