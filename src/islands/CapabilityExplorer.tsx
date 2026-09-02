/**
 * CapabilityExplorer: an interactive view over the generated capability
 * snapshot, enhancing (never replacing) the static protocol table beneath it.
 * Compare mode contrasts two releases from the release catalog; a release with
 * no verifiable capability data says exactly that instead of being guessed.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useMemo, useState } from 'preact/hooks';

interface Protocol {
  id: string;
  name: string;
  networks: string[];
  intendedOperations: string[];
  supportedOperations: string[];
  supportState: string;
}

interface Props {
  protocols: Protocol[];
  walletVersion: string;
  releases: { id: string; version: string; publicationStatus: string; hasCapabilityData: boolean }[];
}

function Explorer({ protocols, walletVersion, releases }: Props) {
  const [query, setQuery] = useState('');
  const [chain, setChain] = useState('');
  const [operation, setOperation] = useState('');
  const [state, setState] = useState('');
  const [compareWith, setCompareWith] = useState('');

  useEffect(() => {
    const match = window.location.hash.match(/protocol=([a-z0-9-]+)/i);
    if (match) setQuery(match[1]);
  }, []);

  const chains = useMemo(() => {
    const set = new Set<string>();
    for (const protocol of protocols) {
      for (const network of protocol.networks) set.add(network.split(':')[0]);
    }
    return [...set].sort();
  }, [protocols]);

  const operations = useMemo(() => {
    const set = new Set<string>();
    for (const protocol of protocols) for (const operation of protocol.intendedOperations) set.add(operation);
    return [...set].sort();
  }, [protocols]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return protocols.filter((protocol) => {
      if (needle && !protocol.id.includes(needle) && !protocol.name.toLowerCase().includes(needle)) return false;
      if (chain && !protocol.networks.some((network) => network.startsWith(`${chain}:`))) return false;
      if (operation && !protocol.intendedOperations.includes(operation)) return false;
      if (state && protocol.supportState !== state) return false;
      return true;
    });
  }, [protocols, query, chain, operation, state]);

  const compareRelease = releases.find((release) => release.id === compareWith);

  return (
    <div class="u-explorer">
      <div class="u-explorer__toolbar">
        <input
          type="search"
          placeholder="Search protocols…"
          aria-label="Search protocols"
          value={query}
          onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
        />
        <select value={chain} onChange={(event) => setChain((event.target as HTMLSelectElement).value)} aria-label="Filter by chain">
          <option value="">All chains</option>
          {chains.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <select value={operation} onChange={(event) => setOperation((event.target as HTMLSelectElement).value)} aria-label="Filter by intended operation">
          <option value="">All intended operations</option>
          {operations.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <select value={state} onChange={(event) => setState((event.target as HTMLSelectElement).value)} aria-label="Filter by support state">
          <option value="">All support states</option>
          {[...new Set(protocols.map((protocol) => protocol.supportState))].sort().map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <select value={compareWith} onChange={(event) => setCompareWith((event.target as HTMLSelectElement).value)} aria-label="Compare with another release">
          <option value="">Compare with…</option>
          {releases
            .filter((release) => release.id !== `wallet-${walletVersion}`)
            .map((release) => (
              <option value={release.id}>Wallet {release.version}</option>
            ))}
        </select>
      </div>

      {compareRelease && !compareRelease.hasCapabilityData && (
        <p class="u-explorer__empty" role="status">
          Comparing with wallet {compareRelease.version}: no verifiable capability snapshot exists for that build,
          so a column of claims would be invented. The comparison below shows only what wallet {walletVersion}{' '}
          authorizes, beside what is documented about {compareRelease.version}.
        </p>
      )}

      <table>
        <caption class="u-visually-hidden">
          Protocol support in wallet {walletVersion}
        </caption>
        <thead>
          <tr>
            <th scope="col">Protocol</th>
            <th scope="col">Networks</th>
            <th scope="col">Intended operations</th>
            <th scope="col">Authorized in {walletVersion}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((protocol) => (
            <tr key={protocol.id} id={`protocol-${protocol.id}`}>
              <th scope="row">{protocol.name}</th>
              <td>{protocol.networks.join(', ')}</td>
              <td>{protocol.intendedOperations.join(', ')}</td>
              <td>
                {protocol.supportedOperations.length > 0 ? (
                  <span class="u-badge u-badge--ok">{protocol.supportedOperations.join(', ')}</span>
                ) : (
                  <span class="u-badge u-badge--unavailable">none - every operation fails closed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p class="u-explorer__empty">No protocol matches these filters.</p>}
    </div>
  );
}

export function mountCapabilityExplorer(el: HTMLElement) {
  render(
    <Explorer
      protocols={JSON.parse(el.dataset.protocols ?? '[]')}
      walletVersion={el.dataset.walletVersion ?? ''}
      releases={JSON.parse(el.dataset.releases ?? '[]')}
    />,
    el,
  );
}


autoMount("[data-capability-explorer]", mountCapabilityExplorer);
