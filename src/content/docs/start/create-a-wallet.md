---
title: Create a wallet
description: Generate a new 12-word wallet, choose a password, pick an address type, and finish the backup check before any money is involved.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Account/CreateHDWalletScreen.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** someone setting up their first Universe Wallet.
**Goal:** a funded-ready wallet whose recovery phrase is written down on paper.
**Prerequisites:** the extension installed. Pen and paper. Ten quiet minutes.
**Chain and network:** all chains. Defaults to Bitcoin mainnet.
**Safety:** the phrase you are about to see is the wallet. Nobody is keeping a copy.

:::caution[Do this where nobody can see your screen]
Not on a shared machine, not on a call, not while screen recording, not in a coffee shop with your
back to the room. A phrase seen once is a phrase gone forever.
:::

## Steps

1. Open the extension and choose to create a new wallet.
2. **Set a password.** This encrypts the vault on this device. It is not recoverable and it is not
   your backup. Use something long that you will still know in a year.
3. **Read the recovery phrase.** The wallet generates a 12-word BIP-39 phrase. Write the words on
   paper, in order, numbered. Do not photograph it. Do not type it anywhere.
4. **Pass the confirmation check.** The wallet asks you to put selected words back in place. This
   exists so that a phrase you never actually wrote down cannot silently become the only copy.
5. **Choose an address type.** Native SegWit is the default and is right for most people. If you are
   going to hold inscriptions, read
   [Payment and asset addresses](/docs-wallet/concepts/addresses) first, because Taproot is where
   artifacts conventionally live.
6. Finish. The wallet opens on an empty account.

## Expected result

- A wallet with one account, no balance, and an address you can receive to.
- A paper record of 12 words, in order, stored somewhere you would still find after a house move.

## How to verify

Before you put real money in, prove the backup works:

1. Note your first receiving address.
2. Lock the wallet, or use a second browser profile.
3. Restore from the phrase you wrote down.
4. Confirm the same first address appears.

If a different address appears, either a word is wrong, the order is wrong, or the address type
differs. Fix that now, while the wallet is empty. See
[Backup and recovery](/docs-wallet/concepts/backup-and-recovery).

## Common failures

| What happens | What it means | What to do |
| --- | --- | --- |
| The confirmation check rejects your words | The written copy does not match | Start over rather than guessing. An empty wallet costs nothing to redo. |
| You wrote the words but not the order | BIP-39 order is part of the secret | Redo the creation. Order matters. |
| A restore shows a different address | Wrong address type, not a wrong phrase, in most cases | Switch address type and compare. See [Address types](/docs-wallet/concepts/address-types). |
| You closed the window before writing anything down | Nothing is lost yet, because nothing is funded | Delete the wallet and create a new one. |

## Recovery path

While the wallet is empty, every mistake is free. That is the only time this is true, so use it. Once
funds arrive, the phrase on paper is the only path back.

## Related

- [Back up your recovery phrase](/docs-wallet/start/back-up)
- [Backup and recovery](/docs-wallet/concepts/backup-and-recovery)
- [Locking and passwords](/docs-wallet/tasks/lock-and-password)
