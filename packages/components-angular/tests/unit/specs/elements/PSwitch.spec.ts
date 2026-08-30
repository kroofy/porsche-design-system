import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PSwitch } from '../../../../projects/angular-wrapper/src/elements/PSwitch';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PSwitch', () => {
  it('returns a button with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PSwitch],
      template: `<button pSwitch>Some label</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const button = host.firstElementChild as HTMLButtonElement;

    expect(host.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(host.querySelector('p-switch')).toBeNull();
    expect(button.classList.contains('p-switch')).toBe(true);
    expect(button.type).toBe('button');
    expect(button.getAttribute('role')).toBe('switch');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(button.querySelector('span.p-switch__label')?.textContent).toBe('Some label');
    expect(button.parentElement).toBe(host);
  });

  it('maps checked to aria-checked on the button', () => {
    @Component({
      standalone: true,
      imports: [PSwitch],
      template: `<button pSwitch checked>Some label</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.hasAttribute('checked')).toBe(true);
  });

  it('uses native disabled', () => {
    @Component({
      standalone: true,
      imports: [PSwitch],
      template: `<button pSwitch disabled>Some label</button>`,
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
      imports: [PSwitch],
      template: `<button pSwitch loading>Some label</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('data-p-loading')).toBe('true');
    const spinner = button.querySelector('svg.p-spinner.p-switch__spinner');
    expect(spinner).not.toBeNull();
    expect(spinner?.parentElement?.classList.contains('p-switch__knob')).toBe(true);
    expect(fixture.nativeElement.querySelector('p-spinner')).toBeNull();
  });

  it('encodes non-default appearance on the button', () => {
    @Component({
      standalone: true,
      imports: [PSwitch],
      template: `<button pSwitch alignLabel="start" [hideLabel]="true" [stretch]="true" [compact]="true">Some label</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('p-switch')).toBe(true);
    expect(button.getAttribute('data-p-align-label')).toBe('start');
    expect(button.getAttribute('data-p-hide-label')).toBe('true');
    expect(button.getAttribute('data-p-stretch')).toBe('true');
    expect(button.getAttribute('data-p-compact')).toBe('true');
  });
});
