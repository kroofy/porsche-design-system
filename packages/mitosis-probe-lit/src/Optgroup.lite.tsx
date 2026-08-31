import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-optgroup' });

export default function LitOptgroup(props: {
  label?: string;
  disabled?: any;
  hidden?: any;
}) {
  const state = useStore({
    get cssText(): string {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const disabled = isTrue(props.disabled);
      let out =
        ':host{display:block}' +
        ':host([hidden]){display:none !important}' +
        '::slotted(*){--_p-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);--_p-multi-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px)}' +
        '[role="group"]{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px)}' +
        '[role="presentation"]{padding-block:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);padding-inline:calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)';
      if (disabled) out += ';opacity:0.4';
      out += '}';
      if (disabled) {
        out += '@media(forced-colors:active){[role="presentation"]{opacity:1;color:GrayText}}';
      }
      return out;
    },
    get labelText(): string {
      return props.label || '';
    },
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div role="group">
      <style innerHTML={state.cssText} />
      <span id="label" role="presentation">
        {state.labelText}
      </span>
      <slot />
    </div>
  );
}
