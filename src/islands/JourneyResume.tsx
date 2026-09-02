/**
 * JourneyResume: unfinished journeys from this browser's local progress,
 * offered on the home command center. Reads localStorage only; nothing
 * transmits. Without JavaScript, the static fallback shows the journey
 * directory link instead.
 */
import { render } from 'preact';
import { autoMount } from './mount';
import { useEffect, useState } from 'preact/hooks';

interface JourneySummary {
  id: string;
  title: string;
  steps: number;
}

function Resume({ journeys, base }: { journeys: JourneySummary[]; base: string }) {
  const [unfinished, setUnfinished] = useState<{ journey: JourneySummary; done: number; total: number }[]>([]);

  useEffect(() => {
    const found: { journey: JourneySummary; done: number; total: number }[] = [];
    for (const journey of journeys) {
      try {
        const raw = window.localStorage.getItem(`universe-journey-${journey.id}`);
        if (!raw) continue;
        const progress = JSON.parse(raw);
        const done = Array.isArray(progress?.verified) ? progress.verified.length : 0;
        if (done > 0 && done < journey.steps) {
          found.push({ journey, done, total: journey.steps });
        }
      } catch {
        // unreadable progress is treated as no progress
      }
    }
    setUnfinished(found);
  }, [journeys]);

  if (unfinished.length === 0) {
    return (
      <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem', color: 'var(--u-dim)' }}>
        No journey in progress in this browser. <a href={`${base}/journeys/`}>Browse the guided journeys</a>.
      </p>
    );
  }

  return (
    <ul class="u-journey-rail" style={{ marginTop: '0.4rem' }}>
      {unfinished.map(({ journey, done, total }) => (
        <li data-state="read">
          <a href={`${base}/journeys/${journey.id}/`}>
            Resume: {journey.title}
            <span class="u-journey-step-meta">
              {done} of {total} steps marked done
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function mountResume(el: HTMLElement) {
  render(
    <Resume journeys={JSON.parse(el.dataset.journeys ?? '[]')} base={el.dataset.base ?? ''} />,
    el,
  );
}


autoMount("[data-journey-resume]", mountResume);
