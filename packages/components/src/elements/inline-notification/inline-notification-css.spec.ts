import { getComponentCss as getShadowInlineNotificationCss } from '../../components/inline-notification/inline-notification-styles';
import { getNativeInlineNotificationCss } from './inline-notification-css';

const shadowNotificationBackground = (css: string): string => {
  const match = css.match(/\.notification \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing notification background');
  }
  return match[1];
};

describe('getNativeInlineNotificationCss()', () => {
  const css = getNativeInlineNotificationCss();

  it('scopes the control to .p-inline-notification inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-inline-notification {');
    expect(css).toContain('.p-inline-notification[hidden]');
    expect(css).toContain('.p-inline-notification__dismiss');
    expect(css).toContain('.p-inline-notification__action');
  });

  it('inherits color-scheme outside the layer so unlayered aside resets lose', () => {
    expect(css.startsWith('.p-inline-notification{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
    expect(css).not.toContain('.notification');
  });

  it('keeps the info token contract', () => {
    expect(css).toContain(shadowNotificationBackground(getShadowInlineNotificationCss('info', false, false, false)));
  });

  it('encodes state, heading, dismiss and action on the same node', () => {
    expect(css).toContain('[data-p-state="success"]');
    expect(css).toContain('[data-p-state="warning"]');
    expect(css).toContain('[data-p-state="error"]');
    expect(css).toContain(':has(> h5)');
    expect(css).toContain('grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto)');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
