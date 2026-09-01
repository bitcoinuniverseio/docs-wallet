---
title: Choose a fee
description: What the presets mean, how to pick a custom rate, and why the choice matters more here than in most wallets.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/constant/index.ts
chain: [bitcoin]
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone about to send.
**Goal:** a transaction that confirms in the time you need, without overpaying.
**Prerequisites:** a send in progress.
**Safety:** picking too low is not recoverable inside this wallet. Read the warning.

## What you are choosing

Not an amount. A **rate**, in satoshis per virtual byte. The wallet multiplies that rate by the size
of the transaction it built to get the fee. See
[Inputs, outputs, fees, change](/docs-wallet/concepts/inputs-outputs-fees).

Two payments of the same value can carry very different fees, because one spends more coins than the
other and is therefore physically larger.

## The presets

The wallet offers live presets alongside a custom option. In the source they are labelled Standard,
Fast, Instant, and Custom, ordered from cheapest and slowest to most expensive and quickest.

| Preset | Use it when |
| --- | --- |
| Standard | Nothing is waiting on this. Hours are fine. |
| Fast | You want it in the next few blocks. |
| Instant | It is time-sensitive, or the mempool is busy and you cannot wait. |
| Custom | You have a specific rate in mind and know why. |

Presets are computed from current network conditions, so their sat/vB values move. The number shown
at the moment you approve is the one that applies.

## Setting a custom rate

Enter the rate in sat/vB. The review screen shows the resulting fee amount before you approve, so you
can check the arithmetic against your expectation.

A rate below what blocks are currently clearing will sit unconfirmed for a long time, possibly
indefinitely if the network stays busy.

:::danger[Choose carefully, because there is no fee bump here]
Universe Wallet 1.7.5.8 has no fee-bump, speed-up, or child-pays-for-parent flow. A transaction sent
at too low a rate can only be waited out, or replaced using separate software. This is different from
wallets that let you raise the fee afterwards, and it is the single most important thing to know
before choosing a rate.
:::

## When the fee looks too high

Almost always because the transaction has many inputs. Check the input list on the review screen. A
payment funded from twenty small coins is large and therefore expensive, regardless of the amount.

Options:

- Send a different amount, so a smaller set of coins covers it.
- Use coin control to select fewer, larger coins where the flow allows it. See
  [Coin control](/docs-wallet/tasks/coin-control).
- Wait for a quieter period, if the payment is not urgent.

## Expected result

The review screen shows the fee as an amount and a rate. After broadcast, the activity entry shows the
same fee.

## How to verify

Compare the fee on the review screen with the fee in your activity entry. They should match exactly.
If the confirmation is slower than the preset suggested, that is network behaviour, not a wallet
error: a preset is an estimate of conditions, not a promise.

## Related

- [Send bitcoin](/docs-wallet/tasks/send)
- [Review a transaction](/docs-wallet/tasks/review-a-transaction)
