import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const displayTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Display.ts');
const before = await readFile(displayTs, 'utf8');
const after = before.replace(
  /return html`[\s\S]*?`;/,
  'return html`<h3><style .innerHTML="${this.cssText}"></style><slot></slot></h3>`;'
);
if (after === before) {
  console.warn('strip-display-whitespace: no display render template to compact');
} else {
  await writeFile(displayTs, after);
  console.warn('strip-display-whitespace: compacted Display.ts render template');
}
