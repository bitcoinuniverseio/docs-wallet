---
title: Address types
description: The six Bitcoin address variants Universe Wallet derives, their derivation paths, their prefixes, and which to choose.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/constant/index.ts
chain: [bitcoin]
lifecycle: experimental
lastVerified: 2026-09-01
---

Universe Wallet derives six Bitcoin address variants from one recovery phrase. Four are formats you
would recognise; two exist only so that wallets which derived addresses in an older, non-standard way
can still be imported.

| Name | Path | Starts with | Use it when |
| --- | --- | --- | --- |
| Native SegWit (P2WPKH) | `m/84'/0'/0'/0` | `bc1q` | Default. Cheapest to spend, accepted almost everywhere. |
| Nested SegWit (P2SH-P2WPKH) | `m/49'/0'/0'/0` | `3` | A service cannot pay a `bc1` address. |
| Taproot (P2TR) | `m/86'/0'/0'/0` | `bc1p` | Holding inscriptions and most protocol assets. |
| Legacy (P2PKH) | `m/44'/0'/0'/0` | `1` | A service accepts nothing else. Most expensive to spend. |
| Native SegWit, BIP-44 path | `m/44'/0'/0'/0` | `bc1q` | Import compatibility only. Some wallets derived SegWit keys on the legacy path. |
| Taproot, BIP-44 path | `m/44'/0'/0'/0` | `bc1p` | Import compatibility only, for the same reason. |

## Why the same phrase gives different addresses

The derivation path is part of the calculation. Change the path, and the same twelve words produce a
completely different set of keys, which are equally valid and equally yours, holding nothing.

This is why an imported wallet can appear empty when nothing is wrong. It is not the phrase. It is the
path. See [Import an existing wallet](/docs-wallet/start/import-a-wallet).

## Changing your address type

Open **Settings**, then **Address type**. Changing it does not move anything and does not create a new
wallet. It changes which of your addresses the wallet shows you and spends from by default. Coins at
the old address type are still yours, still visible, and still spendable.

## Which one to choose

- **If you are unsure, keep Native SegWit.** It is the default for good reasons: lowest fees to spend,
  and near-universal acceptance.
- **If you hold or plan to hold inscriptions,** use Taproot for those, because marketplaces and
  indexers expect it. See [Payment and asset addresses](/docs-wallet/concepts/addresses).
- **Do not use Legacy for anything new.** It works, and it costs more in fees every time you spend.

## Fee consequences

Address type affects the size of a transaction, and size is what you pay for. Roughly, spending a
Legacy input costs the most, Nested SegWit less, and Native SegWit and Taproot the least. If you hold
a mixture, a consolidation of many small Legacy coins can cost noticeably more than the same
consolidation of Native SegWit coins.

## Related

- [Payment and asset addresses](/docs-wallet/concepts/addresses)
- [Inputs, outputs, fees, change](/docs-wallet/concepts/inputs-outputs-fees)
