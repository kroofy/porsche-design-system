import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Checkbox.ts');
const before = await readFile(file, 'utf8');
let after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";',
  )
  .replace(
    /return html`[\s\S]*?`;/,
    'return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="wrapper"><div class="input-wrapper"><input type="checkbox" id="x" .checked=${!!this.isChecked} ?disabled=${!!this.isDisabled} aria-disabled=${this.ariaDisabled || nothing} aria-invalid=${this.ariaInvalid || nothing}><p-spinner class="spinner" aria-hidden="true"></p-spinner></div><div class="label-wrapper"><label class="label" id="label" for="x">${this.labelText}</label></div></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;',
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
  );
if (!after.includes('updated()')) {
  after = after.replace(
    '  render() {',
    `  updated() {
    const input = this.renderRoot?.querySelector("input");
    if (input) {
      input.indeterminate =
        this.indeterminate === true ||
        this.indeterminate === "true" ||
        this.indeterminate === "";
    }
  }

  render() {`,
  );
}
if (after === before) {
  console.warn('strip-checkbox-whitespace: no checkbox render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-checkbox-whitespace: compacted Checkbox.ts render template');
}
