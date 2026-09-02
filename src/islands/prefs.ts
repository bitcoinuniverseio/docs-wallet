// Local documentation preferences. Everything stays in this browser; nothing
// transmits. Keys are namespaced so a docs reader's site data stays coherent.
export type ReleasePrefs = {
  releaseId: string | null;
  audience: string | null;
};

const KEY = 'universe-docs-prefs-v1';

export function readPrefs(): ReleasePrefs {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { releaseId: null, audience: null };
    const parsed = JSON.parse(raw);
    return {
      releaseId: typeof parsed.releaseId === 'string' ? parsed.releaseId : null,
      audience: typeof parsed.audience === 'string' ? parsed.audience : null,
    };
  } catch {
    return { releaseId: null, audience: null };
  }
}

export function writePrefs(patch: Partial<ReleasePrefs>): ReleasePrefs {
  const next = { ...readPrefs(), ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, disabled): preferences stay for this
    // page view only, and every control still works.
  }
  document.dispatchEvent(new CustomEvent('universe-docs-prefs-changed'));
  return next;
}

export function clearPrefs(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
  document.dispatchEvent(new CustomEvent('universe-docs-prefs-changed'));
}

/** Theme handling for light / dark / OLED, mirroring Starlight's own keys. */
export function applyTheme(theme: 'light' | 'dark' | 'oled'): void {
  try {
    window.localStorage.setItem('starlight-theme', theme);
  } catch {
    // session only
  }
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    // 'dark' and 'oled' both live on the dark base; oled overrides tokens.
    root.removeAttribute('data-theme');
    if (theme === 'oled') root.setAttribute('data-theme', 'oled');
  }
}

export function readTheme(): 'light' | 'dark' | 'oled' {
  try {
    const stored = window.localStorage.getItem('starlight-theme');
    if (stored === 'light' || stored === 'dark' || stored === 'oled') return stored;
    const root = document.documentElement;
    if (root.getAttribute('data-theme') === 'oled') return 'oled';
    if (root.hasAttribute('data-theme')) return 'light';
  } catch {
    // fall through
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
