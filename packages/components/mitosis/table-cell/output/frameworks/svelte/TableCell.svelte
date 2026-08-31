<script context="module" lang="ts">
  export interface LitTableCellProps {
    multiline?: any;
  }
</script>

<script lang="ts">
  export let multiline: LitTableCellProps["multiline"];

  $: cssText = () => {
    const multiline =
      multiline === true || multiline === "true" || multiline === "";
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
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot />
</div>

<style>
  :host {
    display: table-cell;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>