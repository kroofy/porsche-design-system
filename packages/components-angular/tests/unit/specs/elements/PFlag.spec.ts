import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { nativeFlagUrl } from '../../../../../components/src/elements/flag/flag-url';
import { PFlag } from '../../../../projects/angular-wrapper/src/elements/PFlag';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PFlag', () => {
  it('returns an img with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PFlag],
      template: `<img pFlag name="us" />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const img = host.firstElementChild as HTMLImageElement;

    expect(host.childElementCount).toBe(1);
    expect(img.tagName).toBe('IMG');
    expect(host.querySelector('p-flag')).toBeNull();
    expect(img.classList.contains('p-flag')).toBe(true);
    expect(img.getAttribute('src')).toBe(nativeFlagUrl('us'));
    expect(img.parentElement).toBe(host);
  });

  it('encodes non-default size on the img', () => {
    @Component({
      standalone: true,
      imports: [PFlag],
      template: `<img pFlag size="lg" />`,
    })
    class Host {}

    const fixture = render(Host);
    expect((fixture.nativeElement.querySelector('img') as HTMLImageElement).getAttribute('data-p-size')).toBe('lg');
  });
});
