# Connect a hardware wallet

This page connects a Keystone hardware wallet, so your keys stay on the device and Universe Wallet only prepares and broadcasts what the device signs.

## What is supported today

- **Keystone**: supported, over USB or air-gapped QR codes.
- **Ledger** and **Trezor**: shown in the product as **Coming soon**. They cannot be connected yet. [Known limitations](../reference/known-limitations.md) tracks this.
- Any signer that can import a public key and sign externally can be used through a [watch-only wallet](../security-and-recovery/watch-only.md) instead.

The product marks the hardware wallet feature experimental. Verify the first address on the device before funding it, and start with a small amount.

## Connect a Keystone

1. Open Universe Wallet and select **Connect to Hardware Wallet**, then **Keystone**.
2. Pick a path on the **Connect Keystone** screen:
   - **Connect via USB**: plug the Keystone in and approve the connection on the device.
   - **Scan to connect**: fully air-gapped. On the Keystone, show the account QR code; in Universe, scan it with your camera.
3. Choose the accounts and address type to bring in.
4. Finish setup. The wallet tags these accounts **KEYSTONE**.

## Signing with a Keystone

When you send or approve a transaction from a Keystone account, the wallet shows its full [review screen](../using-wallet/reviewing-a-transaction.md) first, then hands the transaction to the device:

- USB: confirm on the device when it prompts.
- QR: Universe shows a QR to scan with the Keystone; the Keystone displays the transaction, you confirm on the device, then scan the signed result back.

The device screen is the final authority. If the address or amount on the Keystone does not match what Universe showed, reject on the device and stop.

## What can go wrong

- **The camera cannot scan.** Use the **Camera not working?** link to paste the exported data instead, or use USB.
- **The device rejects the transaction.** Nothing was signed or spent. Re-read the review screen; if the mismatch repeats, treat it as a red flag and ask [support](../support/README.md).
- **Firmware questions.** Keystone documents device setup and firmware at [keyst.one](https://keyst.one/).

## Next

- [First receive](first-receive.md), verifying the address on the device
- [Watch-only wallets](../security-and-recovery/watch-only.md) for other signers
