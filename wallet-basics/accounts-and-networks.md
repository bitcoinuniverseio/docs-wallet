# Accounts and networks

This page explains how wallets, accounts, networks, and address types fit together, so the header of the app always makes sense.

## Wallets and accounts

One installation can hold several wallets, and each wallet several accounts:

- A **wallet** (keyring) is one secret: a recovery phrase, an imported private key, a Keystone device, or a watch-only cold wallet. The wallet list tags each one: **HD**, **IMPORT**, **KEYSTONE**, or **COLD**.
- An **account** is one keypair inside an HD wallet. Accounts under the same wallet share one recovery phrase; backing up the phrase backs up all of them.

Switch with **Settings → Switch Wallet** and **Switch Account**, and rename either from Settings so the header names mean something to you.

## Networks

The network picker offers:

| Network | Unit | Purpose |
| --- | --- | --- |
| Bitcoin | BTC | Mainnet funds |
| Bitcoin Testnet / Testnet4 (Beta) / Signet | tBTC, sBTC | Development and testing, coins have no value |
| Dogecoin | DOGE | Dogecoin mainnet |
| Dogecoin Testnet | tDOGE | Testing |
| Zcash | ZEC | Zcash mainnet |
| Zcash Testnet | tZEC | Testing |
| Fractal Bitcoin | FB | Fractal mainnet |
| Fractal Bitcoin Testnet | tFB | Testing |

Each network keeps its own balances, activity, and protocol views. The wallet reminds you on every network screen that mainnet deposits never appear on a test network and the reverse.

## Address types on Bitcoin

| Type | Starts with | When to pick it |
| --- | --- | --- |
| Native Segwit (P2WPKH) | `bc1q` | Default. Lowest fees for plain bitcoin payments. |
| Taproot (P2TR) | `bc1p` | Ordinals, Runes, and most Universe protocols. Pick this to hold or mint assets. |
| Nested Segwit (P2SH-P2WPKH) | `3` | Compatibility with older senders. |
| Legacy (P2PKH) | `1` | Oldest format, highest fees. Only to restore an old wallet. |

Change it under **Settings → Address Type**. All types come from the same recovery phrase; switching the type never risks funds, it changes which of your addresses the wallet fronts.

## What can go wrong

- **Funds "missing" after switching network or address type.** They are on the other network or type. Switch back; nothing moved.
- **A site expects a different address type.** Some protocol sites require Taproot. The wallet's protocol screens state their requirement; switch the address type and reconnect.

## Next

- [Balances](balances.md)
- [Supported protocols](../assets-and-protocols/supported-protocols.md)
