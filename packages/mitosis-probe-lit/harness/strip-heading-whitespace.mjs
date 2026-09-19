import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const headingTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Heading.ts');
const before = await readFile(headingTs, 'utf8');
const after = before.replace(
  /return html`[\s\S]*?`;/,
  'return html`<h2><style .innerHTML="${this.cssText}"></style><slot></slot></h2>`;'
);
if (after === before) {
  console.warn('strip-heading-whitespace: no heading render template to compact');
} else {
  await writeFile(headingTs, after);
  console.warn('strip-heading-whitespace: compacted Heading.ts render template');
}
