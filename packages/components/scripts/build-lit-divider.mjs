import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const generated = resolve(mitosisDir, 'divider/output/lit/divider/Divider.ts');
const outfile = resolve(componentsRoot, 'src/assets/p-divider.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const before = await readFile(generated, 'utf8');
const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
if (after.includes('my-fragment')) {
  console.error('build-lit-divider: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-divider")')) {
  console.error('build-lit-divider: expected @customElement("p-divider")');
  process.exit(1);
}
if (!after.includes('static styles')) {
  console.error('build-lit-divider: expected Lit static styles from useStyle');
  process.exit(1);
}
if (!after.includes('get hostStyle')) {
  console.error('build-lit-divider: expected hostStyle getter');
  process.exit(1);
}
if (!after.includes('applyHostStyle()')) {
  console.error('build-lit-divider: expected apply-host-style plugin hook');
  process.exit(1);
}
if (after.includes('get cssText') || after.includes('.innerHTML')) {
  console.error('build-lit-divider: cssText/innerHTML stylesheet hack is not allowed');
  process.exit(1);
}
await writeFile(generated, after);

const esb = spawnSync(
  esbuildBin,
  [
    generated,
    '--bundle',
    '--format=iife',
    `--tsconfig=${resolve(mitosisDir, 'tsconfig.json')}`,
    '--alias:lit/decorators=lit/decorators.js',
    `--outfile=${outfile}`,
  ],
  { cwd: probeNodeModules, env, stdio: 'inherit' }
);
if (esb.status !== 0) process.exit(esb.status ?? 1);
