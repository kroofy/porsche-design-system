import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-button' });

export default function LitButton(props: {
  type?: string;
  variant?: string;
  icon?: string;
  iconSource?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  name?: string;
  value?: string;
  form?: string;
  aria?: any;
}) {
  const state = useStore({
    get cssText(): string {
      const minWidth: any = { xs: 480, s: 760, m: 1000, l: 1300, xl: 1760, xxl: 1920 };
      const parse = (raw: any, fallback: any) => {
        if (raw === undefined || raw === null || raw === '') return fallback;
        if (typeof raw === 'string' && raw.charAt(0) === '{') {
          try {
            return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
          } catch (e) {
            return fallback;
          }
        }
        return raw;
      };
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const pick = (obj: any, key: any, fallback: any) => {
        if (obj && typeof obj === 'object') {
          if (obj[key] === undefined) return fallback;
          return obj[key];
        }
        return obj;
      };
      const variant = props.variant || 'primary';
      const icon = props.icon || 'none';
      const source = props.iconSource || '';
      const hasVisibleIcon = (icon !== 'none' && icon !== '') || source !== '';
      const disabled = isTrue(props.disabled);
      const loading = isTrue(props.loading);
      const blocked = disabled || loading;
      const hideLabel = parse(props.hideLabel, false);
      const compact = parse(props.compact, false);
      const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel;
      const compactBase = typeof compact === 'object' && compact !== null ? pick(compact, 'base', false) : compact;
      const scaleFor = (c: any) => (isTrue(c) ? '0.64285714' : '1');
      const buttonRadiusFor = (c: any) => (isTrue(c) ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)');
      const hostRadiusFor = (h: any) =>
        isTrue(h)
          ? 'var(--p-button-radius,var(--p-radius-full))'
          : 'var(--p-button-radius,var(--_p-link-button-a))';
      const padFor = (h: any) =>
        isTrue(h)
          ? 'var(--p-button-py,calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px,calc(28px * (var(--_p-button-a) - 0.64285714) + 6px))'
          : 'var(--p-button-py,calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px,calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px))';
      const gapFor = (h: any) =>
        isTrue(h) ? 'var(--p-button-gap,0)' : 'var(--p-button-gap,calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px))';
      const labelFor = (h: any) =>
        isTrue(h)
          ? 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
          : 'position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal';
      const iconMarginFor = (h: any) =>
        isTrue(h) ? '0' : 'calc(-1 * (11.2px * (var(--_p-button-a) - 0.64285714) + 4px))';
      const colors: any = {
        primary: {
          bg: 'var(--p-button-bg,var(--p-color-primary))',
          fg: 'var(--p-button-fg,var(--p-color-canvas))',
          hoverBg: 'var(--p-button-bg,var(--p-color-contrast-high))',
          hoverFg: 'var(--p-button-fg,var(--p-color-canvas))',
        },
        secondary: {
          bg: 'var(--p-button-bg,var(--p-color-frosted-strong))',
          fg: 'var(--p-button-fg,var(--p-color-primary))',
          hoverBg: 'var(--p-button-bg,var(--p-color-frosted))',
          hoverFg: 'var(--p-button-fg,var(--p-color-primary))',
        },
        destructive: {
          bg: 'var(--p-button-bg,var(--p-color-error))',
          fg: 'var(--p-button-fg,var(--p-color-canvas))',
          hoverBg: 'var(--p-button-bg,var(--p-color-error-medium))',
          hoverFg: 'var(--p-button-fg,var(--p-color-primary))',
        },
      };
      const palette = colors[variant] || colors.primary;
      const hasIconCss =
        hasVisibleIcon || isTrue(hideBase) || (typeof hideLabel === 'object' && hideLabel !== null);
      let out =
        ':host{--_p-button-a:' +
        scaleFor(compactBase) +
        ';--_p-link-button-a:' +
        buttonRadiusFor(compactBase) +
        ';border-radius:' +
        hostRadiusFor(hideBase) +
        '!important}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        '.root{all:unset;display:flex;justify-content:center;width:100%;min-width:min-content;box-sizing:border-box;-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);border-radius:inherit;transform:translate3d(0,0,0);background-color:' +
        palette.bg +
        ';color:' +
        palette.fg +
        ';cursor:' +
        (blocked ? 'not-allowed' : 'pointer') +
        ';transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);padding:' +
        padFor(hideBase) +
        ';gap:' +
        gapFor(hideBase);
      if (disabled) out += ';opacity:0.4';
      out +=
        '}.root:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}' +
        '.label{' +
        labelFor(hideBase) +
        ';transition:opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)';
      if (loading && !disabled) out += ';opacity:0';
      if (disabled) out += ';opacity:0.4';
      out += '}';
      if (hasIconCss) {
        out +=
          '.icon{font:var(--p-typescale-sm) var(--p-font-porsche-next);width:var(--p-leading-normal);height:var(--p-leading-normal);margin-inline-start:' +
          iconMarginFor(hideBase) +
          ';transition:opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)';
        if (loading && !disabled) out += ';opacity:0';
        if (disabled) out += ';opacity:0.4';
        out += '}';
      } else {
        out +=
          '.icon{transition:opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)';
        if (loading && !disabled) out += ';opacity:0';
        if (disabled) out += ';opacity:0.4';
        out += '}';
      }
      if (loading) {
        out +=
          '.spinner{--p-spinner-color:currentcolor;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}';
      } else {
        out += 'p-spinner{display:none}';
      }
      if (!hasVisibleIcon) out += 'p-icon{display:none}';
      out +=
        '.loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}';
      if (disabled) {
        out +=
          '@media(forced-colors:active){.root{forced-color-adjust:none;background:Canvas;color:GrayText;box-shadow:inset 0 0 0 2px LinkText;opacity:1}.root:is(button){box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.root{box-shadow:inset 0 0 0 2px GrayText !important}.root:focus-visible{outline-color:Highlight}.label{opacity:1;color:GrayText}.icon{opacity:1;color:GrayText}}';
      } else {
        out +=
          '@media(forced-colors:active){.root{forced-color-adjust:none;background:Canvas;color:LinkText;box-shadow:inset 0 0 0 2px LinkText}.root:is(button){box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.root:focus-visible{outline-color:Highlight}}';
      }
      if (!blocked) {
        out +=
          '@media(hover:hover){.root:hover{color:' +
          palette.hoverFg +
          ';background-color:' +
          palette.hoverBg +
          '}@media(forced-colors:active){.root:hover{background:Canvas}}}';
      }
      const keys: any = {};
      if (typeof hideLabel === 'object' && hideLabel !== null) for (const k of Object.keys(hideLabel)) keys[k] = 1;
      if (typeof compact === 'object' && compact !== null) for (const k of Object.keys(compact)) keys[k] = 1;
      for (const bp of Object.keys(keys)) {
        if (bp === 'base') continue;
        if (!minWidth[bp]) continue;
        const h = pick(hideLabel, bp, hideBase);
        const c = pick(compact, bp, compactBase);
        out +=
          '@media(min-width:' +
          minWidth[bp] +
          'px){:host{--_p-button-a:' +
          scaleFor(c) +
          ';--_p-link-button-a:' +
          buttonRadiusFor(c) +
          ';border-radius:' +
          hostRadiusFor(h) +
          '!important}.root{padding:' +
          padFor(h) +
          ';gap:' +
          gapFor(h) +
          '}.label{' +
          labelFor(h) +
          '}';
        if (hasIconCss) {
          out += '.icon{margin-inline-start:' + iconMarginFor(h) + '}';
        }
        out += '}';
      }
      return out;
    },
    get iconName(): string {
      if (props.iconSource) return '';
      const icon = props.icon || 'none';
      if (icon === 'none' || icon === '') return '';
      return icon;
    },
    get iconSrc(): string {
      return props.iconSource || '';
    },
    get buttonType(): string {
      return props.type || 'submit';
    },
    get ariaDisabled(): string {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return disabled || loading ? 'true' : '';
    },
    get loadingText(): string {
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading ? 'Loading' : '';
    },
  });

  useStyle(`
    :host {
      display: inline-block;
      vertical-align: top;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <button class="root" type={state.buttonType}>
      <style innerHTML={state.cssText} />
      <p-icon
        class="icon"
        name={state.iconName}
        source={state.iconSrc}
        size="inherit"
        color="inherit"
        aria-hidden="true"
      />
      <p-spinner class="spinner" size="inherit" aria-hidden="true" />
      <span class="label">
        <slot></slot>
      </span>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </button>
  );
}
