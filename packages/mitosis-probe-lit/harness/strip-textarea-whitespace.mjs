import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Textarea.ts');
const before = await readFile(file, 'utf8');
let after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";',
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
  )
  .replace(
    'const readOnly = isTrue(this.readOnly);',
    'const readOnly = isTrue(this.getAttribute("read-only") ?? this.readOnly);',
  )
  .replace(
    'const hasCounter = isTrue(this.counter);',
    'const hasCounter = isTrue(this.getAttribute("counter") ?? this.counter);',
  )
  .replace(
    'return this.value == null ? "" : String(this.value);',
    'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);',
  )
  .replace(
    'return this.maxLength == null || this.maxLength === ""\n      ? ""\n      : String(this.maxLength);',
    'const raw = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");\n    return raw == null || raw === "" ? "" : String(raw);',
  )
  .replace(
    'if (this.rows == null || this.rows === "") return "7";\n    return String(this.rows);',
    'const rawRows = this.rows ?? this.getAttribute("rows");\n    if (rawRows == null || rawRows === "") return "7";\n    return String(rawRows);',
  )
  .replace(
    /get counterText\(\) \{[\s\S]*?\n  \}/,
    `get counterText() {
    const value = String(this.value ?? this.getAttribute("value") ?? "");
    const max = String(this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength") ?? "");
    if (max) return value.length + "/" + max;
    return String(value.length);
  }`,
  )
  .replace(
    /get srOnlyText\(\) \{[\s\S]*?\n  \}/,
    `get srOnlyText() {
    const value = String(this.value ?? this.getAttribute("value") ?? "");
    const max = String(this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength") ?? "");
    if (max) return "You have " + (Number(max) - value.length) + " out of " + max + " characters left";
    return value.length + " characters entered";
  }`,
  )
  .replace(
    'this.readOnly === true || this.readOnly === "true" || this.readOnly === ""',
    '(this.readOnly ?? this.getAttribute("read-only")) === true || (this.readOnly ?? this.getAttribute("read-only")) === "true" || (this.readOnly ?? this.getAttribute("read-only")) === ""',
  );

const propsToEnsure = ['readOnly', 'value', 'placeholder', 'hideLabel', 'message', 'state', 'maxLength', 'counter', 'rows', 'name'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(decl) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace('@property() label: any;', `@property() label: any;\n  ${decl}`);
  }
}

after = after.replace(
  /  updated\(\) \{[\s\S]*?\n  \}\n\n  render\(\) \{/,
  `  updated() {
    const input = this.renderRoot?.querySelector("textarea");
    if (input) {
      const value = this.value ?? this.getAttribute("value") ?? "";
      if (input.value !== String(value)) input.value = String(value);
      const maxLength = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");
      if (maxLength != null && maxLength !== "") input.maxLength = Number(maxLength);
      const readOnly = this.readOnly ?? this.getAttribute("read-only");
      input.readOnly = readOnly === true || readOnly === "true" || readOnly === "";
      const placeholder = this.placeholder ?? this.getAttribute("placeholder") ?? "";
      input.placeholder = placeholder;
      const name = this.name ?? this.getAttribute("name") ?? "";
      input.name = name;
      const disabled = this.disabled ?? this.getAttribute("disabled");
      input.disabled = disabled === true || disabled === "true" || disabled === "";
      const rows = this.rows ?? this.getAttribute("rows") ?? "7";
      input.rows = Number(rows);
    }
  }

  render() {`,
);
if (!after.includes('updated()')) {
  after = after.replace(
    '  render() {',
    `  updated() {
    const input = this.renderRoot?.querySelector("textarea");
    if (input) {
      const value = this.value ?? this.getAttribute("value") ?? "";
      if (input.value !== String(value)) input.value = String(value);
      const maxLength = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");
      if (maxLength != null && maxLength !== "") input.maxLength = Number(maxLength);
      const readOnly = this.readOnly ?? this.getAttribute("read-only");
      input.readOnly = readOnly === true || readOnly === "true" || readOnly === "";
      const placeholder = this.placeholder ?? this.getAttribute("placeholder") ?? "";
      input.placeholder = placeholder;
      const name = this.name ?? this.getAttribute("name") ?? "";
      input.name = name;
      const disabled = this.disabled ?? this.getAttribute("disabled");
      input.disabled = disabled === true || disabled === "true" || disabled === "";
      const rows = this.rows ?? this.getAttribute("rows") ?? "7";
      input.rows = Number(rows);
    }
  }

  render() {`,
  );
}

after = after.replace(
  /return html`[\s\S]*?`;/,
  'return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="textarea">${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">${this.descriptionText}</span><div class="wrapper"><textarea id="textarea" .value=${this.inputValue} placeholder=${this.placeholderText || nothing} name=${this.name || nothing} ?disabled=${!!this.isDisabled} ?readonly=${!!this.isReadOnly} maxlength=${this.maxLengthValue || nothing} rows=${this.rowsValue} aria-invalid=${this.ariaInvalid || nothing}></textarea><span class="sr-only" aria-live="polite">${this.srOnlyText}</span><span class="counter" aria-hidden="true">${this.counterText}</span></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span></div>`;',
);

if (after === before) {
  console.warn('strip-textarea-whitespace: no textarea render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-textarea-whitespace: compacted Textarea.ts render template');
}
