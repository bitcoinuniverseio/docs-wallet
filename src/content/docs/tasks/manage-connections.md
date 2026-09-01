---
title: Manage connections
description: See every site that can reach the wallet, what each one can read, when it was last used, and how to end one or all of them.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/ConnectedSites
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone who has connected sites, which is anyone who has used a marketplace.
**Goal:** a connection list you recognise, with nothing on it you cannot account for.
**Prerequisites:** an unlocked wallet.
**Safety:** disconnecting is always safe. It cannot lose funds and cannot break anything permanently.

## Steps

1. Open **Connected sites**.
2. Read the list. Each entry shows the origin, the address and network it can read, and when it was
   last used.
3. Disconnect anything you do not recognise, or no longer use.
4. There is a control to end every connection at once. Use it if you are unsure.

## What the list tells you

- **Origin.** What the browser reported. This is the identity that matters.
- **Scope.** Which address, on which network, this site can read.
- **Last used.** How recently it interacted with the wallet. An old date on a site you use daily
  means it is not the connection you think it is.

Universe Wallet also scores connections for risk locally, on your device, and offers to revoke risky
sites in one step.

## Housekeeping worth doing

- Disconnect anything you tried once and never returned to.
- Disconnect anything whose origin you do not recognise.
- After finishing a trade or a mint, disconnect the site. Reconnecting takes one approval.
- Review the list after anything unexpected happens.

## Expected result

The list contains only sites you recognise and still use. Disconnected sites must ask again from the
beginning, and you see the full approval screen when they do.

## What disconnecting does not do

Disconnecting stops a site from asking for anything new. It does not:

- reverse a transaction you approved,
- revoke a signature you already gave, including a partial signature someone can still complete,
- remove an offer from a marketplace's order book.

See [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes) for why that
distinction matters, especially for listings.

If you are here because something went wrong, disconnect first, then go to
[If your wallet is compromised](/docs-wallet/safety/compromised-wallet).

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| A site you do not recognise | You connected and forgot, or a page you visited requested it | Disconnect. Then check activity for anything you did not authorize. |
| A site reappears after disconnecting | It requested again and you approved again | Read the approval window before approving |
| A site still shows you as connected on its own page | Its display is stale | The wallet's list is authoritative. Reload the page. |

## Related

- [Connection permissions](/docs-wallet/concepts/connections)
- [Security dashboard](/docs-wallet/tasks/security-dashboard)
