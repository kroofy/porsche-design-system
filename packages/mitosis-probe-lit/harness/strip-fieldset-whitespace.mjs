import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Fieldset.ts');
const before = await readFile(file, 'utf8');
let after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";',
  )
  .replace(
    'const label = this.label || "";',
    'const label = (this.label ?? this.getAttribute("label") ?? "") || "";',
  )
  .replace(
    'const labelSize = this.labelSize || "medium";',
    'const labelSize = this.labelSize ?? this.getAttribute("label-size") ?? "medium";',
  );

const propsToEnsure = ['label', 'labelSize', 'required', 'message', 'state'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(decl) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace('@property() label: any;', `@property() label: any;\n  ${decl}`);
  }
}

after = after.replace(
  /return html`[\s\S]*?`;/,
  'return html`<fieldset><style .innerHTML="${this.cssText}"></style><legend>${this.labelText}</legend><slot></slot><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span></fieldset>`;',
);

if (after === before) {
  console.warn('strip-fieldset-whitespace: no fieldset render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-fieldset-whitespace: compacted Fieldset.ts render template');
}
