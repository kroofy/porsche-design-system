import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PBanner } from '../../../../projects/angular-wrapper/src/elements/PBanner';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PBanner', () => {
  it('returns an aside with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PBanner],
      template: `<aside pBanner heading="Heading" description="Description">Extra</aside>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const aside = host.firstElementChild as HTMLElement;

    expect(host.childElementCount).toBe(1);
    expect(aside.tagName).toBe('ASIDE');
    expect(host.querySelector('p-banner')).toBeNull();
    expect(aside.classList.contains('p-banner')).toBe(true);
    expect(aside.getAttribute('popover')).toBe('manual');
    expect(aside.getAttribute('role')).toBe('status');
    expect(aside.querySelector('h5')?.textContent).toBe('Heading');
    expect(aside.querySelector('.p-banner__dismiss')).not.toBeNull();
    expect(aside.parentElement).toBe(host);
  });

  it('omits the dismiss button when dismissButton is false', () => {
    @Component({
      standalone: true,
      imports: [PBanner],
      template: `<aside pBanner [dismissButton]="false">Some Content</aside>`,
    })
    class Host {}

    const fixture = render(Host);
    expect(fixture.nativeElement.querySelector('.p-banner__dismiss')).toBeNull();
  });

  it('encodes appearance and live region on the aside', () => {
    @Component({
      standalone: true,
      imports: [PBanner],
      template: `<aside pBanner state="error" position="bottom" heading="Broken"></aside>`,
    })
    class Host {}

    const fixture = render(Host);
    const aside = fixture.nativeElement.querySelector('aside') as HTMLElement;

    expect(aside.getAttribute('data-p-state')).toBe('error');
    expect(aside.getAttribute('data-p-position')).toBe('bottom');
    expect(aside.getAttribute('role')).toBe('alert');
    expect(aside.getAttribute('aria-live')).toBe('assertive');
  });
});
