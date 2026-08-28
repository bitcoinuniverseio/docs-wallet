# Universe Wallet

**Universe Wallet shows what your Bitcoin addresses own, protects it from accidental spending, and signs only what you can read and approve.**

Universe Wallet is a self-custody browser extension for Bitcoin, Dogecoin, and Zcash. It reads Bitcoin-native protocols such as Ordinals, BRC-20, Runes, Stamps, and TAP, keeps asset-bearing coins out of ordinary payments, and puts a plain-language review in front of every signature. Your keys never leave the extension.

## Install

Install [Universe Bitcoin Wallet from the Chrome Web Store](https://chromewebstore.google.com/detail/universe-bitcoin-wallet/fjalkkkbjffhgdoheannkodafhemfdba). The publisher is **Universe**. The extension works in Chromium browsers with Chrome 88 or newer.

Setup takes about two minutes: [Install](getting-started/install.md), then [create a wallet](getting-started/create-a-wallet.md) or [import one](getting-started/import-a-wallet.md).

## What makes it different

- **Asset-aware spending.** Coins that carry inscriptions, tokens, or other indexed assets are shown as **Protected** and never fund a plain payment. You spend them only through a flow built for that asset. See [Protected outputs](assets-and-protocols/protected-outputs.md).
- **Readable approvals.** Every signature request shows what leaves your wallet, what comes back, the fee, and how sure the wallet is about each fact, marked `EXACT`, `ESTIMATED`, or `UNKNOWN`. A request the wallet cannot verify says so and stays blocked. See [Reviewing a transaction](using-wallet/reviewing-a-transaction.md).
- **Evidence-gated releases.** A protocol action appears in the product only when the release that shipped it carries current, verified evidence for the full path: wallet, API, indexer, network, and reconciliation. Code existing is not treated as support. See [Supported protocols](assets-and-protocols/supported-protocols.md).
- **Connections that expire.** A connected site sees one address, must ask again to sign, and loses access after the idle window you choose. See [Connections](using-wallet/connections.md).
- **Expert control without expert risk.** Coin control, transaction inspection, address whitelists, spending limits, and a security dashboard are built in and off by default. See [Coin control](using-wallet/coin-control.md).

## Networks

| Network | Unit | Also available |
| --- | --- | --- |
| Bitcoin | BTC | Testnet, Testnet4, Signet |
| Dogecoin | DOGE | Testnet |
| Zcash | ZEC | Testnet |
| Fractal Bitcoin | FB | Testnet |

Address types on Bitcoin: Native SegWit (default), Nested SegWit, Taproot, and Legacy. Details in [Accounts and networks](wallet-basics/accounts-and-networks.md).

## Self-custody, in plain words

You hold the keys. Universe cannot move your funds, cannot reverse a confirmed transaction, and cannot restore a lost recovery phrase. Write your 12 words down offline before you deposit anything, and read [Backup](security-and-recovery/backup.md) and [Restore](security-and-recovery/restore.md) so you know the exit works before you need it.

## Documentation

| Section | Start here |
| --- | --- |
| Getting started | [Install](getting-started/install.md) · [Create a wallet](getting-started/create-a-wallet.md) · [Import a wallet](getting-started/import-a-wallet.md) · [Hardware wallets](getting-started/connect-hardware.md) · [First receive](getting-started/first-receive.md) · [First send](getting-started/first-send.md) |
| Wallet basics | [Accounts and networks](wallet-basics/accounts-and-networks.md) · [Balances](wallet-basics/balances.md) · [Fees](wallet-basics/fees.md) · [Activity](wallet-basics/activity.md) · [Speed and media](wallet-basics/performance-and-media.md) |
| Assets and protocols | [Overview](assets-and-protocols/overview.md) · [Protected outputs](assets-and-protocols/protected-outputs.md) · [Supported protocols](assets-and-protocols/supported-protocols.md) · [Dogecoin marketplace](assets-and-protocols/dogecoin-marketplace.md) |
| Using the wallet | [Reviewing a transaction](using-wallet/reviewing-a-transaction.md) · [Signing a message](using-wallet/signing-a-message.md) · [Connections](using-wallet/connections.md) · [Coin control](using-wallet/coin-control.md) |
| Security and recovery | [Security model](security-and-recovery/security-model.md) · [Backup](security-and-recovery/backup.md) · [Restore](security-and-recovery/restore.md) · [Watch-only wallets](security-and-recovery/watch-only.md) · [If your wallet is compromised](security-and-recovery/compromised-wallet.md) · [Privacy](security-and-recovery/privacy.md) |
| Reference | [Supported features](reference/supported-features.md) · [Glossary](reference/glossary.md) · [Known limitations](reference/known-limitations.md) |
| Help | [Troubleshooting](troubleshooting/README.md) · [Support](support/README.md) |

## Support and security reporting

Bug reports and feature requests: [GitHub issues](https://github.com/bitcoinuniverseio/wallet/issues). Suspected vulnerabilities: email `legal@bitcoinuniverse.io` and do not open a public issue. More paths in [Support](support/README.md).

## Version

This documentation describes Universe Wallet 1.7.5.8. Release notes ship with each version on the [releases page](https://github.com/bitcoinuniverseio/wallet/releases). Terms: [bitcoinuniverse.io/terms](https://bitcoinuniverse.io/terms). Privacy policy: [bitcoinuniverse.io/privacy](https://bitcoinuniverse.io/privacy).
