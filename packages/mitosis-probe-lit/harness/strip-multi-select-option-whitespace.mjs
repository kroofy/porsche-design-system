import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/MultiSelectOption.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  /this\.disabled === true \|\|[\s\S]*?this\.disabledParent === ""/,
  `(this.disabled ?? this.getAttribute("disabled")) === true ||
      (this.disabled ?? this.getAttribute("disabled")) === "true" ||
      (this.disabled ?? this.getAttribute("disabled")) === "" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === true ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === "true" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === ""`,
);
after = after.replace(
  /const disabled = isTrue\(this\.disabled\) \|\| isTrue\(this\.disabledParent\);/,
  'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));',
);
after = after.replace(
  /const selected = isTrue\(this\.selected\);/,
  'const selected = isTrue(this.selected ?? this.getAttribute("selected"));',
);
after = after.replaceAll(
  /this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === ""/g,
  '(this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === ""',
);
after = after.replace(
  /get isHighlighted\(\) \{\s*return \(\s*this\.highlighted === true \|\|\s*this\.highlighted === "true" \|\|\s*this\.highlighted === ""\s*\);\s*\}/,
  `get isHighlighted() {
    return (
      (this.highlighted ?? this.getAttribute("highlighted")) === true ||
      (this.highlighted ?? this.getAttribute("highlighted")) === "true" ||
      (this.highlighted ?? this.getAttribute("highlighted")) === ""
    );
  }`,
);

const propsToEnsure = ['value', 'disabled', 'selected', 'highlighted', 'disabledParent', 'hidden'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitMultiSelectOption extends LitElement {',
      `export default class LitMultiSelectOption extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  syncHostAria() {
    this.setAttribute("role", "option");
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const hasValue = this.value !== undefined && this.value !== null && this.getAttribute("value") !== null;
    this.setAttribute("aria-selected", selected ? "true" : "false");
    if (disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
    if (hasValue) this.removeAttribute("aria-label");
    else this.setAttribute("aria-label", "Empty value");
  }

  firstUpdated() {
    this.syncHostAria();
  }

  updated() {
    this.syncHostAria();
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const highlighted = !!this.isHighlighted;
    const cls = ["option"];
    if (selected) cls.push("option--selected");
    if (highlighted) cls.push("option--highlighted");
    if (disabled) cls.push("option--disabled");
    return html\`<div class="\${cls.join(" ")}"><style .innerHTML="\${this.cssText}"></style><span class="checkbox" aria-hidden="true"></span><slot></slot></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-multi-select-option-whitespace: no multi-select-option patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-multi-select-option-whitespace: patched MultiSelectOption.ts');
}
