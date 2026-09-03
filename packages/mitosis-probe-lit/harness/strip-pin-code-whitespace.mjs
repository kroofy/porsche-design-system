import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/PinCode.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const hideLabel = parse(this.hideLabel, false);',
  'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
);
after = after.replace(
  'const loading = isTrue(this.loading);',
  'const loading = isTrue(this.loading ?? this.getAttribute("loading"));',
);
after = after.replace(
  'let length = Number(this.length);',
  'let length = Number(this.length ?? this.getAttribute("length"));',
);
after = after.replace(
  /this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === ""/g,
  '(this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""',
);
after = after.replace(
  'let length = Number(this.length);\n    if (!Number.isFinite(length) || length < 1) length = 4;\n    if (length > 6) length = 6;\n    return length;',
  'let length = Number(this.length ?? this.getAttribute("length"));\n    if (!Number.isFinite(length) || length < 1) length = 4;\n    if (length > 6) length = 6;\n    return length;',
);
after = after.replace(
  'return this.value == null ? "" : String(this.value);',
  'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);',
);

const propsToEnsure = [
  'label',
  'description',
  'message',
  'state',
  'hideLabel',
  'compact',
  'disabled',
  'loading',
  'required',
  'name',
  'value',
  'length',
  'type',
  'form',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitPinCode extends LitElement {',
      `export default class LitPinCode extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  isCurrentInput(index, value, length) {
    if (!value) return index === 0;
    const firstWhitespaceIndex = value.indexOf(" ");
    if (firstWhitespaceIndex === -1) return index === length - 1;
    return index === firstWhitespaceIndex;
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  inputDescribedBy() {
    const parts = [];
    if (this.labelText) parts.push("label");
    if (this.messageText) parts.push("message");
    return parts.length ? parts.join(" ") : nothing;
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const length = Number(this.pinLength);
    const value = this.parsedValue;
    const loading = !!this.isLoading;
    const disabled = !!this.isDisabled;
    const required = !!this.isRequired;
    const type = this.inputType;
    const inputs = Array.from({ length }, (_, index) => {
      const ch = value[index];
      const val = !ch || ch === " " ? "" : ch;
      const isCurrent = this.isCurrentInput(index, value, length);
      return html\`<input id=\${isCurrent ? "current-input" : nothing} type=\${type} aria-label=\${index + 1 + "-" + length} aria-describedby=\${this.inputDescribedBy()} aria-invalid=\${this.ariaInvalid || nothing} aria-disabled=\${loading ? "true" : nothing} autocomplete="one-time-code" pattern="\\\\d*" inputmode="numeric" .value=\${val} ?disabled=\${disabled} ?required=\${required} name=\${this.name || nothing} form=\${this.form || nothing}>\`;
    });
    const spinner = loading
      ? html\`<p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner>\`
      : nothing;
    return html\`<fieldset class="root" ?disabled=\${disabled} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${this.labelText ? "label" : nothing} aria-describedby=\${this.fieldsetDescribedBy()}><style .innerHTML="\${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="current-input" aria-disabled=\${disabled || loading ? "true" : nothing}>\${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">\${this.descriptionText}</span><div class="wrapper" dir="ltr">\${inputs}\${spinner}</div><span class="message" id="message" role=\${this.messageRole}><p-icon name=\${this.iconName || nothing} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\${this.messageText}</span><span class="loading" id="loading" role="status">\${this.loadingText}</span></fieldset>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-pin-code-whitespace: no pin-code patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-pin-code-whitespace: patched PinCode.ts');
}
