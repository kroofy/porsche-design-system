import { getComponentCss as getShadowBannerCss } from '../../components/banner/banner-styles';
import { getNativeBannerCss } from './banner-css';

const shadowNotificationShadow = (css: string): string => {
  const match = css.match(/\.notification \{[\s\S]*?box-shadow: ([^;]+);/);
  if (!match) {
    throw new Error('missing notification box-shadow');
  }
  return match[1];
};

describe('getNativeBannerCss()', () => {
  const css = getNativeBannerCss();

  it('scopes the control to .p-banner inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-banner {');
    expect(css).toContain('.p-banner[hidden]');
    expect(css).toContain('.p-banner:popover-open');
    expect(css).toContain('.p-banner > p-heading');
    expect(css).toContain('.p-banner__dismiss');
    expect(css).toContain('color-scheme: inherit');
  });

  it('resets popover UA styles outside the layer', () => {
    expect(css.startsWith('.p-banner,.p-banner .p-banner__dismiss{color-scheme:inherit}')).toBe(true);
    expect(css).toContain('.p-banner:popover-open{display:grid}');
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
    expect(css).not.toContain('.notification');
  });

  it('keeps the shadow token contract', () => {
    expect(css).toContain(shadowNotificationShadow(getShadowBannerCss(true, 'top', 'info', true, true, true)));
  });

  it('encodes state, position, heading and popover open', () => {
    expect(css).toContain('[data-p-state="success"]');
    expect(css).toContain('[data-p-position="top"]');
    expect(css).toContain('[data-p-position="bottom"]');
    expect(css).toContain('--p-banner-max-w');
    expect(css).toContain('--p-banner-top');
    expect(css).toContain('--p-banner-bottom');
    expect(css).toContain('popover-open');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
