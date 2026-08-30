import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PTextList } from '../../../../projects/angular-wrapper/src/elements/PTextList';
import { PTextListItem } from '../../../../projects/angular-wrapper/src/elements/PTextListItem';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PTextList', () => {
  it('returns a ul with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PTextList, PTextListItem],
      template: `<ul pTextList><li pTextListItem>Item</li></ul>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const list = host.firstElementChild as HTMLUListElement;

    expect(host.childElementCount).toBe(1);
    expect(list.tagName).toBe('UL');
    expect(host.querySelector('p-text-list')).toBeNull();
    expect(list.classList.contains('p-text-list')).toBe(true);
    expect(list.querySelector('li')?.classList.contains('p-text-list-item')).toBe(true);
  });

  it('encodes numbered type on ol', () => {
    @Component({
      standalone: true,
      imports: [PTextList],
      template: `<ol pTextList type="numbered"></ol>`,
    })
    class Host {}

    const fixture = render(Host);
    const list = fixture.nativeElement.querySelector('ol') as HTMLOListElement;

    expect(list.getAttribute('data-p-type')).toBe('numbered');
  });
});

describe('PTextListItem', () => {
  it('returns an li with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PTextListItem],
      template: `<li pTextListItem>Item</li>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const item = host.firstElementChild as HTMLLIElement;

    expect(item.tagName).toBe('LI');
    expect(host.querySelector('p-text-list-item')).toBeNull();
    expect(item.classList.contains('p-text-list-item')).toBe(true);
  });
});
