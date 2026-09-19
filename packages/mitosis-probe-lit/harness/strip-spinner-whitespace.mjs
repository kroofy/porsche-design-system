import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const spinnerTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Spinner.ts');
const before = await readFile(spinnerTs, 'utf8');
const after = before.replace(
  /return html`[\s\S]*?`;/,
  'return html`<div role="alert" aria-live="assertive" aria-label="${this.ariaLabel}"><style .innerHTML="${this.cssText}"></style><span class="sr-only">&nbsp;</span><svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true"><circle r="11"></circle><circle r="11"></circle></svg></div>`;'
);
if (after === before) {
  console.warn('strip-spinner-whitespace: no spinner render template to compact');
} else {
  await writeFile(spinnerTs, after);
  console.warn('strip-spinner-whitespace: compacted Spinner.ts render template');
}
