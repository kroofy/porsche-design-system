import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/SegmentedControlItem.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const compact = isTrue(this.compact);',
  'const compact = isTrue(this.compact ?? this.getAttribute("compact"));',
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
  /this\.state === "success" \|\| this\.state === "error" \? this\.state : "none"/,
  '(this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none"',
);
after = after.replace(
  'const icon = this.icon || "";',
  'const icon = this.icon ?? this.getAttribute("icon") ?? "";',
);
after = after.replace(
  'const source = this.iconSource || "";',
  'const source = this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";',
);
after = after.replace(
  'const hasSlotted = true;',
  'const hasSlotted = !!this.textContent?.trim() || [...this.childNodes].some((n) => n.nodeType === 1);',
);
after = after.replace(
  'return this.label || "";',
  'return this.label ?? this.getAttribute("label") ?? "";',
);
after = after.replace(
  'return this.icon || "";',
  'return this.icon ?? this.getAttribute("icon") ?? "";',
);
after = after.replace(
  'return this.iconSource || "";',
  'return this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";',
);

const propsToEnsure = [
  'value',
  'disabled',
  'label',
  'icon',
  'iconSource',
  'selected',
  'compact',
  'disabledParent',
  'state',
  'message',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitSegmentedControlItem extends LitElement {',
      `export default class LitSegmentedControlItem extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const label = this.labelText;
    const icon = this.iconName;
    const source = this.iconSrc;
    const hasIcon = !!icon || !!source;
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const labelNode = label ? html\`<span>\${label}</span>\` : nothing;
    const iconNode = hasIcon
      ? html\`<p-icon class="icon" name=\${icon || nothing} source=\${source || nothing} color="inherit" size="inherit" aria-hidden="true"></p-icon>\`
      : nothing;
    return html\`<button type="button" aria-pressed=\${selected ? "true" : "false"} aria-disabled=\${disabled ? "true" : nothing}><style .innerHTML="\${this.cssText}"></style>\${labelNode}\${iconNode}<slot></slot></button>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-segmented-control-item-whitespace: no segmented-control-item patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-segmented-control-item-whitespace: patched SegmentedControlItem.ts');
}
