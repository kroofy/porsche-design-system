import { getNativeModelSignatureCss } from './model-signature-css';
import { nativeModelSignatureUrl } from './model-signature-url';

describe('getNativeModelSignatureCss()', () => {
  const css = getNativeModelSignatureCss();

  it('scopes the control to .p-model-signature inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-model-signature {');
    expect(css).toContain('.p-model-signature[hidden]');
  });

  it('inherits color-scheme outside the layer', () => {
    expect(css.startsWith('.p-model-signature{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toContain('::slotted');
  });

  it('paints the signature with the same CDN mask as shadow', () => {
    expect(css).toContain(nativeModelSignatureUrl('911'));
    expect(css).toContain(nativeModelSignatureUrl('718'));
    expect(css).toContain('[data-p-model="718"]');
    expect(css).toContain('[data-p-color="inherit"]');
    expect(css).toContain('[data-p-safe-zone="false"]');
    expect(css).toContain('--p-model-signature-color');
  });
});
