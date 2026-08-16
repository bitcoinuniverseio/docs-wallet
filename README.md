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

Universe Wallet exposes protocol actions only from an explicit, evidence-backed
release allowlist. The current candidate keeps every protocol mutation blocked
until immutable Wallet, API, indexer, browser, network, confirmation, and
reconciliation evidence is complete. Existing implementation code or a healthy
reader does not by itself authorize signing or broadcasting. Unknown protocol
identifiers never receive a default mint or explorer action.

The release matrix also distinguishes code that exists from functionality the
product intends to restore. Implemented CAT-20, CAT-721, Atomicals, ARC-20,
DMT, BlockDrop, Doge TAP, and Dogecoin Marketplace paths are classified as
blocked work—not described as intentionally unsupported. A release cannot be
approved with zero or partial intended-operation coverage, even if its build
and safety tests are green.

This protection also applies to saved and manually entered extension URLs.
Blocked transaction, explorer, mint, inscription, transfer, signing, and
broadcast screens do not open merely because old implementation code is still
present. The wallet hides unauthorized protocol tabs and shortcuts, or shows a
clear unavailable message where a chain-specific wallet view must remain
visible.

The 1.7.5.6 candidate adds stricter release verification without changing that
published protocol allowlist. Before a candidate can be promoted, it must prove
that the Universe and Inscribe APIs report fresh, network-specific indexer
checkpoints, compare those checkpoints with independent chain tips, and verify
authenticated Dogecoin infrastructure without placing service credentials in
the extension package. A missing credential, wrong network, stale checkpoint,
or excessive indexer lag keeps the affected feature and release fail-closed.
The packaged Chrome archive is also opened and tested as the actual MV3
extension on both Windows development hosts and Linux release runners.
The verified archive is retained under an immutable candidate-SHA artifact
name, downloaded again in the same release run, compared byte for byte, and
accepted only when its post-download SHA-256 matches the build checksum.
Machine readiness records build/E2E, candidate binding, preservation, and
retrieval as separate mandatory results.
If a direct push leaves `develop` red, one fingerprinted alert is bound to the
failed commit, root gate, and workflow run. Retries update the same alert,
while later successful commits reconcile stale alerts without rewriting the
historical failure. No failed run can authorize a release.
The live health gate installs the exact lockfile dependencies before loading
its versioned health-contract package, so a clean runner cannot silently skip
the same contract used by the wallet.

Routine development checks and protected production health checks are kept
separate. A successful development build never claims a production release:
missing protected infrastructure credentials or unhealthy live dependencies
continue to keep production promotion unavailable.

If GitHub Actions artifact storage is temporarily unavailable, routine
development validation reports retained-evidence capacity clearly without
misclassifying verified product checks as a release failure. A `main` or manual
release candidate remains blocked until its immutable extension archive is
retained and retrieved successfully.

Release evidence has priority over dependency acceleration. Builds always use
the exact lockfile, and CI does not consume release-artifact capacity with
large dependency caches.

Mainnet node, fee, broadcast, and Ordinals data is served by Universe-operated
infrastructure through the TLS gateway on `api.bitcoinuniverse.io`; the wallet
does not connect to raw backend IP addresses or private application ports.
Asset-aware wallet summaries continue to use the compatible
wallet API so Atomicals and inscription-bearing outputs are never mistaken for
spendable bitcoin. Public explorers are not automatic API fallbacks. If an
authoritative provider is unavailable, the affected view reports the failure
instead of displaying an invented empty result. Public explorer links remain
optional links that a user may open explicitly.

Every PSBT path uses the same request-bound approval decision. A pending or
failed safety check, stale coin inventory, invalid manual selection, blocked
BIP-110 analysis, unsafe ChainBloom carrier, phishing finding, or replaced
request keeps confirmation unavailable. Hardware and secondary confirmation
dialogs cannot bypass that decision.

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
extension. Universe-operated service credentials remain in protected
server-side configuration only.

Production DOGE balances and transaction inputs do not use Dogechain,
Blockchair, BlockCypher, or Maestro as automatic data sources. Universe Wallet
requests a confirmed-cardinal spendable summary from the Universe-operated
Dogecoin authority through `api.bitcoinuniverse.io`, then independently checks
every raw previous transaction, txid, output value, and locking script. Outputs
that carry Doginals, Dunes, another canonical Marketplace asset, or an active
reservation are excluded. A response containing more than the bounded UTXO page
is clearly labelled partial rather than presented as a complete balance.

Contact management remains in the controller-backed Settings flow. Contacts
Pro does not expose a CSV import that merely validates data without saving it.

Universe Wallet does not guarantee the identity of a counterparty, the value of
an asset, or the accuracy of off-chain marketplace content. The approval screen
is the final place to verify the network, asset, amount, destination, and fee.
Trusted Universe listing requests use a clear **List** action label, but they do
not bypass transaction-risk warnings or the normal PSBT review.

## Documentation scope

This repository contains public, user-facing documentation. Engineering setup,
CI, deployment, and operator procedures are maintained separately in the
private developer documentation repository.
