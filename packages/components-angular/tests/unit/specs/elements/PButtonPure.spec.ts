import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PButtonPure } from '../../../../projects/angular-wrapper/src/elements/PButtonPure';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PButtonPure', () => {
  it('returns a button with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PButtonPure],
      template: `<button pButtonPure>Save</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const button = host.firstElementChild as HTMLButtonElement;

    expect(host.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(host.querySelector('p-button-pure')).toBeNull();
    expect(button.classList.contains('p-button-pure')).toBe(true);
    expect(button.querySelector('img.p-icon.p-button-pure__icon')?.getAttribute('src')).toContain('arrow-right');
    expect(button.querySelector('span.p-button-pure__label')?.textContent).toBe('Save');
    expect(button.parentElement).toBe(host);
  });

  it('puts aria attributes on the button', () => {
    @Component({
      standalone: true,
      imports: [PButtonPure],
      template: `<button pButtonPure aria-label="Close">X</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled and aria-busy when loading', () => {
    @Component({
      standalone: true,
      imports: [PButtonPure],
      template: `<button pButtonPure loading>Save</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('data-p-loading')).toBe('true');
    expect(button.querySelector('span.p-button-pure__spinner svg')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    @Component({
      standalone: true,
      imports: [PButtonPure],
      template: `<button pButtonPure color="contrast-high" icon="delete" [hideLabel]="true">Delete</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-p-color')).toBe('contrast-high');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-hide-label')).toBe('true');
    expect(button.querySelector('img.p-icon')?.parentElement).toBe(button);
  });
});
