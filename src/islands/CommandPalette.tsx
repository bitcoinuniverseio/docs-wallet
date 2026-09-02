/**
 * CommandPalette: one dialog for commands, pages, journeys, screens,
 * capabilities, protocols, and developer methods.
 *
 * Page search is Pagefind's existing index, loaded on first open - not a
 * second engine. Structured commands come from a generated registry pinned to
 * real routes. Nothing typed here is stored or transmitted; Pagefind's index
 * runs in the reader's browser.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

interface CommandItem {
  id: string;
  label: string;
  group: string;
  href: string;
  description: string;
  keywords: string[];
}

interface PageHit {
  label: string;
  href: string;
  excerpt: string;
}

let pagefind: any = null;
async function loadPagefind() {
  if (pagefind) return pagefind;
  try {
    pagefind = await import(/* @vite-ignore */ (document.querySelector('script[src*="pagefind"]') as HTMLScriptElement)?.src ?? '/pagefind/pagefind.js');
  } catch {
    // The search index can fail to load (offline bundle, blocked request);
    // structured commands still work.
    pagefind = null;
  }
  return pagefind;
}

function highlight(text: string): any {
  // Pagefind excerpts arrive with <mark>; render them as real marks.
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

function Palette({ commands, base }: { commands: CommandItem[]; base: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [pageHits, setPageHits] = useState<PageHit[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredCommands = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands.slice(0, 12);
    return commands
      .filter(
        (command) =>
          command.label.toLowerCase().includes(needle) ||
          command.description.toLowerCase().includes(needle) ||
          command.keywords.some((keyword) => keyword.includes(needle)),
      )
      .slice(0, 12);
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const needle = query.trim();
      if (!needle) {
        setPageHits([]);
        return;
      }
      const pf = await loadPagefind();
      if (!pf || cancelled) return;
      try {
        const search = await pf.search(needle);
        const results = await Promise.all(search.results.slice(0, 6).map((result: any) => result.data()));
        if (cancelled) return;
        setPageHits(
          results.map((result: any) => ({
            label: result.meta?.title ?? result.url,
            href: result.url?.startsWith('http') ? result.url : `${base}${result.url}`,
            excerpt: result.excerpt ?? '',
          })),
        );
      } catch {
        setPageHits([]);
      }
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, open, base]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === '/' && !open) {
        const target = event.target as HTMLElement;
        const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
        if (!typing) {
          event.preventDefault();
          setOpen(true);
        }
      }
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else setQuery('');
    setPageHits([]);
    setActive(0);
  }, [open]);

  const all = useMemo(() => {
    const groups: { group: string; items: { label: string; href: string; excerpt?: string }[] }[] = [];
    const push = (group: string, items: { label: string; href: string; excerpt?: string }[]) => {
      if (items.length) groups.push({ group, items });
    };
    for (const command of filteredCommands) {
      const existing = groups.find((entry) => entry.group === command.group);
      const item = { label: command.label, href: `${base}${command.href}` };
      if (existing) existing.items.push(item);
      else push(command.group, [item]);
    }
    push('Pages', pageHits.map((hit) => ({ label: hit.label, href: hit.href, excerpt: hit.excerpt })));
    return groups;
  }, [filteredCommands, pageHits, base]);

  const flat = useMemo(() => all.flatMap((group) => group.items), [all]);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, flat.length - 1)));
  }, [flat.length]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, flat.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === 'Enter' && flat[active]) {
      event.preventDefault();
      window.location.href = flat[active].href;
      setOpen(false);
    }
  };

  useEffect(() => {
    listRef.current?.querySelectorAll('li')[active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  // Flat render model: group label rows interleaved with result rows, each
  // carrying its final index so keyboard selection stays simple.
  const rows = useMemo(() => {
    const out: { key: string; kind: 'group' | 'item'; label?: string; href?: string; excerpt?: string; index?: number }[] = [];
    let index = 0;
    for (const group of all) {
      out.push({ key: `group-${group.group}`, kind: 'group', label: group.group });
      for (const item of group.items) {
        out.push({ key: `item-${index}`, kind: 'item', label: item.label, href: item.href, excerpt: item.excerpt, index });
        index += 1;
      }
    }
    return out;
  }, [all]);

  let rendered = 0;

  return (
    <>
      <button type="button" class="u-palette-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span aria-hidden="true">⌘</span> Search and commands <kbd>/</kbd>
      </button>
      <dialog class="u-palette-dialog" open={open} aria-label="Command palette" onKeyDown={onKeyDown}>
        {open && (
          <>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search tasks, journeys, screens, protocols, methods…"
              aria-label="Search documentation"
              value={query}
              onInput={(event) => {
                setQuery((event.target as HTMLInputElement).value);
                setActive(0);
              }}
              style={{
                width: '100%',
                font: 'inherit',
                padding: '0.7rem 0.9rem',
                border: '0',
                borderBottom: '1px solid var(--u-hairline-strong)',
                background: 'transparent',
                color: 'inherit',
              }}
            />
            <ul class="u-palette-list" ref={listRef} role="listbox" aria-label="Results">
              {flat.length === 0 && (
                <li class="u-explorer__empty" role="option" aria-selected="false">
                  Nothing matches. Search terms stay in this browser.
                </li>
              )}
              {rows.map((row) =>
                row.kind === 'group' ? (
                  <li key={row.key} class="u-palette-group" role="presentation">
                    {row.label}
                  </li>
                ) : (
                  <li key={row.key} role="option" aria-selected={row.index === active}>
                    <a
                      href={row.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActive(row.index ?? 0)}
                    >
                      <span>{row.label}</span>
                      {row.excerpt ? <small dangerouslySetInnerHTML={{ __html: row.excerpt }} /> : null}
                    </a>
                  </li>
                ),
              )}
            </ul>
            <p style={{ margin: 0, padding: '0.4rem 0.9rem', fontSize: '0.78rem', color: 'var(--u-dim)', borderTop: '1px solid var(--u-hairline)' }}>
              Enter opens · arrows move · Esc closes. Search runs in your browser.
            </p>
          </>
        )}
      </dialog>
    </>
  );
}

export function mountPalette(el: HTMLElement) {
  const commands = JSON.parse(el.dataset.commands ?? '[]') as CommandItem[];
  const base = el.dataset.base ?? '';
  render(<Palette commands={commands} base={base} />, el);
}


autoMount("[data-command-palette]", mountPalette);
