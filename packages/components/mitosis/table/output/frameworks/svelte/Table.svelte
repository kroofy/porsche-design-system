<script context="module" lang="ts">
  export interface LitTableProps {
    caption?: string;
    compact?: any;
    layout?: string;
    sticky?: any;
  }
</script>

<script lang="ts">
  export let compact: LitTableProps["compact"];
  export let layout: LitTableProps["layout"];
  export let caption: LitTableProps["caption"];

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const compact = isTrue(compact);
    const layout = layout || "auto";
    const pad = compact
      ? "var(--p-spacing-static-sm)"
      : "var(--p-spacing-fluid-sm)";
    let out =
      ":host{display:block;" +
      "--p-scroller-indicator-top:var(--p-table-scroll-indicator-top,0px) !important;" +
      "--p-scroller-indicator-bottom:var(--p-table-scroll-indicator-bottom,0px) !important;" +
      "--_p-table-b:var(--p-color-frosted) !important;" +
      "--_p-table-c:var(--p-color-contrast-low) !important;" +
      "--_p-table-a:" +
      pad +
      " !important;" +
      "--_p-table-d:1px !important;" +
      "font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "color:var(--p-color-primary) !important;" +
      "text-align:start !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".caption{margin-bottom:var(--p-spacing-fluid-md)}" +
      ".table{display:table;border-collapse:collapse;white-space:nowrap";
    if (layout === "fixed") {
      out += ";table-layout:fixed;min-width:100%}";
    } else {
      out += ";width:100%}";
    }
    return out;
  };
  $: captionText = () => {
    return caption || "";
  };
</script>

<div class="table" role="table">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot />
</div>

<style>
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>