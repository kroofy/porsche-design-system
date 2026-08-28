const VARIANT_IDS = ["shadow", "nanotags", "css"];

function findPanel(id) {
  return document.querySelector(`[data-variant="${id}"]`);
}

function probeShadow(panel) {
  const form = panel.querySelector("form");
  const lightButton = form.querySelector("button[type=submit]");
  const lightInput = form.querySelector("input[name=email]");
  const lightLink = form.querySelector("a[href]");
  const hostButton = form.querySelector("sd-button");
  const hostField = form.querySelector("sd-field");
  const innerInput = hostField?.shadowRoot?.querySelector("input");
  const ids = [...form.querySelectorAll("sd-field")].map(
    (el) => el.shadowRoot?.querySelector("input")?.id
  );
  return {
    nativeSubmitterVisible: Boolean(lightButton && !lightButton.hidden),
    nativeEmailVisible: Boolean(lightInput),
    nativeLinkVisible: Boolean(lightLink),
    hostHasShadow: Boolean(hostButton?.shadowRoot),
    tokenBg: computedTokenBg(hostButton),
    duplicateInnerIds: ids.length > 1 && new Set(ids).size === 1,
    innerInputName: innerInput?.name || "",
  };
}

function probeLight(panel, hostTag) {
  const form = panel.querySelector("form");
  const button = form.querySelector(`${hostTag}-button > button[type=submit]`);
  const input = form.querySelector(`${hostTag}-field > input[name=email]`);
  const link = form.querySelector(`${hostTag}-link > a[href]`);
  const host = form.querySelector(`${hostTag}-button`);
  const ids = [...form.querySelectorAll(`${hostTag}-field input`)].map((el) => el.id);
  return {
    nativeSubmitterVisible: Boolean(button),
    nativeEmailVisible: Boolean(input),
    nativeLinkVisible: Boolean(link),
    hostHasShadow: Boolean(host?.shadowRoot),
    tokenBg: computedTokenBg(button),
    duplicateInnerIds: ids.length > 1 && new Set(ids).size === 1,
    innerInputName: input?.name || "",
  };
}

function computedTokenBg(el) {
  if (!el) return "";
  const painted = el.shadowRoot?.querySelector(".root") || el;
  return getComputedStyle(painted).backgroundColor;
}

function expectedPrimaryBg() {
  const probe = document.createElement("div");
  probe.style.background = "var(--p-color-primary)";
  document.body.append(probe);
  const value = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return value;
}

function tokenMatches(actual) {
  const expected = expectedPrimaryBg();
  return Boolean(actual) && actual === expected;
}

function runProbes() {
  const rows = [];
  for (const id of VARIANT_IDS) {
    const panel = findPanel(id);
    if (!panel || panel.hidden) continue;
    const result = id === "shadow" ? probeShadow(panel) : probeLight(panel, id === "nanotags" ? "nt" : "co");
    rows.push({ id, ...result, tokenOk: tokenMatches(result.tokenBg) });
  }
  renderProbes(rows);
  return rows;
}

function renderProbes(rows) {
  const body = document.querySelector("#probe-body");
  body.innerHTML = rows
    .map((row) => {
      const cells = [
        cell("native submit button in light DOM", row.nativeSubmitterVisible, row.id !== "shadow"),
        cell("native email input in light DOM", row.nativeEmailVisible, row.id !== "shadow"),
        cell("native link in light DOM", row.nativeLinkVisible, row.id !== "shadow"),
        cell("no shadow root", !row.hostHasShadow, row.id !== "shadow"),
        cell("primary uses --p-color-primary", row.tokenOk, true),
        cell("instance ids are unique", !row.duplicateInnerIds, true),
      ];
      return `<tr><th>${row.id}</th>${cells.join("")}</tr>`;
    })
    .join("");
}

function cell(label, passed, desired) {
  const ok = passed === desired;
  return `<td class="${ok ? "pass" : "fail"}">${label}: ${passed ? "yes" : "no"}</td>`;
}

function bindForms() {
  document.querySelectorAll("form[data-probe-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const entries = [...data.entries()];
      const submitter = event.submitter;
      document.querySelector("#last-submit").textContent = JSON.stringify(
        {
          variant: form.closest("[data-variant]")?.dataset.variant,
          submitter:
            submitter &&
            `${submitter.tagName.toLowerCase()}${submitter.name ? `[name=${submitter.name}]` : ""}`,
          entries,
        },
        null,
        2
      );
    });
  });
}

function bindToolbar() {
  const buttons = [...document.querySelectorAll("[data-show]")];
  const panels = [...document.querySelectorAll("[data-variant]")];
  const apply = (mode) => {
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.show === mode));
    });
    panels.forEach((panel) => {
      panel.hidden = mode !== "all" && panel.dataset.variant !== mode;
    });
    runProbes();
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.show));
  });
  document.querySelector("#scheme")?.addEventListener("click", () => {
    document.documentElement.classList.toggle("scheme-dark");
    runProbes();
  });
  document.querySelector("#leak")?.addEventListener("click", () => {
    document.body.classList.toggle("leak-app");
  });
  apply("all");
}

bindForms();
bindToolbar();
window.runProbes = runProbes;
