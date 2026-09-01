---
title: What a digital artifact is
description: How an inscription, a token balance, and a rare satoshi actually exist on Bitcoin, and why that makes them fragile in an ordinary wallet.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/protocol-registry.ts
lifecycle: experimental
lastVerified: 2026-09-01
---

Bitcoin has no field for "this coin is a collectible". Everything people call a digital artifact is
built on top of ordinary transaction structure, and understanding which part of the structure carries
it explains almost every surprising behaviour you will meet.

## The three shapes

### An inscription

Data written into the witness of a transaction, and then treated as attached to one specific satoshi.
Ownership follows that satoshi as it moves from output to output.

Practically: the inscription lives on **one unspent output**. The output usually holds a tiny amount,
often 546 satoshis, because the value is what is written on it, not what it holds.

### A token balance

An amount recorded in a ledger that indexers compute by reading the chain. The chain itself has no
token balance field. Different indexers reading the same blocks can, in principle, disagree, which is
why protocol support depends on a specific indexer being part of the evidence chain.

Practically: the balance is associated with an address or an output, according to that protocol's
rules, and moving the wrong coin can move or destroy the balance.

### A rare satoshi

A satoshi whose position in the issuance order is interesting: the first of a block, the first of a
halving epoch, and so on. Nothing marks it. Its rarity is computed from where it sits in the
sequence.

Practically: rarity is a property of a satoshi inside an output. Spend the output carelessly and the
rare satoshi ends up wherever the change went.

## Why this makes them fragile

An ordinary wallet sees coins and amounts. It has no reason to treat a 546 satoshi output as anything
other than a small amount of money, and it will happily use it to fund a payment or roll it into a
fee.

That is not a bug in that wallet. It is a wallet doing exactly its job, on a chain where the artifact
is invisible without an extra layer of interpretation.

Universe Wallet adds that layer before coin selection, which is the whole point of
[Protected outputs](/docs-wallet/concepts/protected-outputs).

## Why "supported" is a stronger word here than elsewhere

Displaying a token balance requires an indexer. Moving one requires the wallet, the indexer, the API,
the network, and reconciliation afterwards to all agree. A wallet that shows you a balance it cannot
correctly move is more dangerous than one that shows nothing.

That is why the product treats support as something to be evidenced rather than declared. See
[What this release authorizes](/docs-wallet/assets/support-state).

## Related

- [Payment and asset addresses](/docs-wallet/concepts/addresses)
- [The protocol registry](/docs-wallet/assets/protocol-registry)
- [Glossary](/docs-wallet/reference/glossary)
