import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/text-list-item');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-text-list-item.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/TextListItem.ts'),
  resolve(mitosisDir, 'output/lit/TextListItem.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-text-list-item: generated TextListItem.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return html`<div class="root"><slot></slot></div>`;';

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (after.includes('my-fragment')) {
  console.error('build-lit-text-list-item: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-text-list-item")')) {
  console.error('build-lit-text-list-item: expected @customElement("p-text-list-item")');
  process.exit(1);
}
if (
  !after.includes('class="root"') ||
  !after.includes('<slot') ||
  !after.includes('::slotted(*)') ||
  !after.includes('--_p-text-list-g')
) {
  console.error('build-lit-text-list-item: expected root wrapper, slot, and nested-list indent vars');
  process.exit(1);
}
if (after.includes('lit-text-list-item')) {
  console.error('build-lit-text-list-item: generated output must use p-text-list-item, not lit-*');
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
