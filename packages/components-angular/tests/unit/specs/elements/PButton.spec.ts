import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PButton } from '../../../../projects/angular-wrapper/src/elements/PButton';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PButton', () => {
  it('returns a button with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PButton],
      template: `<button pButton>Save</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const button = host.firstElementChild as HTMLButtonElement;

    expect(host.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(host.querySelector('p-button')).toBeNull();
    expect(button.classList.contains('p-button')).toBe(true);
    expect(button.type).toBe('submit');
    expect(button.querySelector('span.p-button__label')?.textContent).toBe('Save');
    expect(button.parentElement).toBe(host);
  });

  it('puts aria attributes on the button', () => {
    @Component({
      standalone: true,
      imports: [PButton],
      template: `<button pButton aria-label="Close">X</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Close');
  });

  it('uses native disabled', () => {
    @Component({
      standalone: true,
      imports: [PButton],
      template: `<button pButton disabled>Save</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBeNull();
    expect(button.getAttribute('data-p-loading')).toBeNull();
  });

  it('uses native disabled and aria-busy when loading', () => {
    @Component({
      standalone: true,
      imports: [PButton],
      template: `<button pButton loading>Save</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('data-p-loading')).toBe('true');
    const spinner = button.querySelector('span.p-button__spinner svg');
    expect(spinner).not.toBeNull();
    expect(spinner?.parentElement?.parentElement).toBe(button);
    expect(fixture.nativeElement.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    @Component({
      standalone: true,
      imports: [PButton],
      template: `<button pButton variant="destructive" icon="delete" [compact]="true">Delete</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('p-button')).toBe(true);
    expect(button.getAttribute('data-p-variant')).toBe('destructive');
    expect(button.getAttribute('data-p-icon')).toBe('delete');
    expect(button.getAttribute('data-p-compact')).toBe('true');
    const icon = button.querySelector('img.p-icon.p-button__icon');
    expect(icon?.getAttribute('data-p-name')).toBe('delete');
    expect(icon?.parentElement).toBe(button);
    expect(host.querySelector('p-icon')).toBeNull();
    expect(host.querySelector('p-button')).toBeNull();
  });
});
