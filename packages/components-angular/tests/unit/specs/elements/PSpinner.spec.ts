import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PSpinner } from '../../../../projects/angular-wrapper/src/elements/PSpinner';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PSpinner', () => {
  it('returns an svg with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PSpinner],
      template: `<svg pSpinner></svg>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const svg = host.firstElementChild as SVGSVGElement;

    expect(host.childElementCount).toBe(1);
    expect(svg.tagName.toLowerCase()).toBe('svg');
    expect(host.querySelector('p-spinner')).toBeNull();
    expect(svg.classList.contains('p-spinner')).toBe(true);
    expect(svg.getAttribute('role')).toBe('alert');
    expect(svg.getAttribute('aria-live')).toBe('assertive');
    expect(svg.querySelectorAll('circle')).toHaveLength(2);
    expect(svg.parentElement).toBe(host);
  });

  it('encodes color and size on the svg', () => {
    @Component({
      standalone: true,
      imports: [PSpinner],
      template: `<svg pSpinner color="inherit" size="lg"></svg>`,
    })
    class Host {}

    const fixture = render(Host);
    const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;

    expect(svg.getAttribute('data-p-color')).toBe('inherit');
    expect(svg.getAttribute('data-p-size')).toBe('lg');
  });

  it('puts aria-label on the svg', () => {
    @Component({
      standalone: true,
      imports: [PSpinner],
      template: `<svg pSpinner aria-label="Loading"></svg>`,
    })
    class Host {}

    const fixture = render(Host);
    expect(fixture.nativeElement.querySelector('svg').getAttribute('aria-label')).toBe('Loading');
  });
});
