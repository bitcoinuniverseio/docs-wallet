# Import a wallet

This page restores an existing wallet from a recovery phrase or a private key.

## Before you start

- The extension is [installed](install.md).
- Your recovery phrase or private key, on paper. Type it only into the extension itself, never into a web page.
- Know where the wallet came from. The import flow tunes address discovery to the source wallet.

## Import from a recovery phrase

1. Open Universe Wallet and select **I already have a wallet**.
2. Create a password for this device.
3. Choose the wallet you are restoring from: **Unisat Wallet**, **Sparrow Wallet**, **Xverse Wallet**, **Ordinals Wallet**, or **Other Wallet**. The choice preselects the address types that wallet uses, so your balance appears without guesswork.
4. Enter your recovery phrase. Universe accepts the phrase length your original wallet used.
5. If your original wallet used a BIP-39 passphrase, open **Phrase (Optional)** and enter it. A wrong or missing passphrase produces empty, unfamiliar addresses, not an error.
6. Review the **Address Type** step. The wallet previews addresses and balances for each type and marks the likely match `(Recommended)`. Power users can set **Custom HdPath (Optional)** instead.
7. Select **Continue** to finish.

## Import from a private key

1. Select **I already have a wallet**, then **Restore from private key**.
2. Paste the key. The wallet detects the format and reports **"WIF private key detected."** or **"Hex private key detected."**
3. Heed the **Import check** card: only import keys you created yourself. Anyone with this key can spend the wallet.

A private key import restores one address, not a full wallet. If you expect several addresses or asset types, use the recovery phrase instead.

## What success looks like

Home shows your balance. If it shows zero and you expected funds, the address type or passphrase is the usual cause; see below.

## What can go wrong

- **Balance is zero after import.** Open Settings and check **Address Type** against the addresses you funded. Try the other types from step 6; balances shown per type point you to the right one. If your original wallet had a passphrase, repeat the import with it.
- **"Invalid PrivateKey".** The pasted text is not a WIF or hex key. Check for missing characters and surrounding spaces.
- **Old wallet with unusual paths.** Use **Custom HdPath (Optional)** with the derivation path from the source wallet's documentation.

## Next

- [Verify your backup still works](../security-and-recovery/backup.md)
- [Receive](first-receive.md) and [send](first-send.md)
