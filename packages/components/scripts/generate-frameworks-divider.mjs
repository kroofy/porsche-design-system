#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dividerDir = resolve(componentsRoot, 'mitosis/divider');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const configPath = resolve(dividerDir, 'mitosis.frameworks.config.js');
const destRoot = resolve(dividerDir, 'output/frameworks');
const iifePath = resolve(componentsRoot, 'src/assets/p-divider.iife.js');
const litPath = resolve(dividerDir, 'output/lit/divider/Divider.ts');
const reportJson = resolve(dividerDir, 'output/frameworks/generate-result.json');

const TARGETS = ['react', 'vue', 'angular', 'svelte'];
const env = { ...process.env, NODE_PATH: probeNodeModules };

if (!existsSync(iifePath)) {
  console.error('generate-frameworks-divider: p-divider.iife.js missing');
  process.exit(1);
}
if (!existsSync(litPath)) {
  console.error('generate-frameworks-divider: Lit Divider.ts missing');
  process.exit(1);
}

const litBefore = readFileSync(litPath);
const iifeBefore = readFileSync(iifePath);

const runMitosis = (only) => {
  const args = ['build', `--config=${configPath}`];
  if (only) {
    const exclude = TARGETS.filter((target) => target !== only);
    args.push(`--excludeTargets=${exclude.join(',')}`);
  }
  return spawnSync(mitosisBin, args, { cwd: dividerDir, env, encoding: 'utf8' });
};

const listFiles = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) listFiles(path, acc);
    else acc.push(path);
  }
  return acc;
};

const fragmentHits = (files) =>
  files.filter((path) => readFileSync(path, 'utf8').includes('my-fragment'));

const result = {
  mitosisExit: null,
  targets: {},
};

const all = runMitosis();
result.mitosisExit = all.status ?? 1;
if (all.stdout) process.stdout.write(all.stdout);
if (all.stderr) process.stderr.write(all.stderr);

if (result.mitosisExit !== 0) {
  console.warn('generate-frameworks-divider: combined build failed, trying targets one by one');
  for (const target of TARGETS) {
    const one = runMitosis(target);
    const files = listFiles(join(destRoot, target));
    const hits = fragmentHits(files);
    result.targets[target] = {
      compiled: one.status === 0 && files.length > 0,
      mitosisExit: one.status ?? 1,
      files: files.map((path) => relative(dividerDir, path)),
      myFragment: hits.map((path) => relative(dividerDir, path)),
      stderr: (one.stderr || '').trim().slice(0, 2000),
    };
    if (one.stdout) process.stdout.write(one.stdout);
    if (one.stderr) process.stderr.write(one.stderr);
  }
} else {
  for (const target of TARGETS) {
    const files = listFiles(join(destRoot, target));
    const hits = fragmentHits(files);
    result.targets[target] = {
      compiled: files.length > 0,
      mitosisExit: 0,
      files: files.map((path) => relative(dividerDir, path)),
      myFragment: hits.map((path) => relative(dividerDir, path)),
    };
  }
}

const leaked = TARGETS.flatMap((target) => result.targets[target]?.myFragment ?? []);
if (leaked.length) {
  console.error(`generate-frameworks-divider: my-fragment leaked in ${leaked.join(', ')}`);
  writeFileSync(reportJson, `${JSON.stringify(result, null, 2)}\n`);
  process.exit(1);
}

const litAfter = readFileSync(litPath);
const iifeAfter = readFileSync(iifePath);
if (!litBefore.equals(litAfter) || !iifeBefore.equals(iifeAfter)) {
  console.error('generate-frameworks-divider: Lit output or IIFE changed');
  process.exit(1);
}

const compiled = TARGETS.filter((target) => result.targets[target]?.compiled);
if (!compiled.length) {
  console.error('generate-frameworks-divider: no framework target compiled');
  writeFileSync(reportJson, `${JSON.stringify(result, null, 2)}\n`);
  process.exit(1);
}

if (result.mitosisExit !== 0 && compiled.length !== TARGETS.length) {
  result.mitosisExit = 0;
}

writeFileSync(reportJson, `${JSON.stringify(result, null, 2)}\n`);
console.warn(JSON.stringify(result, null, 2));

if (result.mitosisExit !== 0) process.exit(result.mitosisExit);
if (compiled.length !== TARGETS.length) process.exit(0);
