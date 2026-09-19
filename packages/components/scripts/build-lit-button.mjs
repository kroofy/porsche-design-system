import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/button');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-button.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Button.ts'),
  resolve(mitosisDir, 'output/lit/Button.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-button: generated Button.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/<button(?![^>]*class=)/g, '<button class="root"')
  .replace(/<p-icon(?![^>]*class=)/g, '<p-icon class="icon"')
  .replace(/<p-spinner(?![^>]*class=)/g, '<p-spinner class="spinner"')
  .replace(/<span>\s*<slot/g, '<span class="label"><slot')
  .replace(/<span([^>]*)\sid="loading"/g, '<span class="loading"$1 id="loading"');
if (after.includes('my-fragment')) {
  console.error('build-lit-button: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-button")')) {
  console.error('build-lit-button: expected @customElement("p-button")');
  process.exit(1);
}
if (
  !after.includes('class="root"') ||
  !after.includes('class="label"') ||
  !after.includes('class="icon"') ||
  !after.includes('class="spinner"') ||
  !after.includes('class="loading"')
) {
  console.error('build-lit-button: expected root / label / icon / spinner / loading classes');
  process.exit(1);
}
if (after.includes('lit-button') || after.includes('lit-icon') || after.includes('lit-spinner')) {
  console.error('build-lit-button: generated output must use p-button / p-icon / p-spinner, not lit-*');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-button', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-button: ${err.message}`);
  process.exit(1);
}
if (!after.includes('min-width: 760px')) {
  console.error('build-lit-button: expected breakpoint media queries');
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
