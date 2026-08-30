import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  TAG_DISMISSIBLE_CLOSE_ICON,
  TAG_DISMISSIBLE_CONTENT_CLASS,
  TAG_DISMISSIBLE_ICON_CLASS,
  TAG_DISMISSIBLE_LABEL_CLASS,
  TAG_DISMISSIBLE_SR_CLASS,
  TAG_DISMISSIBLE_SR_TEXT,
  tagDismissibleAppearance,
} from './core/tag-dismissible/tag-dismissible.appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'button[pTagDismissible]',
  standalone: true,
  imports: [PIcon],
  template: `
    <span [class]="srClass">{{ srText }}</span>
    <span [class]="contentClass">
      @if (label) {
        <span [class]="labelClass">{{ label }}</span>
      }
      <ng-content />
    </span>
    <span [class]="iconClass">
      <img pIcon [name]="closeIcon" aria-hidden="true" />
    </span>
  `,
  host: {
    '[class.p-tag-dismissible]': 'true',
    '[attr.type]': '"button"',
  },
})
export class PTagDismissible implements OnInit, OnChanges {
  @Input({ transform: booleanAttribute }) compact = false;
  @Input() label?: string;

  readonly srClass = TAG_DISMISSIBLE_SR_CLASS;
  readonly srText = TAG_DISMISSIBLE_SR_TEXT;
  readonly contentClass = TAG_DISMISSIBLE_CONTENT_CLASS;
  readonly labelClass = TAG_DISMISSIBLE_LABEL_CLASS;
  readonly iconClass = TAG_DISMISSIBLE_ICON_CLASS;
  readonly closeIcon = TAG_DISMISSIBLE_CLOSE_ICON;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, tagDismissibleAppearance({ compact: this.compact }), this.applied);
  }
}
