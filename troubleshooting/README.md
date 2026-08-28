# Troubleshooting

Work top to bottom inside the section that matches your problem. Each fix states what it rules out.

## Unlock problems

- **Password rejected.** Check **Caps Lock is on** warnings and keyboard layout. The password is device-local; if it is truly lost, reinstall the extension and [restore from your recovery phrase](../security-and-recovery/restore.md). Funds are safe if the phrase is safe.
- **Unlock screen loops or hangs.** Close and reopen the popup, then restart the browser. If it persists, reinstall and restore; the vault survives reinstallation only through the phrase.

## Balance or assets look wrong

1. Check the network in the header. Testnet and mainnet never mix.
2. Check **Settings → Address Type** against the address you funded.
3. Pull down on Home to force a refresh. Dimmed numbers mean the wallet is showing last known state while it refetches, and it never presents stale data as fresh.
4. A missing fiat value with a correct coin amount means no current price was available; the coin amount is the truth.
5. Assets shown as **Protected** are not missing; read [Protected outputs](../assets-and-protocols/protected-outputs.md).

## Pending or stuck transactions

- Find the transaction in **History** and check its state against [Activity](../wallet-basics/activity.md).
- Low fee in a busy mempool is the usual cause. RBF transactions can be replaced at a higher fee; others confirm eventually or drop, returning the coins.
- The explorer link on the transaction gives an independent second opinion.

## Network and service errors

- **"Wallet API unreachable."** Appears only after a failed health check; it retries every minute and backs off while the service is down. Your keys and coins are unaffected; reads resume when the service does.
- **Fee rates will not load.** Sending pauses rather than guessing. Retry from the screen.
- **A protocol tab or action is missing.** The release you run has not authorized it, or its production dependency is unhealthy; the screen states the reason. See [the release rule](../assets-and-protocols/overview.md#the-release-rule).
- **Media tiles read "Media unavailable".** Every source for that one asset failed; other tiles keep loading, and a refresh retries.

## Hardware and cold wallet errors

- USB not detected: reconnect the cable, unlock the Keystone, approve the connection prompt on the device.
- QR scanning fails: more light, steadier hands, or use the paste fallback offered on the screen.
- Signature rejected on return: rebuild the transaction and re-sign; never edit anything by hand between devices.

## Collect diagnostics before asking for help

- Any blocking screen offers **Copy report**; the review screen offers **Copy PSBT**; About offers **Copy support bundle** with version and endpoints.
- Include what you tried from this page in your [support request](../support/README.md). Never include your recovery phrase or private keys; nobody legitimate needs them.
