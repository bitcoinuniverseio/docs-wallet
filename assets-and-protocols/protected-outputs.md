# Protected outputs

This page explains the single most important safety feature for asset holders: the wallet never spends an asset-bearing coin as ordinary bitcoin.

## The problem it solves

On Bitcoin, an inscription or token lives inside a regular coin (a UTXO). A wallet that treats every coin as plain bitcoin can select that coin to fund a payment and destroy the asset, spending a collectible as pocket change. This is the classic way inscriptions get lost.

## What Universe Wallet does

The wallet classifies every coin before spending. A coin is held out of ordinary funding when it carries or may carry value beyond its bitcoin:

- inscriptions and ordinals
- BRC-20, runes, alkanes, CAT-20 and CAT-721, stamps, and other indexed protocol assets
- rare-sat candidates, including coins whose rare-sat status could not be checked
- coins you froze, locked, or reserved yourself

On the send screen these appear as **Protected** rather than **Available**. A plain send simply cannot select them. Spending such a coin requires the flow built for that asset type, or an explicit confirmation step that names what you are about to move: *"Protected asset confirmation required"*.

## Inspecting and freeing coins

- **Settings → Tools → Coin control** opens **Locked asset UTXOs**, where every held-back coin is listed with why: **Frozen**, **Locked**, **Reserved**, **Inscription**, **Protocol asset**, **CAT asset**, **Rare sat**, or **Provider asset**. Plain coins read **Cardinal BTC**.
- The **Unlock** control next to **Protected** on the send screen goes to the same inspection.
- The cleanup tool merges selected plain outputs back to your own address in one transaction; the send screen switches to a merge mode and states: selected outputs will be merged back to your own address. Review fees before signing.

## During approvals

The [review screen](../using-wallet/reviewing-a-transaction.md) enforces the same rule against requests from connected sites. If a request would spend reserved coins, a red **RESERVED COINS** block names them. If an input carries assets, the input list marks it, and the impact summary shows each asset entering or leaving the wallet.

## What can go wrong

- **You genuinely want to spend an asset coin as bitcoin.** Use coin control, select it deliberately, and pass the named confirmation. The friction is the feature.
- **A rare-sat check fails.** The coin stays protected and is labelled that its rare-sat status is unavailable, because unknown is not safe.

## Next

- [Coin control](../using-wallet/coin-control.md)
- [Balances](../wallet-basics/balances.md)
