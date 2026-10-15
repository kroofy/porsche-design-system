import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TagDismissible.ts');
const before = await readFile(file, 'utf8');
const after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    /return html`[\s\S]*?`;/,
    'return html`<button type="button" aria-label=${this.ariaLabel || nothing}><style .innerHTML="${this.cssText}"></style><span class="sr-only">Remove:</span><span><span class="label">${this.labelText}</span><slot></slot></span><span class="icon"><p-icon name="close" aria-hidden="true"></p-icon></span></button>`;'
  );
if (after === before) {
  console.warn('strip-tag-dismissible-whitespace: no tag-dismissible render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-tag-dismissible-whitespace: compacted TagDismissible.ts render template');
}
