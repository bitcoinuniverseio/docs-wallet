# Watch-only wallets | Universe Wallet

What the cold-wallet import actually is in this build, where its entry point lives, and what you cannot do with it.

- Universe Wallet 
- Everyday tasks 
 
# Watch-only wallets

 Intended reader: someone who wants to watch an address without holding its keys in the browser.
 Goal: visibility of balances and assets with no signing capability present.
 Prerequisites: the extended public key of the wallet you want to watch.
 Safety: a watch-only wallet cannot spend. That is its entire value.

 
## What it is
 Section titled “What it is” 

 A cold wallet import brings in public key material only . The wallet can derive addresses, show
balances, show assets, and build unsigned transactions. It holds nothing that can authorize a spend.

 Two limits worth knowing before you start
 

- The import takes an extended public key , presented by QR from an air-gapped device. There is no
flow in this build for typing or pasting a single address to watch. 

- The entry point is behind developer mode , which you enable by tapping the version number in
the About screen repeatedly. It is not on the ordinary setup path. 

 
 
## What it is for
 Section titled “What it is for” 

 

- Watching cold storage. Keys stay on a device that never touches a browser; the extension shows
you what is there. 

- Preparing transactions offline. Build the transaction in the browser, sign it elsewhere, then
broadcast. 

- Reducing exposure. Nothing in the browser profile can move those funds, so a compromised browser
is a privacy problem rather than a loss. 

 
## Steps
 Section titled “Steps” 

 

- Open Settings , then About , and enable developer mode by tapping the version repeatedly. 

- Add a wallet, and choose the cold wallet option. 

- Scan the extended public key QR from your signing device. 

- Confirm the derived addresses match the ones your signing device shows. 

 
## Expected result
 Section titled “Expected result” 

 A wallet entry that shows balances and assets, and that offers no path to sign a transaction. Any
attempt to spend produces an unsigned transaction for you to sign elsewhere.

 
## How to verify
 Section titled “How to verify” 

 Compare the first derived address against what your signing device displays. If they differ, the
derivation path or account index does not match. Do not receive to an address you have not verified on
the signing device itself.

 
## Common failures
 Section titled “Common failures” 

 What you see What it means What to do No cold wallet option Developer mode is not enabled Enable it in About Addresses do not match the device Wrong derivation path or account Recheck the path on the signing device Balance is zero but the device shows funds Different address type or path See Address types 

 
## Recovery path
 Section titled “Recovery path” 

 A watch-only wallet holds nothing to lose. Remove it and re-import at any time. Your funds are
governed entirely by the device holding the keys.

 
## Related
 Section titled “Related” 

 

- Hardware wallets 

- Security model 

 Edit page Last updated: Nov 11, 2026 

 Previous Read your activity Next Hardware wallets 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Account/CreateColdWalletScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
