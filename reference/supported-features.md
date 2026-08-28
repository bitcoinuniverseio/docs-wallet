# Supported features

The capability reference for Universe Wallet 1.7.5.8, in one place.

## Platform

| Item | Support |
| --- | --- |
| Browser | Chromium with Chrome 88+, Manifest V3 |
| Views | Popup, side panel, full-tab expanded view |
| Languages | English |

## Networks

Bitcoin (mainnet, Testnet, Testnet4, Signet), Dogecoin (mainnet, Testnet), Zcash (mainnet, Testnet), Fractal Bitcoin (mainnet, Testnet). Details: [Accounts and networks](../wallet-basics/accounts-and-networks.md).

## Keys and accounts

| Capability | Support |
| --- | --- |
| Create wallet | 12-word BIP-39 phrase, verified backup quiz |
| Import phrase | From Unisat, Sparrow, Xverse, Ordinals Wallet, other wallets; optional passphrase and custom derivation path |
| Import private key | WIF and hex |
| Address types | Native SegWit (default), Nested SegWit, Taproot, Legacy |
| Hardware | Keystone over USB and air-gapped QR. Ledger and Trezor: not yet, shown as coming soon |
| Watch-only | Cold wallet public-key import, external signing, verified broadcast |
| Multiple wallets and accounts | Yes, with renaming |

## Transactions

| Capability | Support |
| --- | --- |
| Fee control | Live presets Slow / Avg / Fast, custom sat/vB, calm-fee timing suggestions |
| RBF | Per-transaction toggle, off by default; behavior stated on review |
| Coin control | Coin inspector, freeze, manual funding selection, selection order, dust consolidation |
| Asset protection | Asset-bearing outputs never fund plain sends; named confirmation to override |
| Batch send | Yes, BTC to several recipients |
| Payment requests | Amount and note encoded in QR and copyable link |
| Review | Full impact summary with EXACT / ESTIMATED / UNKNOWN confidence, inputs, outputs, fee pressure, PSBT hex |
| Limits | Optional per-transaction and daily caps, address whitelist |

## Connected applications

| Capability | Support |
| --- | --- |
| Connection scope | One selected account per site, signatures always separately approved |
| Expiry | Idle windows: 24 hours, 7 days, 30 days (default), or until disconnected |
| Audit | Local risk scoring, one-step revoke of risky sites |
| Message signing | Text signing with scam-language scan; raw data signing off by default with typed confirmation |
| Phishing | Known-bad domains blocked; suspicious requests interrupted |

## Protocols

40 protocols in the registry across Bitcoin, Dogecoin, Zcash, Fractal, and Babylon. Per-protocol operations and the release-evidence rule: [Supported protocols](../assets-and-protocols/supported-protocols.md).

## Security

Auto-lock (30 seconds to 4 hours, default 30 minutes), immediate lock, password change, security dashboard with recovery tracking, login history, session log, and phishing URL checker. See [Security model](../security-and-recovery/security-model.md).
