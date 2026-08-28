# Supported protocols

This page lists every protocol the wallet knows, with its networks and operations. It mirrors the wallet's protocol registry, the same table the release process enforces; it is not maintained by hand.

## How to read this

- **Operations** are what the product implements and intends to offer: `read` (see holdings), `explore`, `deploy`, `mint`, `etch`, `transfer`, `inscribe`, `send`, `sign`, `broadcast`, `marketplace`.
- An operation is **live in your build only when that release authorized it with current evidence** for wallet, API, indexer, network, and reconciliation. Anything not authorized stays hidden or shows **Protocol operation unavailable**. See [the release rule](overview.md).
- Networks named are the ones the registry covers; test networks share the mainnet entry.

## Bitcoin

| Protocol | Networks | Operations |
| --- | --- | --- |
| Bitcoin (BTC) | mainnet, testnet, testnet4, signet | read, send, sign, broadcast |
| Ordinals | mainnet, testnet, testnet4, signet | read, inscribe, transfer, sign, broadcast |
| BRC-20 | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| Runes | mainnet, testnet, testnet4, signet | read, explore, mint, etch, transfer, sign, broadcast |
| Alkanes | mainnet, testnet, testnet4, signet | read, explore, mint, sign, broadcast |
| TAP | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| SRC-20 (Stamps) | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| Stamps | mainnet, testnet, testnet4, signet | read, explore, inscribe, sign, broadcast |
| SRC-101 | mainnet, testnet, testnet4, signet | read, explore |
| DUST-20 | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| UNAT | mainnet, testnet, testnet4, signet | read, explore, mint, transfer, sign, broadcast |
| Bitmap | mainnet, testnet, testnet4, signet | read, explore, mint, transfer, sign, broadcast |
| BLOCK-20 | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| OP_RETURN | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, inscribe, sign, broadcast |
| OP-20 | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| OP Names | mainnet, testnet, testnet4, signet | read, explore, inscribe, transfer, sign, broadcast |
| OP Inscriptions | mainnet, testnet, testnet4, signet | read, explore, inscribe, sign, broadcast |
| Mezcal | mainnet, testnet, testnet4, signet | read, explore, mint, etch, sign, broadcast |
| Atomicals | mainnet, testnet, testnet4, signet | read, mint, transfer, sign, broadcast |
| ARC-20 | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| CAT-20 | mainnet, testnet, testnet4, signet | read, explore, transfer, sign, broadcast |
| CAT-721 | mainnet, testnet, testnet4, signet | read, explore, transfer, sign, broadcast |
| DMT | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| BlockDrop | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| OP-DROP | mainnet, testnet, testnet4, signet | read, explore, deploy, mint, transfer, sign, broadcast |
| DROPS | mainnet, testnet, testnet4, signet | read, explore |
| ChainBloom | mainnet, testnet, testnet4, signet | read, explore |
| Patina | mainnet, testnet, testnet4, signet | read, explore |
| Witness Circles | mainnet, testnet, testnet4, signet | read, explore |
| BIP-110 | mainnet, testnet, testnet4, signet | read, explore |

BRC-110 exists in the registry but is disabled by release policy.

## Dogecoin

| Protocol | Networks | Operations |
| --- | --- | --- |
| Dogecoin (DOGE) | mainnet, testnet | read, send, sign, broadcast |
| Doginals | mainnet, testnet | read, explore, inscribe, transfer, sign, broadcast |
| DRC-20 | mainnet, testnet | read, explore, deploy, mint, transfer, sign, broadcast |
| Doge TAP | mainnet, testnet | read, explore, mint, broadcast |
| Dogecoin Marketplace | mainnet, testnet | read, explore, marketplace, sign, broadcast |

Marketplace signing details: [Dogecoin marketplace](dogecoin-marketplace.md).

## Zcash

| Protocol | Networks | Operations |
| --- | --- | --- |
| Zerdinals | mainnet, testnet | read, explore, inscribe, transfer, sign, broadcast |
| ZRunes | mainnet, testnet | read, explore, etch, mint, transfer, sign, broadcast |

## Other

| Protocol | Networks | Operations |
| --- | --- | --- |
| Fractal Bitcoin | mainnet, testnet | read, explore |
| Babylon | bbn-1 | read, explore |

## Version

Generated for Universe Wallet 1.7.5.8 from the protocol registry (40 protocols). If your build shows fewer actions than this table, your release did not authorize them; the product states the reason on the affected screen.
