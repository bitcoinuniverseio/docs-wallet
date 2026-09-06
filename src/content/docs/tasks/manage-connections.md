---
title: Manage connections
description: Inspect connected website origins, revoke their wallet access, and verify that the change was saved.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Approval/ConnectedSitesScreen.tsx, frontend/ui/pages/DeveloperPlatform/DeveloperPermissionsScreen.tsx, backend/background/service/permission.ts
lifecycle: experimental
lastVerified: 2026-09-06
---

**Intended reader:** anyone who has connected a website to the wallet.
**Goal:** retain only website permissions you recognize and need.
**Prerequisites:** an unlocked wallet.
**Chain and network:** inspect the chain shown for each connection and the current network before
approving a later request.
**Safety:** disconnecting cannot retract a signature or transaction already delivered.

## Steps

1. Open **Connected sites**, or **Connected dApps** from the developer tools.
2. Read the exact origin for each entry. A site name or icon is not its identity.
3. Review the displayed chain, connection expiry and prior signature status.
4. Use **Disconnect** or **Revoke** for an unwanted origin. In Connected sites, confirm the dialog.
5. Wait for the change to complete, then reopen or refresh the list and confirm that the entry is gone.

Both screens use the same saved permissions. The local audit in Connected sites can highlight risky
or stale entries and offer a group revoke action. Its score is guidance, not proof that a site or
transaction is safe.

## Expected result

A successful revoke removes the origin's saved permission and ends its live wallet session.
Unexecuted requests must pass the current permission checks before signing or submission. Each new
signature still requires review; a label showing a prior signature does not authorize future ones.

These changes describe the source candidate. They do not establish a new published release or
compatibility with every website provider. See
[Capability evidence](/docs-wallet/reference/capability-evidence).

## How to verify

Reload the wallet's list after revoking. A site's own connected indicator can be stale. When the site
next requests wallet access, inspect the new approval rather than assuming a previous connection
still applies.

## Common failures and recovery

| What you see | What to do |
| --- | --- |
| The wallet reports that revocation failed | Do not assume access ended. Retry, then reload the wallet list |
| Connected sites cannot be loaded | Retry the read; a load error is not proof that no permissions exist |
| A site reappears | Check whether you approved a new connection; revoke it again if unwanted |
| The website still displays a connection | Check the wallet's list and reload the website |

Do not clear wallet storage as a repair for a failed permission read or write. If the failure
continues, use [support](/docs-wallet/help/support).

## What remains valid after disconnecting

Disconnecting does not reverse a transaction, invalidate a signature already supplied, or remove an
offer from a marketplace's order book. A partial signature may still be usable by someone who holds
it. See [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).

## Related

- [Connection permissions](/docs-wallet/concepts/connections)
- [Security dashboard](/docs-wallet/tasks/security-dashboard)
- [If your wallet is compromised](/docs-wallet/safety/compromised-wallet)
