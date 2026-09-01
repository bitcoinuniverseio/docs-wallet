---
title: Locking and passwords
description: What the password actually protects, how to set the auto-lock window, and what changing a password does and does not do.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Settings/ChangePasswordScreen.tsx, LockTimePage.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** everyone.
**Goal:** a wallet that is locked when you are not using it, with a password you will still know.
**Prerequisites:** an unlocked wallet.

## What the password protects

It encrypts the vault on **this device**. Someone with access to your unlocked computer cannot open
the wallet without it.

## What it does not do

- It is **not your backup**. Losing it does not lose your funds, as long as you have the recovery
  phrase.
- It does **not protect the recovery phrase** anywhere else. Anyone with your phrase does not need
  your password.
- It cannot be reset. There is no account, no email link, no support override. If you forget it, you
  reinstall and restore from the phrase. See
  [Backup and recovery](/docs-wallet/concepts/backup-and-recovery).

## Auto-lock

**Settings**, then **Lock time**. The range runs from 30 seconds to 4 hours, with a default of 30
minutes.

| Your situation | Suggested |
| --- | --- |
| Shared or public computer | 30 seconds to 5 minutes |
| Personal laptop you carry | 5 to 15 minutes |
| Home machine only you use | 30 minutes, the default |
| Large holdings, anywhere | Shorter than feels convenient |

You can also lock immediately from the wallet menu, which is worth doing every time you step away.

## Changing your password

**Settings**, then **Password**. You need the current one.

Changing it re-encrypts the vault on this device. It does not change your recovery phrase, your keys,
your addresses, or anything on any chain. A password change is not a response to a phrase compromise:
if your phrase was exposed, the password is irrelevant, and you need
[If your wallet is compromised](/docs-wallet/safety/compromised-wallet).

## Choosing one

Long beats complicated. Four or five unrelated words you can picture will outlast a short string of
symbols you will forget. Do not reuse a password you use anywhere else, because the compromise of an
unrelated service should not reach your wallet.

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| Password rejected and you are sure it is right | Keyboard layout, caps lock, or a similar-looking character | Type it into a plain text field first to see it |
| Forgotten entirely | Not recoverable | Reinstall and restore from the phrase |
| The wallet locks constantly | Auto-lock is set very short | Raise it, within reason |
| The wallet never seems to lock | It locks on the timer, not on tab close | Use the immediate lock when you step away |

## Related

- [Security dashboard](/docs-wallet/tasks/security-dashboard)
- [Backup and recovery](/docs-wallet/concepts/backup-and-recovery)
