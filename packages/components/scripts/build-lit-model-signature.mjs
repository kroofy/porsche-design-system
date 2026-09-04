import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/model-signature');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-model-signature.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/ModelSignature.ts'),
  resolve(mitosisDir, 'output/lit/ModelSignature.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-model-signature: generated ModelSignature.ts not found');
  process.exit(1);
}

const before = await readFile(generated, 'utf8');
const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
if (after.includes('my-fragment')) {
  console.error('build-lit-model-signature: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-model-signature")')) {
  console.error('build-lit-model-signature: expected @customElement("p-model-signature")');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-model-signature', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-model-signature: ${err.message}`);
  process.exit(1);
}
if (!after.includes('forced-colors') || !after.includes('::slotted')) {
  console.error('build-lit-model-signature: expected slotted and forced-colors rules');
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
