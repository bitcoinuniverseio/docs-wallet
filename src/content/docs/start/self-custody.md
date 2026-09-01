---
title: Holding your own keys
description: What self-custody actually transfers to you, the four irreversible facts it creates, and the habits that keep it survivable.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/service/keyring
lifecycle: experimental
lastVerified: 2026-09-01
---

Self-custody means the keys that authorize spending exist only on your device, protected by a
password only you know, derived from a phrase only you hold.

Nobody is holding a copy for you. Read that sentence twice, because everything below follows from it.

## The four facts

### 1. There is no password reset

Your password unlocks one installation of the extension on one device. It is not an account
credential. There is no email link, no identity check, no support override. If you forget it, you
reinstall and restore from your recovery phrase.

### 2. The recovery phrase is the wallet

Those words are not a hint or a backup code. They mathematically are every key in the wallet. Anyone
who reads them owns everything they control, immediately and permanently, from anywhere.

### 3. A confirmed transaction is final

Once a Bitcoin transaction confirms, no one can reverse it: not you, not Universe, not the miner, not
the exchange on the other end. A wrong address is not a mistake you can appeal.

### 4. Nobody legitimate ever needs your phrase

Not support, not a verification step, not a wallet upgrade, not a giveaway, not an airdrop claim, not
a migration tool, not the person who says they are helping you recover it. There is no exception, and
there never will be. See [Phishing and impostors](/docs-wallet/safety/phishing).

## The habits that make this survivable

- Write the phrase on paper before you fund the wallet. Not in a screenshot, not in a note app, not
  in a password manager sync you do not control, not in a message to yourself.
- Fund it with a small amount first and move that amount out again, so you have practised the whole
  loop before it matters.
- Read the approval screen every time, even when you are sure. The one you skim is the one that was
  different.
- Keep a second wallet for connecting to applications you are trying for the first time, and keep
  your long-term holdings out of it.

## What Universe can and cannot do for you

| Universe can | Universe cannot |
| --- | --- |
| Serve the balances and asset data the wallet displays | See or store your recovery phrase, keys, or password |
| Ship a build that refuses to spend an asset-bearing coin by accident | Move, freeze, or return your funds |
| Publish which operations a release authorized | Reverse a transaction you signed |
| Answer documentation and product questions | Recover a lost phrase, for anyone, ever |

Next: [Which version you are running](/docs-wallet/start/versions).
