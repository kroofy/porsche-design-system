#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisRoot = resolve(componentsRoot, 'mitosis');
const probeNodeModules = resolve(probeNodeModulesPath());
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const env = { ...process.env, NODE_PATH: probeNodeModules };

function probeNodeModulesPath() {
  return resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
}

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

const TAGS = [
  { tag: 'button-pure', lite: 'ButtonPure.lite.tsx', reactFile: 'ButtonPure.tsx' },
  { tag: 'tag-dismissible', lite: 'TagDismissible.lite.tsx', reactFile: 'TagDismissible.tsx' },
];

const snapshotTree = (dir, acc = {}) => {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) snapshotTree(path, acc);
    else acc[path] = sha256(readFileSync(path));
  }
  return acc;
};

const iifePaths = [
  resolve(componentsRoot, 'src/assets/p-button-pure.iife.js'),
  resolve(componentsRoot, 'src/assets/p-tag-dismissible.iife.js'),
];
const iifeBefore = Object.fromEntries(iifePaths.map((path) => [path, sha256(readFileSync(path))]));

const keepBefore = {};
for (const { tag } of TAGS) {
  const folder = resolve(mitosisRoot, tag, 'output/frameworks');
  for (const target of ['vue', 'angular', 'svelte']) {
    Object.assign(keepBefore, snapshotTree(join(folder, target)));
  }
}

const results = {};
for (const entry of TAGS) {
  const folder = resolve(mitosisRoot, entry.tag);
  const configPath = resolve(folder, 'mitosis.react.config.js');
  const destFile = resolve(folder, 'output/frameworks/react', entry.reactFile);
  const mit = spawnSync(mitosisBin, ['build', `--config=${configPath}`], {
    cwd: folder,
    env,
    encoding: 'utf8',
  });
  if (mit.stdout) process.stdout.write(mit.stdout);
  if (mit.stderr) process.stderr.write(mit.stderr);
  const record = {
    tag: entry.tag,
    mitosisExit: mit.status ?? 1,
    dest: relative(mitosisRoot, destFile),
    exists: existsSync(destFile),
    myFragment: false,
  };
  if (record.exists) {
    let text = readFileSync(destFile, 'utf8');
    if (text.includes('my-fragment')) {
      text = text.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
      writeFileSync(destFile, text);
    }
    record.myFragment = readFileSync(destFile, 'utf8').includes('my-fragment');
    record.bytes = statSync(destFile).size;
  }
  record.compiled = record.mitosisExit === 0 && record.exists && !record.myFragment;
  results[entry.tag] = record;
}

const keepAfter = {};
for (const { tag } of TAGS) {
  const folder = resolve(mitosisRoot, tag, 'output/frameworks');
  for (const target of ['vue', 'angular', 'svelte']) {
    Object.assign(keepAfter, snapshotTree(join(folder, target)));
  }
}
const keepChanged = Object.keys(keepBefore).filter((path) => keepBefore[path] !== keepAfter[path]);
if (keepChanged.length) {
  console.error(`generate-frameworks-react-fix: vue/angular/svelte changed: ${keepChanged.join(', ')}`);
  process.exit(1);
}

const iifeAfter = Object.fromEntries(iifePaths.map((path) => [path, sha256(readFileSync(path))]));
const iifeChanged = iifePaths.filter((path) => iifeBefore[path] !== iifeAfter[path]);
if (iifeChanged.length) {
  console.error('generate-frameworks-react-fix: Lit IIFE changed');
  process.exit(1);
}

const summary = { results, keepUnchanged: true, iifeUnchanged: true };
writeFileSync(resolve(mitosisRoot, 'frameworks-react-fix-result.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.warn(JSON.stringify(summary, null, 2));
if (!TAGS.every((entry) => results[entry.tag].compiled)) process.exit(1);
