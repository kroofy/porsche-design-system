import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  FLYOUT_DISMISS_CLASS,
  FLYOUT_PANEL_CLASS,
  FLYOUT_SCROLLER_CLASS,
  type FlyoutBackdrop,
  type FlyoutBackground,
  type FlyoutFooterBehavior,
  type FlyoutPosition,
  flyoutAppearance,
} from './core/flyout/flyout.appearance';

@Component({
  selector: 'dialog[pFlyout]',
  standalone: true,
  template: `
    <div [class]="scrollerClass">
      <div [class]="panelClass">
        @if (dismissButton) {
          <button type="button" [class]="dismissClass" aria-label="Dismiss flyout" (click)="onDismiss()">
            <span>Dismiss flyout</span>
          </button>
        }
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '[class.p-flyout]': 'true',
    '[attr.aria-modal]': '"true"',
    '[attr.tabindex]': '-1',
  },
})
export class PFlyout implements OnInit, OnChanges {
  @Input() background?: FlyoutBackground;
  @Input() backdrop?: FlyoutBackdrop;
  @Input() position?: FlyoutPosition;
  @Input() fullscreen?: Responsive<boolean>;
  @Input() footerBehavior?: FlyoutFooterBehavior;
  @Input({ transform: booleanAttribute }) dismissButton = true;

  readonly scrollerClass = FLYOUT_SCROLLER_CLASS;
  readonly panelClass = FLYOUT_PANEL_CLASS;
  readonly dismissClass = FLYOUT_DISMISS_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLDialogElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  onDismiss(): void {
    this.el.close();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      flyoutAppearance({
        background: this.background,
        backdrop: this.backdrop,
        position: this.position,
        fullscreen: this.fullscreen,
        footerBehavior: this.footerBehavior,
      }),
      this.applied
    );
  }
}
