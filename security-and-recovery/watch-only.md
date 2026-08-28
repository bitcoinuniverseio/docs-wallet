# Watch-only wallets

This page sets up a cold wallet: Universe watches addresses and prepares transactions, while the keys stay on a device that never touches the internet.

## What it is

A watch-only (cold) wallet imports only public keys. Universe shows balances, assets, and activity, and can build transactions, but cannot sign them. Signing happens on your offline device, and the signed result comes back by QR or paste. The wallet is explicit about this at setup: *"This imports public keys only. Spending still requires your cold wallet to sign."*

## Set it up

1. Select **Connect to Hardware Wallet**, then the cold wallet option, to open **Connect Cold Wallet**.
2. Provide the public key from your offline device:
   - **Scan QR Code**: scan the exported public key with your camera, or
   - **Import pasted public key** if the camera cannot work.
3. Review **Cold Wallet Addresses**, the audit list of derived addresses. Verify the first one against your offline device before funding, and use **Copy addresses** to keep the list.
4. Finish. The account is tagged **COLD**.

## Spending from a cold wallet

1. Build the payment normally: recipient, amount, fee.
2. The wallet produces the unsigned transaction for your offline signer instead of signing.
3. Sign on the offline device, then return the signed transaction to Universe by scan or paste.
4. Universe verifies the signature belongs to the same transaction you reviewed, reports **Signature Successful**, and offers **Broadcast**. Confirm the details once more and broadcast.

## What it is good for

- Long-term storage where the signing key never touches a browser.
- Monitoring a treasury or vault from any machine without carrying spending power.
- Using signer hardware Universe does not integrate directly yet.

## What can go wrong

- **The signed transaction is rejected.** The offline signer signed something else, or a different key. Rebuild and re-sign; never retype fields by hand between devices.
- **You are asked for a recovery phrase during setup.** Stop. Watch-only setup needs public keys only; nothing about it involves secret words.

## Next

- [Connect a hardware wallet](../getting-started/connect-hardware.md)
- [Security model](security-model.md)
