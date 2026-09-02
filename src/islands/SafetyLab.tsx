/**
 * SafetyLab: interactive study of transaction and authorization risk over
 * wallet-generated fixtures. Nothing signs, broadcasts, or sends; "run" only
 * reveals the analysis the wallet's own view models produced. Static text for
 * every scenario renders below the lab for no-JS readers and search engines.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useMemo, useState } from 'preact/hooks';

interface Fixture {
  id: string;
  title: string;
  teaches: string[];
  summary: { title: string; outcome: string; tone: 'ok' | 'review' | 'danger'; bullets: string[]; footer: string };
  anatomy: {
    inputs: { address: string; value: number; owned: boolean; sighashType: number | null }[];
    outputs: { address: string; value: number; owned: boolean }[];
    fee: number;
    feeRate: number;
    recommendedFeeRate: number;
    shouldWarnFeeRate: boolean;
    rbf: boolean;
  };
}

const SIGHASH = (type: number | null): string => {
  if (type === null) return 'unspecified';
  if (type === 1) return 'SIGHASH_ALL - commits to every input and output';
  if (type === 3) return 'SIGHASH_SINGLE - commits this input to one output only';
  if (type === 0x81) return 'SIGHASH_ALL | ANYONECANPAY';
  if (type === 0x83) return 'SIGHASH_SINGLE | ANYONECANPAY - the listing-style signature';
  return `sighash type ${type}`;
};

const sats = (value: number): string => `${value.toLocaleString('en-US')} sats`;

function Lab({ fixtures }: { fixtures: Fixture[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const open = useMemo(() => fixtures.find((fixture) => fixture.id === openId) ?? null, [fixtures, openId]);

  useEffect(() => {
    const match = window.location.hash.match(/scenario=([a-z0-9-]+)/i);
    if (match) setOpenId(match[1]);
  }, []);

  return (
    <div class="u-explorer">
      <div class="u-explorer__toolbar">
        <label for="u-lab-scenario" style={{ alignSelf: 'center', fontSize: '0.88rem' }}>
          Scenario
        </label>
        <select
          id="u-lab-scenario"
          value={openId ?? ''}
          onChange={(event) => setOpenId((event.target as HTMLSelectElement).value || null)}
        >
          <option value="">Choose a situation…</option>
          {fixtures.map((fixture) => (
            <option value={fixture.id}>{fixture.title}</option>
          ))}
        </select>
        {openId && (
          <a class="u-button" href={`#scenario=${openId}`}>
            Deep link
          </a>
        )}
      </div>

      {open && (
        <article>
          <h3>{open.title}</h3>
          <div class={open.summary.tone === 'danger' ? 'u-lab-anatomy u-lab-anatomy--danger' : 'u-lab-anatomy'}>
            <p>
              <strong>The wallet's own summary would say:</strong> “{open.summary.title}”
            </p>
            <ul>
              {open.summary.bullets.map((bullet) => (
                <li>{bullet}</li>
              ))}
            </ul>

            <h4>Inputs (money coming in)</h4>
            <div class="u-lab-io">
              {open.anatomy.inputs.map((input) => (
                <div class="u-lab-io__row">
                  <span class={input.owned ? 'u-lab-io__owned' : 'u-lab-io__other'}>
                    {input.owned ? 'Yours' : 'Not yours'}
                  </span>
                  <code style={{ fontSize: '0.8rem' }}>{input.address.slice(0, 18)}…</code>
                  <span>{sats(input.value)}</span>
                  <span style={{ color: 'var(--u-dim)' }}>{SIGHASH(input.sighashType)}</span>
                </div>
              ))}
            </div>

            <h4>Outputs (money going out)</h4>
            <div class="u-lab-io">
              {open.anatomy.outputs.map((output) => (
                <div class="u-lab-io__row">
                  <span class={output.owned ? 'u-lab-io__owned' : 'u-lab-io__other'}>
                    {output.owned ? 'Change to you' : 'Leaves your wallet'}
                  </span>
                  <code style={{ fontSize: '0.8rem' }}>{output.address.slice(0, 18)}…</code>
                  <span>{sats(output.value)}</span>
                </div>
              ))}
              <div class="u-lab-io__row">
                <span style={{ color: 'var(--u-dim)' }}>Network fee</span>
                <span>
                  {sats(open.anatomy.fee)} at {open.anatomy.feeRate} sat/vB
                  {open.anatomy.shouldWarnFeeRate && (
                    <strong style={{ color: 'var(--u-alert-ink)' }}>
                      {' '}
                      · recommended rate is {open.anatomy.recommendedFeeRate} - this is far above it
                    </strong>
                  )}
                </span>
              </div>
              <div class="u-lab-io__row">
                <span style={{ color: 'var(--u-dim)' }}>Replaceable</span>
                <span>{open.anatomy.rbf ? 'Yes - a later bump can raise the fee' : 'No bump capability in this transaction'}</span>
              </div>
            </div>
          </div>

          {!revealed[open.id] ? (
            <button type="button" class="u-button" onClick={() => setRevealed((current) => ({ ...current, [open.id]: true }))}>
              Reveal what to check and the right decision
            </button>
          ) : (
            <div role="status">
              <h4>What to check</h4>
              <ul>
                {open.teaches.map((line) => (
                  <li>{line}</li>
                ))}
              </ul>
              <p>
                <strong>What the wallet asks you to confirm:</strong> {open.summary.outcome}
              </p>
            </div>
          )}
        </article>
      )}

      {!open && <p class="u-explorer__empty">Choose a situation above. Every scenario is fixture-backed and read-only; nothing here can sign or send.</p>}
    </div>
  );
}

export function mountSafetyLab(el: HTMLElement) {
  render(<Lab fixtures={JSON.parse(el.dataset.fixtures ?? '[]')} />, el);
}


autoMount("[data-safety-lab]", mountSafetyLab);
