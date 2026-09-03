import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/RadioGroup.ts');
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
  'const loading = isTrue(this.loading);',
  'const loading = isTrue(this.loading ?? this.getAttribute("loading"));',
);
after = after.replace(
  'const compact = isTrue(this.compact);',
  'const compact = isTrue(this.compact ?? this.getAttribute("compact"));',
);
after = after.replace(
  'const hideLabel = parse(this.hideLabel, false);',
  'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
);
after = after.replace(
  'const direction = parse(this.direction, "column");',
  'const direction = parse(this.getAttribute("direction") ?? this.direction, "column");',
);
after = after.replace(
  'const formState = this.state === "success" || this.state === "error" ? this.state : "none";',
  'const formState = (this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none";',
);
after = after.replace(
  'const message = this.message || "";',
  'const message = this.message ?? this.getAttribute("message") ?? "";',
);
after = after.replace(
  'this.state === "success" || this.state === "error" ? this.state : "none"',
  '(this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none"',
);
after = after.replace(
  'return this.label || "";',
  'return this.label ?? this.getAttribute("label") ?? "";',
);
after = after.replace(
  'return this.description || "";',
  'return this.description ?? this.getAttribute("description") ?? "";',
);
after = after.replace(
  /this\.disabled === true \|\| this\.disabled === "true" \|\| this\.disabled === ""/,
  '(this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""',
);
after = after.replace(
  /this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === ""/g,
  '(this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""',
);
after = after.replace(
  /this\.required === true \|\| this\.required === "true" \|\| this\.required === ""/,
  '(this.required ?? this.getAttribute("required")) === true || (this.required ?? this.getAttribute("required")) === "true" || (this.required ?? this.getAttribute("required")) === ""',
);
after = after.replace(
  'const formState = this.state || "none";',
  'const formState = this.state ?? this.getAttribute("state") ?? "none";',
);
after = after.replace(
  'const message = this.message || "";',
  'const message = this.message ?? this.getAttribute("message") ?? "";',
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
  'direction',
  'value',
  'name',
  'form',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitRadioGroup extends LitElement {',
      `export default class LitRadioGroup extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  syncOptions() {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const name = this.name ?? this.getAttribute("name") ?? "";
    for (const option of this.itemChildren()) {
      const optionValue = option.value ?? option.getAttribute("value");
      option.selected = optionValue === value && value !== null && value !== undefined;
      option.disabledParent = disabled;
      option.loadingParent = loading;
      option.state = state;
      option.name = name;
    }
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.syncOptions();
  }

  updated() {
    this.syncOptions();
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const required = !!this.isRequired;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const hasDescription = !!this.descriptionText || !!this.querySelector('[slot="description"]');
    const labelDisabled = disabled || loading;
    const labelBlock = hasLabel
      ? html\`<div class="label-wrapper"><div class="label" id="label" aria-disabled=\${labelDisabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></div><slot name="label-after"></slot></div>\`
      : nothing;
    const descBlock = hasDescription
      ? html\`<span class="label" id="description" aria-disabled=\${labelDisabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`
      : nothing;
    const spinner = loading
      ? html\`<p-spinner class="spinner" aria-hidden="true"></p-spinner>\`
      : nothing;
    const icon = this.iconName
      ? html\`<p-icon name=\${this.iconName} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\`
      : nothing;
    return html\`<fieldset class="root" ?disabled=\${disabled} role="radiogroup" aria-required=\${required ? "true" : nothing} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${hasLabel ? "label" : nothing} aria-describedby=\${this.fieldsetDescribedBy()}><style .innerHTML="\${this.cssText}"></style>\${labelBlock}\${descBlock}<div class="wrapper"><slot></slot>\${spinner}</div><span class="message" id="message" role=\${this.messageRole}>\${icon}\${this.messageText}</span><span class="loading" id="loading" role="status">\${this.loadingText}</span></fieldset>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-radio-group-whitespace: no radio-group patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-radio-group-whitespace: patched RadioGroup.ts');
}
