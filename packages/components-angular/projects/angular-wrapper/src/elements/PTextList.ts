import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import { type TextListType, textListAppearance } from './core/text-list/text-list.appearance';

@Component({
  selector: 'ul[pTextList], ol[pTextList]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-text-list]': 'true',
  },
})
export class PTextList implements OnInit, OnChanges {
  @Input() type?: TextListType;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, textListAppearance({ type: this.type }), this.applied);
  }
}
