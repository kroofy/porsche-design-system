#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { adaptAll } from './adapt-frameworks.mjs';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisRoot = resolve(componentsRoot, 'mitosis');
const assetsRoot = resolve(componentsRoot, 'src/assets');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const TARGETS = ['react', 'vue', 'angular', 'svelte'];
const env = { ...process.env, NODE_PATH: probeNodeModules };

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

const listFiles = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) listFiles(path, acc);
    else acc.push(path);
  }
  return acc;
};

const liteFiles = readdirSync(mitosisRoot)
  .map((dir) => {
    const folder = join(mitosisRoot, dir);
    if (!statSync(folder).isDirectory()) return null;
    const lite = readdirSync(folder).find((name) => name.endsWith('.lite.tsx'));
    return lite ? { tag: dir, lite, folder } : null;
  })
  .filter(Boolean)
  .sort((a, b) => a.tag.localeCompare(b.tag));

if (liteFiles.length !== 75) {
  console.error(`generate-frameworks-all: expected 75 lite files, found ${liteFiles.length}`);
  process.exit(1);
}

const iifeFiles = readdirSync(assetsRoot)
  .filter((name) => /^p-.+\.iife\.js$/.test(name))
  .sort()
  .map((name) => join(assetsRoot, name));
if (iifeFiles.length !== 75) {
  console.error(`generate-frameworks-all: expected 75 IIFEs, found ${iifeFiles.length}`);
  process.exit(1);
}
const iifeBefore = Object.fromEntries(iifeFiles.map((path) => [path, sha256(readFileSync(path))]));

const writeConfig = ({ folder, lite }) => {
  const configPath = join(folder, 'mitosis.frameworks.config.js');
  const body = `/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: '${lite}',
  dest: 'output/frameworks',
  targets: ['react', 'vue', 'angular', 'svelte'],
  commonOptions: {
    typescript: true,
  },
  options: {},
};
`;
  writeFileSync(configPath, body);
  return configPath;
};

const runMitosis = (folder, configPath, only) => {
  const args = ['build', `--config=${configPath}`];
  if (only) {
    const exclude = TARGETS.filter((target) => target !== only);
    args.push(`--excludeTargets=${exclude.join(',')}`);
  }
  return spawnSync(mitosisBin, args, { cwd: folder, env, encoding: 'utf8' });
};

const componentFiles = (destRoot, target) =>
  listFiles(join(destRoot, target)).filter((path) => !path.endsWith('generate-result.json'));

const stripFragments = (files) => {
  const leaked = [];
  for (const path of files) {
    const before = readFileSync(path, 'utf8');
    if (!before.includes('my-fragment')) continue;
    const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
    writeFileSync(path, after);
    if (after.includes('my-fragment')) leaked.push(path);
  }
  return leaked;
};

const collectTarget = (folder, destRoot, target, mitosisExit) => {
  const files = componentFiles(destRoot, target);
  const leaked = stripFragments(files);
  const remaining = files.filter((path) => readFileSync(path, 'utf8').includes('my-fragment'));
  return {
    compiled: mitosisExit === 0 && files.length > 0 && remaining.length === 0,
    mitosisExit,
    files: files.map((path) => relative(folder, path)),
    myFragment: remaining.map((path) => relative(folder, path)),
    stripped: leaked.length > 0,
  };
};

const tags = {};
let combinedFailures = 0;

for (const entry of liteFiles) {
  const { tag, folder } = entry;
  const destRoot = join(folder, 'output/frameworks');
  mkdirSync(destRoot, { recursive: true });
  const configPath = writeConfig(entry);
  process.stderr.write(`generate-frameworks-all: ${tag}\n`);
  const all = runMitosis(folder, configPath);
  const tagResult = {
    lite: relative(mitosisRoot, join(folder, entry.lite)),
    mitosisExit: all.status ?? 1,
    targets: {},
  };
  if (all.status !== 0) {
    combinedFailures += 1;
    process.stderr.write(`  combined failed (${all.status}), trying targets one by one\n`);
    if (all.stderr) process.stderr.write(`${all.stderr}\n`);
    for (const target of TARGETS) {
      const one = runMitosis(folder, configPath, target);
      tagResult.targets[target] = collectTarget(folder, destRoot, target, one.status ?? 1);
      if (one.status !== 0 && one.stderr) {
        tagResult.targets[target].stderr = one.stderr.trim().slice(0, 1500);
      }
    }
  } else {
    for (const target of TARGETS) {
      tagResult.targets[target] = collectTarget(folder, destRoot, target, 0);
    }
  }
  writeFileSync(join(destRoot, 'generate-result.json'), `${JSON.stringify(tagResult, null, 2)}\n`);
  tags[tag] = tagResult;
}

const iifeAfter = Object.fromEntries(iifeFiles.map((path) => [path, sha256(readFileSync(path))]));
const iifeChanged = Object.keys(iifeBefore).filter((path) => iifeBefore[path] !== iifeAfter[path]);
if (iifeChanged.length) {
  console.error(`generate-frameworks-all: IIFE changed: ${iifeChanged.map((path) => basename(path)).join(', ')}`);
  process.exit(1);
}

const counts = { tags: liteFiles.length, targets: {} };
for (const target of TARGETS) {
  const compiled = liteFiles.filter((entry) => tags[entry.tag].targets[target]?.compiled).length;
  counts.targets[target] = { compiled, failed: liteFiles.length - compiled };
}

const failedPairs = [];
for (const { tag } of liteFiles) {
  for (const target of TARGETS) {
    if (!tags[tag].targets[target]?.compiled) failedPairs.push(`${tag}/${target}`);
  }
}

const summary = {
  tagCount: liteFiles.length,
  iifeCount: iifeFiles.length,
  iifeUnchanged: true,
  combinedFailures,
  counts,
  failedPairs,
  adapt: undefined,
  tags,
};
const adaptSummary = adaptAll();
summary.adapt = adaptSummary.counts;
writeFileSync(join(mitosisRoot, 'frameworks-adapt-result.json'), `${JSON.stringify(adaptSummary, null, 2)}\n`);

const summaryPath = join(mitosisRoot, 'frameworks-all-result.json');
writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.warn(
  JSON.stringify(
    {
      tagCount: summary.tagCount,
      iifeCount: summary.iifeCount,
      iifeUnchanged: summary.iifeUnchanged,
      combinedFailures,
      adapt: adaptSummary.counts,
      counts,
      failedPairs,
    },
    null,
    2
  )
);

if (counts.targets.react.compiled + counts.targets.vue.compiled + counts.targets.angular.compiled + counts.targets.svelte.compiled === 0) {
  process.exit(1);
}
