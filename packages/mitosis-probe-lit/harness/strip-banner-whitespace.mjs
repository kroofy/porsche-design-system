import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Banner.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replaceAll(
  'const heading = this.heading || "";',
  'const heading = this.heading ?? this.getAttribute("heading") ?? "";',
);
after = after.replaceAll(
  'const visual = this.state || "info";',
  'const visual = this.state ?? this.getAttribute("state") ?? "info";',
);
after = after.replace(
  'const hasHeadingSlot = false;',
  'const hasHeadingSlot = !!this.querySelector(\'[slot="heading"]\');',
);
after = after.replace(
  'let dismiss: any = this.dismissButton;',
  'let dismiss: any = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");',
);
after = after.replace(
  'let isOpen: any = this.open;',
  'let isOpen: any = this.open ?? this.getAttribute("open");',
);
after = after.replace(
  'let position: any = this.position;',
  'let position: any = this.position ?? this.getAttribute("position");',
);

const propsToEnsure = ['open', 'heading', 'headingTag', 'description', 'position', 'state', 'dismissButton'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(`@property() ${prop}:`)) {
    after = after.replace('@customElement("lit-banner")', `@customElement("lit-banner")\n  ${decl}`);
  }
}

after = after.replace(
  /get headingText\(\) \{[\s\S]*?\n  \}/,
  `get headingText() {
    return this.heading ?? this.getAttribute("heading") ?? "";
  }`,
);
after = after.replace(
  /get headingTagValue\(\) \{[\s\S]*?\n  \}/,
  `get headingTagValue() {
    return this.headingTag ?? this.getAttribute("heading-tag") ?? this.getAttribute("headingtag") ?? "h5";
  }`,
);
after = after.replace(
  /get descriptionText\(\) \{[\s\S]*?\n  \}/,
  `get descriptionText() {
    return this.description ?? this.getAttribute("description") ?? "";
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
  /get hasHeadingSlot\(\) \{[\s\S]*?\n  \}/,
  `get hasHeadingSlot() {
    return !!this.querySelector('[slot="heading"]');
  }`,
);
after = after.replace(
  /get headingAria\(\) \{[\s\S]*?\n  \}/,
  `get headingAria() {
    const heading = this.heading ?? this.getAttribute("heading") ?? "";
    if (heading) return heading;
    return (this.querySelector('[slot="heading"]')?.textContent ?? "").trim();
  }`,
);
after = after.replace(
  /get roleName\(\) \{[\s\S]*?\n  \}/,
  `get roleName() {
    const visual = this.state ?? this.getAttribute("state") ?? "info";
    return visual === "warning" || visual === "error" ? "alert" : "status";
  }`,
);
after = after.replace(
  /get ariaLive\(\) \{[\s\S]*?\n  \}/,
  `get ariaLive() {
    const visual = this.state ?? this.getAttribute("state") ?? "info";
    return visual === "warning" || visual === "error" ? "assertive" : "polite";
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
  /  connectedCallback\(\) \{[\s\S]*?\n  \}\n\n  render\(\)/,
  `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  updated() {
    const pop = this.renderRoot?.querySelector("[popover]");
    if (!pop) return;
    if (this.isOpenFlag) {
      if (!pop.matches(":popover-open")) pop.showPopover();
    } else if (pop.matches(":popover-open")) {
      pop.hidePopover();
    }
  }

  render()`,
);

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  updated() {
    const pop = this.renderRoot?.querySelector("[popover]");
    if (!pop) return;
    if (this.isOpenFlag) {
      if (!pop.matches(":popover-open")) pop.showPopover();
    } else if (pop.matches(":popover-open")) {
      pop.hidePopover();
    }
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const heading = this.headingText;
    const tag = this.headingTagValue;
    let headingEl = nothing;
    if (heading) {
      if (tag === "h1") headingEl = html\`<h1>\${heading}</h1>\`;
      else if (tag === "h2") headingEl = html\`<h2>\${heading}</h2>\`;
      else if (tag === "h3") headingEl = html\`<h3>\${heading}</h3>\`;
      else if (tag === "h4") headingEl = html\`<h4>\${heading}</h4>\`;
      else if (tag === "h6") headingEl = html\`<h6>\${heading}</h6>\`;
      else headingEl = html\`<h5>\${heading}</h5>\`;
    } else {
      headingEl = html\`<slot name="heading"></slot>\`;
    }
    const hasDescriptionSlot = !!this.querySelector('[slot="description"]');
    const desc = this.descriptionText
      ? html\`<p>\${this.descriptionText}</p>\`
      : hasDescriptionSlot
        ? html\`<slot name="description"></slot>\`
        : html\`<slot></slot>\`;
    const dismiss = this.showDismiss
      ? html\`<button class="dismiss" type="button" aria-description=\${this.headingAria || nothing}><span>Close banner</span></button>\`
      : nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><div popover="manual" ?inert=\${!this.isOpenFlag} role=\${this.roleName} aria-live=\${this.ariaLive} aria-label=\${this.headingAria || nothing}><div class="notification">\${headingEl}\${desc}\${dismiss}</div></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-banner-whitespace: no banner render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-banner-whitespace: compacted Banner.ts render template');
}
