# Assets and protocols

This page explains how Universe Wallet shows Bitcoin-native assets, and the release rule that decides which protocol actions you see.

## One wallet, many protocols

Bitcoin, Dogecoin, and Zcash carry assets beyond the coin itself: inscriptions, tokens, names, and stamps recorded directly on chain. Universe Wallet reads these through protocol tabs on Home. Depending on the network and release, the tab strip covers Ordinals, BRC-20, TAP, UNAT, Bitmaps, Runes, Stamps, SRC-20, Alkanes, Mezcal, BLOCK-20, DUST-20, OP_RETURN, OP-20, OP Names, and on Dogecoin: DOGE, Doginals, and DRC-20.

Each tab lists what the active account holds under that protocol. Asset cards show sized media, the collection, and the actions the current release supports. Text and JSON assets render as typed cards; HTML renders as a static preview in lists and only becomes interactive on its own detail screen.

## The release rule

A protocol action appears only when the release you are running carries current, verified evidence for the whole path behind it: the wallet code, the Universe API, the indexer, the network, and reconciliation of results. This is checked per protocol, per network, per operation.

What this means in practice:

- A tab or action you can see is backed by evidence, not by the mere existence of code.
- An action without current evidence stays hidden, or shows **Protocol operation unavailable** with the reason. It returns when the evidence is current again.
- Unknown asset types never get a default mint or explore action.

The full picture per protocol is in [Supported protocols](supported-protocols.md).

## Where the data comes from

All balance, asset, and activity data comes from Universe-operated nodes and indexers, and media comes from Universe-operated media infrastructure. Originals stay exact on chain; what loads in a grid is a sized derivative. There is no dependency on third-party blockchain data providers for these reads.

## Spam and verification

Anyone can send assets to your address. A tab listing something does not endorse it. Verify a collectible through its detail screen and provenance before valuing it, and treat unsolicited tokens as advertising until proven otherwise.

## Next

- [Protected outputs](protected-outputs.md), the safety net for asset holders
- [Supported protocols](supported-protocols.md)
