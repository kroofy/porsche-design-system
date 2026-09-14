import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/link-pure');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-link-pure.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/LinkPure.ts'),
  resolve(mitosisDir, 'output/lit/LinkPure.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-link-pure: generated LinkPure.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/@property\(\)\s+alignLabel/g, '@property({ attribute: "align-label" }) alignLabel')
  // Mitosis drops class="root" on the host span. cssText targets .root.
  .replace(/<span\s*>\s*<p-icon/g, '<span class="root"><p-icon')
  .replace(/<span\s*>\s*<style/g, '<span class="root"><style')
  .replace(/<p-icon(?![^>]*class=)/g, '<p-icon class="icon"')
  .replace(/<span>\s*<slot/g, '<span class="label"><slot');
if (after.includes('my-fragment')) {
  console.error('build-lit-link-pure: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-link-pure")')) {
  console.error('build-lit-link-pure: expected @customElement("p-link-pure")');
  process.exit(1);
}
if (!after.includes('class="root"') || !after.includes('class="label"') || !after.includes('class="icon"')) {
  console.error('build-lit-link-pure: expected root / label / icon classes');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-link-pure: unset href leaked as href="undefined"');
  process.exit(1);
}
if (after.includes('lit-link-pure') || after.includes('lit-icon')) {
  console.error('build-lit-link-pure: generated output must use p-link-pure / p-icon, not lit-*');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-link-pure', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-link-pure: ${err.message}`);
  process.exit(1);
}
if (!after.includes('min-width: 760px')) {
  console.error('build-lit-link-pure: expected breakpoint media queries');
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
