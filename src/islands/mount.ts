// Shared island bootstrapping: run once the DOM exists, whether the bundled
// module executes before or after DOMContentLoaded (Astro hoisted scripts are
// deferred modules, so both orders occur).
export function autoMount(selector: string, mount: (el: HTMLElement) => void): void {
  const mountAll = () => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (el.dataset.universeMounted === '1') return;
      el.dataset.universeMounted = '1';
      mount(el);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
}
