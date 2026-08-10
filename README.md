# Universe Wallet

**One wallet for Bitcoin and the protocols built around it.**

Universe Wallet is a self-custody browser extension for discovering assets,
reviewing requests, and signing supported Bitcoin and Dogecoin transactions.
The wallet keeps approval in the user’s hands: connected applications propose
an action, the wallet presents it for review, and keys remain inside the
extension.

## What you can do

- Manage supported Bitcoin and Dogecoin accounts from one extension.
- Review transaction destinations, amounts, network, and fees before signing.
- Connect to Bitcoin Universe applications without sharing seed phrases or
  private keys.
- Sign supported marketplace transactions with transaction-specific approval.
- Explore protocol experiences while retaining self-custody.

Universe Wallet 1.7.5.5 exposes protocol actions only from an explicit release
allowlist. Bitcoin, Ordinals, BRC-20, Runes, Alkanes, TAP, SRC-20, Stamps,
DUST-20, UNAT, Bitmap, BLOCK-20, OP_RETURN, OP-20, OP Names, Mezcal, Dogecoin,
Doginals, and DRC-20 retain their reviewed wallet flows. ChainBloom, Patina,
and Witness Circles are read-only wallet integrations; they cannot originate
protocol transactions.

OP_DROP is enabled for deploy, mint, transfer, and explorer workflows after its
combined indexer, Inscribe facade, clean-host restore, and independent review
gates passed. DROPS provides a verified read-only explorer. Atomicals/ARC-20,
CAT-20, CAT-721, DMT, Blockdrop, and TAP-DOGE remain hidden and disabled;
BRC-110 is not supported. Unknown protocol identifiers never receive a default
mint or explorer action.

The 1.7.5.6 candidate adds stricter release verification without changing that
published protocol allowlist. Before a candidate can be promoted, it must prove
that the Universe and Inscribe APIs report fresh, network-specific indexer
checkpoints, compare those checkpoints with independent chain tips, and verify
authenticated Dogecoin infrastructure without placing service credentials in
the extension package. A missing credential, wrong network, stale checkpoint,
or excessive indexer lag keeps the affected feature and release fail-closed.

## Start safely

Read [Getting started](guides/getting-started.md) before creating or importing a
wallet. For a Dogecoin marketplace transaction, follow the
[marketplace signing guide](guides/dogecoin-marketplace-signing.md).

## Security comes first

Universe Wallet will never ask you to paste a seed phrase into a website,
support chat, email, or social message. Review every approval carefully.
Blockchain transactions are difficult to reverse once broadcast.

The extension rejects malformed or unknown internal commands before they can
reach wallet operations. This validation also blocks inherited properties and
property accessors from being treated as callable wallet actions.

Hardware-wallet signing stops safely when a signing request type is not
recognized. A completed hardware signature is accepted only through the
wallet's explicit signed-result flow; it is never replaced with an empty
fallback result.

Reviewer-only Frontier previews remain inaccessible in production builds even
if local storage is modified. Disabled previews show an unavailable state and
cannot be enabled from the wallet interface.

Developer Tools shows the current account's live, asset-aware UTXO inventory.
It includes protected assets and wallet locks instead of sample entries, and it
is read-only; use Coin Control when choosing inputs for a transaction.

Transaction-producing protocol forms never inject demo tickers, identifiers,
amounts, or recipient addresses. Enter and review the intended values before
creating an order.

Batch send accepts only recipients entered or pasted by the user. It never
loads a pre-filled mainnet or testnet recipient list into a real send queue.
Address Labels likewise saves only entries supplied by the user.

Dogecoin actions use the selected account's address for the active Dogecoin
network. If the wallet cannot derive it, the form stays empty and disabled
instead of substituting a sample address or ticker.

Dogecoin infrastructure credentials are never compiled into the browser
extension. A user may configure a locally stored provider key for an explicit
wallet integration, while release-monitoring credentials remain in protected
server-side automation only.

Contact management remains in the controller-backed Settings flow. Contacts
Pro does not expose a CSV import that merely validates data without saving it.

Universe Wallet does not guarantee the identity of a counterparty, the value of
an asset, or the accuracy of off-chain marketplace content. The approval screen
is the final place to verify the network, asset, amount, destination, and fee.

## Documentation scope

This repository contains public, user-facing documentation. Engineering setup,
CI, deployment, and operator procedures are maintained separately in the
private developer documentation repository.
