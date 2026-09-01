<!-- mitosis-native-host: native svelte from DrilldownLink.lite.tsx -->
<script context="module" lang="ts">
  export interface LitDrilldownLinkProps {
    href?: any;
    active?: any;
    target?: any;
    download?: any;
    rel?: any;
    aria?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let href: LitDrilldownLinkProps["href"];
  export let active: LitDrilldownLinkProps["active"];
  function __cmpProps() { return { href, active }; }

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const rawHref = href;
    const hasSlottedAnchor = rawHref === undefined || rawHref === null;
    const isActive = isTrue(active);
    const deco = isActive ? "inherit" : "transparent";
    const cursor = isActive ? "default" : "pointer";
    const important = hasSlottedAnchor ? " !important" : "";
    const host =
      ":host{display:grid}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    const anchor =
      "all:unset" +
      important +
      ";padding:calc(var(--p-spacing-fluid-sm) + 2px) calc(var(--p-spacing-fluid-sm) + 4px)" +
      important +
      ";margin:-2px calc(var(--p-spacing-fluid-sm) * -1 - 4px)" +
      important +
      ";border-radius:var(--p-radius-sm)" +
      important +
      ";font:var(--p-font-weight-normal) var(--p-typescale-md) / var(--p-leading-normal) var(--p-font-porsche-next)" +
      important +
      ";color:var(--_p-drilldown-a)" +
      important +
      ";text-decoration:underline" +
      important +
      ";text-decoration-color:" +
      deco +
      important +
      ";cursor:" +
      cursor +
      important +
      ";transition:text-decoration-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)" +
      important;
    const sel = hasSlottedAnchor ? "::slotted(a)" : "a";
    const hoverSel = hasSlottedAnchor ? "::slotted(a:hover)" : "a:hover";
    const focusSel = hasSlottedAnchor
      ? "::slotted(a:focus-visible)"
      : "a:focus-visible";
    return (
      host +
      sel +
      "{" +
      anchor +
      "}" +
      focusSel +
      "{outline:2px solid var(--p-color-focus)" +
      important +
      ";outline-offset:2px" +
      important +
      "}" +
      "@media(forced-colors:active){" +
      focusSel +
      "{outline-color:Highlight" +
      important +
      "}}" +
      "@media(hover:hover){" +
      hoverSel +
      "{text-decoration-color:inherit" +
      important +
      "}}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: grid;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-drilldown-link");
</script>

<div class="p-drilldown-link" data-pds="drilldown-link">
{@html `<${"style"}>${scopedCssText}<${"/style"}>`}

<slot />


</div>
