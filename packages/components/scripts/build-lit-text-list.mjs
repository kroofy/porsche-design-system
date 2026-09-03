import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/text-list');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-text-list.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/TextList.ts'),
  resolve(mitosisDir, 'output/lit/TextList.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-text-list: generated TextList.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return this.isOrdered\n      ? html`<ol><style .innerHTML="${this.cssText}"></style><slot></slot></ol>`\n      : html`<ul><style .innerHTML="${this.cssText}"></style><slot></slot></ul>`;';

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replaceAll(
    'const type = this.type || "unordered";',
    'const type = (this.getAttribute("type") ?? this.type) || "unordered";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() type:') && !after.includes('@property() type ')) {
  after = after.replace(
    'export default class LitTextList extends LitElement {',
    'export default class LitTextList extends LitElement {\n  @property() type: any;'
  );
}

if (after.includes('my-fragment')) {
  console.error('build-lit-text-list: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-text-list")')) {
  console.error('build-lit-text-list: expected @customElement("p-text-list")');
  process.exit(1);
}
if (
  !after.includes('<ul') ||
  !after.includes('<ol') ||
  !after.includes('<slot') ||
  !after.includes('::slotted(*)') ||
  !after.includes('p-text-list-counter') ||
  !after.includes('isOrdered')
) {
  console.error('build-lit-text-list: expected ul/ol slot, slotted counters, and isOrdered');
  process.exit(1);
}
if (after.includes('lit-text-list') || after.includes('lit-text-list-item')) {
  console.error('build-lit-text-list: generated output must use p-text-list, not lit-*');
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
