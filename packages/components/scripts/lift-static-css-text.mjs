#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const mitosisRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../mitosis');
const tags = process.argv.slice(2);
if (!tags.length) {
  console.error('usage: lift-static-css-text.mjs <tag> [<tag>...]');
  process.exit(1);
}

const extractGetter = (src) => {
  const start = src.indexOf('get cssText()');
  if (start < 0) return null;
  const brace = src.indexOf('{', start);
  let depth = 0;
  for (let i = brace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1, body: src.slice(brace + 1, i) };
    }
  }
  return null;
};

const evalStatic = (body) => {
  if (/\bprops\b/.test(body) || /\bstate\./.test(body)) return null;
  const ret = body.match(/return\s+([\s\S]*?);?\s*$/);
  if (!ret) return null;
  try {
    return new Function(`return (${ret[1]});`)();
  } catch {
    return null;
  }
};

const prettyCss = (css) => {
  let out = '';
  let indent = 0;
  for (const ch of css) {
    if (ch === '{') {
      out += ' {\n';
      indent += 1;
      out += '  '.repeat(indent);
    } else if (ch === '}') {
      indent = Math.max(0, indent - 1);
      out = out.replace(/[ \t]+$/, '');
      if (!out.endsWith('\n')) out += '\n';
      out += `${'  '.repeat(indent)}}\n${'  '.repeat(indent)}`;
    } else if (ch === ';') {
      out += `;\n${'  '.repeat(indent)}`;
    } else {
      out += ch;
    }
  }
  return out.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
};

const normalize = (css) => css.replace(/\s+/g, '');

const liftOne = (tag) => {
  const folder = join(mitosisRoot, tag);
  const lite = readdirSync(folder).find((name) => name.endsWith('.lite.tsx'));
  if (!lite) throw new Error(`${tag}: no lite file`);
  const path = join(folder, lite);
  let src = readFileSync(path, 'utf8');
  const getter = extractGetter(src);
  if (!getter) throw new Error(`${tag}: no cssText getter`);
  const css = evalStatic(getter.body);
  if (css == null) throw new Error(`${tag}: cssText is not static`);

  const styleMatch = src.match(/useStyle\(`([\s\S]*?)`\);/);
  const existing = styleMatch ? styleMatch[1] : '';
  const pretty = prettyCss(css);
  const nPretty = normalize(pretty).replace(/;}/g, '}');
  const nExisting = normalize(existing).replace(/;}/g, '}');
  let nextSheet = pretty;
  if (existing && nExisting.includes(nPretty) && nExisting.length > nPretty.length) {
    nextSheet = existing.trim();
  } else if (existing && !nPretty.includes(nExisting)) {
    nextSheet = `${existing.trim()}\n${pretty}`;
  }

  const useStyleBlock = `useStyle(\`\n  ${nextSheet.replace(/\n/g, '\n  ')}\n\`);`;
  if (styleMatch) src = src.replace(styleMatch[0], useStyleBlock);
  else src = src.replace(/(export default function)/, `${useStyleBlock}\n\n$1`);

  let getterBlock = src.slice(getter.start, getter.end);
  const afterGetter = src.slice(getter.end);
  if (afterGetter.startsWith(',')) getterBlock += ',';
  src = src.replace(getterBlock, '');
  src = src.replace(/\n[ \t]*\n[ \t]*\n/g, '\n\n');

  src = src.replace(/\s*<style innerHTML=\{state\.cssText\} \/>\s*/g, '\n      ');
  src = src.replace(/\s*<style innerHTML=\{state\.cssText\}><\/style>\s*/g, '\n      ');

  const storeMatch = src.match(/const state = useStore\(\{([\s\S]*?)\}\);/);
  if (storeMatch && storeMatch[1].trim() === '') {
    src = src.replace(storeMatch[0], '');
    src = src.replace(/useStore, /, '');
    src = src.replace(/, useStore/, '');
  }

  src = src.replace(/\n{3,}/g, '\n\n');
  writeFileSync(path, src);
  return { tag, path, bytes: pretty.length };
};

const results = tags.map(liftOne);
console.warn(JSON.stringify(results, null, 2));
