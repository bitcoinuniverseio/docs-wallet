# Hardware wallets | Universe Wallet

Keystone is the one hardware integration present in this build. Ledger and Trezor are shown as coming soon and cannot be connected.

- Universe Wallet 
- Everyday tasks 
 
# Hardware wallets

 Intended reader: someone who wants keys held on a dedicated device rather than in a browser.
 Goal: signing on hardware, with the extension used only to build and broadcast.
 Prerequisites: a Keystone device.
 Safety: verify every address and every amount on the device screen , not in the browser.

 
## What is available
 Section titled “What is available” 

 Device State in this build Keystone Connectable. Air-gapped QR, and USB. Ledger Listed, and disabled. The connect control shows coming soon and cannot be used. Trezor Listed, and disabled, the same way. Any other device Not integrated. Use the watch-only flow and sign elsewhere. 

 The hardware feature is marked experimental in the product itself
 Verify addresses on the device. Start with a small amount and complete the whole loop, receive, send,
and confirm, before you move anything significant onto it.

 
 
## Why hardware helps
 Section titled “Why hardware helps” 

 The private keys stay on a device that has no browser, no extensions, and no web pages. Even a fully
compromised computer cannot extract them. What it can still do is show you a transaction that is not
what you think it is, which is why the device screen matters more than the browser screen.

 
## Steps, Keystone
 Section titled “Steps, Keystone” 

 

- Open the wallet and add a hardware wallet. 

- Choose Keystone. 

- Connect over USB, or scan the QR sequence the device shows for the air-gapped path. 

- Select the account and address type. See Address types . 

- Verify the first address shown in the extension against the device screen. 

 
## Signing
 Section titled “Signing” 

 

- Build the transaction in the extension as usual. 

- The extension hands it to the device, over USB or as a QR sequence. 

- Read the transaction on the device screen. Amount, destination, fee. 

- Approve on the device. 

- Return the signature to the extension, which broadcasts it. 

 The device screen is the one that counts
 A compromised computer can show you one destination in the browser and pass a different one to the
device. The device screen is outside that computer’s control. If they disagree, the device is right
and you should reject.

 
 
## Expected result
 Section titled “Expected result” 

 A wallet whose keys are on the device. The extension can build transactions and show balances, and
cannot sign anything on its own.

 
## Common failures
 Section titled “Common failures” 

 What you see What it means What to do Ledger or Trezor is disabled, reading Coming soon Not implemented as a connection in this build Use Keystone, or watch-only The device is not detected over USB Browser permission, cable, or firmware Try the air-gapped QR path instead Addresses differ between device and extension Address type or derivation path mismatch Fix before receiving anything The QR sequence will not complete Screen brightness, camera focus, or a partial scan Restart the sequence from the beginning 

 
## Recovery path
 Section titled “Recovery path” 

 A hardware wallet has its own recovery phrase, held by the device, not by Universe Wallet. Losing the
device is survivable if you have that phrase. Losing the phrase is not, exactly as described in
 Backup and recovery .

 
## Related
 Section titled “Related” 

 

- Watch-only wallets 

- Known limitations 

 Edit page Last updated: Nov 11, 2026 

 Previous Watch-only wallets Next Security dashboard 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Main/ConnectHardwareModal.tsx, frontend/ui/pages/Account/CreateKeystoneWalletScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
