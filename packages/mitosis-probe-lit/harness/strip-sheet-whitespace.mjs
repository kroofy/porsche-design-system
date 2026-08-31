import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Sheet.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

const attrFallbacks = [
  ['const isOpen = isTrue(this.open);', 'const isOpen = isTrue(this.open ?? this.getAttribute("open"));'],
  [
    'let dismiss: any = this.dismissButton;',
    'let dismiss: any = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");',
  ],
  [
    'const background = this.background === "surface" ? "surface" : "canvas";',
    'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
  ],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replace(
  /get isOpenFlag\(\) \{[\s\S]*?\n  \}/,
  `get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
  }`,
);
after = after.replace(
  /get showDismiss\(\) \{[\s\S]*?\n  \}/,
  `get showDismiss() {
    const dismiss = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");
    if (dismiss === false || dismiss === "false") return false;
    return true;
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
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
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
        dialog.focus();
      }
    } else if (dialog.open) {
      dialog.close();
    }
    dialog.inert = !this.isOpenFlag;
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const dismiss = this.showDismiss
      ? html\`<button class="dismiss" type="button"><span>Dismiss sheet</span></button>\`
      : nothing;
    const label = this.ariaLabelText || nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><dialog ?inert=\${!this.isOpenFlag} tabindex="-1" aria-modal="true" aria-label=\${label}><div class="scroller"><div class="sheet">\${dismiss}<slot name="header"></slot><slot></slot></div></div></dialog>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-sheet-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-sheet-whitespace: patched Sheet.ts');
}
