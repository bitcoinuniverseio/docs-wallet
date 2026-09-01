---
title: Support and reporting
description: Where to ask a question, where to report a security issue, what to include, and the one thing nobody will ever ask you for.
sourceRepo: bitcoinuniverseio/docs-wallet
sourcePath: .
lifecycle: experimental
lastVerified: 2026-09-01
---

:::danger[Read this before contacting anyone]
**Nobody will ever ask for your recovery phrase.** Not through any channel below, not in a reply, not
in a direct message, not to verify your identity, not to fix your wallet. Anyone who asks is
committing fraud, no matter how the message is signed. See
[Phishing and impostors](/docs-wallet/safety/phishing).

Support never contacts you first.
:::

## Before you ask

Most questions have an answer already:

- [Troubleshooting](/docs-wallet/help/troubleshooting) covers the common failures.
- [Frequently asked questions](/docs-wallet/help/faq) covers the common questions.
- [Known limitations](/docs-wallet/reference/known-limitations) covers the things that are missing on
  purpose.
- [Why an action is unavailable](/docs-wallet/assets/why-unavailable) covers "the screen says it is
  not available".

## Documentation problems

If a page here is wrong, unclear, or missing something, that is a defect worth reporting.

- [Open an issue on docs-wallet](https://github.com/bitcoinuniverseio/docs-wallet/issues)
- Or use the edit link at the bottom of any page to propose the fix directly.

An undocumented limitation is treated as a bug in the documentation, not as an acceptable gap.

## Product problems

For behaviour that does not match this documentation, or a screen that is broken:

- [Open an issue on the wallet repository](https://github.com/bitcoinuniverseio/wallet/issues)

Include:

- your wallet version, from **Settings**, then **About**;
- your browser and its version;
- the chain and network you were on;
- what you expected and what happened;
- a transaction id, if there is one. Transaction ids are public and safe to share.

Never include your recovery phrase, a private key, a screenshot showing either, or a screenshot of a
balance you would rather not publish.

## Security vulnerabilities

Report privately, not in a public issue: **`legal@bitcoinuniverse.io`**

Include enough detail to reproduce, the versions affected, and what an attacker could achieve. Please
allow time for a fix before publishing.

## Lost funds

There is no channel that can recover them. This is not a policy that can be appealed; it is a
consequence of self-custody. See
[If your wallet is compromised](/docs-wallet/safety/compromised-wallet) for what can still be done,
and act quickly if your phrase may have been exposed.

Be aware that people who report losses publicly are contacted immediately by recovery scams. Every one
of them is fraudulent.

## Where the source lives

- Product: [bitcoinuniverseio/wallet](https://github.com/bitcoinuniverseio/wallet)
- This documentation: [bitcoinuniverseio/docs-wallet](https://github.com/bitcoinuniverseio/docs-wallet)
- Every Bitcoin Universe component: [docs.bitcoinuniverse.io](https://docs.bitcoinuniverse.io)
