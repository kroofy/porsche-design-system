import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PLink } from '../../../../projects/angular-wrapper/src/elements/PLink';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PLink', () => {
  it('returns an anchor with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PLink],
      template: `<a pLink href="https://porsche.com">Porsche</a>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const link = host.firstElementChild as HTMLAnchorElement;

    expect(host.childElementCount).toBe(1);
    expect(link.tagName).toBe('A');
    expect(host.querySelector('p-link')).toBeNull();
    expect(link.classList.contains('p-link')).toBe(true);
    expect(link.getAttribute('href')).toBe('https://porsche.com');
    expect(link.querySelector('span.p-link__label')?.textContent).toBe('Porsche');
    expect(link.parentElement).toBe(host);
  });

  it('puts aria attributes on the anchor', () => {
    @Component({
      standalone: true,
      imports: [PLink],
      template: `<a pLink href="#main" aria-current="page">Main</a>`,
    })
    class Host {}

    const fixture = render(Host);
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(link.getAttribute('aria-current')).toBe('page');
  });

  it('encodes non-default appearance on the anchor', () => {
    @Component({
      standalone: true,
      imports: [PLink],
      template: `<a pLink href="/" variant="secondary" icon="arrow-right" [compact]="true">Next</a>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const link = host.querySelector('a') as HTMLAnchorElement;

    expect(link.classList.contains('p-link')).toBe(true);
    expect(link.getAttribute('data-p-variant')).toBe('secondary');
    expect(link.getAttribute('data-p-icon')).toBe('arrow-right');
    expect(link.getAttribute('data-p-compact')).toBe('true');
    const icon = link.querySelector('img.p-icon.p-link__icon');
    expect(icon?.getAttribute('data-p-size')).toBe('inherit');
    expect(icon?.parentElement).toBe(link);
    expect(host.querySelector('p-icon')).toBeNull();
    expect(host.querySelector('p-link')).toBeNull();
  });
});
