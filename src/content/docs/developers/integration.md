---
title: Integrating with the wallet
description: How to build an integration that a careful user will approve, what to never ask for, and the failure modes to handle before you ship.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/content-script, backend/controller
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** a developer adding Universe Wallet support to a web application.
**Goal:** an integration whose requests a careful user can approve without hesitating.
**Prerequisites:** the extension installed, and a test network to work on.

The API reference is on [Provider API](/docs-wallet/developers/provider-api). This page is about the
part the reference cannot tell you: how to build something that does not get rejected, and does not
get someone hurt.

## The three rules that come before any code

1. **Request a connection only in response to a direct user action**, such as a click on a control you
   own. Never on page load. A wallet prompt nobody asked for teaches people to dismiss prompts.
2. **Never ask a user for their recovery phrase or private key.** No integration needs either, and no
   legitimate flow collects them. A page that asks is indistinguishable from a phishing page, because
   it is one.
3. **Signing happens inside the wallet, not in your page.** Your application submits a request. The
   user reads it in the extension and approves or rejects it there. Treat rejection as an ordinary
   outcome, not an error.

## Build for the review screen, not for your own UI

The user does not read your page at the moment of decision. They read the wallet's approval screen,
which shows what leaves, what returns, the fee, the origin, and a confidence mark on every interpreted
fact. See [Review a transaction](/docs-wallet/tasks/review-a-transaction).

That has practical consequences for you:

- **Make the amounts on your page match the amounts on the approval.** If your page says one price and
  the approval says another, a careful user rejects, and they are right to.
- **Do not construct requests whose effect the wallet cannot decode.** A fact the wallet cannot read
  is shown as UNKNOWN, and a request with an unknown fact can never read as ready.
- **Prefer full-transaction signatures.** A `SIGHASH_SINGLE | ANYONECANPAY` request leaves an open
  offer standing, and a user who understands that will hesitate. If your flow genuinely needs it, say
  so on your own page, in advance, in plain words. See
  [What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).

## Test what your users will actually hit

Test networks exist for this. See [Chains and networks](/docs-wallet/concepts/chains-and-networks).

Handle every one of these before you ship:

| Situation | What to do |
| --- | --- |
| No wallet installed | Detect it and offer the store link. Do not throw. |
| User rejects the request | Return the interface to its previous state, silently. It is not an error. |
| Wallet locked | The user unlocks and the request continues. Do not resubmit in a loop. |
| Connection expired | Ask again from the start. Idle windows expire on purpose. |
| Wrong network | Ask the wallet to switch, and handle rejection of that too. |
| Account changed | Subscribe to the account-change event. Do not cache an address indefinitely. |
| The operation is not authorized in the user's build | The request fails closed. Show the wallet's reason rather than a generic failure. See [Why an action is unavailable](/docs-wallet/assets/why-unavailable). |

## The authorization reality

An operation your integration calls may be unavailable in the build your user has, because
authorization is attached per build, per protocol, per network, per operation. This is not something
you can detect by version number alone, and it is not something you can work around.

Design for it: if a protocol call fails closed, surface the wallet's own reason, and do not present it
to the user as your application being broken. See
[Capability evidence](/docs-wallet/reference/capability-evidence).

## What connecting gets you

One address, on one network, and the right to ask for signatures. It does not get you the user's other
accounts, their other networks, their balances elsewhere, or anything about the page they are on. See
[Connection permissions](/docs-wallet/concepts/connections).

Ask for a connection when you need an address, not before.

## Related

- [Provider API](/docs-wallet/developers/provider-api)
- [Connection permissions](/docs-wallet/concepts/connections)
- [Review a PSBT](/docs-wallet/tasks/review-a-psbt)
