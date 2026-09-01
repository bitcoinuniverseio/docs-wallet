---
title: Media and large portfolios
description: How the wallet renders thousands of assets without stalling, where images come from, and what a dimmed number means.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/components, docs/PERFORMANCE-BASELINE-1.7.5.8.md
lifecycle: experimental
lastVerified: 2026-09-01
---

Universe Wallet is built so that the screen you asked for appears at once and fills in as data
arrives, rather than waiting for everything before showing anything.

## What you see

- The home screen shows your wallet, account, and network in one row, then your balance and actions,
  then the assets of the selected protocol. On a wide window, activity and network context move
  beside the balance.
- The balance expands into **Spendable**, **Protected**, and **Pending**. Protected is currency held
  inside outputs that also carry inscriptions, runes, or other assets. The Portfolio screen repeats
  the spendable and protected split next to the total. See
  [Protected outputs](/docs-wallet/concepts/protected-outputs).
- The protocol picker lists protocols you hold first, then each group. Protocols with nothing held
  stay reachable but step back. Search, arrow keys, Enter, and Shift with Enter to pin all work from
  the keyboard.
- Balances and holdings render from the last known state while a refresh runs, and the amount dims
  until the refresh lands. **The wallet never presents stale spendable state as fresh.**
- Inscriptions, collectibles, and token cards load an image sized for their slot, not the full
  on-chain file. A 36 pixel icon does not download a multi-megabyte original.
- Text and JSON inscriptions show a typed card. HTML inscriptions show a static preview in lists and
  open as an interactive document on their detail screen.
- Galleries with thousands of assets render only the rows near your scroll position. Arrow keys move
  between tiles and your scroll position stays put.
- On a metered or slow connection, the wallet requests smaller images and loads less ahead of the
  viewport.

## Where the media comes from

Every image, poster, and thumbnail comes from Universe-operated media infrastructure. Originals stay
exact on chain. Display derivatives are content-hashed and cached by your browser for a year. If the
optimized derivative does not exist yet, the wallet shows the original through the Universe proxy and
the derivative is prepared for next time.

## Reading the states

| What you see | What it means |
| --- | --- |
| A dimmed amount | A refresh is running. The number shown is the last known value. |
| A count labelled last known | The service was unreachable, so this came from the previous portfolio read. |
| Media unavailable on a tile | Every source for that item failed. Other tiles keep loading. |
| A wallet API unreachable notice | A health check failed. It retries every minute and backs off while the service stays down. |

## Controls worth knowing

- Pull down on the home screen to refresh balances and holdings. A manual refresh always asks the
  network again rather than reusing a cached answer.
- The filter control above an inscription grid sets density, sort order, satoshi visibility, and a
  minimum-satoshi filter.

## Related

- [Read your activity](/docs-wallet/tasks/activity)
- [Troubleshooting](/docs-wallet/help/troubleshooting)
