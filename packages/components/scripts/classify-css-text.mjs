#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const mitosisRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../mitosis');

const extractGetter = (src) => {
  const start = src.indexOf('get cssText()');
  if (start < 0) return null;
  const brace = src.indexOf('{', start);
  let depth = 0;
  for (let i = brace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(brace + 1, i);
    }
  }
  return null;
};

const evalStatic = (body) => {
  const ret = body.match(/return\s+([\s\S]*?);?\s*$/);
  if (!ret) return null;
  try {
    return new Function(`return (${ret[1]});`)();
  } catch {
    return null;
  }
};

const rows = readdirSync(mitosisRoot)
  .filter((dir) => {
    const folder = join(mitosisRoot, dir);
    return statSync(folder).isDirectory() && !dir.startsWith('_');
  })
  .map((dir) => {
    const lite = readdirSync(join(mitosisRoot, dir)).find((name) => name.endsWith('.lite.tsx'));
    if (!lite) return { tag: dir, kind: 'none' };
    const src = readFileSync(join(mitosisRoot, dir, lite), 'utf8');
    const body = extractGetter(src);
    if (!body) return { tag: dir, kind: 'none', lite };
    const dynamic = /\bprops\b/.test(body) || /\bstate\./.test(body);
    if (dynamic) return { tag: dir, kind: 'dynamic', lite };
    const css = evalStatic(body);
    return { tag: dir, kind: css == null ? 'static-uneval' : 'static', lite, bytes: css?.length ?? 0 };
  })
  .sort((a, b) => a.tag.localeCompare(b.tag));

const summary = {
  none: rows.filter((r) => r.kind === 'none').map((r) => r.tag),
  static: rows.filter((r) => r.kind === 'static').map((r) => r.tag),
  'static-uneval': rows.filter((r) => r.kind === 'static-uneval').map((r) => r.tag),
  dynamic: rows.filter((r) => r.kind === 'dynamic').map((r) => r.tag),
};

const out = resolve(mitosisRoot, '../../../.audit/mitosis-css-idiom/css-text-kinds.json');
writeFileSync(out, `${JSON.stringify({ summary, rows }, null, 2)}\n`);
console.warn(JSON.stringify(summary, null, 2));
console.warn(`wrote ${out}`);
