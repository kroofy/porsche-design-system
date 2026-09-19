import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/SegmentedControl.ts');
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
  'const noWrap = isTrue(this.noWrap);',
  'const noWrap = isTrue(this.noWrap ?? this.getAttribute("no-wrap") ?? this.getAttribute("nowrap"));',
);
after = after.replace(
  'const hideLabel = parse(this.hideLabel, false);',
  'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
);
after = after.replace(
  'const columns = parse(this.columns, "auto");',
  'const columns = parse(this.getAttribute("columns") ?? this.columns, "auto");',
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
  /const measuredMin: any = 46;\s*const measuredMax: any = 80;/,
  'const measured = this.measureItemWidths(compact);\n    const measuredMin: any = measured.minWidth;\n    const measuredMax: any = measured.maxWidth;',
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
  'required',
  'columns',
  'noWrap',
  'value',
  'name',
  'form',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitSegmentedControl extends LitElement {',
      `export default class LitSegmentedControl extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  measureItemWidths(compact) {
    const scaling = compact ? 0.5 : 1;
    const verticalPadding = "max(2px, var(--p-spacing-static-sm) * " + scaling + ")";
    const horizontalPadding = "calc(" + verticalPadding + " + 4px)";
    const padding = verticalPadding + " " + horizontalPadding;
    const dimension =
      "calc(max(var(--p-leading-normal), " +
      scaling +
      " * (var(--p-leading-normal) + 10px)) + (" +
      verticalPadding +
      " + 1px) * 2)";
    if (typeof document === "undefined") return { minWidth: dimension, maxWidth: 46 };
    const items = this.itemChildren();
    if (!items.length) return { minWidth: dimension, maxWidth: 46 };
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.border = "1px solid";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.font = "normal normal 400 1rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
    const root = this.shadowRoot || this;
    root.append(tempDiv);
    const widths = items.map((item) => {
      tempDiv.innerHTML = item.innerHTML;
      tempDiv.style.minWidth = dimension;
      tempDiv.style.padding = padding;
      if (item.icon || item.iconSource || item.getAttribute("icon") || item.getAttribute("icon-source")) {
        const tempIcon = document.createElement("div");
        tempIcon.style.display = "inline-block";
        tempIcon.style.width = "1.5rem";
        tempIcon.style.marginRight = ".25rem";
        tempDiv.prepend(tempIcon);
      }
      const label = item.label ?? item.getAttribute("label");
      if (label) {
        const tempLabel = document.createElement("div");
        tempLabel.style.font = "normal normal 400 .875rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
        tempLabel.innerHTML = label;
        tempDiv.prepend(tempLabel);
      }
      return Number.parseFloat(getComputedStyle(tempDiv).width);
    });
    tempDiv.remove();
    return { minWidth: dimension, maxWidth: Math.max(...widths) };
  }

  syncItems() {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const compact = this.compact === true || this.compact === "true" || this.compact === "" || this.getAttribute("compact") === "" || this.getAttribute("compact") === "true";
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
    for (const item of this.itemChildren()) {
      item.selected = String(item.value ?? item.getAttribute("value")) === String(value) && value !== null && value !== undefined;
      item.state = state;
      item.message = message;
      item.compact = compact;
      item.disabledParent = disabled;
    }
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.syncItems();
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
    const labelBlock = hasLabel
      ? html\`<div class="label-wrapper"><div class="label" id="label" aria-disabled=\${disabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></div><slot name="label-after"></slot></div>\`
      : nothing;
    const descBlock = hasDescription
      ? html\`<span class="label" id="description" aria-disabled=\${disabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`
      : nothing;
    const icon = this.iconName
      ? html\`<p-icon name=\${this.iconName} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\`
      : nothing;
    return html\`<fieldset class="root" ?disabled=\${disabled} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${hasLabel ? "label" : nothing} aria-describedby=\${hasDescription ? "description" : nothing}><style .innerHTML="\${this.cssText}"></style>\${labelBlock}\${descBlock}<slot></slot><span class="message" id="message" role=\${this.messageRole}>\${icon}\${this.messageText}</span></fieldset>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-segmented-control-whitespace: no segmented-control patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-segmented-control-whitespace: patched SegmentedControl.ts');
}
