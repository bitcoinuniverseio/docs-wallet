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

Universe Wallet does not guarantee the identity of a counterparty, the value of
an asset, or the accuracy of off-chain marketplace content. The approval screen
is the final place to verify the network, asset, amount, destination, and fee.

## Documentation scope

This repository contains public, user-facing documentation. Engineering setup,
CI, deployment, and operator procedures are maintained separately in the
private developer documentation repository.
