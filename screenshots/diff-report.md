# React vs upstream pixel mismatch

Per variant, pixelmatch threshold 0.15. Size differences count as mismatch (the smaller capture is padded white, which inflates dark-theme numbers). Strips for >0.5% are in `diff/` (React | upstream | diff).

| Theme | Component | Variant | Mismatch |
| --- | --- | --- | --- |
| light | p-sheet | open | 100.0% |
| light | p-carousel | default | 98.7% |
| dark | p-carousel | default | 98.7% |
| light | p-toast-item | success | 98.2% |
| light | p-toast-item | info | 98.1% |
| dark | p-toast-item | success | 98.0% |
| dark | p-toast-item | info | 96.6% |
| light | p-modal | open | 75.1% |
| dark | p-multi-select | default | 65.0% |
| dark | p-select | default | 63.0% |
| dark | p-select | optgroup | 62.8% |
| dark | p-textarea | default | 52.4% |
| dark | p-textarea | disabled | 52.4% |
| dark | p-segmented-control | label + compact | 50.6% |
| dark | p-textarea | counter | 47.9% |
| dark | p-textarea | error | 47.0% |
| dark | p-accordion | closed | 46.9% |
| dark | p-multi-select | disabled | 37.8% |
| dark | p-select | disabled | 36.2% |
| dark | p-multi-select | error | 34.0% |
| dark | p-select | error | 32.5% |
| dark | p-inline-notification | warning | 32.4% |
| dark | p-inline-notification | success | 31.9% |
| light | p-flyout | end | 31.8% |
| light | p-flyout | start | 31.6% |
| dark | p-inline-notification | info | 31.5% |
| dark | p-inline-notification | error | 31.5% |
| dark | p-tag | secondary | 31.5% |
| dark | p-segmented-control | default | 31.3% |
| dark | p-segmented-control | disabled | 28.6% |
| dark | p-tabs | default | 27.9% |
| dark | p-tag | error | 25.9% |
| dark | p-tag | success | 25.9% |
| dark | p-tag | warning | 25.6% |
| dark | p-tag | info | 25.4% |
| dark | p-tag | primary | 22.1% |
| dark | p-tag | icon | 21.8% |
| dark | p-accordion | open | 21.6% |
| dark | p-text-list | nested | 17.6% |
| dark | p-tabs-bar | size lg | 16.2% |
| light | p-link-tile-product | price original | 15.7% |
| light | p-link-tile-product | liked | 15.7% |
| light | p-link-tile-product | default | 15.6% |
| dark | p-tabs-bar | default | 14.8% |
| dark | p-segmented-control | icons | 14.2% |
| dark | p-accordion | compact | 13.6% |
| dark | p-tabs-bar | compact | 13.5% |
| dark | p-radio-group | row | 13.1% |
| dark | p-tag | compact | 12.3% |
| dark | p-scroller | default | 11.4% |
| dark | p-table | compact | 11.3% |
| dark | p-link-tile-product | price original | 11.1% |
| dark | p-link-tile-product | liked | 11.1% |
| dark | p-link-tile-product | default | 11.0% |
| dark | p-table | default | 10.9% |
| light | p-tag | icon | 10.8% |
| light | p-tag | secondary | 9.9% |
| light | p-tag | primary | 9.6% |
| light | p-tag | success | 9.3% |
| light | p-tag | warning | 9.3% |
| light | p-tag | error | 9.2% |
| light | p-tag | info | 9.2% |
| dark | p-tag-dismissible | label | 8.3% |
| light | p-radio-group | row | 6.5% |
| dark | p-radio-group | disabled | 6.4% |
| dark | p-radio-group | default | 6.3% |
| light | p-tag | compact | 6.2% |
| dark | p-radio-group | error | 6.2% |
| dark | p-pagination | page 2 of 5 | 5.6% |
| dark | p-pagination | page 10 of 50 | 5.3% |
| light | p-segmented-control | default | 4.5% |
| light | p-table | compact | 4.1% |
| light | p-table | default | 3.9% |
| light | p-select | error | 3.8% |
| light | p-multi-select | error | 3.8% |
| light | p-segmented-control | label + compact | 3.5% |
| light | p-radio-group | default | 3.2% |
| light | p-tabs-bar | compact | 3.1% |
| light | p-segmented-control | icons | 3.1% |
| light | p-radio-group | error | 2.9% |
| light | p-accordion | compact | 2.8% |
| light | p-multi-select | default | 2.6% |
| light | p-button-tile | default | 2.6% |
| light | p-link-tile | default | 2.6% |
| dark | p-button-tile | default | 2.6% |
| dark | p-link-tile | default | 2.6% |
| light | p-link-tile | gradient off | 2.6% |
| dark | p-link-tile | gradient off | 2.6% |
| light | p-select | optgroup | 2.5% |
| light | p-select | default | 2.5% |
| light | p-scroller | default | 2.4% |
| light | p-accordion | open | 2.3% |
| light | p-radio-group | disabled | 2.3% |
| dark | p-flag | gb size lg | 2.3% |
| light | p-segmented-control | disabled | 2.2% |
| light | p-flag | gb size lg | 2.2% |
| light | p-button-tile | align top | 2.1% |
| dark | p-button-tile | align top | 2.1% |
| light | p-tabs | default | 1.8% |
| dark | p-tag-dismissible | compact | 1.7% |
| dark | p-inline-notification | action + no dismiss | 1.5% |
| light | p-textarea | error | 1.5% |
| light | p-tag-dismissible | compact | 1.4% |
| light | p-tag-dismissible | label | 1.3% |
| light | p-pagination | page 10 of 50 | 1.3% |
| light | p-textarea | counter | 1.2% |
| light | p-button-tile | disabled | 1.1% |
| light | p-pagination | page 2 of 5 | 1.1% |
| dark | p-button-tile | disabled | 1.1% |
| dark | p-tag-dismissible | default | 1.1% |
| light | p-textarea | default | 1.1% |
| light | p-flag | jp | 1.0% |
| light | p-button-tile | compact | 1.0% |
| light | p-link-tile | compact | 1.0% |
| dark | p-button-tile | compact | 1.0% |
| dark | p-link-tile | compact | 1.0% |
| light | p-accordion | closed | 1.0% |
| dark | p-flag | jp | 0.9% |
| light | p-tag-dismissible | default | 0.9% |
| light | p-text-list | nested | 0.8% |
| light | p-select | disabled | 0.7% |
| dark | p-pin-code | length 6 | 0.7% |
| light | p-pin-code | length 6 | 0.7% |
| dark | p-modal | open | 0.6% |
| dark | p-flyout | end | 0.6% |
| dark | p-canvas | default | 0.6% |
| dark | p-drilldown | open | 0.5% |
| light | p-multi-select | disabled | 0.5% |
| light | p-checkbox | loading | 0.5% |
| dark | p-pin-code | value | 0.5% |
| light | p-pin-code | value | 0.4% |
| dark | p-checkbox | loading | 0.4% |
| dark | p-modal | fullscreen | 0.4% |
| dark | p-flyout | start | 0.4% |
| light | p-modal | fullscreen | 0.3% |
| light | p-canvas | default | 0.3% |
| light | p-stepper-horizontal | warning + disabled | 0.3% |
| dark | p-stepper-horizontal | warning + disabled | 0.3% |
| light | p-spinner | small | 0.3% |
| light | p-spinner | medium | 0.3% |
| dark | p-spinner | small | 0.3% |
| dark | p-spinner | medium | 0.3% |
| light | p-spinner | large | 0.2% |
| light | p-checkbox | indeterminate | 0.2% |
| light | p-switch | loading | 0.2% |
| dark | p-checkbox | indeterminate | 0.2% |
| light | p-inline-notification | success | 0.2% |
| light | p-inline-notification | warning | 0.2% |
| dark | p-spinner | large | 0.2% |
| dark | p-switch | loading | 0.2% |
| light | p-inline-notification | info | 0.2% |
| light | p-inline-notification | error | 0.2% |
| light | p-inline-notification | action + no dismiss | 0.2% |
| light | p-drilldown | open | 0.2% |
| light | p-button | loading | 0.2% |
| dark | p-button | loading | 0.2% |
| dark | p-input-email | loading | 0.1% |
| dark | p-input-password | loading | 0.1% |
| dark | p-input-url | loading | 0.1% |
| light | p-input-text | loading | 0.1% |
| light | p-input-email | loading | 0.1% |
| light | p-input-password | loading | 0.1% |
| light | p-input-search | loading | 0.1% |
| light | p-input-url | loading | 0.1% |
| light | p-input-tel | loading | 0.1% |
| light | p-input-number | loading | 0.1% |
| light | p-input-date | loading | 0.1% |
| light | p-input-month | loading | 0.1% |
| light | p-input-time | loading | 0.1% |
| light | p-input-week | loading | 0.1% |
| dark | p-input-text | loading | 0.1% |
| dark | p-input-search | loading | 0.1% |
| dark | p-input-tel | loading | 0.1% |
| dark | p-input-number | loading | 0.1% |
| dark | p-input-date | loading | 0.1% |
| dark | p-input-month | loading | 0.1% |
| dark | p-input-week | loading | 0.1% |
| light | p-button-pure | loading | 0.1% |
| dark | p-button-pure | loading | 0.1% |
| dark | p-input-time | loading | 0.1% |
| light | p-stepper-horizontal | default | 0.1% |
| dark | p-stepper-horizontal | default | 0.1% |
| light | p-pin-code | loading | 0.0% |
| dark | p-pin-code | loading | 0.0% |
| light | p-input-search | description + placeholder | 0.0% |
| light | p-fieldset | required + error | 0.0% |
| dark | p-input-search | description + placeholder | 0.0% |
| dark | p-fieldset | required + error | 0.0% |
| light | p-textarea | disabled | 0.0% |
| light | p-button | primary | 0.0% |
| light | p-button | secondary | 0.0% |
| light | p-button | destructive | 0.0% |
| light | p-button | icon | 0.0% |
| light | p-button | compact | 0.0% |
| light | p-button | hide-label | 0.0% |
| light | p-button | disabled | 0.0% |
| light | p-button-pure | default | 0.0% |
| light | p-button-pure | icon wrench | 0.0% |
| light | p-button-pure | size lg | 0.0% |
| light | p-button-pure | underline | 0.0% |
| light | p-button-pure | active | 0.0% |
| light | p-button-pure | align-label start | 0.0% |
| light | p-button-pure | disabled | 0.0% |
| light | p-link | primary | 0.0% |
| light | p-link | secondary | 0.0% |
| light | p-link | icon | 0.0% |
| light | p-link | compact | 0.0% |
| light | p-link | hide-label | 0.0% |
| light | p-link | no href (plain text) | 0.0% |
| light | p-link-pure | default | 0.0% |
| light | p-link-pure | icon external | 0.0% |
| light | p-link-pure | size lg | 0.0% |
| light | p-link-pure | underline | 0.0% |
| light | p-link-pure | active | 0.0% |
| light | p-heading | size 2xl | 0.0% |
| light | p-heading | size lg | 0.0% |
| light | p-heading | weight bold | 0.0% |
| light | p-heading | align center | 0.0% |
| light | p-heading | color contrast-medium | 0.0% |
| light | p-text | default | 0.0% |
| light | p-text | size lg | 0.0% |
| light | p-text | weight semibold | 0.0% |
| light | p-text | color contrast-medium | 0.0% |
| light | p-text | ellipsis | 0.0% |
| light | p-display | size md | 0.0% |
| light | p-display | size sm | 0.0% |
| light | p-display | align center | 0.0% |
| light | p-text-list | unordered | 0.0% |
| light | p-text-list | numbered | 0.0% |
| light | p-icon | car | 0.0% |
| light | p-icon | wrench (manifest) | 0.0% |
| light | p-icon | heart size lg | 0.0% |
| light | p-icon | color error | 0.0% |
| light | p-icon | color success | 0.0% |
| light | p-divider | default | 0.0% |
| light | p-divider | contrast-high | 0.0% |
| light | p-crest | default | 0.0% |
| light | p-crest | link | 0.0% |
| light | p-wordmark | small | 0.0% |
| light | p-wordmark | inherit | 0.0% |
| light | p-flag | de | 0.0% |
| light | p-model-signature | 911 | 0.0% |
| light | p-model-signature | taycan | 0.0% |
| light | p-model-signature | cayenne contrast-high | 0.0% |
| light | p-ai-tag | default | 0.0% |
| light | p-ai-tag | locale de | 0.0% |
| light | p-ai-tag | locale ja | 0.0% |
| light | p-checkbox | unchecked | 0.0% |
| light | p-checkbox | checked | 0.0% |
| light | p-checkbox | compact | 0.0% |
| light | p-checkbox | error | 0.0% |
| light | p-checkbox | disabled | 0.0% |
| light | p-switch | off | 0.0% |
| light | p-switch | on | 0.0% |
| light | p-switch | compact | 0.0% |
| light | p-switch | align-label start | 0.0% |
| light | p-switch | disabled | 0.0% |
| light | p-input-text | default | 0.0% |
| light | p-input-text | description + placeholder | 0.0% |
| light | p-input-text | compact | 0.0% |
| light | p-input-text | error | 0.0% |
| light | p-input-text | success | 0.0% |
| light | p-input-text | disabled | 0.0% |
| light | p-input-text | hide-label | 0.0% |
| light | p-input-email | default | 0.0% |
| light | p-input-email | description + placeholder | 0.0% |
| light | p-input-email | compact | 0.0% |
| light | p-input-email | error | 0.0% |
| light | p-input-email | success | 0.0% |
| light | p-input-email | disabled | 0.0% |
| light | p-input-email | hide-label | 0.0% |
| light | p-input-password | default | 0.0% |
| light | p-input-password | description + placeholder | 0.0% |
| light | p-input-password | compact | 0.0% |
| light | p-input-password | error | 0.0% |
| light | p-input-password | success | 0.0% |
| light | p-input-password | disabled | 0.0% |
| light | p-input-password | hide-label | 0.0% |
| light | p-input-search | default | 0.0% |
| light | p-input-search | compact | 0.0% |
| light | p-input-search | error | 0.0% |
| light | p-input-search | success | 0.0% |
| light | p-input-search | disabled | 0.0% |
| light | p-input-search | hide-label | 0.0% |
| light | p-input-url | default | 0.0% |
| light | p-input-url | description + placeholder | 0.0% |
| light | p-input-url | compact | 0.0% |
| light | p-input-url | error | 0.0% |
| light | p-input-url | success | 0.0% |
| light | p-input-url | disabled | 0.0% |
| light | p-input-url | hide-label | 0.0% |
| light | p-input-tel | default | 0.0% |
| light | p-input-tel | description + placeholder | 0.0% |
| light | p-input-tel | compact | 0.0% |
| light | p-input-tel | error | 0.0% |
| light | p-input-tel | success | 0.0% |
| light | p-input-tel | disabled | 0.0% |
| light | p-input-tel | hide-label | 0.0% |
| light | p-input-number | default | 0.0% |
| light | p-input-number | description + placeholder | 0.0% |
| light | p-input-number | compact | 0.0% |
| light | p-input-number | error | 0.0% |
| light | p-input-number | success | 0.0% |
| light | p-input-number | disabled | 0.0% |
| light | p-input-number | hide-label | 0.0% |
| light | p-input-date | default | 0.0% |
| light | p-input-date | description + placeholder | 0.0% |
| light | p-input-date | compact | 0.0% |
| light | p-input-date | error | 0.0% |
| light | p-input-date | success | 0.0% |
| light | p-input-date | disabled | 0.0% |
| light | p-input-date | hide-label | 0.0% |
| light | p-input-month | default | 0.0% |
| light | p-input-month | description + placeholder | 0.0% |
| light | p-input-month | compact | 0.0% |
| light | p-input-month | error | 0.0% |
| light | p-input-month | success | 0.0% |
| light | p-input-month | disabled | 0.0% |
| light | p-input-month | hide-label | 0.0% |
| light | p-input-time | default | 0.0% |
| light | p-input-time | description + placeholder | 0.0% |
| light | p-input-time | compact | 0.0% |
| light | p-input-time | error | 0.0% |
| light | p-input-time | success | 0.0% |
| light | p-input-time | disabled | 0.0% |
| light | p-input-time | hide-label | 0.0% |
| light | p-input-week | default | 0.0% |
| light | p-input-week | description + placeholder | 0.0% |
| light | p-input-week | compact | 0.0% |
| light | p-input-week | error | 0.0% |
| light | p-input-week | success | 0.0% |
| light | p-input-week | disabled | 0.0% |
| light | p-input-week | hide-label | 0.0% |
| light | p-pin-code | default | 0.0% |
| light | p-pin-code | error | 0.0% |
| light | p-pin-code | disabled | 0.0% |
| light | p-fieldset | default | 0.0% |
| light | p-tabs-bar | default | 0.0% |
| light | p-tabs-bar | size lg | 0.0% |
| light | p-popover | closed | 0.0% |
| light | p-banner | info | 0.0% |
| light | p-banner | error | 0.0% |
| dark | p-button | primary | 0.0% |
| dark | p-button | secondary | 0.0% |
| dark | p-button | destructive | 0.0% |
| dark | p-button | icon | 0.0% |
| dark | p-button | compact | 0.0% |
| dark | p-button | hide-label | 0.0% |
| dark | p-button | disabled | 0.0% |
| dark | p-button-pure | default | 0.0% |
| dark | p-button-pure | icon wrench | 0.0% |
| dark | p-button-pure | size lg | 0.0% |
| dark | p-button-pure | underline | 0.0% |
| dark | p-button-pure | active | 0.0% |
| dark | p-button-pure | align-label start | 0.0% |
| dark | p-button-pure | disabled | 0.0% |
| dark | p-link | primary | 0.0% |
| dark | p-link | secondary | 0.0% |
| dark | p-link | icon | 0.0% |
| dark | p-link | compact | 0.0% |
| dark | p-link | hide-label | 0.0% |
| dark | p-link | no href (plain text) | 0.0% |
| dark | p-link-pure | default | 0.0% |
| dark | p-link-pure | icon external | 0.0% |
| dark | p-link-pure | size lg | 0.0% |
| dark | p-link-pure | underline | 0.0% |
| dark | p-link-pure | active | 0.0% |
| dark | p-heading | size 2xl | 0.0% |
| dark | p-heading | size lg | 0.0% |
| dark | p-heading | weight bold | 0.0% |
| dark | p-heading | align center | 0.0% |
| dark | p-heading | color contrast-medium | 0.0% |
| dark | p-text | default | 0.0% |
| dark | p-text | size lg | 0.0% |
| dark | p-text | weight semibold | 0.0% |
| dark | p-text | color contrast-medium | 0.0% |
| dark | p-text | ellipsis | 0.0% |
| dark | p-display | size md | 0.0% |
| dark | p-display | size sm | 0.0% |
| dark | p-display | align center | 0.0% |
| dark | p-text-list | unordered | 0.0% |
| dark | p-text-list | numbered | 0.0% |
| dark | p-icon | car | 0.0% |
| dark | p-icon | wrench (manifest) | 0.0% |
| dark | p-icon | heart size lg | 0.0% |
| dark | p-icon | color error | 0.0% |
| dark | p-icon | color success | 0.0% |
| dark | p-divider | default | 0.0% |
| dark | p-divider | contrast-high | 0.0% |
| dark | p-crest | default | 0.0% |
| dark | p-crest | link | 0.0% |
| dark | p-wordmark | small | 0.0% |
| dark | p-wordmark | inherit | 0.0% |
| dark | p-flag | de | 0.0% |
| dark | p-model-signature | 911 | 0.0% |
| dark | p-model-signature | taycan | 0.0% |
| dark | p-model-signature | cayenne contrast-high | 0.0% |
| dark | p-ai-tag | default | 0.0% |
| dark | p-ai-tag | locale de | 0.0% |
| dark | p-ai-tag | locale ja | 0.0% |
| dark | p-checkbox | unchecked | 0.0% |
| dark | p-checkbox | checked | 0.0% |
| dark | p-checkbox | compact | 0.0% |
| dark | p-checkbox | error | 0.0% |
| dark | p-checkbox | disabled | 0.0% |
| dark | p-switch | off | 0.0% |
| dark | p-switch | on | 0.0% |
| dark | p-switch | compact | 0.0% |
| dark | p-switch | align-label start | 0.0% |
| dark | p-switch | disabled | 0.0% |
| dark | p-input-text | default | 0.0% |
| dark | p-input-text | description + placeholder | 0.0% |
| dark | p-input-text | compact | 0.0% |
| dark | p-input-text | error | 0.0% |
| dark | p-input-text | success | 0.0% |
| dark | p-input-text | disabled | 0.0% |
| dark | p-input-text | hide-label | 0.0% |
| dark | p-input-email | default | 0.0% |
| dark | p-input-email | description + placeholder | 0.0% |
| dark | p-input-email | compact | 0.0% |
| dark | p-input-email | error | 0.0% |
| dark | p-input-email | success | 0.0% |
| dark | p-input-email | disabled | 0.0% |
| dark | p-input-email | hide-label | 0.0% |
| dark | p-input-password | default | 0.0% |
| dark | p-input-password | description + placeholder | 0.0% |
| dark | p-input-password | compact | 0.0% |
| dark | p-input-password | error | 0.0% |
| dark | p-input-password | success | 0.0% |
| dark | p-input-password | disabled | 0.0% |
| dark | p-input-password | hide-label | 0.0% |
| dark | p-input-search | default | 0.0% |
| dark | p-input-search | compact | 0.0% |
| dark | p-input-search | error | 0.0% |
| dark | p-input-search | success | 0.0% |
| dark | p-input-search | disabled | 0.0% |
| dark | p-input-search | hide-label | 0.0% |
| dark | p-input-url | default | 0.0% |
| dark | p-input-url | description + placeholder | 0.0% |
| dark | p-input-url | compact | 0.0% |
| dark | p-input-url | error | 0.0% |
| dark | p-input-url | success | 0.0% |
| dark | p-input-url | disabled | 0.0% |
| dark | p-input-url | hide-label | 0.0% |
| dark | p-input-tel | default | 0.0% |
| dark | p-input-tel | description + placeholder | 0.0% |
| dark | p-input-tel | compact | 0.0% |
| dark | p-input-tel | error | 0.0% |
| dark | p-input-tel | success | 0.0% |
| dark | p-input-tel | disabled | 0.0% |
| dark | p-input-tel | hide-label | 0.0% |
| dark | p-input-number | default | 0.0% |
| dark | p-input-number | description + placeholder | 0.0% |
| dark | p-input-number | compact | 0.0% |
| dark | p-input-number | error | 0.0% |
| dark | p-input-number | success | 0.0% |
| dark | p-input-number | disabled | 0.0% |
| dark | p-input-number | hide-label | 0.0% |
| dark | p-input-date | default | 0.0% |
| dark | p-input-date | description + placeholder | 0.0% |
| dark | p-input-date | compact | 0.0% |
| dark | p-input-date | error | 0.0% |
| dark | p-input-date | success | 0.0% |
| dark | p-input-date | disabled | 0.0% |
| dark | p-input-date | hide-label | 0.0% |
| dark | p-input-month | default | 0.0% |
| dark | p-input-month | description + placeholder | 0.0% |
| dark | p-input-month | compact | 0.0% |
| dark | p-input-month | error | 0.0% |
| dark | p-input-month | success | 0.0% |
| dark | p-input-month | disabled | 0.0% |
| dark | p-input-month | hide-label | 0.0% |
| dark | p-input-time | default | 0.0% |
| dark | p-input-time | description + placeholder | 0.0% |
| dark | p-input-time | compact | 0.0% |
| dark | p-input-time | error | 0.0% |
| dark | p-input-time | success | 0.0% |
| dark | p-input-time | disabled | 0.0% |
| dark | p-input-time | hide-label | 0.0% |
| dark | p-input-week | default | 0.0% |
| dark | p-input-week | description + placeholder | 0.0% |
| dark | p-input-week | compact | 0.0% |
| dark | p-input-week | error | 0.0% |
| dark | p-input-week | success | 0.0% |
| dark | p-input-week | disabled | 0.0% |
| dark | p-input-week | hide-label | 0.0% |
| dark | p-pin-code | default | 0.0% |
| dark | p-pin-code | error | 0.0% |
| dark | p-pin-code | disabled | 0.0% |
| dark | p-fieldset | default | 0.0% |
| dark | p-popover | closed | 0.0% |
| dark | p-sheet | open | 0.0% |
| dark | p-banner | info | 0.0% |
| dark | p-banner | error | 0.0% |
