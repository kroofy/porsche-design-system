import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Switch.ts');
const before = await readFile(file, 'utf8');
const after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";',
  )
  .replace(
    /return html`[\s\S]*?`;/,
    'return html`<div class="wrap"><style .innerHTML="${this.cssText}"></style><button type="button" role="switch" id="x" aria-checked=${this.ariaChecked} aria-disabled=${this.ariaDisabled || nothing} aria-labelledby="label"><span class="toggle"><p-spinner class="spinner" aria-hidden="true"></p-spinner></span></button><label id="label" for="x"><slot></slot></label><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;',
  )
  .replace(
    'const alignLabel = parse(this.alignLabel, "end");',
    'const alignLabel = parse(this.getAttribute("align-label") ?? this.alignLabel, "end");',
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
  )
  .replace(
    'const stretch = parse(this.stretch, false);',
    'const stretch = parse(this.getAttribute("stretch") ?? this.stretch, false);',
  );
if (after === before) {
  console.warn('strip-switch-whitespace: no switch render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-switch-whitespace: compacted Switch.ts render template');
}
