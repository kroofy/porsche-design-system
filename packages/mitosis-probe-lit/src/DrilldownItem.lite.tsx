import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-drilldown-item' });

export default function LitDrilldownItem(props: {
  identifier?: any;
  label?: any;
  primary?: any;
  secondary?: any;
  cascade?: any;
}) {
  const state = useStore({
    get cssText(): string {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isPrimary = isTrue(props.primary);
      const isSecondary = isTrue(props.secondary);
      const isCascade = isTrue(props.cascade);
      const animMd = 'var(--p-animation-duration,var(--p-duration-md))';
      const easeBase = 'var(--p-ease-in-out)';
      const slotGrid =
        'grid-template:var(--p-drilldown-grid-template,auto/auto);gap:var(--p-drilldown-gap,var(--p-spacing-fluid-xs));align-content:start;align-items:start;box-sizing:border-box;min-height:100%;height:fit-content;padding-block-end:var(--p-spacing-fluid-lg)';
      let headerSlot = 'slot[name="header"]{display:none}';
      let buttonSlot = '';
      if (isPrimary || isCascade) buttonSlot += 'slot[name="button"]{display:none}';
      let defaultSlot = 'slot:not([name]){display:none}';
      let h2 = 'h2{display:none}';
      let slottedExtra = '';
      if (isCascade) slottedExtra += '::slotted(*:not([primary],[cascade])){display:none !important}';
      if (isPrimary) slottedExtra += '@media(max-width:759px){::slotted(*:not([secondary])){display:none}}';
      let scroller = '.scroller{display:none;overflow:hidden auto;background:var(--_p-drilldown-f)}';
      let button = '';
      if (isPrimary || isCascade) button += '.button{display:none}';
      else button += '.button{grid-column:1/-1;padding:var(--p-spacing-fluid-sm);margin:0 calc(var(--p-spacing-fluid-sm) * -1)}';
      let back = '';
      if (!isPrimary) back = '.back{display:none}';
      let mobile = '';
      let desktop = '';
      if (isSecondary) {
        headerSlot +=
          '@media(max-width:759px){slot[name="header"]{grid-area:2/3;display:grid;place-items:center;z-index:2}}';
        buttonSlot += '@media(max-width:759px){slot[name="button"]{display:none}}';
        defaultSlot +=
          '@media(max-width:759px){slot:not([name]){grid-area:4/2/auto/-2;z-index:0;display:grid;' +
          slotGrid +
          ';animation:slide-up-mobile ' +
          animMd +
          ' ' +
          easeBase +
          '}}';
        h2 +=
          '@media(max-width:759px){h2{font:var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);display:block;grid-area:2/3;place-self:center;z-index:2;margin:0;padding-inline:var(--p-spacing-static-md);max-width:100%;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--_p-drilldown-a)}}';
        scroller +=
          '@media(max-width:759px){.scroller{display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid;grid-area:1/1/-1/-1}.scroller::before{z-index:1;content:"";position:sticky;top:0;grid-area:1/1/4/-1;background:linear-gradient(180deg,var(--_p-drilldown-b) 0%,var(--_p-drilldown-b) 65%,transparent 100%)}}' +
          '@media(min-width:760px){.scroller{grid-area:1/1/-1/-1;display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid}}';
        button += '@media(max-width:759px){.button{display:none}}';
        mobile += '.drawer{display:contents}';
        desktop +=
          '.drawer{position:absolute;inset:0;inset-inline-start:clamp(338px, 210px + 18vw, 640px);display:grid;grid-template:var(--p-spacing-fluid-md) minmax(0, 1fr)/var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)}';
      }
      if (isPrimary || isCascade) {
        defaultSlot += '@media(max-width:759px){slot:not([name]){display:contents}}';
        scroller +=
          '@media(max-width:759px){.scroller{display:contents}}@media(min-width:760px){.scroller{display:contents}}';
        mobile += '.drawer{display:contents}';
        desktop += '.drawer{display:contents}';
      }
      if (isPrimary || isSecondary) {
        defaultSlot +=
          '@media(min-width:760px){slot:not([name]){grid-area:3/2/auto/-2;display:grid;' +
          slotGrid +
          ';animation:slide-up-desktop-' +
          (isPrimary ? 'primary' : 'secondary') +
          ' ' +
          animMd +
          ' ' +
          easeBase +
          '}}';
      }
      if (isSecondary) {
        defaultSlot +=
          '@media(min-width:760px){slot:not([name]){grid-area:2/2/auto/-2;padding-block-end:var(--p-spacing-fluid-lg)}}';
      }
      if (isCascade) {
        defaultSlot += '@media(min-width:760px){slot:not([name]){display:contents}}';
      }
      if (!isPrimary && !isSecondary && !isCascade) {
        mobile += '.drawer{display:none}';
        desktop += '.drawer{display:none}';
      } else if (!isPrimary && !isSecondary && isCascade) {
        // cascade-only already set display:contents
      } else if (!isSecondary && !(isPrimary || isCascade)) {
        mobile += '.drawer{display:none}';
        desktop += '.drawer{display:none}';
      }
      if (!mobile.includes('.drawer')) mobile += '.drawer{display:none}';
      if (!desktop.includes('.drawer')) desktop += '.drawer{display:none}';
      if (isPrimary) {
        back +=
          '@media(max-width:759px){.back{grid-area:2/2;margin-top:2px;width:fit-content;height:fit-content;place-self:start;z-index:2}}' +
          '@media(min-width:760px){.back{grid-area:2/2;margin-bottom:var(--p-spacing-fluid-md);width:fit-content;height:fit-content;margin-inline-start:-4px}}';
      }
      return (
        '@keyframes slide-up-mobile{from{transform:translate3d(0,var(--p-spacing-fluid-md),0)}to{transform:translate3d(0,0,0)}}' +
        '@keyframes slide-up-desktop-primary{from{margin-block-start:var(--p-spacing-fluid-md)}to{margin-block-start:0px}}' +
        '@keyframes slide-up-desktop-secondary{from{margin-block-start:var(--p-spacing-fluid-md)}to{margin-block-start:0px}}' +
        ':host{display:contents}' +
        ':host([hidden]){display:none !important}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        headerSlot +
        buttonSlot +
        defaultSlot +
        h2 +
        slottedExtra +
        '::slotted(*){--p-drilldown-grid-template:auto/auto;--p-drilldown-gap:var(--p-spacing-fluid-xs)}' +
        scroller +
        button +
        back +
        '@media(min-width:760px){' +
        desktop +
        '}' +
        '@media(max-width:759px){' +
        mobile +
        '}'
      );
    },
    get labelValue(): any {
      return props.label || '';
    },
  });

  useStyle(`
    :host {
      display: contents;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div class="root">
      <style innerHTML={state.cssText} />
      <p-button-pure
        class="button"
        type="button"
        size="medium"
        align-label="start"
        stretch="true"
        icon="arrow-head-right"
      >
        {props.label}
      </p-button-pure>
      <p-button-pure
        class="back"
        type="button"
        size="small"
        align-label="end"
        stretch="true"
        icon="arrow-left"
        hide-label='{"base":true,"s":false}'
      >
        {props.label}
      </p-button-pure>
      <h2>{props.label}</h2>
      <div class="drawer">
        <div class="scroller">
          <slot />
        </div>
      </div>
    </div>
  );
}
