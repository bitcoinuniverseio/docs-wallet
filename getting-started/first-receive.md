# Receive for the first time

This page gets coins into your wallet safely: the right address, on the right network, with an optional payment request.

## Before you start

- A wallet exists and is unlocked.
- You know which network the sender will use. Coins sent on the wrong network do not arrive. The network screen itself reminds you: a test network never shows mainnet deposits, and a main network never shows testnet assets.

## Steps

1. Check the header: the account and network shown are the ones you are about to receive on. Switch first if needed.
2. Select **Receive**.
3. The **Ready to receive** section shows your address and its QR code. Share only this address for the selected account, by either:
   - letting the sender scan the QR, or
   - copying the address and sending it through a channel you trust.
4. To ask for a specific amount, use **Request payment**: enter an **Amount** and an optional **Note**, then **Copy payment link** or **Copy payment message**. The QR updates as you type. Leave the amount empty, or use **Allow any payment amount**, when the sender decides.
5. After the sender pays, the transaction appears in **History**, first as pending, then confirmed. See [Activity](../wallet-basics/activity.md) for what the states mean.

## Verify, do not trust

- Compare the first and last characters of the copied address with what the sender pastes back to you. Clipboard malware swaps addresses; endpoints are how you catch it.
- On a hardware account, verify the receive address on the device screen before sharing it.

## What can go wrong

- **Nothing arrives.** Confirm the sender paid the exact address on the same network. A payment to a Bitcoin testnet address does not appear on mainnet, and the reverse.
- **The amount differs from the request.** The payment request is a suggestion to the sender's wallet, not a contract. What counts is the transaction in History.

## Next

- [Send for the first time](first-send.md)
- [Balances explained](../wallet-basics/balances.md)
