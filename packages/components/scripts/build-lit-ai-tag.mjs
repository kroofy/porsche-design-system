import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/ai-tag');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-ai-tag.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/AiTag.ts'),
  resolve(mitosisDir, 'output/lit/AiTag.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-ai-tag: generated AiTag.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return this.isAbbreviation\n      ? html`<div><style .innerHTML="${this.cssText}"></style><abbr title=${this.longLabel}>${this.shortLabel}</abbr></div>`\n      : html`<div><style .innerHTML="${this.cssText}"></style>${this.copyLabel}</div>`;';

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replaceAll(
    'const locale = this.locale || "en-US";',
    'const locale = (this.getAttribute("locale") ?? this.locale) || "en-US";'
  )
  .replaceAll(
    'const variant = this.variant || "generated";',
    'const variant = (this.getAttribute("variant") ?? this.variant) || "generated";'
  )
  .replace(
    'return (this.variant || "generated") === "abbreviation";',
    'return ((this.getAttribute("variant") ?? this.variant) || "generated") === "abbreviation";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() locale:') && !after.includes('@property() locale ')) {
  after = after.replace(
    'export default class LitAiTag extends LitElement {',
    'export default class LitAiTag extends LitElement {\n  @property() locale: any;\n  @property() variant: any;'
  );
}

if (after.includes('my-fragment')) {
  console.error('build-lit-ai-tag: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-ai-tag")')) {
  console.error('build-lit-ai-tag: expected @customElement("p-ai-tag")');
  process.exit(1);
}
if (
  !after.includes('<abbr') ||
  !after.includes('isAbbreviation') ||
  !after.includes('copyLabel') ||
  !after.includes('AI-generated') ||
  !after.includes('div::before')
) {
  console.error('build-lit-ai-tag: expected abbr/copy variants and icon mask');
  process.exit(1);
}
if (after.includes('lit-ai-tag')) {
  console.error('build-lit-ai-tag: generated output must use p-ai-tag, not lit-*');
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
