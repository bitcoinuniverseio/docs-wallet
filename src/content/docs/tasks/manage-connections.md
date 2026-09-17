---
title: Manage connections
description: Identify connected sites by origin and chain, read the displayed connection state, and verify that revocation was saved.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Approval/ConnectedSitesScreen.tsx, backend/background/service/permission.ts
lifecycle: experimental
lastVerified: 2026-09-17
---

**Intended reader:** anyone who has connected sites, which is anyone who has used a marketplace.
**Goal:** a connection list you recognise, with nothing on it you cannot account for.
**Prerequisites:** an unlocked wallet.
**Safety:** disconnecting cannot retract a signature or transaction already delivered.

## Steps

1. Open **Connected sites**.
2. Read the exact origin and displayed chain for each entry. A site name or icon is not its identity.
3. Disconnect anything you do not recognise, or no longer use.
4. If you use a group revoke action, check the result for each affected site.
5. Wait for the wallet to confirm that removal was saved. Reload the wallet's connection list and
   verify that the unwanted entry is gone.

## What the list tells you

- **Origin.** The exact website origin reported to the wallet.
- **Chain.** The chain shown on the connection card.
- **Signature status.** The card shows **Signed** or **Unsigned**. This does not replace reviewing
  a new signature request.
- **Connection state.** The card shows **Active** or **Stored only** for the saved record.
- **Expiry.** Read the expiry text displayed for that connection.

Universe Wallet also scores connections for risk locally, on your device, and offers to revoke risky
sites in one step.

## Housekeeping worth doing

- Disconnect anything you tried once and never returned to.
- Disconnect anything whose origin you do not recognise.
- After finishing a trade or a mint, disconnect the site. Reconnecting takes one approval.
- Review the list after anything unexpected happens.

## Expected result

After the wallet confirms removal, the origin should be absent from a successfully refreshed list.
The disconnected site must request access again. A failed save or read does not establish that
access ended.

## What disconnecting does not do

A successfully saved disconnect ends the site's saved wallet access. It does not:

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
| The connection list cannot be loaded | Current permissions could not be read | Retry the read. A load error is not an empty permission list. |
| Disconnect or revoke fails | Removal has not been confirmed | Retry, then reload the wallet list. Treat access as unresolved until the saved result is verified. |
| A site reappears after disconnecting | Removal may not have been saved, or a new connection was approved | Check the saved result and read any new approval before accepting it. |
| A site still shows you as connected on its own page | Its display may be stale | Confirm removal in a successfully refreshed wallet list, then reload the site. |

Keep wallet storage intact while resolving a failed permission read or write. If the failure
continues, use [support](/docs-wallet/help/support).

## Related

- [Connection permissions](/docs-wallet/concepts/connections)
- [Security dashboard](/docs-wallet/tasks/security-dashboard)
