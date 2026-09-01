---
title: Diagram conventions
description: The rules every diagram on this site follows, so that a contributor can add one that matches and a reader knows what the drawing is claiming.
sourceRepo: bitcoinuniverseio/docs-wallet
sourcePath: src/components/diagrams
lifecycle: experimental
lastVerified: 2026-09-01
---

Every diagram here is hand-authored inline SVG, written the same way a paragraph is written. There is
no diagramming tool in the loop, and no generated image.

## Rules

**One idea per diagram.** If a second idea needs saying, it gets a second diagram.

**Colour carries meaning, never decoration.** The page is near-neutral. Exactly one chromatic accent
exists, and it is reserved for warnings, irreversible actions, and blocked states. If a diagram uses
it anywhere else, colour stops meaning anything and a reader stops noticing it where it matters.

**Colour is never the only signal.** A held-back coin is drawn with a hatch pattern **and** labelled
Protected. A dangerous path is drawn in the accent **and** says so in words. Remove the colour and
every diagram still reads. This is WCAG 1.4.1, and it is also just better drawing.

**Theme-aware by construction.** Diagrams are inline SVG using the site's CSS custom properties, so
they follow the theme toggle exactly, including for a reader who chose light while their operating
system is dark. They are not images with a baked-in palette.

**No markers for arrowheads.** A `<marker>` cannot reliably inherit the referencing path's colour
across a theme switch. Arrowheads are explicit paths with their own class.

**Accessible.** Every diagram carries `role="img"` and `aria-labelledby` pointing at a `<title>` and a
`<desc>`. The description says what the diagram shows, not what it looks like, so a reader who cannot
see it gets the whole point rather than a shape inventory.

**Legible on a phone.** A diagram scrolls inside its own focusable frame on a narrow screen rather
than shrinking until its labels are unreadable. The frame is keyboard reachable.

**Synthetic values only.** Every address, balance, transaction id, outpoint, and site name is
invented. Nothing in any diagram comes from a real wallet.

**No screenshots.** This documentation contains none. The product's own capture harness currently runs
the wallet offline, so every screen it captures settles into an empty or error state, and presenting a
mock as a real capture would be a false claim in image form. Diagrams and written descriptions are the
honest substitute. See [Known limitations](/docs-wallet/reference/known-limitations).

**No em dashes, no emoji.** The same copy rules as the prose, enforced by
`npm run check:copy`.

## The diagrams

| Diagram | Explains | Appears on |
| --- | --- | --- |
| Address lanes | One phrase, four address types, and why there is no asset address | [Payment and asset addresses](/docs-wallet/concepts/addresses) |
| Protected outputs | Why an asset-bearing coin never funds a plain payment | [Protected outputs](/docs-wallet/concepts/protected-outputs) |
| Signature scope | Four kinds of approval and the boundary of each | [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes) |
| Transaction anatomy | Inputs, outputs, fee, and change, with arithmetic that adds up | [Inputs, outputs, fees, change](/docs-wallet/concepts/inputs-outputs-fees) |
| Connection permissions | What a site is granted, what it never is, and how access ends | [Connection permissions](/docs-wallet/concepts/connections) |
| Backup and recovery | Which loss the phrase covers, and the one it does not | [Backup and recovery](/docs-wallet/concepts/backup-and-recovery) |
| Review anatomy | The order the approval screen is built in | [Review a transaction](/docs-wallet/tasks/review-a-transaction) |
| Release evidence | Why an action appears only when evidence covers the path | [Capability evidence](/docs-wallet/reference/capability-evidence) |

## Adding one

Add a component under `src/components/diagrams/`, use the `dg-` classes defined in
`src/styles/theme.css`, wrap it in the `Diagram` component with a title and a caption, and run
`npm run check:diagrams`, which fails on a diagram missing a title or a description.
