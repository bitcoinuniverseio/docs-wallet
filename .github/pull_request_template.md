## What changed

<!-- One or two sentences. -->

## Why

<!-- What was wrong, missing, or unverifiable before. -->

## Grounding

Every factual claim in this change traces to:

- [ ] `capability-snapshot.json` for any version or protocol-support claim
- [ ] the wallet source, named in the page's `sourcePath`
- [ ] the wallet's generated route inventory, for anything about screens or gating

Paths consulted:

<!-- e.g. wallet: frontend/ui/pages/Wallet/TxCreateScreen.tsx -->

## Safety review

- [ ] No capability is described that could not be verified in the wallet source
- [ ] Anything unverifiable is stated as **not available** rather than described
- [ ] Irreversible consequences are stated where the action is described
- [ ] A reader could not lose funds by believing this page

## Checks

- [ ] `npm test` passes
- [ ] `npm run build` passes, which validates every internal link and anchor
- [ ] `lastVerified` updated on every page I changed
- [ ] Any moved URL added to `redirects` in `docs.manifest.json`
