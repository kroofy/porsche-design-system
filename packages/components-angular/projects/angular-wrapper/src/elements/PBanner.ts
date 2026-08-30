import {
  booleanAttribute,
  Component,
  ElementRef,
  HostListener,
  Input,
  inject,
  type OnChanges,
  type OnInit,
} from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  BANNER_DISMISS_CLASS,
  BANNER_DISMISS_LABEL,
  type BannerHeadingTag,
  type BannerPosition,
  type BannerState,
  bannerAppearance,
  bannerLive,
} from './core/banner/banner.appearance';

@Component({
  selector: 'aside[pBanner]',
  standalone: true,
  template: `
    @if (heading) {
      @switch (headingTag) {
        @case ('h1') {
          <h1>{{ heading }}</h1>
        }
        @case ('h2') {
          <h2>{{ heading }}</h2>
        }
        @case ('h3') {
          <h3>{{ heading }}</h3>
        }
        @case ('h4') {
          <h4>{{ heading }}</h4>
        }
        @case ('h6') {
          <h6>{{ heading }}</h6>
        }
        @default {
          <h5>{{ heading }}</h5>
        }
      }
    }
    @if (description) {
      <p>{{ description }}</p>
    }
    <ng-content />
    @if (dismissButton) {
      <button
        type="button"
        [class]="dismissClass"
        [attr.aria-label]="dismissLabel"
        [attr.aria-description]="heading || null"
        (click)="onDismiss()"
      >
        <span>{{ dismissLabel }}</span>
      </button>
    }
  `,
  host: {
    '[class.p-banner]': 'true',
    '[attr.popover]': '"manual"',
    '[attr.role]': 'live.role',
    '[attr.aria-live]': 'live["aria-live"]',
    '[attr.aria-label]': 'heading || null',
  },
})
export class PBanner implements OnInit, OnChanges {
  @Input() state?: BannerState;
  @Input() position?: Responsive<BannerPosition>;
  @Input() heading?: string;
  @Input() headingTag: BannerHeadingTag = 'h5';
  @Input() description?: string;
  @Input({ transform: booleanAttribute }) dismissButton = true;

  readonly dismissClass = BANNER_DISMISS_CLASS;
  readonly dismissLabel = BANNER_DISMISS_LABEL;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get live() {
    return bannerLive(this.state);
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  onDismiss(): void {
    this.el.hidePopover();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (this.dismissButton && event.key === 'Escape' && this.el.matches(':popover-open')) {
      this.el.hidePopover();
    }
  }

  private sync(): void {
    syncAppearance(this.el, bannerAppearance({ state: this.state, position: this.position }), this.applied);
  }
}
