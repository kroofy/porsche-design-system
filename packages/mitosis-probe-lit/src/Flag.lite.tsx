import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-flag' });

export default function LitFlag(props: { name?: string; size?: any; aria?: any }) {
  const state = useStore({
    get cssText(): string {
      const sizeMap: any = {
        'xx-small': 'var(--p-typescale-2xs)',
        'x-small': 'var(--p-typescale-xs)',
        small: 'var(--p-typescale-sm)',
        medium: 'var(--p-typescale-md)',
        large: 'var(--p-typescale-lg)',
        'x-large': 'var(--p-typescale-xl)',
        'xx-large': 'var(--p-typescale-2xl)',
        '2xs': 'var(--p-typescale-2xs)',
        xs: 'var(--p-typescale-xs)',
        sm: 'var(--p-typescale-sm)',
        md: 'var(--p-typescale-md)',
        lg: 'var(--p-typescale-lg)',
        xl: 'var(--p-typescale-xl)',
        '2xl': 'var(--p-typescale-2xl)',
        '3xl': 'var(--p-typescale-3xl)',
        '4xl': 'var(--p-typescale-4xl)',
        '5xl': 'var(--p-typescale-5xl)',
        inherit: 'inherit',
      };
      const minWidth: any = { xs: 480, s: 760, m: 1000, l: 1300, xl: 1760, xxl: 1920 };
      const imgBase =
        'img{display:block;margin:0;padding:1px;border:0;outline:0;overflow:hidden;box-sizing:border-box;pointer-events:none;width:var(--p-flag-size,var(--p-leading-normal));height:var(--p-flag-size,var(--p-leading-normal));font-family:var(--p-font-porsche-next);';
      let size = props.size || 'sm';
      if (typeof size === 'string' && size.charAt(0) === '{') {
        try {
          size = JSON.parse(size.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
        } catch (e) {
          size = 'sm';
        }
      }
      const fontFor = (s: any) => sizeMap[s] || sizeMap.sm;
      if (typeof size === 'object' && size !== null) {
        let out = imgBase + 'font-size:' + fontFor(size.base || 'sm') + '}';
        for (const bp of Object.keys(size)) {
          if (bp === 'base') continue;
          out += '@media(min-width:' + minWidth[bp] + 'px){img{font-size:' + fontFor(size[bp]) + '}}';
        }
        return out;
      }
      return imgBase + 'font-size:' + fontFor(size) + '}';
    },
    get src(): string {
      const files: any = {
        de: 'de.b575e11.svg',
        ch: 'ch.1cc9a58.svg',
        pt: 'pt.c903b10.svg',
        xx: 'xx.acc7ae8.svg',
      };
      const name = props.name || 'de';
      return 'http://localhost:3001/flags/' + (files[name] || files.xx);
    },
    get alt(): string {
      const raw = props.aria;
      if (!raw) return '';
      if (typeof raw === 'object' && raw !== null) return raw['aria-label'] || '';
      const str = String(raw);
      const key = 'aria-label';
      const idx = str.indexOf(key);
      if (idx < 0) return '';
      const after = str.slice(idx + key.length);
      const quote = after.indexOf("'") >= 0 && (after.indexOf('"') < 0 || after.indexOf("'") < after.indexOf('"')) ? "'" : '"';
      const start = after.indexOf(quote);
      if (start < 0) return '';
      const rest = after.slice(start + 1);
      const end = rest.indexOf(quote);
      return end < 0 ? '' : rest.slice(0, end);
    },
  });

  useStyle(`
    :host {
      display: inline-flex;
      vertical-align: top;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <>
      <style innerHTML={state.cssText} />
      <img src={state.src} width="24" height="24" loading="lazy" alt={state.alt} />
    </>
  );
}
