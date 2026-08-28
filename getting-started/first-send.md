# Send for the first time

This page sends bitcoin from your wallet: recipient, amount, fee, review, sign.

## Before you start

- Coins in the wallet ([receive first](first-receive.md)).
- The recipient's address, or a payment request they gave you.
- A sense of urgency, or the lack of one. It decides your fee.

## Steps

1. Check the header for the right account and network, then select **Send**.
2. Enter the recipient. You can paste a payment request to fill the recipient and amount in one step. The wallet checks the address as you type and warns when it looks confusingly similar to one you used recently; treat that warning as a reason to compare the whole address again.
3. Enter the amount, or use **25% / 50% / 75% / Max**. The wallet converts to USD when a price is available and rejects amounts below the network's dust floor.
4. Note the balance card. **Available** is what this payment can use. **Protected** is bitcoin locked inside outputs that carry inscriptions, tokens, or other assets; a plain send never touches it. See [Protected outputs](../assets-and-protocols/protected-outputs.md).
5. Pick a fee. **Slow**, **Avg**, and **Fast** show the live rate and a time estimate; **Custom** takes an exact sat/vB rate. The calm-fee panel suggests a cheaper rate when waiting is fine. Details in [Fees](../wallet-basics/fees.md).
6. Decide on **RBF**. On means you can raise the fee later if the network gets busy. Off means the first broadcast is final. Default is off.
7. Select **Next**. The [review screen](../using-wallet/reviewing-a-transaction.md) shows the full impact: what leaves, what returns as change, the exact fee, and any warnings. Read it. Nothing is spent yet.
8. Select **Sign & Pay**. On success the wallet shows **Payment Sent** with a **View on Block Explorer** link.

## What success looks like

The transaction appears in **History** as a Send, pending until its first confirmation. The recipient sees it within seconds of broadcast.

## What can go wrong

- **"Amount exceeds your available balance."** The amount plus the fee is more than **Available**. Lower the amount, pick a slower fee, or use **Max**, which accounts for the fee.
- **Fee rates will not load.** Sending pauses rather than guessing: *"Live fee rates are unavailable. Sending is paused until current network rates load."* Select **Retry**; if it persists, see [Troubleshooting](../troubleshooting/README.md).
- **The review screen shows something you did not enter.** Reject. A rejected request costs nothing. Then re-check the page or app that produced the request.
- **It stays pending for hours.** A low fee in a busy mempool. If you enabled RBF you can replace it with a higher fee; otherwise it confirms when the network clears or eventually drops. See [Activity](../wallet-basics/activity.md).

## Next

- [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md), the screen that protects you
- [Coin control](../using-wallet/coin-control.md) when you want to choose exact coins
