<script context="module" lang="ts">
  export interface LitStepperHorizontalProps {
    size?: any;
  }
</script>

<script lang="ts">
  export let size: LitStepperHorizontalProps["size"];

  $: cssText = () => {
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const parse = (raw: any, fallback: any) => {
      if (raw === undefined || raw === null || raw === "") return fallback;
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          return JSON.parse(
            raw
              .replace(/'/g, '"')
              .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
          );
        } catch (e) {
          return fallback;
        }
      }
      return raw;
    };
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const fontFor = (s: any) =>
      s === "medium" ? "var(--p-typescale-md)" : "var(--p-typescale-sm)";
    const size = parse(size, "small");
    const sizeBase =
      typeof size === "object" && size !== null
        ? pick(size, "base", "small")
        : size;
    let out =
      ":host{display:grid}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".wrap{display:contents}" +
      ".scroller{place-self:flex-start;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);font-size:" +
      fontFor(sizeBase) +
      "}";
    if (size && typeof size === "object") {
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.scroller{font-size:" +
          fontFor(s) +
          "}}";
      }
    }
    return out;
  };
</script>

<div class="wrap">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<svelte:component
    this={p - scroller}
    class="scroller"><slot /></svelte:component
  >
</div>

<style>
  :host([hidden]) {
    display: none !important;
  }
</style>