# Fees

This page explains what a network fee buys, how the wallet's presets work, and when to take manual control.

## What the fee is

Every transaction pays the network, not Universe, to be included in a block. The price is quoted in satoshis per virtual byte (sat/vB) and moves with demand. A higher rate confirms sooner; a lower rate waits longer. The fee depends on the transaction's size in bytes, not on the amount you send.

## The presets

The send screen loads live rates and offers:

- **Slow**, about 1 hour
- **Avg**, about 30 minutes, the default
- **Fast**, about 10 minutes
- **Custom**, an exact sat/vB rate you type

Each tile shows the current rate. On Fractal the time estimates are seconds to minutes because its blocks are faster. Estimates are estimates: confirmation time is not guaranteed by anyone.

Above the presets, the calm-fee panel offers **Flexible / Today / Now** timing and shows what the calmer rate saves against the priority rate, so paying less is a visible, deliberate choice.

If live rates cannot load, the wallet pauses sending instead of guessing at a rate. Retry, or come back; a stale rate can strand a payment for days.

## RBF: your undo button for fees

**RBF** (replace-by-fee) is a toggle on the send screen, off by default. When on, the transaction is marked replaceable and you can rebroadcast it later with a higher fee if it sits unconfirmed. When off, the first broadcast is final. The [review screen](../using-wallet/reviewing-a-transaction.md) states which behavior the transaction carries: fee bumpable, or final fee.

Turn RBF on when the payment is not time-critical and fees are volatile. Leave it off when the receiver dislikes replaceable payments.

## Reading fees on the review screen

The review screen shows the fee in coin and USD, the exact rate, and a pressure chip comparing your rate against the current target: **High fee**, **Normal fee**, or **Slow fee**. It also warns when your rate is far from the recommended rate in either direction. A rate far above target wastes money; a rate far below strands the payment.

## What can go wrong

- **Paid Fast, still waiting.** Demand spiked after broadcast. With RBF on, replace with a higher fee. Without it, wait; see [Activity](activity.md) for pending states.
- **Fee looks huge relative to a small send.** Many small inputs make a physically large transaction. [Coin control](../using-wallet/coin-control.md) and its merge tool consolidate small coins when rates are low, so future sends are cheap.

## Next

- [Activity and transaction states](activity.md)
- [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md)
