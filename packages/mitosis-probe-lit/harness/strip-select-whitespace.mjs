import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Select.ts');
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
  'const compact = isTrue(this.compact);',
  'const compact = isTrue(this.compact ?? this.getAttribute("compact"));',
);
after = after.replace(
  'const hideLabel = parse(this.hideLabel, false);',
  'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
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
  /this\.required === true \|\| this\.required === "true" \|\| this\.required === ""/,
  '(this.required ?? this.getAttribute("required")) === true || (this.required ?? this.getAttribute("required")) === "true" || (this.required ?? this.getAttribute("required")) === ""',
);
after = after.replaceAll(
  'const formState = this.state || "none";',
  'const formState = this.state ?? this.getAttribute("state") ?? "none";',
);
after = after.replace(
  'return this.state === "error" ? "true" : "";',
  'return (this.state ?? this.getAttribute("state")) === "error" ? "true" : "";',
);
after = after.replace(
  'return this.state === "success" ? "status" : "alert";',
  'return (this.state ?? this.getAttribute("state")) === "success" ? "status" : "alert";',
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
  'required',
  'filter',
  'value',
  'name',
  'form',
  'dropdownDirection',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitSelect extends LitElement {',
      `export default class LitSelect extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  itemChildren() {
    return [...this.children].filter(
      (el) =>
        el.slot !== "label" &&
        el.slot !== "label-after" &&
        el.slot !== "description" &&
        el.slot !== "message" &&
        el.slot !== "filter" &&
        el.slot !== "selected",
    );
  }

  selectedLabel() {
    const value = this.value ?? this.getAttribute("value");
    if (value === null || value === undefined || value === "") return "";
    const options = [...this.querySelectorAll("p-select-option")];
    const match = options.find((option) => String(option.value ?? option.getAttribute("value")) === String(value));
    return match?.textContent ?? "";
  }

  comboDescribedBy() {
    const parts = [];
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => this.requestUpdate());
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const disabled = !!this.isDisabled;
    const required = !!this.isRequired;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const hasDescription = !!this.descriptionText || !!this.querySelector('[slot="description"]');
    const hasMessage = !!this.messageText;
    const labelBlock = hasLabel
      ? html\`<div class="label-wrapper"><label class="label" id="label" for="button" aria-disabled=\${disabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></label><slot name="label-after"></slot></div>\`
      : nothing;
    const descBlock = hasDescription
      ? html\`<span class="label" id="description" aria-disabled=\${disabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`
      : nothing;
    const icon = hasMessage
      ? html\`<p-icon name=\${this.iconName} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\`
      : nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style>\${labelBlock}\${descBlock}<button type="button" role="combobox" id="button" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-required=\${required ? "true" : "false"} aria-controls="listbox" aria-autocomplete="none" aria-labelledby=\${hasLabel ? "label" : nothing} aria-describedby=\${this.comboDescribedBy()} aria-invalid=\${this.ariaInvalid || nothing} ?disabled=\${disabled}><span>\${this.selectedLabel()}</span><p-icon class="icon" name="arrow-head-down" color="primary" aria-hidden="true"></p-icon></button><div popover="manual" tabindex="0"><div id="listbox" class="options" role="listbox" aria-labelledby=\${hasLabel ? "label" : nothing} aria-required=\${required ? "true" : "false"} aria-multiselectable="false" tabindex="-1"><slot></slot></div></div><span class="message" id="message" role=\${this.messageRole}>\${icon}\${this.messageText}</span></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-select-whitespace: no select patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-select-whitespace: patched Select.ts');
}
