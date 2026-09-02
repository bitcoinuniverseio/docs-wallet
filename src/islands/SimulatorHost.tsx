/**
 * SimulatorHost: embeds the wallet documentation simulator in the narrowest
 * sandbox that can run it. The frame has allow-scripts only: no same-origin,
 * no forms, no popups, no navigation of the parent. The postMessage bridge is
 * validated and allowlisted on both ends; unknown messages are dropped.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useRef, useState } from 'preact/hooks';

interface Scenario {
  id: string;
  title: string;
  description: string;
}

function Host({
  scenarios,
  artifactPath,
  initialScenario,
  walletVersion,
}: {
  scenarios: Scenario[];
  artifactPath: string;
  initialScenario: string;
  walletVersion: string;
}) {
  const [scenario, setScenario] = useState(initialScenario);
  const [status, setStatus] = useState('The simulator has not announced itself yet.');
  const frameRef = useRef<HTMLIFrameElement>(null);

  const frameSrc = `${artifactPath}index.html#/scenario=${scenario}`;

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; scenarioId?: string; route?: string } | null;
      if (!data || typeof data !== 'object') return;
      // Only accept messages that name themselves as simulator events.
      if (typeof data.type !== 'string' || !data.type.startsWith('simulator-')) return;
      switch (data.type) {
        case 'simulator-ready':
          setStatus(`Simulator ready: ${data.scenarioId ?? scenario}. Deterministic, offline, no keys.`);
          break;
        case 'simulator-route':
          setStatus(`Simulator showing route: ${data.route ?? ''}`);
          break;
        case 'simulator-ack':
          break;
        default:
          // Unknown types are ignored, never replayed or stored.
          break;
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [scenario]);

  const announce = (text: string) => {
    frameRef.current?.contentWindow?.postMessage({ type: 'simulator-announce', text }, '*');
    setStatus(text);
  };

  return (
    <div class="u-simhost">
      <p class="u-simhost__status" role="status">
        {status}
      </p>
      <div class="u-explorer__toolbar">
        <label for="u-sim-scenario" style={{ alignSelf: 'center', fontSize: '0.88rem' }}>
          Scenario
        </label>
        <select
          id="u-sim-scenario"
          value={scenario}
          onChange={(event) => setScenario((event.target as HTMLSelectElement).value)}
        >
          {scenarios.map((candidate) => (
            <option value={candidate.id}>{candidate.title}</option>
          ))}
        </select>
        <button
          type="button"
          class="u-button"
          onClick={() => frameRef.current?.contentWindow?.postMessage({ type: 'simulator-reset' }, '*')}
        >
          Reset
        </button>
        <select
          aria-label="Simulator appearance"
          onChange={(event) =>
            frameRef.current?.contentWindow?.postMessage({ type: 'simulator-set-theme', theme: (event.target as HTMLSelectElement).value }, '*')
          }
        >
          <option value="">Appearance…</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="oled">OLED black</option>
        </select>
      </div>

      <div class="u-simhost__frame-wrap">
        <iframe
          ref={frameRef}
          key={scenario}
          src={frameSrc}
          title={`Universe Wallet documentation simulator: ${scenarios.find((candidate) => candidate.id === scenario)?.title ?? scenario}`}
          sandbox="allow-scripts"
          loading="lazy"
          class="u-simhost__frame"
        />
      </div>
      <p class="u-simhost__notes">
        Inside the frame: the real wallet interface, driven by fixture data. It has no key, no
        network, no extension access, and no storage beyond this page. Every approval button answers
        with a simulated result; nothing can be signed, sent, or broadcast. Built from wallet{' '}
        {walletVersion}.
      </p>
    </div>
  );
}

export function mountSimulatorHost(el: HTMLElement) {
  render(
    <Host
      scenarios={JSON.parse(el.dataset.scenarios ?? '[]')}
      artifactPath={el.dataset.artifact ?? '/simulator/'}
      initialScenario={el.dataset.scenario ?? 'first-launch'}
      walletVersion={el.dataset.walletVersion ?? ''}
    />,
    el,
  );
}


autoMount("[data-simulator-host]", mountSimulatorHost);
