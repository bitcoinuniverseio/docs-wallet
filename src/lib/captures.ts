// Capture catalog access helpers, shared by every screenshot component.
import catalog from '../data/captures.json';

export type Capture = (typeof catalog.captures)[number];

const byId = new Map<string, Capture>(catalog.captures.map((capture) => [capture.captureId, capture]));

export const captureCatalog = catalog;

export function getCapture(id: string): Capture {
  const capture = byId.get(id);
  if (!capture) {
    // The empty catalog is the development placeholder written before the
    // wallet capture export lands. Anything else is a broken reference.
    if (catalog.captures.length === 0) {
      throw new Error(
        `CAPTURES_PENDING: capture ${id} is referenced but the capture catalog is empty. ` +
          'Import the wallet export with scripts/import-captures.mjs before building for release.',
      );
    }
    throw new Error(`unknown capture id: ${id}. The build fails rather than showing an unverified image.`);
  }
  return capture;
}

/** True when the catalog is the development placeholder. */
export function capturesPending(): boolean {
  return catalog.captures.length === 0;
}

export function captureUrl(capture: Capture, format: 'png' | 'webp' | 'avif'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const derivative = capture.derivatives.find((candidate) => candidate.format === format);
  return `${base}/${derivative?.path ?? `captures/${capture.captureId}.${format}`}`;
}

export function captureStateLabel(capture: Capture): string {
  return capture.state.replace(/-/g, ' ');
}
