---
title: Connect an application
description: Approve a site's connection request, choose the idle window, and check the one line on the screen that a hostile page cannot forge.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Approval/components/Connect.tsx
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone using a site that wants to talk to the wallet.
**Goal:** the site able to see one address and ask for signatures, and nothing more.
**Prerequisites:** an unlocked wallet and a site that requested a connection.
**Safety:** connecting cannot move funds. Connecting to an impostor site is still how signature
attacks begin.

## Steps

1. On the site, choose to connect a wallet, and pick Universe Wallet.
2. The wallet opens an approval window.
3. **Read the origin line.** It comes from the browser, not from the page. A page can print any brand
   it likes in its own body; it cannot change this line.
4. Confirm the **account and network** being offered are the ones you want the site to see.
5. Choose the **idle window**: 24 hours, 7 days, 30 days, which is the default, or until you
   disconnect.
6. Approve, or reject.

## Expected result

The site shows you as connected and can read the address you selected. It appears in your
**Connected sites** list with its granted scope and last-used time.

## How to verify

- The origin in your address bar matches the origin shown by the wallet.
- The site displays the address you expected, and no other.
- The connection is listed under **Connected sites**.

## What it can and cannot do afterwards

Granted: reading one address on one network, reading the public data at that address, and asking you
for signatures.

Never granted: your recovery phrase, your private keys, moving a coin without a fresh approval, your
other accounts and networks, or the contents of pages you visit.

See [Connection permissions](/docs-wallet/concepts/connections) for the whole boundary.

## Choosing the idle window

It is an idle timer, not an age limit. Every use restarts it.

- **24 hours** for a site you are trying once.
- **7 days** for something you use occasionally.
- **30 days**, the default, for a site you use regularly.
- **Until you disconnect** only for a site you genuinely rely on and would notice going wrong.

Shorter is safer, and the cost of it expiring is one extra approval.

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| The site says connected, the wallet does not list it | The page is faking a connection state | Leave. Do not sign anything. |
| The approval window did not appear | The extension service worker may be asleep | Open the extension from your toolbar, then retry |
| The origin does not match the address bar | You are on an impostor page, or in a frame you did not expect | Reject and close the tab |
| The site asks you to connect again every visit | The idle window is short, or you are in a private window | Choose a longer window if you trust it |

## Recovery path

Reject at any time. If you already connected and regret it, open **Connected sites** and disconnect.
Disconnecting stops new requests; it does not undo a signature you already gave. See
[Manage connections](/docs-wallet/tasks/manage-connections).

## Related

- [Connection permissions](/docs-wallet/concepts/connections)
- [Provider API](/docs-wallet/developers/provider-api)
