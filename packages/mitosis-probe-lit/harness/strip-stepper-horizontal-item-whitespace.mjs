import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/StepperHorizontalItem.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const step = this.state || "";',
  'const step = this.state ?? this.getAttribute("state") ?? "";',
);
after = after.replace(
  'const disabled = isTrue(this.disabled);',
  'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));',
);

const propsToEnsure = ['state', 'disabled'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitStepperHorizontalItem extends LitElement {',
      `export default class LitStepperHorizontalItem extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "listitem");
  }

  parsedState() {
    return this.state ?? this.getAttribute("state") ?? "";
  }

  parsedDisabled() {
    const raw = this.disabled ?? this.getAttribute("disabled");
    return raw === true || raw === "true" || raw === "";
  }

  render() {
    const step = this.parsedState();
    const disabled = this.parsedDisabled();
    const isDisabled = !step || disabled;
    const isCurrent = step === "current";
    const isIcon = step === "complete" || step === "warning";
    const iconName = step === "complete" ? "success" : "warning";
    return html\`<style .innerHTML="\${this.cssText}"></style><button type="button" aria-disabled=\${isDisabled ? "true" : nothing} aria-current=\${isCurrent ? "step" : nothing}>\${isIcon ? html\`<p-icon class="icon" name=\${iconName} size="inherit" color=\${iconName} aria-hidden="true"></p-icon>\` : html\`<span class="icon" aria-hidden="true"></span>\`}\${step ? html\`<span class="sr-only">\${step}: </span>\` : nothing}<slot></slot></button>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-stepper-horizontal-item-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-stepper-horizontal-item-whitespace: patched StepperHorizontalItem.ts');
}
