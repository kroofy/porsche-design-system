import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import { TAG_ICON_CLASS, type TagVariant, tagAppearance } from './core/tag/tag.appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'span[pTag], a[pTag], button[pTag]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (hasIcon) {
      <img
        pIcon
        [name]="icon === 'none' ? undefined : icon"
        [source]="iconSource"
        size="xs"
        color="inherit"
        [class]="iconClass"
        aria-hidden="true"
      />
    }
    <ng-content />
  `,
  host: {
    '[class.p-tag]': 'true',
  },
})
export class PTag implements OnInit, OnChanges {
  @Input() variant?: TagVariant;
  @Input({ transform: booleanAttribute }) compact = false;
  @Input() icon = 'none';
  @Input() iconSource?: string;

  readonly iconClass = TAG_ICON_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get hasIcon(): boolean {
    return this.icon !== 'none' || !!this.iconSource;
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, tagAppearance({ variant: this.variant, compact: this.compact }), this.applied);
  }
}
