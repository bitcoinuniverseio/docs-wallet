/**
 * IntegrationStudio: executable developer integration built around the
 * generated provider contract.
 *
 * The fake provider is constructed from the contract JSON: it reproduces every
 * method's shape, answers from simulated scenarios, and refuses exactly the
 * methods this release refuses. It never contacts a wallet, a network, or the
 * Compatibility Doctor's subject - the doctor reads the visitor's real
 * provider only through explicit, read-only identity calls.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useMemo, useState } from 'preact/hooks';

interface Method {
  id: string;
  requestMethod: string;
  aliases: string[];
  parameters: { name: string; type: string; optional: boolean }[];
  category: string;
  effect: string;
  public: boolean;
  accountSensitive: boolean;
  requiresUnlock: boolean;
  requiresApproval: boolean;
  protocol: string | null;
  operation: string | null;
  releaseStatus: string;
}

interface OverlayEntry {
  explanation: string;
  safetyNote: string;
  example: string;
  relatedGuide: string | null;
  simulatedScenarios: string[];
}

interface Props {
  methods: Method[];
  overlay: Record<string, OverlayEntry>;
  events: string[];
  namespaces: string[];
  walletVersion: string;
  anyProtocolSupported: boolean;
}

type Scenario = 'success' | 'rejection' | 'locked' | 'disconnected' | 'wrong-network' | 'unauthorized' | 'invalid-parameter';

/** Build a fake provider from the contract. Deterministic, no network, no wallet. */
function createFakeProvider(methods: Method[], scenario: Scenario, walletVersion: string, anyProtocolSupported: boolean) {
  const listeners: Record<string, ((payload?: unknown) => void)[]> = {};
  const on = (event: string, handler: (payload?: unknown) => void) => {
    (listeners[event] ??= []).push(handler);
    return () => {
      listeners[event] = listeners[event]?.filter((candidate) => candidate !== handler);
    };
  };
  const emit = (event: string, payload?: unknown) => (listeners[event] ?? []).forEach((handler) => handler(payload));

  const reject = (code: string, message: string) =>
    Promise.reject(Object.assign(new Error(message), { code }));

  const provider: Record<string, unknown> = {
    on,
    getVersion: () => Promise.resolve(walletVersion),
    isUnlocked: () => Promise.resolve(scenario !== 'locked'),
  };

  for (const method of methods) {
    if (method.id in provider) continue;
    const isSigningClass = ['sign', 'broadcast', 'mutation'].includes(method.effect) && Boolean(method.protocol);
    provider[method.id] = (...args: unknown[]) => {
      if (scenario === 'disconnected') {
        return reject('DISCONNECTED', 'Simulated: no wallet is connected.');
      }
      if (scenario === 'locked' && method.requiresUnlock) {
        return reject('UNLOCK_REQUIRED', 'Simulated: the wallet is locked.');
      }
      if (scenario === 'unauthorized' || (isSigningClass && !anyProtocolSupported)) {
        return reject(
          'PROTOCOL_UNAUTHORIZED',
          method.protocol && method.operation
            ? `Simulated: protocol operation is not authorized: ${method.protocol}.${method.operation} in this release.`
            : 'Simulated: not authorized in this release.',
        );
      }
      if (scenario === 'invalid-parameter') {
        const required = (method.parameters ?? []).find((parameter) => !parameter.optional);
        if (required && args.length === 0) {
          return reject('INVALID_PARAMS', `Simulated: missing required parameter ${required.name}.`);
        }
      }
      if (scenario === 'rejection' && method.requiresApproval) {
        return reject('USER_REJECTION', 'Simulated: the user rejected the request. Nothing happened.');
      }
      // Shape-true placeholder answers per effect.
      switch (method.id) {
        case 'requestAccounts':
          return Promise.resolve(['bc1qsimexampleaddressnotreal0qqqqqqqqqqqqqqqqqqqqq']);
        case 'getAccounts':
          return Promise.resolve(scenario === 'disconnected' ? [] : ['bc1qsimexampleaddressnotreal0qqqqqqqqqqqqqqqqqqqqq']);
        case 'getBalance':
          return Promise.resolve({ confirmed: 1234567, unconfirmed: 0 });
        case 'getBalanceV2':
          return Promise.resolve({ totalBalance: '1234567', availableBalance: '1000000', unavailableBalance: '234567', confirmBalance: '0' });
        case 'getNetwork':
          return Promise.resolve(scenario === 'wrong-network' ? 'TESTNET' : 'MAINNET');
        case 'getChain':
          return Promise.resolve('BITCOIN_MAINNET');
        case 'getPublicKey':
          return Promise.resolve('020000000000000000000000000000000000000000000000000000000000000000');
        case 'getInscriptions':
        case 'getBitcoinUtxos':
          return Promise.resolve({ list: [], total: 0 });
        case 'getAddressHistory':
          return Promise.resolve({ start: 0, total: 0, detail: [] });
        case 'getCapabilities':
          return Promise.resolve({ anyProtocolSupported, protocolAuthorization: 'fail-closed-in-simulation' });
        case 'getFeatures':
          return Promise.resolve({ docsSimulator: true });
        case 'verifyMessageOfBIP322Simple':
          return Promise.resolve(true);
        default:
          if (method.effect === 'sign') return Promise.resolve({ psbt: 'simulated', txids: [] });
          if (method.effect === 'broadcast') return Promise.resolve('simulated-txid-not-real');
          return Promise.resolve(null);
      }
    };
  }
  return { provider, emit, on };
}

function codeFor(method: Method, overlay: OverlayEntry | undefined, language: 'js' | 'ts' | 'react'): string {
  const args = (method.parameters ?? []).map((parameter) => parameter.name).join(', ');
  const call = `provider.${method.id}(${args})`;
  if (language === 'react') {
    return `import { useEffect, useState } from 'react';\n\nexport function use${method.id[0].toUpperCase()}${method.id.slice(1)}() {\n  const [state, setState] = useState(null);\n  useEffect(() => {\n    const provider = window.universe;\n    ${call}\n      .then(setState)\n      .catch(() => setState('unavailable'));\n  }, []);\n  return state;\n}`;
  }
  const typed = language === 'ts' ? `: unknown` : '';
  return `const provider = window.universe;\n\ntry {\n  const result${typed} = await ${call};\n  console.log(result);\n} catch (error) {\n  // Handle the refusal as a state, not a bug.\n  console.error(error.code, error.message);\n}`;
}

function Doctor({ namespaces, walletVersion }: { namespaces: string[]; walletVersion: string }) {
  const [report, setReport] = useState<string[] | null>(null);
  const [lines, setLines] = useState<{ text: string; tone: 'ok' | 'err' | 'info' }[]>([]);

  const run = async () => {
    const out: { text: string; tone: 'ok' | 'err' | 'info' }[] = [];
    const found = namespaces.filter((name) => typeof (window as Record<string, any>)[name] === 'object');
    out.push({ text: `Provider aliases found: ${found.length ? found.join(', ') : 'none'}`, tone: found.length ? 'ok' : 'err' });
    const provider = found.length ? (window as Record<string, any>)[found[0]] : null;
    if (!provider) {
      out.push({ text: 'No Universe Wallet provider in this browser. Install the extension to run the doctor against it.', tone: 'info' });
      setLines(out);
      setReport(null);
      return;
    }
    const readSafe = async (label: string, call: () => Promise<unknown>) => {
      try {
        out.push({ text: `${label}: ${JSON.stringify(await call())}`, tone: 'ok' });
      } catch (error) {
        out.push({ text: `${label}: refused (${(error as Error).message.slice(0, 90)})`, tone: 'err' });
      }
    };
    if (typeof provider.getVersion === 'function') await readSafe('wallet version', () => provider.getVersion());
    if (typeof provider.getChain === 'function') await readSafe('chain', () => provider.getChain());
    if (typeof provider.getNetwork === 'function') await readSafe('network', () => provider.getNetwork());
    if (typeof provider.getCapabilities === 'function') await readSafe('capabilities', () => provider.getCapabilities());
    if (typeof provider.on === 'function') {
      const off = provider.on('accountsChanged', () => undefined);
      out.push({ text: 'event registration: supported', tone: 'ok' });
      if (typeof off === 'function') off();
    }
    // The doctor never calls requestAccounts, getPublicKey, or anything that
    // signs, sends, or switches. That boundary is the product.
    setLines(out);
    setReport([
      `Documentation release: wallet ${walletVersion}`,
      ...(out.map((line) => line.text)),
      '',
      'This report contains no address, public key, account identifier, transaction, or extension-internal identifier.',
    ].join('\n'));
  };

  const download = () => {
    if (!report) return;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'universe-compatibility-report.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div class="u-explorer" style={{ marginTop: '1rem' }}>
      <h3>Compatibility Doctor</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--u-dim)' }}>
        Reads only public identity surface: aliases, version, chain, network, capabilities, event
        registration. It never requests accounts, addresses, keys, signatures, chain switches, or
        sends, and never mutates wallet state.
      </p>
      <button type="button" class="u-button" onClick={run}>
        Run doctor
      </button>{' '}
      {report && (
        <button type="button" class="u-button" onClick={download}>
          Download redacted report
        </button>
      )}
      {lines && (
        <div class="u-console" role="log" aria-label="Doctor output" style={{ marginTop: '0.7rem' }}>
          {lines.map((line) => (
            <div class={line.tone === 'err' ? 'u-console__line--err' : line.tone === 'ok' ? 'u-console__line--ok' : ''}>
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Studio({ methods, overlay, events, namespaces, walletVersion, anyProtocolSupported }: Props) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(methods[0]?.id ?? '');
  const [scenario, setScenario] = useState<Scenario>('success');
  const [language, setLanguage] = useState<'js' | 'ts' | 'react'>('js');
  const [params, setParams] = useState<Record<string, string>>({});
  const [consoleLines, setConsoleLines] = useState<{ text: string; tone: 'ok' | 'err' | 'info' }[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? methods.filter((method) => method.id.toLowerCase().includes(needle)) : methods;
  }, [methods, query]);

  const selected = methods.find((method) => method.id === selectedId) ?? methods[0];
  const selectedOverlay = overlay[selected?.id ?? ''];

  const run = async () => {
    if (!selected) return;
    const { provider } = createFakeProvider(methods, scenario, walletVersion, anyProtocolSupported);
    setConsoleLines([]);
    setTimeline((current) => [...current, `${selected.id}() in scenario "${scenario}"`]);
    try {
      const args = (selected.parameters ?? []).map((parameter) => {
        const raw = params[`${selected.id}.${parameter.name}`];
        return raw !== undefined && raw !== '' ? raw : undefined;
      });
      const result = await (provider[selected.id] as (...args: unknown[]) => Promise<unknown>)(...args);
      setConsoleLines([{ text: `→ ${JSON.stringify(result)?.slice(0, 200)}`, tone: 'ok' }]);
    } catch (error) {
      setConsoleLines([{ text: `→ ${(error as Error).code}: ${(error as Error).message}`, tone: 'err' }]);
    }
  };

  const starter = useMemo(() => {
    return JSON.stringify(
      {
        name: 'universe-wallet-starter',
        private: true,
        type: 'module',
        scripts: { dev: 'vite' },
        note: `Generated against wallet ${walletVersion}. The starter uses the fake provider contract; swap window.universe detection in for a live wallet.`,
      },
      null,
      2,
    );
  }, [walletVersion]);

  const downloadStarter = () => {
    const blob = new Blob([starter], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'universe-wallet-starter.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!selected) return <p class="u-explorer__empty">The contract defines no methods.</p>;

  return (
    <div class="u-studio">
      <div class="u-explorer">
        <div class="u-explorer__toolbar">
          <input
            type="search"
            placeholder="Find a method…"
            aria-label="Find a provider method"
            value={query}
            onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
          />
          <select value={selectedId} onChange={(event) => setSelectedId((event.target as HTMLSelectElement).value)} aria-label="Selected method">
            {filtered.map((method) => (
              <option value={method.id}>
                {method.id} ({method.effect})
              </option>
            ))}
          </select>
          <select value={scenario} onChange={(event) => setScenario((event.target as HTMLSelectElement).value as Scenario)} aria-label="Simulated scenario">
            {['success', 'rejection', 'locked', 'disconnected', 'wrong-network', 'unauthorized', 'invalid-parameter'].map((name) => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </div>

        <p style={{ fontSize: '0.92rem' }}>{selectedOverlay?.explanation}</p>
        <p>
          <strong>Safety:</strong> {selectedOverlay?.safetyNote}
        </p>
        {selected.releaseStatus === 'not-authorized-in-this-release' && (
          <p>
            <span class="u-badge u-badge--unavailable">
              This build refuses this call: {selected.protocol}.{selected.operation} is not authorized. The refusal is
              simulated here exactly as the wallet behaves.
            </span>
          </p>
        )}

        {(selected.parameters ?? []).length > 0 && (
          <fieldset style={{ border: '1px solid var(--u-hairline)', borderRadius: '4px', padding: '0.6rem 0.8rem', margin: '0.7rem 0' }}>
            <legend style={{ fontSize: '0.85rem', color: 'var(--u-dim)' }}>Parameters</legend>
            {selected.parameters.map((parameter) => (
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', margin: '0.3rem 0', fontSize: '0.88rem' }}>
                <code style={{ minWidth: '7rem' }}>
                  {parameter.name}
                  {parameter.optional ? '?' : ''}
                </code>
                <input
                  type="text"
                  placeholder={parameter.type}
                  value={params[`${selected.id}.${parameter.name}`] ?? ''}
                  onInput={(event) =>
                    setParams((current) => ({ ...current, [`${selected.id}.${parameter.name}`]: (event.target as HTMLInputElement).value }))
                  }
                  style={{ font: 'inherit', flex: 1, padding: '0.25rem 0.45rem', border: '1px solid var(--u-hairline-strong)', borderRadius: '3px', background: 'var(--sl-color-bg)', color: 'var(--u-ink)' }}
                />
              </label>
            ))}
          </fieldset>
        )}

        <button type="button" class="u-button" onClick={run}>
          Run against the simulated provider
        </button>

        {consoleLines.length > 0 && (
          <div class="u-console" role="log" aria-label="Provider console" style={{ marginTop: '0.7rem' }}>
            {consoleLines.map((line) => (
              <div class={line.tone === 'err' ? 'u-console__line--err' : 'u-console__line--ok'}>{line.text}</div>
            ))}
          </div>
        )}

        {timeline.length > 0 && (
          <details style={{ marginTop: '0.6rem', fontSize: '0.85rem' }}>
            <summary>Event timeline ({timeline.length})</summary>
            <ul>
              {timeline.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
            <p style={{ color: 'var(--u-dim)' }}>Wallet events this contract exposes: {events.join(', ')}.</p>
          </details>
        )}
      </div>

      <div class="u-explorer">
        <div class="u-explorer__toolbar">
          <select value={language} onChange={(event) => setLanguage((event.target as HTMLSelectElement).value as any)} aria-label="Code language">
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="react">React hook</option>
          </select>
          <button
            type="button"
            class="u-button"
            onClick={() => navigator.clipboard?.writeText(codeFor(selected, selectedOverlay, language))}
          >
            Copy code
          </button>
          <button type="button" class="u-button" onClick={downloadStarter}>
            Download starter
          </button>
        </div>
        <div class="u-studio-code">
          <pre tabIndex={0}><code>{codeFor(selected, selectedOverlay, language)}</code></pre>
        </div>
        {selectedOverlay?.relatedGuide && (
          <p style={{ marginTop: '0.6rem' }}>
            <a href={selectedOverlay.relatedGuide}>Read the full guide</a>
          </p>
        )}
      </div>

      <Doctor namespaces={namespaces} walletVersion={walletVersion} />
    </div>
  );
}

export function mountStudio(el: HTMLElement) {
  render(
    <Studio
      methods={JSON.parse(el.dataset.methods ?? '[]')}
      overlay={JSON.parse(el.dataset.overlay ?? '{}')}
      events={JSON.parse(el.dataset.events ?? '[]')}
      namespaces={JSON.parse(el.dataset.namespaces ?? '[]')}
      walletVersion={el.dataset.walletVersion ?? ''}
      anyProtocolSupported={el.dataset.anyProtocolSupported === 'true'}
    />,
    el,
  );
}


autoMount("[data-integration-studio]", mountStudio);
