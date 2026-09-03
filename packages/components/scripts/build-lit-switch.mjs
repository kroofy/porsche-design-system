import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/switch');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-switch.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Switch.ts'),
  resolve(mitosisDir, 'output/lit/Switch.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-switch: generated Switch.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+alignLabel/g, '@property({ attribute: "align-label" }) alignLabel')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/<div(?![^>]*class=)/g, '<div class="wrap"')
  .replace(/<span(?![^>]*class=)(?=[^>]*><p-spinner)/g, '<span class="toggle"')
  .replace(/<p-spinner(?![^>]*class=)/g, '<p-spinner class="spinner"')
  .replace(/<span([^>]*)\sid="loading"/g, '<span class="loading"$1 id="loading"');
if (after.includes('my-fragment')) {
  console.error('build-lit-switch: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-switch")')) {
  console.error('build-lit-switch: expected @customElement("p-switch")');
  process.exit(1);
}
if (
  !after.includes('class="wrap"') ||
  !after.includes('class="toggle"') ||
  !after.includes('class="spinner"') ||
  !after.includes('class="loading"')
) {
  console.error('build-lit-switch: expected wrap / toggle / spinner / loading classes');
  process.exit(1);
}
if (after.includes('lit-switch') || after.includes('lit-spinner')) {
  console.error('build-lit-switch: generated output must use p-switch / p-spinner, not lit-*');
  process.exit(1);
}
if (after !== before) {
  await writeFile(generated, after);
}

const esb = spawnSync(
  esbuildBin,
  [
    generated,
    '--bundle',
    '--format=iife',
    `--tsconfig=${resolve(componentsRoot, 'mitosis/tsconfig.json')}`,
    '--alias:lit/decorators=lit/decorators.js',
    `--outfile=${outfile}`,
  ],
  { cwd: probeNodeModules, env, stdio: 'inherit' }
);
if (esb.status !== 0) process.exit(esb.status ?? 1);
