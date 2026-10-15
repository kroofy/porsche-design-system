const shadowCss = `
:host { display: inline-block; }
:host([hidden]) { display: none; }
.root {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 var(--p-button-px, 28px);
  border-radius: var(--p-button-radius, var(--p-radius-xl));
  font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal)
    var(--p-font-porsche-next);
  cursor: pointer;
}
:host([variant="primary"]) .root {
  background: var(--p-button-bg, var(--p-color-primary));
  color: var(--p-button-fg, var(--p-color-canvas));
}
:host([variant="secondary"]) .root {
  background: var(--p-button-bg, var(--p-color-surface));
  color: var(--p-button-fg, var(--p-color-primary));
  box-shadow: inset 0 0 0 1px var(--p-color-primary);
}
.root:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: 2px;
}
label {
  display: block;
  font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal)
    var(--p-font-porsche-next);
  margin-block-end: 8px;
}
input.root {
  all: unset;
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border-radius: var(--p-radius-xl);
  background: var(--p-color-surface);
  color: var(--p-color-primary);
  font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal)
    var(--p-font-porsche-next);
  box-shadow: inset 0 0 0 1px var(--p-color-contrast-medium);
}
input.root:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: 2px;
}
a.root {
  all: unset;
  color: var(--p-color-primary);
  font: var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal)
    var(--p-font-porsche-next);
  text-decoration: underline;
  cursor: pointer;
}
a.root:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: 2px;
}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(shadowCss);

class SdButton extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.internals = this.attachInternals();
    this.shadowRoot.innerHTML = `<button class="root" type="submit"><slot></slot></button>`;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector("button");
    button.type = this.getAttribute("type") || "submit";
    this.addEventListener("click", () => {
      const form = this.closest("form");
      if (!form || this.hasAttribute("disabled")) return;
      window.setTimeout(() => {
        const fake = document.createElement("button");
        fake.type = button.type;
        if (this.getAttribute("name")) fake.name = this.getAttribute("name");
        if (this.getAttribute("value")) fake.value = this.getAttribute("value");
        fake.hidden = true;
        form.append(fake);
        fake.click();
        fake.remove();
      }, 1);
    });
  }
}

class SdField extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.internals = this.attachInternals();
    this.shadowRoot.innerHTML = `
      <label for="input"><slot name="label"></slot></label>
      <input class="root" id="input" />
    `;
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector("input");
    input.name = this.getAttribute("name") || "";
    input.type = this.getAttribute("type") || "text";
    input.required = this.hasAttribute("required");
    input.addEventListener("input", () => {
      this.internals.setFormValue(input.value);
    });
    this.internals.setFormValue(input.value);
  }
}

class SdLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = `<a class="root"><slot></slot></a>`;
  }

  connectedCallback() {
    const a = this.shadowRoot.querySelector("a");
    a.href = this.getAttribute("href") || "#";
  }
}

customElements.define("sd-button", SdButton);
customElements.define("sd-field", SdField);
customElements.define("sd-link", SdLink);
