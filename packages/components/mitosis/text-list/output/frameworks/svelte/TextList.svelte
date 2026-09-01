<!-- mitosis-native-host: native svelte from TextList.lite.tsx -->
<script context="module" lang="ts">
  export interface LitTextListProps {
    type?: string;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let type: LitTextListProps["type"];
  function __cmpProps() { return { type }; }

  $: cssText = () => {
    const type = __cmpProps().type || "unordered";
    const ordered = type !== "unordered";
    const numbered = type === "numbered";
    let out =
      ":host{display:block;counter-reset:p-text-list-counter !important}" +
      ":host([hidden]){display:none !important}" +
      "ol,ul{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);margin:0;padding:var(--_p-text-list-d,0) 0 var(--_p-text-list-c,0) 0;list-style-type:none;color:var(--p-color-primary)}";
    if (ordered) {
      out +=
        "::slotted(*){--_p-text-list-d:var(--p-spacing-static-xs) !important;--_p-text-list-c:var(--p-spacing-static-md) !important;--_p-text-list-e:var(--_p-text-list-a,1.5rem) !important}" +
        "::slotted(*)::before{content:counters(p-text-list-counter,'.'," +
        (numbered ? "decimal" : "lower-latin") +
        ") var(--_p-text-list-b,'.') !important;counter-increment:p-text-list-counter !important;justify-self:flex-end !important;white-space:nowrap !important}";
    } else {
      out +=
        "::slotted(*){--_p-text-list-d:var(--p-spacing-static-xs) !important;--_p-text-list-c:var(--p-spacing-static-md) !important;--_p-text-list-e:var(--_p-text-list-f,.375rem) !important}" +
        "::slotted(*)::before{content:var(--_p-text-list-g,'•') !important}";
    }
    return out;
  };
  $: isOrdered = () => {
    const type = __cmpProps().type || "unordered";
    return type !== "unordered";
  };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-text-list");
</script>

<div class="p-text-list" data-pds="text-list">
<ul>{@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot /></ul>


</div>
