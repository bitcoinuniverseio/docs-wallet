---
title: Switch chain and network
description: Change which chain and network the wallet is showing, and understand what that does to connected sites and to your addresses.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Settings/NetworkTypeScreen.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone using more than one chain, or testing on a test network.
**Goal:** the wallet showing the chain and network you intend to act on.
**Prerequisites:** an unlocked wallet.
**Safety:** acting on the wrong network is how funds go somewhere unrecoverable. Check before you copy
an address.

## Steps

1. Open **Settings**, then **Network**.
2. The screen lists every network the build knows about, and states how many are selectable.
3. Choose one. Entries a build has not enabled are marked **Coming soon** and cannot be selected.
4. Confirm the network name now shown at the top of the wallet.

## The list

Ten networks appear: Bitcoin, Bitcoin Testnet, Bitcoin Testnet4 (Beta), Bitcoin Signet, Dogecoin,
Dogecoin Testnet, Zcash, Zcash Testnet, Fractal Bitcoin, and Fractal Bitcoin Testnet. See
[Chains and networks](/docs-wallet/concepts/chains-and-networks) for what each is for.

## What changes

- The addresses shown, because formats differ per network.
- The balance, assets, and activity, because they are read per network.
- Which protocol operations are conceivable, because authorization is recorded per protocol and per
  network.

## What does not change

- Your recovery phrase. One phrase covers every network.
- Anything on any chain. Switching is a view change, not a transaction.
- Existing connections. A connection is granted for one address on one network, and switching does
  not extend it to another. A site that needs the other network has to request it.

## A site can ask you to switch

An application can request a chain or network switch, and the wallet shows an approval for it. Read
which network is being requested before approving, particularly if you were not expecting the prompt.

## Expected result

The wallet header shows the network you chose, and the balance and assets are those of that network.

## How to verify

- The network name in the wallet header is the one you selected.
- The receiving address has the prefix you expect for that network.
- The balance matches what you expect for that network, which for a test network is usually zero until
  you use a faucet.

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| Balance is zero after switching | Correct. That network holds nothing yet. | Switch back, or fund it |
| An entry is marked Coming soon | The build did not enable that network | Nothing you can change locally |
| A connected site stops working | Its grant was for the other network | Reconnect on the network you are using |
| A switch prompt appeared unexpectedly | A page requested it | Read the network being requested. Reject if unclear. |

## Related

- [Chains and networks](/docs-wallet/concepts/chains-and-networks)
- [Connection permissions](/docs-wallet/concepts/connections)
