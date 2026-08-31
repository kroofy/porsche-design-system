import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Popover.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

if (!after.includes('@floating-ui/dom')) {
  after = after.replace(
    'import { customElement, property, state, query } from "lit/decorators";',
    'import { customElement, property, state, query } from "lit/decorators";\nimport { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from "@floating-ui/dom";',
  );
}

after = after.replaceAll(
  'const isOpen = isTrue(this.open);',
  'const isOpen = this.effectiveOpen();',
);
after = after.replaceAll(
  'const skipEntry = true;',
  'const skipEntry = this._isInitialRender !== false;',
);
after = after.replace(
  'return this.description || "";',
  'return this.description ?? this.getAttribute("description") ?? "";',
);

const propsToEnsure = ['open', 'direction', 'description', 'compact', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitPopover extends LitElement {',
      `export default class LitPopover extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  _isInitialRender = true;
  _isOpen = false;
  _cleanUpAutoUpdate;
  _boundTrigger;

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("click", this._onHostClick);
    this.addEventListener("slotchange", () => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("click", this._onHostClick);
    this._cleanUpAutoUpdate?.();
    this._cleanUpAutoUpdate = undefined;
    super.disconnectedCallback();
  }

  _onHostClick = (e) => {
    if (this.isControlled()) return;
    if (e.target?.closest?.('[slot="button"]')) {
      this._isOpen = !this._isOpen;
      this.requestUpdate();
    }
  };

  isControlled() {
    if (this.open === true || this.open === false) return true;
    return this.hasAttribute("open");
  }

  effectiveOpen() {
    if (this.isControlled()) {
      const raw = this.open ?? this.getAttribute("open");
      return raw === true || raw === "true" || raw === "";
    }
    return !!this._isOpen;
  }

  hasSlottedButton() {
    return !!this.querySelector('[slot="button"]');
  }

  triggerElement() {
    const root = this.renderRoot;
    const button = root?.querySelector("button");
    if (button) return button;
    const slot = root?.querySelector('slot[name="button"]');
    return slot?.assignedElements?.()[0] ?? this.querySelector('[slot="button"]');
  }

  async positionPopover() {
    const pop = this.renderRoot?.querySelector("[popover]");
    const arrowEl = this.renderRoot?.querySelector(".arrow");
    const trigger = this.triggerElement();
    if (!pop || !arrowEl || !trigger) return;
    const { x, y, placement, middlewareData } = await computePosition(trigger, pop, {
      placement: this.direction ?? this.getAttribute("direction") ?? "bottom",
      strategy: "fixed",
      middleware: [
        offset(18),
        shift({
          padding: 8,
          limiter: limitShift({
            offset: ({ rects }) => (rects.reference.width > 33 ? 0 : rects.reference.width),
          }),
        }),
        flip({
          padding: 8,
          fallbackAxisSideDirection: "end",
        }),
        arrow({
          element: arrowEl,
          padding: Number.parseFloat(getComputedStyle(pop).borderRadius) || 12,
        }),
      ],
    });
    const placementVertical = placement === "top" || placement === "bottom";
    const placementTopLeft = placement === "top" || placement === "left";
    Object.assign(pop.style, { left: x + "px", top: y + "px" });
    const { x: xArrow, y: yArrow } = middlewareData.arrow || {};
    Object.assign(arrowEl.style, {
      clipPath: placementVertical ? "polygon(50% 0, 100% 110%, 0 110%)" : "polygon(0 50%, 110% 0, 110% 100%)",
      width: placementVertical ? "24px" : "12px",
      height: placementVertical ? "12px" : "24px",
      transform: "rotate(" + (placementTopLeft ? "180deg" : "0") + ")",
      left: ["right", "bottom", "top"].includes(placement)
        ? xArrow != null
          ? xArrow + "px"
          : "-12px"
        : "",
      right: placement === "left" ? (xArrow != null ? xArrow + "px" : "-12px") : "",
      top: ["bottom", "left", "right"].includes(placement)
        ? yArrow != null
          ? yArrow + "px"
          : "-12px"
        : "",
      bottom: placement === "top" ? (yArrow != null ? yArrow + "px" : "-12px") : "",
    });
  }

  syncAutoUpdate(active) {
    const trigger = this.triggerElement();
    const pop = this.renderRoot?.querySelector("[popover]");
    if (active && this._cleanUpAutoUpdate && this._boundTrigger !== trigger) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
    }
    if (active && trigger && pop && !this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate = autoUpdate(trigger, pop, () => this.positionPopover());
      this._boundTrigger = trigger;
    } else if (!active && this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
      this._boundTrigger = undefined;
    }
  }

  async updated() {
    const pop = this.renderRoot?.querySelector("[popover]");
    const open = this.effectiveOpen();
    if (pop) {
      if (open) {
        const nested = [...this.querySelectorAll("lit-popover, p-popover")];
        await Promise.all(nested.map((el) => el.updateComplete).filter(Boolean));
        if (pop.matches(":popover-open")) {
          if (nested.length) {
            pop.hidePopover();
            pop.showPopover();
          }
        } else {
          pop.showPopover();
        }
      } else if (pop.matches(":popover-open")) {
        pop.hidePopover();
      }
    }
    this.syncAutoUpdate(open);
    if (open) await this.positionPopover();
    this._isInitialRender = false;
  }

  render() {
    const open = this.effectiveOpen();
    const description = this.description ?? this.getAttribute("description") ?? "";
    const hasDescription = !!(description && description !== "undefined");
    const trigger = this.hasSlottedButton()
      ? html\`<slot name="button"></slot>\`
      : html\`<button type="button" aria-label="More information" aria-details="popover" aria-expanded=\${open ? "true" : "false"} @click=\${() => {
          if (!this.isControlled()) {
            this._isOpen = !this._isOpen;
            this.requestUpdate();
          }
        }}></button>\`;
    const body = hasDescription ? html\`<p>\${description}</p>\` : html\`<slot></slot>\`;
    return html\`<style .innerHTML="\${this.cssText}"></style>\${trigger}<div id="popover" popover="manual" ?inert=\${!open}><div class="arrow"></div>\${body}</div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-popover-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-popover-whitespace: patched Popover.ts');
}
