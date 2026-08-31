import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/tag');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-tag.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Tag.ts'),
  resolve(mitosisDir, 'output/lit/Tag.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-tag: generated Tag.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource');
if (after.includes('my-fragment')) {
  console.error('build-lit-tag: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-tag")')) {
  console.error('build-lit-tag: expected @customElement("p-tag")');
  process.exit(1);
}
if (!after.includes('@property({ attribute: "icon-source" }) iconSource')) {
  console.error('build-lit-tag: expected icon-source attribute alias');
  process.exit(1);
}
if (after.includes('lit-tag') || after.includes('lit-icon')) {
  console.error('build-lit-tag: generated output must use p-tag / p-icon, not lit-*');
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
