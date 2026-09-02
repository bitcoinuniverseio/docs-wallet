/**
 * AtlasExplorer: filter and search over every verified capture, with deep
 * links. The page also renders a complete static listing below this island, so
 * the atlas is fully usable without JavaScript.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useMemo, useState } from 'preact/hooks';

interface Capture {
  captureId: string;
  publicTitle: string;
  caption: string;
  workflow: string;
  state: string;
  theme: string;
  riskLevel: string;
  releaseId: string;
  walletVersion: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  consumers: string[];
}

function Explorer({ captures, base }: { captures: Capture[]; base: string }) {
  const [query, setQuery] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [theme, setTheme] = useState('');
  const [risk, setRisk] = useState('');
  const [deepLink, setDeepLink] = useState<string | null>(null);

  useEffect(() => {
    const match = window.location.hash.match(/capture=([a-z0-9-]+)/i);
    if (match) setDeepLink(match[1]);
  }, []);

  const workflows = useMemo(() => [...new Set(captures.map((capture) => capture.workflow))].sort(), [captures]);
  const themes = useMemo(() => [...new Set(captures.map((capture) => capture.theme))].sort(), [captures]);
  const risks = useMemo(() => [...new Set(captures.map((capture) => capture.riskLevel))].sort(), [captures]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return captures.filter((capture) => {
      if (workflow && capture.workflow !== workflow) return false;
      if (theme && capture.theme !== theme) return false;
      if (risk && capture.riskLevel !== risk) return false;
      if (deepLink) return capture.captureId === deepLink;
      if (!needle) return true;
      return (
        capture.publicTitle.toLowerCase().includes(needle) ||
        capture.caption.toLowerCase().includes(needle) ||
        capture.state.toLowerCase().includes(needle) ||
        capture.workflow.toLowerCase().includes(needle)
      );
    });
  }, [captures, query, workflow, theme, risk, deepLink]);

  return (
    <div class="u-explorer" data-atlas-explorer>
      <div class="u-explorer__toolbar">
        <input
          type="search"
          placeholder="Filter by title, caption, or state…"
          aria-label="Filter captures"
          value={deepLink ? '' : query}
          onInput={(event) => {
            setDeepLink(null);
            setQuery((event.target as HTMLInputElement).value);
          }}
        />
        <select value={workflow} onChange={(event) => setWorkflow((event.target as HTMLSelectElement).value)} aria-label="Filter by workflow">
          <option value="">All workflows</option>
          {workflows.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <select value={theme} onChange={(event) => setTheme((event.target as HTMLSelectElement).value)} aria-label="Filter by theme">
          <option value="">All themes</option>
          {themes.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <select value={risk} onChange={(event) => setRisk((event.target as HTMLSelectElement).value)} aria-label="Filter by risk level">
          <option value="">All risk levels</option>
          {risks.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </div>

      <p role="status" style={{ margin: '0 0 0.6rem', fontSize: '0.85rem', color: 'var(--u-dim)' }}>
        {filtered.length} of {captures.length} verified captures
        {deepLink ? ' (deep link to one capture - clear filters to browse)' : ''}
      </p>

      <ul class="u-atlas-grid">
        {filtered.map((capture) => (
          <li key={capture.captureId}>
            <a href={`${base}/atlas/#capture=${capture.captureId}`} class="u-atlas-card">
              <span class="u-atlas-card__title">{capture.publicTitle}</span>
              <span class="u-atlas-card__meta">
                {capture.workflow} · {capture.state} · {capture.theme}
              </span>
              <span class="u-atlas-card__caption">{capture.caption}</span>
            </a>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p class="u-explorer__empty">No capture matches these filters.</p>}
    </div>
  );
}

export function mountAtlas(el: HTMLElement) {
  const captures = JSON.parse(el.dataset.captures ?? '[]') as Capture[];
  const base = el.dataset.base ?? '';
  render(<Explorer captures={captures} base={base} />, el);
}


autoMount("[data-atlas-mount]", mountAtlas);
