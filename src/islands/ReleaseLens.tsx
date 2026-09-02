/**
 * ReleaseLens: the persistent release and theme control for the header.
 *
 * The select shows the verified release catalog. Changing it stores a local
 * preference that conditional components honor; it never rewrites content on
 * the server. "Detect my wallet" reads only the provider's public identity
 * methods (getVersion) - never requestAccounts, addresses, or public keys -
 * and only after an explicit click. A version the catalog does not know is
 * labeled unknown, never mapped to the nearest release.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useState } from 'preact/hooks';
import { readPrefs, writePrefs, applyTheme, readTheme } from './prefs';

interface ReleaseOption {
  id: string;
  version: string;
  publicationStatus: string;
  documentationStatus: string;
}

interface Props {
  releases: ReleaseOption[];
  defaultReleaseId: string;
}

function detectUniverseProvider(): any {
  const candidates = ['universe', 'tapwallet', 'tap_wallet', 'TapWallet', 'tapWallet', 'Tap_Wallet'];
  for (const name of candidates) {
    const provider = (window as Record<string, any>)[name];
    if (provider && typeof provider.getVersion === 'function') return provider;
  }
  return null;
}

function Lens({ releases, defaultReleaseId }: Props) {
  const [releaseId, setReleaseId] = useState<string>(defaultReleaseId);
  const [theme, setTheme] = useState<'light' | 'dark' | 'oled'>('dark');
  const [detectState, setDetectState] = useState<'idle' | 'detecting' | 'found' | 'absent' | 'unknown'>('idle');
  const [detected, setDetected] = useState<string | null>(null);

  useEffect(() => {
    const prefs = readPrefs();
    if (prefs.releaseId && releases.some((release) => release.id === prefs.releaseId)) {
      setReleaseId(prefs.releaseId);
    }
    setTheme(readTheme());
  }, [releases]);

  const changeRelease = (next: string) => {
    setReleaseId(next);
    writePrefs({ releaseId: next === defaultReleaseId ? null : next });
  };

  const changeTheme = (next: 'light' | 'dark' | 'oled') => {
    setTheme(next);
    applyTheme(next);
  };

  const detect = async () => {
    setDetectState('detecting');
    const provider = detectUniverseProvider();
    if (!provider) {
      setDetectState('absent');
      setDetected(null);
      return;
    }
    try {
      const version = await provider.getVersion();
      const known = releases.some((release) => release.version === String(version));
      setDetected(String(version));
      setDetectState(known ? 'found' : 'unknown');
    } catch {
      setDetectState('absent');
      setDetected(null);
    }
  };

  const selected = releases.find((release) => release.id === releaseId);

  return (
    <div class="u-release-lens">
      <label class="u-visually-hidden" for="u-release-select">
        Documentation release
      </label>
      <select
        id="u-release-select"
        value={releaseId}
        onChange={(event) => changeRelease((event.target as HTMLSelectElement).value)}
      >
        {releases.map((release) => (
          <option value={release.id} disabled={release.documentationStatus === 'not-described'}>
            Wallet {release.version}
            {release.publicationStatus === 'published' ? '' : ' (source)'}
            {release.documentationStatus === 'not-described' ? ' - not documented' : ''}
          </option>
        ))}
      </select>
      <label class="u-visually-hidden" for="u-theme-select">
        Appearance
      </label>
      <select
        id="u-theme-select"
        value={theme}
        onChange={(event) => changeTheme((event.target as HTMLSelectElement).value as any)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="oled">OLED black</option>
      </select>
      <button type="button" class="u-button" onClick={detect}>
        {detectState === 'detecting' ? 'Detecting…' : 'Detect my wallet'}
      </button>
      {detectState === 'absent' && (
        <span class="u-release-lens__status" role="status">
          No wallet detected in this browser.
        </span>
      )}
      {detectState === 'found' && (
        <span class="u-release-lens__status" role="status">
          Detected wallet {detected}. Only the version was read; no accounts or addresses.
        </span>
      )}
      {detectState === 'unknown' && (
        <span class="u-release-lens__status" role="status">
          Detected wallet {detected}, which this release catalog does not know. Nothing was assumed.
        </span>
      )}
      {selected && selected.publicationStatus !== 'published' && (
        <span class="u-release-lens__status" title="This release is a source tree, not a published build">
          source tree
        </span>
      )}
    </div>
  );
}

export function mountReleaseLens(el: HTMLElement) {
  const releases = JSON.parse(el.dataset.releases ?? '[]') as ReleaseOption[];
  const defaultReleaseId = el.dataset.defaultRelease ?? releases[0]?.id ?? '';
  render(<Lens releases={releases} defaultReleaseId={defaultReleaseId} />, el);
}


autoMount("[data-release-lens]", mountReleaseLens);
