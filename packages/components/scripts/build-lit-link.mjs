import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/link');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-link.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Link.ts'),
  resolve(mitosisDir, 'output/lit/Link.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-link: generated Link.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/<span\s*>\s*<style/g, '<span class="root"><style')
  .replace(/<p-icon(?![^>]*class=)/g, '<p-icon class="icon"')
  .replace(/<span>\s*<slot/g, '<span class="label"><slot');
if (after.includes('my-fragment')) {
  console.error('build-lit-link: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-link")')) {
  console.error('build-lit-link: expected @customElement("p-link")');
  process.exit(1);
}
if (!after.includes('class="root"') || !after.includes('class="label"') || !after.includes('class="icon"')) {
  console.error('build-lit-link: expected root / label / icon classes');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-link: unset href leaked as href="undefined"');
  process.exit(1);
}
if (after.includes('lit-link') || after.includes('lit-icon')) {
  console.error('build-lit-link: generated output must use p-link / p-icon, not lit-*');
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
