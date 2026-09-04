import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-pagination' });

export default function LitPagination(props: {
  totalItemsCount?: any;
  itemsPerPage?: any;
  activePage?: any;
  showLastPage?: any;
  intl?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const totalItems = Number(props.totalItemsCount == null || props.totalItemsCount === '' ? 1 : props.totalItemsCount);
      const perPage = Number(props.itemsPerPage == null || props.itemsPerPage === '' ? 1 : props.itemsPerPage);
      const pageTotal = Math.ceil((totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage));
      let active = Number(props.activePage == null || props.activePage === '' ? 1 : props.activePage);
      if (active < 1) active = 1;
      if (active > pageTotal) active = pageTotal;
      let showLast: any = props.showLastPage;
      if (showLast === false || showLast === 'false') {
        showLast = false;
      } else {
        showLast = true;
      }
      const vis = 'list-item';
      const hide = 'none';
      const few = pageTotal < 8;
      const many = pageTotal > 5;
      const fromEnd = pageTotal - active;
      const mStart = many && active < 4;
      const mEnd = many && fromEnd < 3;
      const mMid = many && !mStart && !mEnd;
      const forceEllipEnd = many && !showLast && fromEnd >= 2 && active > 2;
      return {
        '--p-pg-ellip': few ? hide : vis,
        '--p-pg-ellip-start': !few && active <= 4 ? hide : vis,
        '--p-pg-ellip-end-3': !few && fromEnd < 4 ? hide : vis,
        '--p-pg-ellip-end-2': !few && fromEnd < 3 ? hide : vis,
        '--p-pg-m-start': mStart ? hide : vis,
        '--p-pg-m-end': mEnd ? hide : vis,
        '--p-pg-m-mid': mMid ? hide : vis,
        '--p-pg-m-ellip-end-show': forceEllipEnd ? '1' : '',
        '--p-pg-m-cur-2': many && !showLast && fromEnd < 2 ? hide : vis,
        '--p-pg-m-cur-1': many && !showLast && fromEnd === 1 ? hide : vis,
        '--p-pg-m-cur-after': many && !showLast && fromEnd >= 2 && active > 2 ? hide : vis,
      };
    },
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    nav {
      display: flex;
      justify-content: center;
      user-select: none;
    }
    ul {
      display: flex;
      gap: var(--p-spacing-static-xs);
      margin: 0;
      padding: 0;
    }
    li {
      list-style-type: none;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      transition:
        background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
        color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      position: relative;
      padding: 0 6px;
      min-width: 2.25rem;
      height: 2.25rem;
      box-sizing: border-box;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      white-space: nowrap;
      cursor: pointer;
      background-color: transparent;
      color: var(--p-color-primary);
      border-radius: var(--p-radius-full);
      border-color: transparent;
      outline: 0;
    }
    span[aria-current] {
      cursor: default;
      pointer-events: none;
      background-color: var(--p-color-frosted-strong);
    }
    span[aria-disabled] {
      cursor: default;
      pointer-events: none;
      opacity: 0.4;
    }
    span:not(.ellipsis):focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .ellipsis {
      cursor: default;
      pointer-events: none;
    }
    .ellipsis::after {
      content: "…";
    }
    @media (min-width: 760px) {
      ul {
        gap: var(--p-spacing-static-sm);
      }
      :host([data-pg-few]) li.ellip {
        display: none;
      }
      :host([data-pg-start]) li.ellip-start {
        display: none;
      }
      :host([data-pg-end-4]) li.ellip-end:nth-last-child(3) {
        display: none;
      }
      :host([data-pg-end-3]) li.ellip-end:nth-last-child(2) {
        display: none;
      }
    }
    @media (max-width: 759px) {
      :host([data-pg-m-start]) li.ellip-start,
      :host([data-pg-m-start]) li:nth-child(6),
      :host([data-pg-m-start]) li:nth-child(7),
      :host([data-pg-m-start]) li:not(.ellip):nth-child(8) {
        display: none;
      }
      :host([data-pg-m-end]) li.ellip-end,
      :host([data-pg-m-end]) li.ellip-start + li:not(.current),
      :host([data-pg-m-end]) li.ellip-start + li:not(.current) + li:not(.current) {
        display: none;
      }
      :host([data-pg-m-mid]) li.ellip-start + li:not(.current),
      :host([data-pg-m-mid]) li.current-1,
      :host([data-pg-m-mid]) li[class~="current+1"],
      :host([data-pg-m-mid]) li[class~="current+1"] + li:not(.ellip) {
        display: none;
      }
      :host([data-pg-m-cur-2]) li.current-2 {
        display: none;
      }
      :host([data-pg-m-cur-1]) li.current-1 {
        display: none;
      }
      :host([data-pg-m-cur-after]) li[class~="current+1"],
      :host([data-pg-m-cur-after]) li[class~="current+2"] {
        display: none;
      }
      :host([data-pg-m-ellip-end-show]) li.ellip-end {
        display: initial;
      }
    }
    @media (forced-colors: active) {
      span:not(.ellipsis):focus-visible {
        outline-color: Highlight;
      }
      span[aria-disabled] {
        opacity: 1;
        color: GrayText;
      }
      span[aria-current] {
        border: 2px solid CanvasText;
      }
    }
    @media (hover: hover) {
      span:not([aria-disabled]):not(.ellipsis):hover {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
        background: var(--p-color-frosted);
      }
      @media (forced-colors: active) {
        span:not([aria-disabled]):not(.ellipsis):hover {
          outline: 2px solid CanvasText;
          outline-offset: -2px;
        }
      }
    }
  `);

  return (
    <nav>
      <ul>
        <li class="prev">
          <span>
            <p-icon name="arrow-left" color="primary" aria-hidden="true" />
          </span>
        </li>
      </ul>
    </nav>
  );
}
