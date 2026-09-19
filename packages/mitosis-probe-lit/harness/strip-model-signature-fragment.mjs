import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const modelSignatureTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/ModelSignature.ts');
const before = await readFile(modelSignatureTs, 'utf8');
const after = before.replace(/<my-fragment[\s\S]*?>/g, '').replace(/<\/my-fragment>/g, '');
if (after === before) {
  console.warn('strip-model-signature-fragment: no my-fragment markers in ModelSignature.ts');
} else {
  await writeFile(modelSignatureTs, after);
  console.warn('strip-model-signature-fragment: removed my-fragment from ModelSignature.ts');
}
