import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PButtonTile } from '../../../../projects/angular-wrapper/src/elements/PButtonTile';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PButtonTile', () => {
  it('returns a button with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Default"><img alt="Some alt text" /></button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const tile = host.firstElementChild as HTMLButtonElement;

    expect(host.childElementCount).toBe(1);
    expect(tile.tagName).toBe('BUTTON');
    expect(tile.type).toBe('submit');
    expect(tile.classList.contains('p-button-tile')).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe('Some Label');
    expect(host.querySelector('p-button-tile')).toBeNull();
    expect(tile.querySelector('.p-button-tile__media img')?.getAttribute('alt')).toBe('Some alt text');
    expect(tile.querySelector('.p-button-tile__description')?.textContent).toBe('Default');
    const action = tile.querySelector('.p-button.p-button-tile__action');
    expect(action?.tagName).toBe('SPAN');
    expect(action?.getAttribute('aria-hidden')).toBe('true');
    expect(tile.querySelector('.p-button-tile__action-compact')).toBeNull();
    expect(tile.parentElement).toBe(host);
  });

  it('puts header and footer in real children', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Default">
        <span pTileHeader>Header</span>
        <img alt="" />
        <span pTileFooter>Footer</span>
      </button>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(tile.querySelector('.p-button-tile__header')?.textContent).toBe('Header');
    expect(tile.querySelector('.p-button-tile__footer')?.textContent).toBe('Footer');
  });

  it('uses native disabled', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Default" disabled><img alt="" /></button>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(tile.disabled).toBe(true);
    expect(tile.getAttribute('aria-busy')).toBeNull();
    expect(tile.getAttribute('data-p-loading')).toBeNull();
  });

  it('uses native disabled and aria-busy when loading', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Default" loading><img alt="" /></button>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(tile.disabled).toBe(true);
    expect(tile.getAttribute('aria-busy')).toBe('true');
    expect(tile.getAttribute('data-p-loading')).toBe('true');
    expect(tile.querySelector('.p-button__spinner svg')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('p-spinner')).toBeNull();
  });

  it('renders only the compact action when compact is true', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Compact" [compact]="true"><img alt="" /></button>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(tile.getAttribute('data-p-compact')).toBe('true');
    expect(tile.querySelector('.p-button-tile__action')).toBeNull();
    expect(tile.querySelector('.p-button-tile__action-compact')).not.toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    @Component({
      standalone: true,
      imports: [PButtonTile],
      template: `<button pButtonTile label="Some Label" description="Large" size="large" weight="regular" aspectRatio="16/9" align="top" gradient><img alt="" /></button>`,
    })
    class Host {}

    const fixture = render(Host);
    const tile = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(tile.getAttribute('data-p-size')).toBe('large');
    expect(tile.getAttribute('data-p-weight')).toBe('regular');
    expect(tile.getAttribute('data-p-aspect-ratio')).toBe('16/9');
    expect(tile.getAttribute('data-p-align')).toBe('top');
    expect(tile.getAttribute('data-p-gradient')).toBe('true');
  });
});
