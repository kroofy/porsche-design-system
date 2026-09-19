import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const textTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Text.ts');
const before = await readFile(textTs, 'utf8');
const after = before.replace(
  /return html`[\s\S]*?`;/,
  'return html`<p><style .innerHTML="${this.cssText}"></style><slot></slot></p>`;'
);
if (after === before) {
  console.warn('strip-text-whitespace: no text render template to compact');
} else {
  await writeFile(textTs, after);
  console.warn('strip-text-whitespace: compacted Text.ts render template');
}
