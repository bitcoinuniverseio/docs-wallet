---
title: Privacy
description: What leaves your device by design, what never does, what a connected site can learn, and the limit no wallet can pass.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/constant/private-bitcoin-infrastructure.ts
lifecycle: experimental
lastVerified: 2026-09-01
---

## Never leaves your device

- Your recovery phrase and private keys. Generated locally, stored encrypted with your password. No
  Universe system ever receives them.
- Your password.
- Device-local settings: contacts, address labels, locked coins, spending limits, and connected-site
  records.

## Leaves your device, by design

- **Your addresses**, to Universe-operated APIs and indexers, because balance, asset, and activity
  data is answered per address. This is how every light wallet works. Universe answers these reads
  from its own infrastructure rather than from third-party data providers.
- **Signed transactions you broadcast**, to the network, where they are public permanently.
- **Requests for media and prices**, to Universe-operated services.

## The limit no wallet can pass

Bitcoin, Dogecoin, and transparent Zcash are public ledgers. Anyone who learns one of your addresses
can see everything that address has ever done, and can often infer which other addresses belong to
you from how coins were spent together.

:::caution[A wallet cannot make chain activity private]
No setting in Universe Wallet changes this, and any wallet that claims otherwise is describing
something the chain does not do. The mitigations below reduce linkage. They do not create privacy.
:::

## Practical mitigations

- **Use a fresh receiving address per payment.** Reuse links every payment to one identity.
- **Keep addresses off social media.** One public post ties an address to a person permanently.
- **Separate wallets by purpose.** Long-term holdings in one, experimenting in another. Coins spent
  together are assumed to share an owner.
- **Be careful with consolidation.** Combining many coins in one transaction tells observers they all
  belonged to you. Sometimes that is fine. Decide deliberately.
- **Fiat display.** Price requests are made to Universe-operated services. When no current price is
  available, amounts are shown without a fiat figure rather than with a stale or third-party number.

## What a connected site can learn

A connected site sees the one address you shared with it, and what you sign for it. Nothing else. It
cannot see your other accounts, your other networks, or your balances at addresses you did not share.

An unconnected site cannot read anything from the wallet at all.

Phishing filtering runs locally, through blocking rules that ship inside the extension, rather than by
sending your browsing to a service.

## The authoritative statement

The [privacy policy](https://bitcoinuniverse.io/privacy) is the complete, current statement of data
handling, and it applies where this summary and the policy differ.

## Related

- [Connection permissions](/docs-wallet/concepts/connections)
- [Security model](/docs-wallet/safety/security-model)
