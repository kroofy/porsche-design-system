import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import {
  LINK_PURE_ICON_CLASS,
  LINK_PURE_LABEL_CLASS,
  type LinkPureAlignLabel,
  type LinkPureColor,
  type LinkPureSize,
  linkPureAppearance,
} from './core/link-pure/link-pure.appearance';
import { syncAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'a[pLinkPure]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (icon !== 'none' || iconSource) {
      <img
        pIcon
        [name]="icon === 'none' ? 'arrow-right' : icon"
        [source]="iconSource"
        size="inherit"
        color="inherit"
        [class]="iconClass"
        aria-hidden="true"
      />
    }
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-link-pure]': 'true',
  },
})
export class PLinkPure implements OnInit, OnChanges {
  @Input() size?: Responsive<LinkPureSize>;
  @Input() color?: LinkPureColor;
  @Input() icon = 'arrow-right';
  @Input() iconSource?: string;
  @Input() hideLabel?: Responsive<boolean>;
  @Input() alignLabel?: Responsive<LinkPureAlignLabel>;
  @Input() stretch?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) underline = false;
  @Input({ transform: booleanAttribute }) active = false;

  readonly iconClass = LINK_PURE_ICON_CLASS;
  readonly labelClass = LINK_PURE_LABEL_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      linkPureAppearance({
        size: this.size,
        color: this.color,
        icon: this.icon,
        hideLabel: this.hideLabel,
        alignLabel: this.alignLabel,
        stretch: this.stretch,
        underline: this.underline,
        active: this.active,
      }),
      this.applied
    );
  }
}
