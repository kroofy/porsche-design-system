<script context="module" lang="ts">
  export interface LitCanvasProps {
    sidebarStartOpen?: any;
    sidebarEndOpen?: any;
    background?: any;
  }
</script>

<script lang="ts">
  export let sidebarStartOpen: LitCanvasProps["sidebarStartOpen"];
  export let sidebarEndOpen: LitCanvasProps["sidebarEndOpen"];
  export let background: LitCanvasProps["background"];

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const startOpen = isTrue(sidebarStartOpen);
    const endOpen = isTrue(sidebarEndOpen);
    const background = background === "surface" ? "surface" : "canvas";
    const isSurface = background === "surface";
    const primary = isSurface
      ? "var(--p-color-surface)"
      : "var(--p-color-canvas)";
    const secondary = isSurface
      ? "var(--p-color-canvas)"
      : "var(--p-color-surface)";
    const gap = "clamp(16px, 1.25vw + 12px, 24px)";
    const startMobile = "min(100vw,var(--p-canvas-sidebar-start-width,320px))";
    const endMobile = "min(100vw,var(--p-canvas-sidebar-end-width,320px))";
    const startDesktop =
      "min(calc(100vw - 320px),var(--p-canvas-sidebar-start-width,320px))";
    const endDesktop =
      "min(calc(100vw - 320px),var(--p-canvas-sidebar-end-width,320px))";
    const startCol = startOpen ? startDesktop : "0px";
    const endCol = endOpen ? endDesktop : "0px";
    const radius = startOpen ? "var(--p-radius-3xl)" : "0";
    const dur =
      "var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)";
    const maxTransform = endOpen
      ? "translate3d(calc(-1 * " + startMobile + " - " + endMobile + "),0,0)"
      : startOpen
      ? "translate3d(0,0,0)"
      : "translate3d(calc(-1 * " + startMobile + "),0,0)";
    const maxTransformRtl = endOpen
      ? "translate3d(calc(" + startMobile + " + " + endMobile + "),0,0)"
      : startOpen
      ? "translate3d(0,0,0)"
      : "translate3d(" + endMobile + ",0,0)";
    const mask = (stops: string) =>
      "-webkit-mask-image:linear-gradient(to bottom," +
      stops +
      ");mask-image:linear-gradient(to bottom," +
      stops +
      ")";
    return (
      ":host{display:block;overflow-x:clip !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      'slot:not([name])::slotted(.-p-canvas-grid),slot[name="footer"]::slotted(.-p-canvas-grid){display:grid !important;grid-template-columns:repeat(12,minmax(0,1fr)) !important;column-gap:' +
      gap +
      " !important;margin-inline:auto !important;container-type:inline-size !important}" +
      'slot[name="sidebar-end-header"]{display:block}' +
      'slot[name="background"]{z-index:1;display:block;grid-area:1/2/-1/3;position:sticky;top:0;height:100lvh;pointer-events:none;overflow:hidden;transform:translate3d(0,0,0)}' +
      'slot[name="background"]::slotted(video),slot[name="background"]::slotted(img){width:100% !important;height:100% !important;object-fit:cover !important}' +
      'slot[name="title"]::slotted(a){all:unset !important;cursor:pointer !important;color:inherit !important;border-radius:var(--p-radius-sm) !important}' +
      'slot[name="title"]::slotted(a:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}' +
      '@media(forced-colors:active){slot[name="title"]::slotted(a:focus-visible){outline-color:Highlight !important}}' +
      "h2{all:unset;padding:4px;font:var(--p-font-weight-normal) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-transform:uppercase;letter-spacing:2px}" +
      ".root{display:grid;grid-template:auto minmax(0,1fr) auto / " +
      startMobile +
      " 100vw " +
      endMobile +
      ';grid-template-areas:"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end";min-height:100lvh}' +
      '.root::before{content:"";z-index:0;grid-area:1/2/-1/3;background:' +
      primary +
      ";pointer-events:none;border-end-start-radius:" +
      radius +
      ";transition:border-radius " +
      dur +
      "}" +
      ".header{z-index:4;grid-area:header;container-type:inline-size;position:sticky;top:0;min-height:56px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:" +
      gap +
      ";align-items:center;padding:var(--p-spacing-static-sm) " +
      gap +
      "}" +
      ".header:focus-visible{outline:none}" +
      ".header__area{display:flex;gap:var(--p-spacing-static-sm);align-items:center}" +
      ".header__area--start{justify-content:flex-start}" +
      ".header__area--end{justify-content:flex-end}" +
      ".header__crest{}" +
      ".header__wordmark{height:10px}" +
      ".blur{z-index:-1;position:absolute;inset:0;pointer-events:none}" +
      ".blur>div{position:absolute;inset:0}" +
      ".blur>div:nth-of-type(1){-webkit-backdrop-filter:blur(64px);backdrop-filter:blur(64px);" +
      mask(
        "rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%"
      ) +
      "}" +
      ".blur>div:nth-of-type(2){-webkit-backdrop-filter:blur(32px);backdrop-filter:blur(32px);" +
      mask(
        "rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%"
      ) +
      "}" +
      ".blur>div:nth-of-type(3){-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);" +
      mask(
        "rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%"
      ) +
      "}" +
      ".blur>div:nth-of-type(4){-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);" +
      mask(
        "rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%"
      ) +
      "}" +
      ".blur>div:nth-of-type(5){-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);" +
      mask(
        "rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%"
      ) +
      "}" +
      ".blur>div:nth-of-type(6){-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);" +
      mask(
        "rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%"
      ) +
      "}" +
      ".blur>div:nth-of-type(7){-webkit-backdrop-filter:blur(1px);backdrop-filter:blur(1px);" +
      mask("rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%") +
      "}" +
      ".blur>div:nth-of-type(8){-webkit-backdrop-filter:blur(.5px);backdrop-filter:blur(.5px);" +
      mask("rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%") +
      "}" +
      '.blur::after{content:"";position:absolute;top:0;inset-inline-start:0;width:var(--p-radius-3xl);height:calc(2 * var(--p-radius-3xl));border-start-start-radius:' +
      radius +
      ";box-shadow:0 calc(-1 * var(--p-radius-3xl)) 0 0 " +
      secondary +
      ";transition:border-radius " +
      dur +
      "}" +
      ".main{z-index:2;grid-area:main;padding:" +
      gap +
      "}" +
      ".footer{z-index:5;grid-area:footer;padding:" +
      gap +
      " " +
      gap +
      " var(--p-spacing-fluid-sm);position:sticky;bottom:0}" +
      '.footer::before{content:"";z-index:-1;position:absolute;inset:-140px 0 0;pointer-events:none;background:linear-gradient(to bottom,hsl(from ' +
      primary +
      " h s l / 0) 0%,hsl(from " +
      primary +
      " h s l / 0.013) 8.1%,hsl(from " +
      primary +
      " h s l / 0.049) 15.5%,hsl(from " +
      primary +
      " h s l / 0.104) 22.5%,hsl(from " +
      primary +
      " h s l / 0.175) 29%,hsl(from " +
      primary +
      " h s l / 0.259) 35.3%,hsl(from " +
      primary +
      " h s l / 0.352) 41.2%,hsl(from " +
      primary +
      " h s l / 0.45) 47.1%,hsl(from " +
      primary +
      " h s l / 0.55) 52.9%,hsl(from " +
      primary +
      " h s l / 0.648) 58.8%,hsl(from " +
      primary +
      " h s l / 0.741) 64.7%,hsl(from " +
      primary +
      " h s l / 0.825) 71%,hsl(from " +
      primary +
      " h s l / 0.896) 77.5%,hsl(from " +
      primary +
      " h s l / 0.951) 84.5%,hsl(from " +
      primary +
      " h s l / 0.987) 91.9%," +
      primary +
      " 100%);border-end-start-radius:" +
      radius +
      ";transition:border-radius " +
      dur +
      "}" +
      ".sidebar{z-index:3;position:sticky;top:0;height:100dvh;padding:" +
      gap +
      ";box-sizing:border-box;overflow:hidden auto;overscroll-behavior-y:contain}" +
      ".sidebar:focus-visible{outline:none}" +
      ".sidebar--start{grid-area:sidebar-start;justify-self:flex-end;background:" +
      secondary +
      ";width:" +
      startMobile +
      "}" +
      ".sidebar--end{grid-area:sidebar-end;justify-self:flex-start;border-inline-start:1px solid var(--p-color-contrast-lower);background:" +
      primary +
      ";width:" +
      endMobile +
      "}" +
      ".sidebar__header{z-index:9999999;display:flex;gap:var(--p-spacing-static-sm);align-items:center;position:sticky;top:calc(-1 * " +
      gap +
      ");margin:calc(-1 * " +
      gap +
      ") calc(-1 * " +
      gap +
      ") " +
      gap +
      ";padding:var(--p-spacing-static-sm) " +
      gap +
      ";min-height:56px;box-sizing:border-box}" +
      ".sidebar__header--start{justify-content:flex-start}" +
      ".sidebar__header--end{justify-content:space-between}" +
      '.sidebar__header::before{content:"";z-index:-1;position:absolute;inset:0 0 -8px;pointer-events:none}' +
      ".sidebar__header--start::before{background:linear-gradient(180deg," +
      secondary +
      " 0%," +
      secondary +
      " 65%,transparent 100%)}" +
      ".sidebar__header--end::before{background:linear-gradient(180deg," +
      primary +
      " 0%," +
      primary +
      " 65%,transparent 100%)}" +
      "@container(min-width:760px){.header__crest{display:none}}" +
      "@container(max-width:759px){.header__wordmark{display:none}}" +
      "@media(min-width:1000px){.root{transition:grid-template-columns " +
      dur +
      ";grid-template-columns:" +
      startCol +
      " minmax(320px,1fr) " +
      endCol +
      "}.sidebar--start{width:" +
      startDesktop +
      "}.sidebar--end{width:" +
      endDesktop +
      "}}" +
      "@media(max-width:999px){.root{transition:transform " +
      dur +
      ";transform:" +
      maxTransform +
      "}.root:dir(rtl){transform:" +
      maxTransformRtl +
      "}}"
    );
  };
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}
  <header class="header" />
  <aside class="sidebar sidebar--start" />
  <main class="main"><slot /></main>
</div>

<style>
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>