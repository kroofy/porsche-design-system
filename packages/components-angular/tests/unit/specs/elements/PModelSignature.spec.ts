import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { nativeModelSignatureUrl } from '../../../../../components/src/elements/model-signature/model-signature-url';
import { PModelSignature } from '../../../../projects/angular-wrapper/src/elements/PModelSignature';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PModelSignature', () => {
  it('returns an img with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PModelSignature],
      template: `<img pModelSignature />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const img = host.firstElementChild as HTMLImageElement;

    expect(host.childElementCount).toBe(1);
    expect(img.tagName).toBe('IMG');
    expect(host.querySelector('p-model-signature')).toBeNull();
    expect(img.classList.contains('p-model-signature')).toBe(true);
    expect(img.getAttribute('src')).toBe(nativeModelSignatureUrl('911'));
    expect(img.parentElement).toBe(host);
  });

  it('encodes non-default appearance on the img', () => {
    @Component({
      standalone: true,
      imports: [PModelSignature],
      template: `<img pModelSignature model="718" color="contrast-high" size="inherit" [safeZone]="false" />`,
    })
    class Host {}

    const fixture = render(Host);
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(img.getAttribute('data-p-model')).toBe('718');
    expect(img.getAttribute('data-p-color')).toBe('contrast-high');
    expect(img.getAttribute('data-p-size')).toBe('inherit');
    expect(img.getAttribute('data-p-safe-zone')).toBe('false');
  });
});
