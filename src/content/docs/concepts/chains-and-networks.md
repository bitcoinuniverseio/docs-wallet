---
title: Chains and networks
description: The ten networks the wallet can switch between, what switching does and does not change, and why a test network address must never receive real money.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/constant/index.ts, frontend/ui/pages/Settings/NetworkTypeScreen.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

## The networks in the picker

| Network | Unit | Purpose |
| --- | --- | --- |
| Bitcoin | BTC | Real money. |
| Bitcoin Testnet | tBTC | Test coins with no value. |
| Bitcoin Testnet4 (Beta) | tBTC | Newer test network, labelled Beta in the product. |
| Bitcoin Signet | sBTC | Test network with predictable block production. |
| Dogecoin | DOGE | Real money. |
| Dogecoin Testnet | tDOGE | Test coins with no value. |
| Zcash | ZEC | Real money. Transparent addresses. |
| Zcash Testnet | tZEC | Test coins with no value. |
| Fractal Bitcoin | FB | Real money. |
| Fractal Bitcoin Testnet | tFB | Test coins with no value. |

Entries that a build has not enabled appear in the list marked **Coming soon** and cannot be selected.
They are shown rather than hidden so that the list does not silently change shape between builds.

:::note[Babylon and Cosmos]
The protocol registry records a Babylon entry on a Cosmos network, and the source tree contains Babylon
screens. **Babylon is not selectable in the network picker**, and its routes are gated with a design
obligation recorded as not intended, meaning only the unavailable state ships. Treat Cosmos and
Babylon as unavailable.
:::

## What switching a network changes

- The addresses shown, because address formats differ per network.
- The balance, assets, and activity, because they are read per network.
- Which protocol operations are even conceivable, because authorization is recorded per protocol **and
  per network**.

## What switching does not change

- Your recovery phrase. One phrase covers every network.
- Your keys. They are derived per chain from the same phrase.
- Anything on the chain. Switching is a view change, not a transaction.

## Test networks

Test coins are worthless by design. That is the point: you can practise sending, reviewing, and
recovering without risk.

:::danger[Never send real funds to a test network address]
Mainnet and testnet addresses look similar and are not interchangeable. Coins sent to the wrong
network do not bounce back, and there is no support process to retrieve them. Check the network shown
at the top of the wallet before you copy any address.
:::

Practising on a test network first is the cheapest safety measure available to you, and almost nobody
does it. It is worth twenty minutes.

## Connected sites and networks

A connection is granted for **one address on one network**. Switching networks does not extend an
existing connection to the new one. A site that needs the other network has to request it, and you
approve that separately. See [Connection permissions](/docs-wallet/concepts/connections).

## Related

- [Switch chain and network](/docs-wallet/tasks/switch-chain-and-network)
- [The protocol registry](/docs-wallet/assets/protocol-registry)
