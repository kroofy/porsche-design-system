import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/DrilldownItem.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const isPrimary = isTrue(this.primary);',
  'const isPrimary = isTrue(this.primary ?? this.getAttribute("primary"));',
);
after = after.replace(
  'const isSecondary = isTrue(this.secondary);',
  'const isSecondary = isTrue(this.secondary ?? this.getAttribute("secondary"));',
);
after = after.replace(
  'const isCascade = isTrue(this.cascade);',
  'const isCascade = isTrue(this.cascade ?? this.getAttribute("cascade"));',
);

after = after.replace(
  /get labelValue\(\) \{[\s\S]*?\n  \}/,
  `get labelValue() {
    return this.label ?? this.getAttribute("label") ?? "";
  }`,
);

const propsToEnsure = ['identifier', 'label', 'primary', 'secondary', 'cascade'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitDrilldownItem extends LitElement {',
      `export default class LitDrilldownItem extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  disconnectedCallback() {
    this._slottedButton?.removeEventListener("click", this._onCascadeClick);
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  get isPrimaryFlag() {
    const raw = this.primary ?? this.getAttribute("primary");
    return raw === true || raw === "true" || raw === "";
  }

  get isSecondaryFlag() {
    const raw = this.secondary ?? this.getAttribute("secondary");
    return raw === true || raw === "true" || raw === "";
  }

  get isCascadeFlag() {
    const raw = this.cascade ?? this.getAttribute("cascade");
    return raw === true || raw === "true" || raw === "";
  }

  get identifierValue() {
    return this.identifier ?? this.getAttribute("identifier") ?? "";
  }

  _onCascadeClick = () => {
    const parent = this.parentElement;
    const isDrilldownParent = parent && parent.tagName === "P-DRILLDOWN";
    if (isDrilldownParent) {
      this._emitInternalUpdate(this.isSecondaryFlag ? undefined : this.identifierValue);
    } else if (!this.isSecondaryFlag) {
      this._emitInternalUpdate(this.identifierValue);
    }
  };

  _onBackClick = () => {
    this._emitInternalUpdate(this.identifierValue);
  };

  _emitInternalUpdate(activeIdentifier) {
    this.dispatchEvent(new CustomEvent("internalUpdate", {
      bubbles: true,
      detail: { activeIdentifier },
    }));
  }

  updated() {
    const scroller = this.renderRoot?.querySelector(".scroller");
    if (scroller && typeof scroller.scrollTo === "function") {
      scroller.scrollTo(0, 0);
    }
    const slotted = this.querySelector("[slot=button]");
    if (slotted !== this._slottedButton) {
      this._slottedButton?.removeEventListener("click", this._onCascadeClick);
      this._slottedButton = slotted;
      if (slotted) {
        slotted.addEventListener("click", this._onCascadeClick);
        slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
      }
    } else if (slotted) {
      slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
    }
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const label = this.labelValue || "";
    const isPrimary = this.isPrimaryFlag;
    const isSecondary = this.isSecondaryFlag;
    const isCascade = this.isCascadeFlag;
    const hasButton = !!this.querySelector("[slot=button]");
    const hasHeader = !!this.querySelector("[slot=header]");
    const cascade = hasButton
      ? html\`<slot name="button"></slot>\`
      : html\`<p-button-pure class="button" type="button" size="medium" align-label="start" stretch="true" icon="arrow-head-right" ?inert=\${isPrimary || isCascade} active=\${isSecondary ? "true" : nothing} aria-expanded=\${isSecondary ? "true" : "false"} @click=\${this._onCascadeClick}>\${label}</p-button-pure>\`;
    const header = hasHeader ? html\`<slot name="header"></slot>\` : html\`<h2>\${label}</h2>\`;
    return html\`<style .innerHTML="\${this.cssText}"></style>\${cascade}<p-button-pure class="back" type="button" size="small" align-label="end" stretch="true" icon="arrow-left" hide-label='{"base":true,"s":false}' @click=\${this._onBackClick}>\${label}</p-button-pure>\${header}<div class="drawer"><div class="scroller"><slot></slot></div></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-drilldown-item-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-drilldown-item-whitespace: patched DrilldownItem.ts');
}
