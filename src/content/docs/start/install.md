---
title: Install
description: Where the real extension is, which browsers can run it, which permissions it asks for, and how to check that what you installed is what you meant to install.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/dist/chrome/manifest.json, docs/STORE-LISTING.md
lifecycle: experimental
lastVerified: 2026-09-01
---

**Intended reader:** anyone installing Universe Wallet for the first time.
**Goal:** a working extension that came from the real listing.
**Prerequisites:** a Chromium browser, Chrome 88 or later.
**Safety:** installing a counterfeit wallet is the most common way people lose everything. Do not skip
the verification step.

## The only install route

The Chrome Web Store listing is
[Universe Bitcoin Wallet](https://chromewebstore.google.com/detail/universe-bitcoin-wallet/fjalkkkbjffhgdoheannkodafhemfdba),
item id `fjalkkkbjffhgdoheannkodafhemfdba`.

Check that id in the address bar before you install. A counterfeit listing can copy the name, the
icon, the screenshots, and the description. It cannot copy the id.

:::danger[There is no other official distribution]
No archive from a chat message. No file from a support agent. No "beta build" behind a link in a
reply. No mirror site. If someone sends you a wallet to load manually, they are trying to take your
coins.
:::

## Browser support

| Browser | Support |
| --- | --- |
| Chrome 88 or later | Yes. This is the target. The packaged extension declares Manifest V3 with a minimum Chrome version of 88. |
| Edge, Brave, Opera, other Chromium browsers | The same package runs on Chromium at that version or later. There is no separate store listing for them. |
| Firefox | Build targets exist in the source tree, but no Firefox listing is published. Treat Firefox as unavailable. |
| Safari | Not supported. |
| Mobile browsers | Not supported. Browser extensions do not run on mobile Chrome or mobile Safari. |

## Permissions it asks for

Every one of these is in the shipped manifest, and each has a narrow reason.

| Permission | Why it is needed |
| --- | --- |
| `storage`, `unlimitedStorage` | Holds the encrypted vault, your settings, and cached asset data on your device. |
| `activeTab` | Lets a page you are on request a connection, only after you click the extension. |
| `declarativeNetRequest` | Applies the phishing policy that ships inside the extension. |
| `sidePanel` | Opens the wallet beside the page instead of as a popup. |
| `alarms` | Wakes the background worker so idle site connections expire on time. |
| `nativeMessaging`, optional | Requested only if you set up the Zcash companion. Not granted otherwise. |
| Access to all sites | A wallet cannot know in advance which site will request a connection. Nothing is read from a page until you approve that site. |

## Steps

1. Open the store listing and confirm the item id matches `fjalkkkbjffhgdoheannkodafhemfdba`.
2. Add the extension.
3. Pin it to the toolbar, so you always open the wallet from your own browser chrome rather than from
   something a page drew.
4. Open the wallet, go to **Settings**, then **About**, and note the version number.

## Expected result

The extension opens to a welcome screen offering to create a new wallet or import an existing one. It
holds no funds and no accounts yet.

## How to verify

- The item id in the store URL matches the one above.
- The version under **Settings**, then **About**, is one you can find in this documentation or in the
  [release list](https://github.com/bitcoinuniverseio/wallet/releases). See
  [Which version you are running](/docs-wallet/start/versions) for why that matters more than usual
  here.
- The extension icon in your toolbar is the one you pinned, and it is where you open the wallet from.

## Common failures

| What you see | What it means | What to do |
| --- | --- | --- |
| The listing name matches but the id does not | A counterfeit listing | Do not install it. Report the listing to the store. |
| The browser says the extension needs a newer version | Your browser is older than Chrome 88 | Update the browser. |
| A site offers to install the wallet for you | Phishing | Close the tab and install from the store listing yourself. |
| The extension installs but the popup is blank | Usually a stalled service worker | See [Troubleshooting](/docs-wallet/help/troubleshooting). |

## Recovery path

Nothing at this stage can cost you money: the wallet holds no keys yet. If you suspect you installed
something counterfeit, remove it, and do not enter any recovery phrase into it. If you already did,
treat it as a compromise and follow
[If your wallet is compromised](/docs-wallet/safety/compromised-wallet) immediately.

## Next

[Create a wallet](/docs-wallet/start/create-a-wallet), or
[import an existing one](/docs-wallet/start/import-a-wallet).
