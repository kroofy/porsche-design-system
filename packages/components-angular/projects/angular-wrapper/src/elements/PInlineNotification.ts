import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  INLINE_NOTIFICATION_ACTION_CLASS,
  INLINE_NOTIFICATION_DISMISS_CLASS,
  INLINE_NOTIFICATION_DISMISS_LABEL,
  type InlineNotificationHeadingTag,
  type InlineNotificationState,
  inlineNotificationAppearance,
  inlineNotificationLive,
} from './core/inline-notification/inline-notification.appearance';
import { PButtonPure } from './PButtonPure';

@Component({
  selector: 'aside[pInlineNotification]',
  standalone: true,
  imports: [PButtonPure],
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
    @if (actionLabel) {
      <button
        pButtonPure
        type="button"
        [class]="actionClass"
        [icon]="actionIcon"
        [loading]="actionLoading"
      >
        {{ actionLabel }}
      </button>
    }
    @if (dismissButton) {
      <button
        type="button"
        [class]="dismissClass"
        [attr.aria-label]="dismissLabel"
        [attr.aria-description]="heading || null"
      >
        <span>{{ dismissLabel }}</span>
      </button>
    }
  `,
  host: {
    '[class.p-inline-notification]': 'true',
    '[attr.role]': 'live.role',
    '[attr.aria-live]': "live['aria-live']",
    '[attr.aria-label]': 'heading || null',
  },
})
export class PInlineNotification implements OnInit, OnChanges {
  @Input() state?: InlineNotificationState;
  @Input() heading?: string;
  @Input() headingTag: InlineNotificationHeadingTag = 'h5';
  @Input() description?: string;
  @Input({ transform: booleanAttribute }) dismissButton = true;
  @Input() actionLabel?: string;
  @Input({ transform: booleanAttribute }) actionLoading = false;
  @Input() actionIcon = 'arrow-right';

  readonly actionClass = INLINE_NOTIFICATION_ACTION_CLASS;
  readonly dismissClass = INLINE_NOTIFICATION_DISMISS_CLASS;
  readonly dismissLabel = INLINE_NOTIFICATION_DISMISS_LABEL;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get live(): ReturnType<typeof inlineNotificationLive> {
    return inlineNotificationLive(this.state);
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, inlineNotificationAppearance({ state: this.state }), this.applied);
  }
}
