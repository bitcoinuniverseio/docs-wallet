// Emergency page offline behavior: save/refresh/remove the emergency bundle
// through the service worker, and report cached-state honestly.
import { autoMount } from './mount';

const BUNDLE_NAME = 'universe-emergency-bundle';
const EMERGENCY_ROUTES = [
  'emergency/',
  'safety/compromised-wallet/',
  'safety/phishing/',
  'safety/security-model/',
  'concepts/backup-and-recovery/',
  'tasks/review-a-transaction/',
  'start/versions/',
  'help/support/',
  'llms.txt',
];

function mount(el: HTMLElement) {
  const status = el.querySelector('[data-offline-status]');
  const save = el.querySelector<HTMLButtonElement>('[data-save-offline]');
  const refresh = el.querySelector<HTMLButtonElement>('[data-refresh-offline]');
  const clear = el.querySelector<HTMLButtonElement>('[data-clear-offline]');
  if (!status || !save) return;

  const base = document.documentElement.dataset.base ?? new URL('.', location.href).pathname;

  const report = async () => {
    if (!('serviceWorker' in navigator) || !window.caches) {
      status.textContent = 'This browser cannot cache pages here. The emergency pages still work online.';
      save.hidden = true;
      return;
    }
    try {
      const cache = await caches.open(BUNDLE_NAME);
      const keys = await cache.keys();
      if (keys.length === 0) {
        status.textContent = 'The emergency bundle is not saved yet. Saving keeps these pages readable with no network.';
        save.textContent = 'Save emergency guide offline';
        refresh.hidden = true;
        clear.hidden = true;
      } else {
        const cachedAt = await cache.match(`${base}emergency/`);
        const dateHeader = cachedAt?.headers.get('date') ?? null;
        status.textContent = `Emergency bundle saved: ${keys.length} pages cached${dateHeader ? `, snapshot cached ${new Date(dateHeader).toLocaleString()}` : ''}. Open this page with no network to read it.`;
        refresh.hidden = false;
        clear.hidden = false;
        save.hidden = true;
      }
    } catch {
      status.textContent = 'Cache state could not be read. The pages still work online.';
    }
  };

  const saveBundle = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.active?.postMessage({ type: 'universe-save-emergency', routes: EMERGENCY_ROUTES.map((route) => `${base}${route}`) });
      // Give the worker a moment to populate, then report.
      setTimeout(() => void report(), 2500);
    } catch {
      if (status) status.textContent = 'Saving failed. The pages still work online.';
    }
  };

  save.addEventListener('click', () => void saveBundle());
  refresh?.addEventListener('click', async () => {
    if (window.caches) await caches.delete(BUNDLE_NAME);
    await saveBundle();
  });
  clear?.addEventListener('click', async () => {
    if (window.caches) await caches.delete(BUNDLE_NAME);
    await report();
  });

  void report();
}

autoMount('[data-offline-status]', mount);
