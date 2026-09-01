---
title: Security dashboard
description: What the security dashboard tracks, what it can tell you, and the limits of what any dashboard can see.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Settings/SecurityDashboardScreen.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone doing a periodic check of their own setup.
**Goal:** knowing whether your wallet's posture matches what you intended.
**Prerequisites:** an unlocked wallet.
**Safety:** the dashboard reports. It does not defend. Acting on what it says is the part that matters.

## Where it is

**Settings**, then **Security**. The screen has no protocol gate, so it is present regardless of what
your build authorizes.

## What it tracks

- **Recovery status.** Whether you have confirmed a backup of your recovery phrase.
- **Login history.** When the wallet was unlocked.
- **Session log.** What happened during recent sessions.
- **Phishing URL checking.** A place to check a URL against the wallet's phishing policy before you
  visit it.
- **Connection risk.** Local scoring of your connected sites, with a one-step way to revoke risky
  ones.

Everything here is computed on your device. None of it is a report sent anywhere.

## A monthly ten-minute check

1. Open the dashboard and read the recovery status. If it does not say your phrase is backed up,
   go to [Back up your recovery phrase](/docs-wallet/start/back-up).
2. Read the login history. Anything you cannot account for is worth investigating.
3. Open [Connected sites](/docs-wallet/tasks/manage-connections) and remove anything you no longer
   use.
4. Check your auto-lock timer is short enough for how you actually work. See
   [Locking and passwords](/docs-wallet/tasks/lock-and-password).
5. Confirm your paper backup is still where you think it is, and still legible.

## What a dashboard cannot see

- **Whether your recovery phrase has been copied.** A phrase read from paper leaves no trace anywhere.
- **Whether a signature you gave was a good idea.** It can tell you what you signed, not what it
  meant.
- **Whether an outstanding partial signature can still be completed by someone.** See
  [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).
- **Anything happening in another wallet using the same phrase.**

A clean dashboard is reassuring and it is not proof. Treat it as one input.

## Optional controls worth turning on

Universe Wallet includes optional per-transaction and daily spending caps, and an address whitelist.
They are off by default, because most people do not want them and a wallet that demands configuration
before it is safe is a badly designed wallet. If your holdings are significant, they are worth the
five minutes.

## Related

- [Security model](/docs-wallet/safety/security-model)
- [If your wallet is compromised](/docs-wallet/safety/compromised-wallet)
