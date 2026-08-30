import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PWordmark } from '../../../../projects/angular-wrapper/src/elements/PWordmark';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PWordmark', () => {
  it('returns an svg with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PWordmark],
      template: `<svg pWordmark></svg>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const svg = host.firstElementChild as SVGSVGElement;

    expect(host.childElementCount).toBe(1);
    expect(svg.tagName.toLowerCase()).toBe('svg');
    expect(host.querySelector('p-wordmark')).toBeNull();
    expect(svg.classList.contains('p-wordmark')).toBe(true);
    expect(svg.parentElement).toBe(host);
  });

  it('encodes inherit size on the svg', () => {
    @Component({
      standalone: true,
      imports: [PWordmark],
      template: `<svg pWordmark size="inherit"></svg>`,
    })
    class Host {}

    const fixture = render(Host);
    expect(fixture.nativeElement.querySelector('svg').getAttribute('data-p-size')).toBe('inherit');
  });
});
