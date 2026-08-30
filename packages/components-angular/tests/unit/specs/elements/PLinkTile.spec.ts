import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PLinkTile } from '../../../../projects/angular-wrapper/src/elements/PLinkTile';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PLinkTile', () => {
  it('returns an anchor with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PLinkTile],
      template: `<a pLinkTile href="#" label="Some Label" description="Default"><img alt="Some alt text" /></a>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const tile = host.firstElementChild as HTMLAnchorElement;

    expect(host.childElementCount).toBe(1);
    expect(tile.tagName).toBe('A');
    expect(tile.classList.contains('p-link-tile')).toBe(true);
    expect(tile.getAttribute('href')).toBe('#');
    expect(tile.getAttribute('aria-label')).toBe('Some Label');
    expect(host.querySelector('p-link-tile')).toBeNull();
    expect(tile.querySelector('.p-link-tile__media img')?.getAttribute('alt')).toBe('Some alt text');
    const action = tile.querySelector('.p-link.p-link-tile__action');
    expect(action?.tagName).toBe('SPAN');
    expect(action?.getAttribute('aria-hidden')).toBe('true');
    expect(tile.querySelector('.p-link-tile__action-compact')).toBeNull();
    expect(tile.parentElement).toBe(host);
  });

  it('puts header and footer in real children', () => {
    @Component({
      standalone: true,
      imports: [PLinkTile],
      template: `<a pLinkTile href="#" label="Some Label" description="Default">
        <span pTileHeader>Header</span>
        <img alt="" />
        <span pTileFooter>Footer</span>
      </a>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(tile.querySelector('.p-link-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-link-tile__footer')?.textContent).toBe('Footer');
  });

  it('renders only the compact action when compact is true', () => {
    @Component({
      standalone: true,
      imports: [PLinkTile],
      template: `<a pLinkTile href="#" label="Some Label" description="Compact" [compact]="true"><img alt="" /></a>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-link-tile__action')).toBeNull();
    expect(tile.querySelector('.p-link-tile__action-compact')).not.toBeNull();
  });
});
