---
title: Glossary
description: The words this documentation uses, defined precisely, including the ones that mean something different here than elsewhere.
sourceRepo: bitcoinuniverseio/docs-wallet
sourcePath: .
lifecycle: experimental
lastVerified: 2026-09-01
---

**Address.** A destination that can receive coins. One recovery phrase produces many. See
[Address types](/docs-wallet/concepts/address-types).

**Approval.** The screen the wallet puts in front of you before it signs anything. See
[Review a transaction](/docs-wallet/tasks/review-a-transaction).

**Authorized.** In this documentation, an operation the exact build you are running carries evidence
for. Not the same as implemented. See [Capability evidence](/docs-wallet/reference/capability-evidence).

**Available balance.** The part of your total balance that can fund an ordinary payment. Lower than
the total when coins are protected.

**BIP-39.** The standard that turns a list of words into a wallet. The reason a phrase from one wallet
works in another.

**Change.** An output that returns the remainder of a spent coin to an address you own. A real
payment to yourself, not a leftover.

**Confidence mark.** EXACT, ESTIMATED, or UNKNOWN, attached to each interpreted fact on an approval.
See [Confidence marks](/docs-wallet/concepts/confidence-marks).

**Confirmation.** Inclusion of your transaction in a block. Each subsequent block adds one.

**Connection.** Permission for a site to see one address on one network and to ask you for
signatures. Never permission to spend. See
[Connection permissions](/docs-wallet/concepts/connections).

**Derivation path.** The recipe that turns a phrase into a specific set of keys, written like
`m/84'/0'/0'/0`. Change it and you get a different, equally valid wallet.

**Dust.** An output too small to be worth spending, because spending it would cost more than it holds.

**Gate.** A condition a screen sits behind. A protocol gate opens only when the release authorized
that operation. See [Why an action is unavailable](/docs-wallet/assets/why-unavailable).

**Idle window.** How long a connection survives without use. Resets on every use. 24 hours, 7 days,
30 days as the default, or until you disconnect.

**Input.** A coin being spent by a transaction. Consumed whole.

**Inscription.** Data written to the chain and treated as attached to one specific satoshi. Lives on
one output.

**Mempool.** The waiting area for broadcast transactions that are not yet in a block.

**Output.** A newly created coin. The recipient's payment and your change are both outputs.

**Protected.** A coin the wallet will not select for an ordinary payment, because it carries an
asset, a rare-satoshi candidate, a lock you set, or because the check could not complete. See
[Protected outputs](/docs-wallet/concepts/protected-outputs).

**PSBT.** Partially signed Bitcoin transaction. A draft someone else built that can collect signatures
over time. See [Review a PSBT](/docs-wallet/tasks/review-a-psbt).

**RBF, replace by fee.** A network convention allowing an unconfirmed transaction to be replaced by a
higher-fee version. Universe Wallet can mark a transaction as replaceable and **does not provide a way
to build the replacement**.

**Recovery phrase.** The words that are your wallet. Not a hint, not a reset code. See
[Backup and recovery](/docs-wallet/concepts/backup-and-recovery).

**Sat, satoshi.** The smallest unit of bitcoin. One hundred million to a bitcoin.

**Sat per vB.** The fee rate. Satoshis paid per virtual byte of transaction size.

**Sighash.** The part of a signature that says how much of a transaction it commits to. The difference
between an approval that cannot change and one anyone can finish. See
[What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).

**Testnet, signet.** Networks with worthless coins, for practice. Their addresses are not
interchangeable with mainnet.

**Total balance.** Everything you hold, including protected coins.

**Transaction id, txid.** The public identifier of a transaction. Safe to share, and verifiable by
anyone.

**UTXO, unspent transaction output.** A coin you own that has not yet been spent. What "your balance"
is actually made of. See [Inputs, outputs, fees, change](/docs-wallet/concepts/inputs-outputs-fees).

**Virtual byte, vB.** The unit transaction size is measured in for fee purposes.

**Watch-only.** A wallet holding public keys only, which can see everything and sign nothing. See
[Watch-only wallets](/docs-wallet/tasks/watch-only).
