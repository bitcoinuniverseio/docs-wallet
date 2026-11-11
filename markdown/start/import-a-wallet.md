# Import an existing wallet | Universe Wallet

Bring a wallet in from a recovery phrase or a private key, including the derivation-path presets for Unisat, Sparrow, Xverse, and Ordinals Wallet.

- Universe Wallet 
- Start here 
 
# Import an existing wallet

 Intended reader: someone moving an existing wallet into Universe Wallet, or adding a second one.
 Goal: your existing addresses and balances visible, at the same addresses you had before.
 Prerequisites: the recovery phrase or private key, and knowledge of which wallet it came from.
 Safety: typing a phrase is the moment you are most exposed. Confirm you are in the real extension
first.

 Check where you are typing
 Open the wallet from your own pinned toolbar icon. Never from a link, a pop-up window a page opened,
or a page that looks like the wallet. A page cannot see what you type into the extension. A fake
extension can see everything.

 
 
## What you can import
 Section titled “What you can import” 

 

 Source Supported 12 or 24-word BIP-39 recovery phrase Yes BIP-39 passphrase, sometimes called a 25th word Yes, entered alongside the phrase Custom derivation path Yes Private key, WIF or hex Yes, as a single-key wallet An address only, with no key Not through this flow. See Watch-only wallets . 

 
## Derivation presets
 Section titled “Derivation presets” 

 The same phrase produces different addresses under different derivation paths, which is why an
imported wallet can look empty when nothing is wrong. Universe Wallet offers presets that match how
other wallets derive.

 

 Preset Address types it offers Unisat Wallet Native SegWit, Nested SegWit, Taproot, Legacy, and two BIP-44 compatibility variants Sparrow Wallet Legacy, Native SegWit, Nested SegWit, Taproot Xverse Wallet Nested SegWit, Taproot Ordinals Wallet Taproot Other wallet All six variants 

 Universe Wallet scans the candidate paths and shows which of them have a balance or history, so you
can pick the one that matches your old wallet rather than guessing.

 
## Steps
 Section titled “Steps” 

 

- Open the extension from your pinned icon. 

- Choose to import a wallet. 

- Enter the recovery phrase, in order. Add the BIP-39 passphrase if your old wallet used one. 

- Choose the preset for the wallet it came from, or set a custom derivation path. 

- Compare the addresses shown against an address you already know is yours. 

- Select the matching address type and finish. 

 
## Expected result
 Section titled “Expected result” 

 At least one address matches an address you used before, and the balance and history you expect
appear against it.

 
## How to verify
 Section titled “How to verify” 

 Take one address you have used in the past, and find it in the imported wallet. That single match
proves the phrase, the passphrase, the path, and the address type are all correct together. A balance
alone does not prove it, because a wrong path can still show an empty but valid wallet.

 
## Common failures
 Section titled “Common failures” 

 

 What you see Most likely cause What to do Wallet imports but shows zero balance Wrong derivation path or address type Try the preset for your old wallet, then the other address types. One word is not accepted It is not in the BIP-39 word list Check spelling. Many words differ only in the last letters. Addresses are close but not the same A BIP-39 passphrase was used and is missing Enter the passphrase. Without it, this is a different wallet entirely. Balance appears but assets do not Asset data comes from indexers, which can lag Wait, then check Troubleshooting . 

 
## Recovery path
 Section titled “Recovery path” 

 Importing is non-destructive to the source wallet. Your phrase still works everywhere it worked
before. If the import looks wrong, remove the imported wallet from Universe Wallet and try a
different path or address type. Nothing about a failed import can move your coins.

 After importing, that phrase now lives in two places
 Every additional place a phrase exists is another way to lose it. If your old wallet was on a device
you no longer control, treat the phrase as exposed and follow
 If your wallet is compromised .

 
 
## Related
 Section titled “Related” 

 

- Address types 

- Backup and recovery 

 Edit page Last updated: Nov 11, 2026 

 Previous Create a wallet Next Back up your recovery phrase 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/shared/constant/index.ts 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
