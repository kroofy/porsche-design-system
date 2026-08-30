import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { nativeCrestImgSrc } from '../../../../../components/src/elements/crest/crest-url';
import { PCrest } from '../../../../projects/angular-wrapper/src/elements/PCrest';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PCrest', () => {
  it('returns a picture with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PCrest],
      template: `<picture pCrest></picture>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const picture = host.firstElementChild as HTMLPictureElement;

    expect(host.childElementCount).toBe(1);
    expect(picture.tagName).toBe('PICTURE');
    expect(host.querySelector('p-crest')).toBeNull();
    expect(picture.classList.contains('p-crest')).toBe(true);
    expect(picture.querySelector('img')?.getAttribute('src')).toBe(nativeCrestImgSrc());
    expect(picture.parentElement).toBe(host);
  });

  it('uses a as the host when marked pCrest', () => {
    @Component({
      standalone: true,
      imports: [PCrest],
      template: `<a pCrest href="#"></a>`,
    })
    class Host {}

    const fixture = render(Host);
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(a.classList.contains('p-crest')).toBe(true);
    expect(a.querySelector('picture')).not.toBeNull();
  });
});
