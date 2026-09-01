---
title: Receive
description: Get an address, create a payment request with an amount and a note, and understand what appears while a payment is still unconfirmed.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Wallet/ReceiveScreen.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone being paid.
**Goal:** funds arriving at an address you control, on the network you meant.
**Prerequisites:** an unlocked wallet with the intended account and network selected.
**Safety:** the risk here is publishing the wrong address, not losing what you already have.

## Steps

1. Confirm the account and network shown at the top of the wallet.
2. Open **Receive**.
3. Copy the address, or show the QR code for someone to scan.
4. Optionally set an amount and a note. The wallet encodes those into the QR code and into a
   copyable link, so the sender's wallet can pre-fill them.
5. Share it.

## Verify before sharing

- Compare the **first four and last four characters** of the address against what the recipient sees.
  Clipboard-replacement malware changes the middle and leaves the ends plausible.
- Check the **prefix matches the network**. See
  [Payment and asset addresses](/docs-wallet/concepts/addresses).
- Check the **chain**. A Bitcoin address is not a Dogecoin address and nothing will stop a sender
  trying.

## Address reuse

Reusing one address works and links every payment to it publicly. Using a fresh address per payment
is better for privacy and makes no difference to safety. See [Privacy](/docs-wallet/safety/privacy).

## Which address to publish

| You are receiving | Use |
| --- | --- |
| Plain bitcoin | Your default receiving address, Native SegWit unless you changed it |
| An inscription or ordinal | Your Taproot address, unless the sender specifies otherwise |
| From a service that rejects `bc1` | Your Nested SegWit address, starting with `3` |

## Expected result

The payment appears under **Activity** as pending, then confirms. Your balance rises by the amount
sent. The sender pays the fee unless they chose to take it out of the amount.

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| Nothing arrives, sender has a transaction id | It went somewhere, possibly not to you | Look up the id and check which address it paid |
| It arrives but the balance is unavailable | Unconfirmed, or classified as asset-bearing | See [Protected outputs](/docs-wallet/concepts/protected-outputs) |
| Balance updates, assets do not | Asset data comes from indexers and can lag | Wait, then see [Troubleshooting](/docs-wallet/help/troubleshooting) |
| Amount is less than agreed | The sender took the fee out of the amount | Not a wallet problem. Ask the sender. |

## Recovery path

Nothing about receiving can lose funds you already hold. If you published an address that was not
yours, the funds went to whoever owns it, and there is no recall.

## Related

- [Receive for the first time](/docs-wallet/start/first-receive)
- [Read your activity](/docs-wallet/tasks/activity)
