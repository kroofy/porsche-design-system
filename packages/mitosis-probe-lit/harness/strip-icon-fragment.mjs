import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const iconTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Icon.ts');
const before = await readFile(iconTs, 'utf8');
const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
if (after === before) {
  console.warn('strip-icon-fragment: no my-fragment markers in Icon.ts');
} else {
  await writeFile(iconTs, after);
  console.warn('strip-icon-fragment: removed my-fragment from Icon.ts');
}
