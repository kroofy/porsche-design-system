import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/InlineNotification.ts');
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
  'const actionLabel = this.actionLabel || "";',
  'const actionLabel = this.actionLabel ?? this.getAttribute("action-label") ?? this.getAttribute("actionlabel") ?? "";',
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

const propsToEnsure = [
  'heading',
  'headingTag',
  'description',
  'state',
  'dismissButton',
  'actionLabel',
  'actionLoading',
  'actionIcon',
];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      '@customElement("lit-inline-notification")',
      `@customElement("lit-inline-notification")\n  ${decl}`,
    );
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
  /get actionLabelText\(\) \{[\s\S]*?\n  \}/,
  `get actionLabelText() {
    return this.actionLabel ?? this.getAttribute("action-label") ?? this.getAttribute("actionlabel") ?? "";
  }`,
);
after = after.replace(
  /get actionIconName\(\) \{[\s\S]*?\n  \}/,
  `get actionIconName() {
    return this.actionIcon ?? this.getAttribute("action-icon") ?? this.getAttribute("actionicon") ?? "arrow-right";
  }`,
);
after = after.replace(
  /get actionLoadingFlag\(\) \{[\s\S]*?\n  \}/,
  `get actionLoadingFlag() {
    const loading = this.actionLoading ?? this.getAttribute("action-loading") ?? this.getAttribute("actionloading");
    return loading === true || loading === "true" || loading === "";
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
    } else if (this.hasHeadingSlot) {
      headingEl = html\`<slot name="heading"></slot>\`;
    }
    const desc = this.descriptionText
      ? html\`<p>\${this.descriptionText}</p>\`
      : html\`<slot></slot>\`;
    const action = this.actionLabelText
      ? html\`<p-button-pure class="action" icon=\${this.actionIconName || nothing} ?loading=\${this.actionLoadingFlag}>\${this.actionLabelText}</p-button-pure>\`
      : nothing;
    const dismiss = this.showDismiss
      ? html\`<button class="dismiss" type="button" aria-description=\${this.headingAria || nothing}><span>Close notification</span></button>\`
      : nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><div class="notification" role=\${this.roleName} aria-live=\${this.ariaLive} aria-label=\${this.headingAria || nothing}>\${headingEl}\${desc}\${action}\${dismiss}</div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-inline-notification-whitespace: no inline-notification render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-inline-notification-whitespace: compacted InlineNotification.ts render template');
}
