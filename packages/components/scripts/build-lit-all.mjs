#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const scripts = readdirSync(scriptsDir)
  .filter((name) => /^build-lit-.+\.mjs$/.test(name) && name !== 'build-lit-all.mjs')
  .sort();

const failed = [];
for (const name of scripts) {
  process.stderr.write(`build-lit-all: ${name}\n`);
  const run = spawnSync(process.execPath, [resolve(scriptsDir, name)], { stdio: 'inherit' });
  if (run.status !== 0) failed.push(name);
}

if (failed.length) {
  console.error(`build-lit-all: ${failed.length}/${scripts.length} failed: ${failed.join(', ')}`);
  process.exit(1);
}
console.error(`build-lit-all: ${scripts.length}/${scripts.length} built`);
