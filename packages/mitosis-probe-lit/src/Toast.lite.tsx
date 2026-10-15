import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-toast' });

export default function LitToast() {
  const state = useStore({
    get cssText(): string {
      return (
        ':host{--_p-toast-a:var(--p-toast-position-bottom,56px) !important;' +
        'position:fixed !important;' +
        'inset:auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;' +
        'z-index:999999 !important}' +
        ':host([hidden]){display:none !important}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        '@keyframes in{from{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}to{transform:translate3d(0,0,0)}}' +
        '@keyframes out{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}}' +
        '@media(min-width:760px){:host{--_p-toast-a:var(--p-toast-position-bottom,64px) !important;' +
        'inset:auto auto var(--_p-toast-a) 64px !important;' +
        'max-width:min(42rem, calc(100vw - 64px * 2)) !important}}' +
        '.hydrated{animation:var(--p-animation-duration,.4s) in cubic-bezier(0,0,.2,1) forwards}' +
        '.close{animation:.4s out cubic-bezier(.4,0,.5,1) forwards !important}'
      );
    },
  });

  useStyle(`
    :host {
      position: fixed;
    }
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div class="root">
      <style innerHTML={state.cssText} />
      <slot />
    </div>
  );
}
