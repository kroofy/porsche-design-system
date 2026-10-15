import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Optgroup.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const disabled = isTrue(this.disabled);',
  'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));',
);
after = after.replace(
  'return this.label || "";',
  'return this.label ?? this.getAttribute("label") ?? "";',
);
after = after.replace(
  /this\.disabled === true \|\| this\.disabled === "true" \|\| this\.disabled === ""/,
  '(this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""',
);

const propsToEnsure = ['label', 'disabled', 'hidden'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitOptgroup extends LitElement {',
      `export default class LitOptgroup extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  syncOptionsDisabled() {
    const disabled = !!this.isDisabled;
    for (const child of this.children) {
      child.disabledParent = disabled;
    }
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => {
      this.syncOptionsDisabled();
      this.requestUpdate();
    });
    this.syncOptionsDisabled();
  }

  updated() {
    this.syncOptionsDisabled();
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const disabled = !!this.isDisabled;
    return html\`<div role="group" aria-labelledby="label" aria-disabled=\${disabled ? "true" : nothing}><style .innerHTML="\${this.cssText}"></style><span id="label" role="presentation">\${this.labelText}</span><slot></slot></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-optgroup-whitespace: no optgroup patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-optgroup-whitespace: patched Optgroup.ts');
}
