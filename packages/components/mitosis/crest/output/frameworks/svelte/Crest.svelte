<!-- mitosis-native-host: native svelte from Crest.lite.tsx -->
<script context="module" lang="ts">
  export interface LitCrestProps {
    href?: string;
    target?: string;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let href: LitCrestProps["href"];
  export let target: LitCrestProps["target"];
  function __cmpProps() { return { href, target }; }

  $: cssText = () => {
    return (
      "a{all:unset;cursor:pointer}" +
      'a::before{content:"";position:absolute;inset:0;border-radius:1px}' +
      "a:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "picture{display:block;width:min(30px,100%);height:min(40px,100%)}" +
      "img{display:block;max-width:100%;max-height:100%;width:auto;height:auto}" +
      "@media(forced-colors:active){a:focus-visible::before{outline-color:Highlight}}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    box-sizing: content-box !important;\n    max-width: 30px !important;\n    max-height: 40px !important;\n    width: inherit !important;\n    height: inherit !important;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-crest");
</script>

<div class="p-crest" data-pds="crest">
<a {href} target={target || "_self"}
  >{@html `<${"style"}>${scopedCssText}<${"/style"}>`}<picture
    ><source
      srcSet="http://localhost:3001/crest/porsche-crest.0d0cc89@1x.webp 1x,http://localhost:3001/crest/porsche-crest.2245c45@2x.webp 2x,http://localhost:3001/crest/porsche-crest.19b4292@3x.webp 3x"
      type="image/webp"
    /><source
      srcSet="http://localhost:3001/crest/porsche-crest.d76137c@1x.png 1x,http://localhost:3001/crest/porsche-crest.8a292fb@2x.png 2x,http://localhost:3001/crest/porsche-crest.18d6f02@3x.png 3x"
      type="image/png"
    /><img
      src="http://localhost:3001/crest/porsche-crest.8a292fb@2x.png"
      width="30"
      height="40"
      alt="Porsche"
    /></picture
  ></a
>


</div>
