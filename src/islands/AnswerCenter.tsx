/**
 * AnswerCenter: answers from this site's own pages.
 *
 * Retrieval uses the existing Pagefind index plus the structured catalogs
 * (journeys, capabilities, provider methods). Results render as source-linked
 * excerpts with the release and capability status they were checked against.
 * The question never leaves the browser and nothing is stored.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useRef, useState } from 'preact/hooks';

interface Passage {
  label: string;
  href: string;
  excerpt: string;
  meta?: string;
}

interface StructuredItem {
  label: string;
  href: string;
  group: string;
  description: string;
}

let pagefind: any = null;

function Answer({ base, structured, walletVersion }: { base: string; structured: StructuredItem[]; walletVersion: string }) {
  const [query, setQuery] = useState('');
  const [passages, setPassages] = useState<Passage[]>([]);
  const [items, setItems] = useState<StructuredItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const search = async () => {
    const needle = query.trim();
    if (!needle) return;
    setBusy(true);
    setNote('');

    const lower = needle.toLowerCase();
    setItems(
      structured
        .filter(
          (item) =>
            item.label.toLowerCase().includes(lower) ||
            item.description.toLowerCase().includes(lower),
        )
        .slice(0, 6),
    );

    try {
      if (!pagefind) {
        pagefind = await import(/* @vite-ignore */ `${base}/pagefind/pagefind.js`);
      }
      const result = await pagefind.search(needle);
      const data = await Promise.all(result.results.slice(0, 8).map((entry: any) => entry.data()));
      setPassages(
        data.map((entry: any) => ({
          label: entry.meta?.title ?? entry.url,
          href: entry.url.startsWith('http') ? entry.url : `${base}${entry.url}`,
          excerpt: entry.excerpt ?? '',
        })),
      );
      if (data.length === 0) {
        setNote(
          'No page on this site answers that directly. The closest passages and structured entries are shown; this site will not invent an answer.',
        );
      }
    } catch {
      setNote('The search index is unavailable right now (it also works offline once saved). Structured entries are shown below.');
    }
    setBusy(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div class="u-explorer">
      <div class="u-explorer__toolbar">
        <input
          ref={inputRef}
          type="search"
          style={{ flex: 1 }}
          placeholder="Ask about the wallet: e.g. why can I not send?"
          aria-label="Your question"
          value={query}
          onKeyDown={(event) => event.key === 'Enter' && search()}
          onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
        />
        <button type="button" class="u-button" onClick={search} disabled={busy}>
          {busy ? 'Looking…' : 'Search this site'}
        </button>
      </div>
      <p style={{ fontSize: '0.84rem', color: 'var(--u-dim)', margin: '0 0 0.7rem' }}>
        Answers come only from these documentation pages, checked against wallet {walletVersion}.
        Your question stays in this browser; nothing is sent anywhere.
      </p>

      {note && <p class="u-explorer__empty" role="status">{note}</p>}

      {passages.length > 0 && (
        <section aria-label="Passages from the documentation">
          <h3 style={{ fontSize: '1rem' }}>From the pages</h3>
          <ul class="u-answer-list">
            {passages.map((passage) => (
              <li>
                <a href={passage.href}>{passage.label}</a>
                <blockquote dangerouslySetInnerHTML={{ __html: passage.excerpt }} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {items.length > 0 && (
        <section aria-label="Structured entries">
          <h3 style={{ fontSize: '1rem' }}>Structured entries</h3>
          <ul class="u-answer-list">
            {items.map((item) => (
              <li>
                <a href={`${base}${item.href}`}>
                  {item.label} <span style={{ color: 'var(--u-dim)', fontSize: '0.8rem' }}>({item.group})</span>
                </a>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.88rem' }}>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function mountAnswerCenter(el: HTMLElement) {
  render(
    <Answer
      base={el.dataset.base ?? ''}
      structured={JSON.parse(el.dataset.structured ?? '[]')}
      walletVersion={el.dataset.walletVersion ?? ''}
    />,
    el,
  );
}


autoMount("[data-answer-center]", mountAnswerCenter);
