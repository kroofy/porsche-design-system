import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const flagTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Flag.ts');
const before = await readFile(flagTs, 'utf8');
const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
if (after === before) {
  console.warn('strip-flag-fragment: no my-fragment markers in Flag.ts');
} else {
  await writeFile(flagTs, after);
  console.warn('strip-flag-fragment: removed my-fragment from Flag.ts');
}
