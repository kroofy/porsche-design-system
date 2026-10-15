import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Drilldown.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const isOpen = isTrue(this.open);',
  'const isOpen = isTrue(this.open ?? this.getAttribute("open"));',
);
after = after.replace(
  /const activeId =\s*this\.activeIdentifier == null \|\| this\.activeIdentifier === ""\s*\? ""\s*: String\(this\.activeIdentifier\);/,
  `const rawActive = this.activeIdentifier ?? this.getAttribute("active-identifier") ?? this.getAttribute("activeidentifier");
    const activeId = rawActive == null || rawActive === "" ? "" : String(rawActive);`,
);
after = after.replace(
  'const isPrimary = true;',
  `let isPrimary = true;
    if (activeId) {
      const items = this.querySelectorAll("p-drilldown-item");
      for (const item of items) {
        if (item.getAttribute("identifier") === activeId) {
          isPrimary = item.parentElement === this;
          break;
        }
      }
    }`,
);

after = after.replace(
  /get isOpenFlag\(\) \{[\s\S]*?\n  \}/,
  `get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
  }`,
);
after = after.replace(
  /get ariaLabelText\(\) \{[\s\S]*?\n  \}/,
  `get ariaLabelText() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object" && raw["aria-label"]) return raw["aria-label"];
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        const parsed = JSON.parse(raw.replace(/'/g, '"'));
        return parsed["aria-label"] || "";
      } catch (e) {
        return "";
      }
    }
    return "";
  }`,
);

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this._onInternalUpdate = (e) => {
      e.stopPropagation();
    };
    this.addEventListener("internalUpdate", this._onInternalUpdate);
  }

  disconnectedCallback() {
    this.removeEventListener("internalUpdate", this._onInternalUpdate);
    super.disconnectedCallback();
  }

  updated() {
    const dialog = this.renderRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.isOpenFlag) {
      if (!dialog.open) {
        dialog.inert = true;
        dialog.showModal();
        dialog.inert = false;
      }
    } else if (dialog.open) {
      dialog.close();
    }
    dialog.inert = !this.isOpenFlag;
    const slot = this.renderRoot?.querySelector("slot");
    if (slot && !this._slotBound) {
      this._slotBound = true;
      slot.addEventListener("slotchange", () => this.requestUpdate());
    }
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const label = this.ariaLabelText || nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><dialog ?inert=\${!this.isOpenFlag} aria-label=\${label}><div class="drawer"><p-button-pure class="back" type="button" size="small" align-label="end" stretch="true" hide-label="true" icon="arrow-left">Back</p-button-pure><p-button class="dismiss-mobile" type="button" icon="close" compact="true" variant="secondary" hide-label="true">Dismiss drilldown</p-button><p-button class="dismiss-desktop" type="button" icon="close" variant="secondary" hide-label="true">Dismiss drilldown</p-button><div class="scroller"><slot></slot></div></div></dialog>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-drilldown-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-drilldown-whitespace: patched Drilldown.ts');
}
