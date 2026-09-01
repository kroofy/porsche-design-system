<!-- mitosis-native-host: native svelte from TableCell.lite.tsx -->
<script context="module" lang="ts">
  export interface LitTableCellProps {
    multiline?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let multiline: LitTableCellProps["multiline"];
  function __cmpProps() { return { multiline }; }

  $: cssText = () => {
    const multiline =
      __cmpProps().multiline === true || __cmpProps().multiline === "true" || __cmpProps().multiline === "";
    const whiteSpace = multiline ? "normal" : "nowrap";
    return (
      ":host{display:table-cell;vertical-align:middle;" +
      "padding:var(--_p-table-a) !important;" +
      "margin:0 !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: table-cell;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-table-cell");
</script>

<div class="p-table-cell" data-pds="table-cell">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
