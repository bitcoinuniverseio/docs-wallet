---
title: Security model
description: Where your keys live, what protects them, what Universe can and cannot do, and which decisions stay yours no matter what the product does.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/service/keyring, docs/WALLET-SECURITY-AUDIT-2026-08-03.md
lifecycle: experimental
lastVerified: 2026-09-01
---

## Where your keys live

Your recovery phrase and private keys are generated inside the extension, encrypted with your
password, and stored only on your device. They are never sent to Universe or to anyone else. Signing
happens inside the extension, or on your hardware device for hardware accounts.

## What Universe can do

- Serve chain data, asset indexes, and media from Universe-operated infrastructure.
- Block known phishing sites before they load, and screen signature requests for scam language.
- Ship releases in which each protocol action is enabled only with current, verified, end-to-end
  evidence.

## What Universe cannot do

- Move, freeze, or recover your funds.
- Reverse a confirmed transaction. Nobody can.
- Restore a lost recovery phrase. There is no account, no reset email, and no support override.

:::danger[Anyone claiming to be Universe support and asking for your phrase is committing fraud]
There is no scenario, no upgrade, no verification, and no recovery procedure that requires your
recovery phrase to be given to anyone. See [Phishing and impostors](/docs-wallet/safety/phishing).
:::

## The defences in the product

**Password and auto-lock.** The wallet locks itself after your chosen idle time, from 30 seconds to 4
hours. The default is 30 minutes, and the lock-time screen recommends 5 minutes. Lock Immediately sits
at the bottom of Settings.

**Approval on everything.** No connected site can spend or sign without a request you read and accept.
See [Connection permissions](/docs-wallet/concepts/connections).

**Asset-aware spending.** Coins carrying assets never fund ordinary payments. See
[Protected outputs](/docs-wallet/concepts/protected-outputs).

**Request integrity.** An approval is bound to the exact request that opened it. Approval authority is
computed once per request identity and re-checked synchronously at every signing entry point. A
request that changed after you saw it is blocked as **Request replaced**, rather than signed.

**Optional hard limits.** Whitelists and spending caps, available in the security dashboard and
enforced by the send flow. Off by default.

**Raw-data signing off by default.** Enabling it requires a typed confirmation. See
[Sign a message](/docs-wallet/tasks/sign-a-message).

**Evidence-gated releases.** An operation reaches you only when the exact build carries current
qualification evidence for the complete path. See
[Capability evidence](/docs-wallet/reference/capability-evidence).

## What the model does not cover

Be clear about the boundary, because a security model that implies more than it delivers is worse than
none.

- **A compromised computer.** Malware with access to your browser profile and your keystrokes can
  reach an unlocked wallet. Hardware signing raises this bar considerably. See
  [Hardware wallets](/docs-wallet/tasks/hardware-wallet).
- **Your recovery phrase on paper.** Nothing in software protects a piece of paper.
- **A signature you gave deliberately.** The wallet can make a request readable. It cannot decide for
  you whether the deal is a good one.
- **An outstanding partial signature.** Once given, it can be completed by anyone holding it while the
  coin is unspent. See
  [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).
- **Another wallet using the same phrase.** Protections here are Universe Wallet behaviours, not
  properties of your keys.

## The decisions that stay yours

The product cannot protect the phrase written on your paper, the address you paste, or the request you
approve without reading. Its job is to make each of those decisions clear at the moment you take it.
The words in the review are chosen so that you can explain what will happen before you sign.

If you cannot explain what a request does, that is the signal to reject it.

## Related

- [If your wallet is compromised](/docs-wallet/safety/compromised-wallet)
- [Privacy](/docs-wallet/safety/privacy)
- [Security dashboard](/docs-wallet/tasks/security-dashboard)
