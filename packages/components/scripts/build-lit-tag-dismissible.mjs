import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/tag-dismissible');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-tag-dismissible.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/TagDismissible.ts'),
  resolve(mitosisDir, 'output/lit/TagDismissible.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-tag-dismissible: generated TagDismissible.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  // Mitosis drops class on these spans. Stencil (and the probe cssText) needs them.
  .replace(/<span>Remove:<\/span>/g, '<span class="sr-only">Remove:</span>')
  .replace(
    /<span><span>\$\{this\.labelText\}<\/span>\s*<slot><\/slot><\/span>/g,
    '<span><span class="label">${this.labelText}</span><slot></slot></span>'
  )
  .replace(/<span\s*>\s*<p-icon/g, '<span class="icon"><p-icon');
if (after.includes('my-fragment')) {
  console.error('build-lit-tag-dismissible: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-tag-dismissible")')) {
  console.error('build-lit-tag-dismissible: expected @customElement("p-tag-dismissible")');
  process.exit(1);
}
if (!after.includes('class="sr-only"') || !after.includes('class="label"') || !after.includes('class="icon"')) {
  console.error('build-lit-tag-dismissible: expected sr-only / label / icon classes');
  process.exit(1);
}
if (after.includes('lit-tag-dismissible') || after.includes('lit-icon')) {
  console.error('build-lit-tag-dismissible: generated output must use p-tag-dismissible / p-icon, not lit-*');
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
