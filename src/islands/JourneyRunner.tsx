/**
 * JourneyRunner: the guided-journey engine.
 *
 * Declarative journeys from src/data/journeys render through this one engine:
 * branching by release/capability/chain, local progress with resume from the
 * home page, deep links to a step, a full outline, keyboard operation, a
 * printable checklist, and a clear distinction between read, completed, and
 * verified-by-the-user. Progress never leaves this browser.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useMemo, useState } from 'preact/hooks';

interface Step {
  id: string;
  title: string;
  goal: string;
  expected: string;
  action: string;
  checkpoint: string;
  failure: string;
  reversible: boolean;
  captureIds: string[];
  simulatorScenarioIds: string[];
  safetyLabScenarioIds: string[];
  relatedPage: string | null;
  branches: {
    condition: { releaseId: string | null; capability: string | null; chain: string | null };
    note: string;
    unavailable: boolean;
    steps: string[];
  }[];
}

interface Journey {
  id: string;
  title: string;
  outcome: string;
  estimatedMinutes: number;
  riskLevel: string;
  steps: Step[];
  completionCriterion: string;
  recovery: string;
  nextBestAction: string | null;
}

type StepState = 'todo' | 'read' | 'verified';

const STORE_KEY = (journeyId: string) => `universe-journey-${journeyId}`;

function loadProgress(journeyId: string): { verified: string[]; read: string[] } {
  try {
    const raw = window.localStorage.getItem(STORE_KEY(journeyId));
    if (!raw) return { verified: [], read: [] };
    const parsed = JSON.parse(raw);
    return {
      verified: Array.isArray(parsed.verified) ? parsed.verified : [],
      read: Array.isArray(parsed.read) ? parsed.read : [],
    };
  } catch {
    return { verified: [], read: [] };
  }
}

function saveProgress(journeyId: string, progress: { verified: string[]; read: string[] }) {
  try {
    window.localStorage.setItem(STORE_KEY(journeyId), JSON.stringify(progress));
  } catch {
    // storage unavailable; progress lives for this page view only
  }
}

function Runner({ journey, base }: { journey: Journey; base: string }) {
  const initialStep = useMemo(() => {
    const hash = window.location.hash.match(/step=([a-z0-9-]+)/i);
    return hash ? Math.max(0, journey.steps.findIndex((step) => step.id === hash[1])) : 0;
  }, [journey]);

  const [current, setCurrent] = useState(initialStep);
  const [progress, setProgress] = useState(loadProgress(journey.id));
  const [announcement, setAnnouncement] = useState('');

  const step = journey.steps[current];
  const stepState = (id: string): StepState =>
    progress.verified.includes(id) ? 'verified' : progress.read.includes(id) ? 'read' : 'todo';

  // Reading a step marks it read, never verified.
  useEffect(() => {
    if (!progress.read.includes(step.id)) {
      const next = { ...progress, read: [...progress.read, step.id] };
      setProgress(next);
      saveProgress(journey.id, next);
    }
    window.history.replaceState(null, '', `#step=${step.id}`);
  }, [step.id]);

  const markVerified = () => {
    if (!progress.verified.includes(step.id)) {
      const next = { ...progress, verified: [...progress.verified, step.id] };
      setProgress(next);
      saveProgress(journey.id, next);
      setAnnouncement(`Step "${step.title}" marked as done by you.`);
    }
    if (current < journey.steps.length - 1) {
      setCurrent(current + 1);
    }
  };

  const completed = journey.steps.filter((candidate) => progress.verified.includes(candidate.id)).length;
  const allVerified = completed === journey.steps.length;

  const go = (delta: number) => {
    setCurrent((value) => Math.min(Math.max(0, value + delta), journey.steps.length - 1));
  };

  const reset = () => {
    const next = { verified: [], read: [] };
    setProgress(next);
    saveProgress(journey.id, next);
    setCurrent(0);
    setAnnouncement('Journey progress reset.');
  };

  return (
    <div class="u-journey">
      <p class="u-visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
      <div class="u-journey__head">
        <p>
          Step {current + 1} of {journey.steps.length} · {completed} marked done · about{' '}
          {journey.estimatedMinutes} minutes
        </p>
        <div class="u-journey__head-actions">
          <a href={`#${journey.id}-print`} onClick={(event) => { event.preventDefault(); window.print(); }}>
            Print checklist
          </a>
          <button type="button" class="u-button" onClick={reset}>
            Reset progress
          </button>
        </div>
      </div>

      <div class="u-journey__body">
        <nav class="u-journey__outline" aria-label="Journey steps">
          <ol class="u-journey-rail">
            {journey.steps.map((candidate, index) => (
              <li data-state={stepState(candidate.id) === 'verified' ? 'done' : stepState(candidate.id)}>
                <a href={`#step=${candidate.id}`} onClick={(event) => { event.preventDefault(); setCurrent(index); }}>
                  {candidate.title}
                  <span class="u-journey-step-meta">
                    {stepState(candidate.id) === 'verified'
                      ? 'done (you confirmed)'
                      : stepState(candidate.id) === 'read'
                        ? 'read'
                        : `step ${index + 1}`}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article class="u-journey__step" aria-labelledby={`journey-step-${step.id}`}>
          <h2 id={`journey-step-${step.id}`}>{step.title}</h2>
          <dl class="u-journey__qa">
            <dt>You are trying to</dt>
            <dd>{step.goal}</dd>
            <dt>You should see</dt>
            <dd>{step.expected}</dd>
            <dt>You do</dt>
            <dd>{step.action}</dd>
            <dt>Before you continue, check</dt>
            <dd>{step.checkpoint}</dd>
            <dt>What can go wrong</dt>
            <dd>{step.failure}</dd>
            <dt>Reversible?</dt>
            <dd>{step.reversible ? 'Yes - you can undo this step.' : 'No. Read twice before you act.'}</dd>
          </dl>

          {step.branches.map((branch) => {
            const label = [
              branch.condition.releaseId ? `release ${branch.condition.releaseId}` : null,
              branch.condition.capability ? `capability: ${branch.condition.capability}` : null,
              branch.condition.chain ? `chain ${branch.condition.chain}` : null,
            ]
              .filter(Boolean)
              .join(', ');
            return (
              <div class={branch.unavailable ? 'u-journey__branch u-journey__branch--unavailable' : 'u-journey__branch'}>
                <strong>{branch.unavailable ? 'Not available here' : 'Branch'}{label ? ` (${label})` : ''}:</strong> {branch.note}
              </div>
            );
          })}

          {step.captureIds.map((captureId) => (
            <p>
              <a href={`${base}/atlas/#capture=${captureId}`}>See the verified screen for this step in the Atlas</a>
            </p>
          ))}
          {step.simulatorScenarioIds.map((scenarioId) => (
            <p>
              <a href={`${base}/simulator/?scenario=${scenarioId}`}>Try this step in the safe simulator</a>
            </p>
          ))}
          {step.safetyLabScenarioIds.map((scenarioId) => (
            <p>
              <a href={`${base}/safety-lab/#scenario=${scenarioId}`}>Study this situation in the Safety Lab</a>
            </p>
          ))}
          {step.relatedPage && (
            <p>
              <a href={`${base}${step.relatedPage}`}>Full guide for this step</a>
            </p>
          )}

          <div class="u-journey__controls">
            <button type="button" class="u-button" onClick={() => go(-1)} disabled={current === 0}>
              Previous
            </button>
            <button type="button" class="u-button" onClick={markVerified}>
              {current === journey.steps.length - 1 ? 'Mark done' : 'Done - next step'}
            </button>
          </div>
        </article>
      </div>

      {allVerified && (
        <div class="u-journey__complete" role="status">
          <strong>Journey complete.</strong> You confirmed all {journey.steps.length} steps. {journey.completionCriterion}
          {journey.nextBestAction && (
            <p>
              <a href={`${base}${journey.nextBestAction}`}>Suggested next journey</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function mountJourney(el: HTMLElement) {
  const journey = JSON.parse(el.dataset.journey ?? 'null') as Journey | null;
  if (!journey) return;
  const base = el.dataset.base ?? '';
  render(<Runner journey={journey} base={base} />, el);
}


autoMount("[data-journey-runner]", mountJourney);
