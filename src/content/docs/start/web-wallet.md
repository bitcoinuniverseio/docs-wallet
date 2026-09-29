---
title: Universe Web Wallet
description: The extension-free Universe Web Wallet and Universe Shielded Wallet, why they are not yet available, how they differ from the extension, and what a wallet stored in a browser page can lose.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: backend/shared/web-wallet/, frontend/ui/web-wallet/
lifecycle: experimental
lastVerified: 2026-09-29
---

**Status:** not yet available. The web wallet is built and tested on a private test network, but it
is not released. The address it will run from, `wallet.bitcoinuniverse.io`, is not live, and Core
does not offer it yet. Do not type a recovery phrase into any page claiming to be it.

## What it is

Universe Web Wallet is a Bitcoin wallet that runs in a normal browser window instead of an
extension. Core opens it in its own window when you pick **Universe Web Wallet** under
**Connect Wallet**. Nothing is installed.

Universe Shielded Wallet opens in the same way, with its own recovery phrase. It is described at the
end of this page.

## How it differs from the extension

| | Universe extension | Universe Web Wallet |
| --- | --- | --- |
| Install | From the Chrome Web Store | Nothing to install |
| Where keys are kept | Extension storage | Storage of the wallet page in this browser |
| Chains | Bitcoin, Dogecoin, Zcash, Fractal Bitcoin | Bitcoin only |
| What it can do | See [What this release authorizes](/docs-wallet/assets/support-state) | View, receive, and send bitcoin |
| Addresses from the same phrase | Payment and ordinals addresses | The same payment and ordinals addresses |

You can import your extension's recovery phrase, or an export of the extension's encrypted keys, and
see the same addresses. The two stay separate: connecting one never connects the other.

## What you can do

- Create a 12 or 24 word recovery phrase. The wallet asks for three of the words back before it saves
  anything.
- Import a recovery phrase (with an optional passphrase and custom paths), a single private key, or
  an extension export.
- Receive, with a QR code for the Bitcoin address and for the ordinals address.
- Send bitcoin. The review shows what leaves, the fee, and the change, before you approve.
- Show the recovery phrase again, after entering your password. Change the password. Add accounts.
- See which sites are connected, and disconnect them.

The wallet locks after 15 minutes without use. A send only uses coins that Universe has checked
carry no inscription, rune, or Atomicals asset.

## Backups

Your recovery phrase is the backup. Write it down when you create the wallet.

The wallet can also download an encrypted backup file, which you can restore in another browser
with your password. The file is protected by that password, so a weak password makes it weak.

## Browser storage can disappear

The encrypted keys live in this browser's storage for the wallet page. That storage is erased when
you clear site data, when a private window closes, and sometimes when the browser needs space. The
wallet asks the browser to keep its storage, but that request is not a backup.

If the storage is gone and you have no recovery phrase or backup file, the funds cannot be
recovered.

## Risks

- **It is a hot wallet.** Malware on your device, a malicious extension, or a tampered copy of the
  wallet page could steal your funds.
- **Every signature is reviewed in the wallet window.** A site that is connected can ask, but cannot
  sign on its own.
- **Encrypting keys is not privacy.** Your addresses and payments are public on the chain.

## Universe Shielded Wallet

The shielded wallet has its own recovery phrase and its own storage. It is meant for shielded token
protocols, and today it cannot be used:

- **SBRC-20.** The official specification is a draft that is not live. No circuit, verifying key, or
  source code is published.
- **Bitshield (BSH).** No licensed source code is published. Its transfers and market start only at
  a future mainnet block, and its market runs on servers Bitshield operates.

The shielded wallet refuses every connection request until one of these can be used safely.

## Next

- [Holding your own keys](/docs-wallet/start/self-custody)
- [Privacy](/docs-wallet/safety/privacy)
