import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/RadioGroupOption.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);',
  'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));',
);
after = after.replace(
  'const selected = isTrue(this.selected);',
  'const selected = isTrue(this.selected ?? this.getAttribute("selected"));',
);
after = after.replace(
  'const optionLoading = isTrue(this.loading) && !selected;',
  'const optionLoading = isTrue(this.loading ?? this.getAttribute("loading")) && !selected;',
);
after = after.replace(
  'const loading = optionLoading || isTrue(this.loadingParent);',
  'const loading = optionLoading || isTrue(this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent"));',
);
after = after.replace(
  /const formState =\s*this\.state === "success" \|\| this\.state === "error" \? this\.state : "none";/,
  'const formState = (this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none";',
);
after = after.replace(
  'return this.label || "";',
  'return this.label ?? this.getAttribute("label") ?? "";',
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
  /this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === ""/g,
  '(this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === ""',
);
after = after.replace(
  /this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === ""/g,
  '(this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""',
);
after = after.replace(
  /this\.loadingParent === true \|\|\s*this\.loadingParent === "true" \|\|\s*this\.loadingParent === ""/g,
  '(this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === ""',
);
after = after.replace(
  'return this.name || "";',
  'return this.name ?? this.getAttribute("name") ?? "";',
);
after = after.replace(
  'return this.value == null ? "" : String(this.value);',
  'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);',
);
after = after.replace(
  'return this.state === "error" ? "true" : "";',
  'return (this.state ?? this.getAttribute("state")) === "error" ? "true" : "";',
);

const loadingGetter = `const selected = (this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === "";
      const loading = (this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "";
      const loadingParent = (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "";`;

after = after.replace(
  /const selected = this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === "";\s*const loading = this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === "";\s*return loading && !selected;/,
  `${loadingGetter}\n      return loading && !selected;`,
);
after = after.replace(
  /const selected = this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === "";\s*const loading = this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === "";\s*const loadingParent =\s*this\.loadingParent === true \|\| this\.loadingParent === "true" \|\| this\.loadingParent === "";\s*return \(loading && !selected\) \|\| loadingParent;/,
  `${loadingGetter}\n      return (loading && !selected) || loadingParent;`,
);
after = after.replace(
  /const selected = this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === "";\s*const loading = this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === "";\s*const loadingParent =\s*this\.loadingParent === true \|\| this\.loadingParent === "true" \|\| this\.loadingParent === "";\s*if \(loadingParent\) return "";\s*if \(loading && !selected\) return "Loading";/,
  `${loadingGetter}\n      if (loadingParent) return "";\n      if (loading && !selected) return "Loading";`,
);

const propsToEnsure = [
  'value',
  'label',
  'disabled',
  'loading',
  'selected',
  'disabledParent',
  'loadingParent',
  'name',
  'state',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitRadioGroupOption extends LitElement {',
      `export default class LitRadioGroupOption extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const disabled = !!this.isDisabled;
    const selected = !!this.isSelected;
    const loading = !!this.isLoading;
    const optionLoading = !!this.isOptionLoading;
    const loadingParent = !!this.isLoadingParent;
    const spinner = optionLoading && !loadingParent
      ? html\`<p-spinner class="spinner" aria-hidden="true"></p-spinner>\`
      : nothing;
    const loadingMsg = loadingParent
      ? nothing
      : html\`<span class="loading" id="loading" role="status">\${this.loadingText}</span>\`;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const labelBlock = hasLabel
      ? html\`<div class="label-wrapper"><label class="label" id="label" for="radio-group-option" aria-disabled=\${disabled || loading ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></label><span class="label-after"><slot name="label-after"></slot></span></div>\`
      : nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><div class="wrapper"><input id="radio-group-option" type="radio" name=\${this.inputName || nothing} value=\${this.inputValue} .checked=\${selected} ?disabled=\${disabled || loading} aria-invalid=\${this.ariaInvalid || nothing} aria-disabled=\${disabled || loading ? "true" : nothing} aria-describedby=\${loading ? "loading" : nothing}>\${spinner}</div>\${labelBlock}\${loadingMsg}</div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-radio-group-option-whitespace: no radio-group-option patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-radio-group-option-whitespace: patched RadioGroupOption.ts');
}
