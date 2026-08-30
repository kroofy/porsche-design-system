import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PFlyout } from '../../../../projects/angular-wrapper/src/elements/PFlyout';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PFlyout', () => {
  it('returns a dialog with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PFlyout],
      template: `<dialog pFlyout>
        <header class="p-flyout__header">Some Heading</header>
        <div>Some Content</div>
      </dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const dialog = host.firstElementChild as HTMLDialogElement;

    expect(host.childElementCount).toBe(1);
    expect(dialog.tagName).toBe('DIALOG');
    expect(host.querySelector('p-flyout')).toBeNull();
    expect(dialog.classList.contains('p-flyout')).toBe(true);
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('.p-flyout__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-flyout__dismiss')).not.toBeNull();
    expect(dialog.parentElement).toBe(host);
  });

  it('omits the dismiss button when dismissButton is false', () => {
    @Component({
      standalone: true,
      imports: [PFlyout],
      template: `<dialog pFlyout [dismissButton]="false">Some Content</dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    expect(fixture.nativeElement.querySelector('.p-flyout__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    @Component({
      standalone: true,
      imports: [PFlyout],
      template: `<dialog
        pFlyout
        background="surface"
        backdrop="shading"
        position="start"
        [fullscreen]="true"
        footerBehavior="fixed"
      ></dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;

    expect(dialog.getAttribute('data-p-background')).toBe('surface');
    expect(dialog.getAttribute('data-p-backdrop')).toBe('shading');
    expect(dialog.getAttribute('data-p-position')).toBe('start');
    expect(dialog.getAttribute('data-p-fullscreen')).toBe('true');
    expect(dialog.getAttribute('data-p-footer-behavior')).toBe('fixed');
  });
});
