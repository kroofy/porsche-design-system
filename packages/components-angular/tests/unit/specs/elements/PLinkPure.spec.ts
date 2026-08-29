import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PLinkPure } from '../../../../projects/angular-wrapper/src/elements/PLinkPure';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PLinkPure', () => {
  it('returns an anchor with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PLinkPure],
      template: `<a pLinkPure href="https://porsche.com">More</a>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const link = host.firstElementChild as HTMLAnchorElement;

    expect(host.childElementCount).toBe(1);
    expect(link.tagName).toBe('A');
    expect(host.querySelector('p-link-pure')).toBeNull();
    expect(link.classList.contains('p-link-pure')).toBe(true);
    expect(link.getAttribute('href')).toBe('https://porsche.com');
    expect(link.querySelector('img.p-icon.p-link-pure__icon')?.getAttribute('src')).toContain('arrow-right');
    expect(link.querySelector('span.p-link-pure__label')?.textContent).toBe('More');
  });

  it('encodes non-default appearance on the anchor', () => {
    @Component({
      standalone: true,
      imports: [PLinkPure],
      template: `<a pLinkPure href="https://porsche.com" icon="phone" [hideLabel]="true" underline active>Call</a>`,
    })
    class Host {}

    const fixture = render(Host);
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(link.getAttribute('data-p-icon')).toBe('phone');
    expect(link.getAttribute('data-p-hide-label')).toBe('true');
    expect(link.getAttribute('data-p-underline')).toBe('true');
    expect(link.getAttribute('data-p-active')).toBe('true');
    expect(link.querySelector('span')?.parentElement).toBe(link);
  });
});
