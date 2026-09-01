---
title: What Universe Wallet is
description: A self-custody browser extension for Bitcoin, Dogecoin, Zcash, and Fractal Bitcoin, built so that coins carrying digital artifacts never fund an ordinary payment.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: README.md, docs/STORE-LISTING.md
lifecycle: experimental
lastVerified: 2026-09-01
---

Universe Wallet is a browser extension that holds Bitcoin and Bitcoin-adjacent chains, and that
treats a coin carrying a digital artifact differently from a coin carrying only money.

## What it does

- Holds keys for **Bitcoin, Dogecoin, Zcash, and Fractal Bitcoin**, each with their test networks.
- Generates keys on your device, encrypts them with a password you choose, and keeps them there.
- Classifies every coin before spending, so an inscription or a token balance is not handed to a
  miner as change.
- Shows what leaves, what returns, and at what fee before you approve any signature, with a
  confidence mark on every interpreted fact.
- Grants a connected site one address on one network, for a window that expires.

## What it is not

- **Not a custodian.** Universe cannot move your funds, cannot reverse a transaction, and cannot
  restore a recovery phrase you lost. That is the trade you made by holding your own keys.
- **Not an exchange or a broker.** There is no buy button that takes your card, and nothing here is
  investment advice.
- **Not a way to make chain activity private.** Bitcoin addresses and amounts are public. See
  [Privacy](/docs-wallet/safety/privacy).
- **Not a guarantee that a protocol works.** The wallet ships a protocol action only when the exact
  build carries evidence for the whole path behind it. See
  [What this release authorizes](/docs-wallet/assets/support-state).

## Who it is for

Someone who owns digital artifacts on Bitcoin and wants to stop worrying that a routine payment will
quietly spend one of them. If you only ever hold plain bitcoin, a simpler wallet will serve you as
well, and this documentation will still be useful for the parts about reading a transaction.

## What to read next

1. [Holding your own keys](/docs-wallet/start/self-custody), if you have not done this before.
2. [Which version you are running](/docs-wallet/start/versions), which decides how much of this site
   applies to you.
3. [Install](/docs-wallet/start/install).
