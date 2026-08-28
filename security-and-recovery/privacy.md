# Privacy

This page describes what data leaves your device by design, and what never does.

## Never leaves your device

- Your recovery phrase and private keys. They are generated locally and stored encrypted with your password. No Universe system ever receives them.
- Your password.
- Device-local settings: contacts, labels, frozen coins, limits, connected-site records.

## Leaves your device, by design

- **Your addresses**, to Universe-operated APIs and indexers, because balance, asset, and activity data is answered per address. This is how every light wallet works; Universe answers these reads from its own infrastructure rather than third-party data providers.
- **Signed transactions you broadcast**, to the network, where they are public forever.
- **Requests for media and prices**, to Universe-operated services.

Blockchains are public. Anyone who learns an address can see its history; the wallet cannot make on-chain activity private. Using fresh receive addresses and keeping addresses off social media are the practical mitigations.

## What sites you visit can learn

A connected site sees the address you shared with it and what you sign for it, nothing else. An unconnected site cannot read anything from the wallet. Phishing filtering runs locally through the extension's blocking rules.

## The authoritative document

The [privacy policy](https://bitcoinuniverse.io/privacy) is the complete, current statement of data handling and applies where this summary and the policy differ.

## Next

- [Connections](../using-wallet/connections.md)
- [Security model](security-model.md)
