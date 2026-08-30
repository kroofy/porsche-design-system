import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PSheet } from '../../../../projects/angular-wrapper/src/elements/PSheet';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PSheet', () => {
  it('returns a dialog with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PSheet],
      template: `<dialog pSheet>
        <header class="p-sheet__header">Some Heading</header>
        <div>Some Content</div>
      </dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const dialog = host.firstElementChild as HTMLDialogElement;

    expect(host.childElementCount).toBe(1);
    expect(dialog.tagName).toBe('DIALOG');
    expect(host.querySelector('p-sheet')).toBeNull();
    expect(dialog.classList.contains('p-sheet')).toBe(true);
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('.p-sheet__panel')).not.toBeNull();
    expect(dialog.querySelector('.p-sheet__dismiss')).not.toBeNull();
    expect(dialog.parentElement).toBe(host);
  });

  it('omits the dismiss button when dismissButton is false', () => {
    @Component({
      standalone: true,
      imports: [PSheet],
      template: `<dialog pSheet [dismissButton]="false">Some Content</dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    expect(fixture.nativeElement.querySelector('.p-sheet__dismiss')).toBeNull();
  });

  it('encodes appearance on the dialog', () => {
    @Component({
      standalone: true,
      imports: [PSheet],
      template: `<dialog pSheet background="surface"></dialog>`,
    })
    class Host {}

    const fixture = render(Host);
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.getAttribute('data-p-background')).toBe('surface');
  });
});
