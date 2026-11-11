# Backup and recovery | Universe Wallet

What the recovery phrase restores, what it does not, and which of the five ways to lose a wallet has no way back.

- Universe Wallet 
- How it works 
 
# Backup and recovery

 Your coins are not in the extension. They are on the chain. The extension holds the keys that
authorize moving them, and the recovery phrase reproduces those keys anywhere.

 
 Four of these five situations are recoverable from paper alone. The fifth has no path back, for
anyone.
 

 
## What the phrase restores
 Section titled “What the phrase restores” 

 Everything that is money:

 

- every account in the wallet, 

- every network, 

- every address type, 

- on any device, in any BIP-39 compatible wallet, not only this one. 

 
## What the phrase does not restore
 Section titled “What the phrase does not restore” 

 Everything that is a setting:

 

- your password, 

- connected sites, 

- address labels and contacts, 

- coins you locked yourself, 

- spending limits. 

 These live on the device. After a restore, your funds and assets are all there, and your preferences
are not. Expect to set them up again. Nothing about that indicates a failed restore.

 
## The five situations
 Section titled “The five situations” 

 What happened Recoverable What to do Forgot the password Yes The password unlocks one installation and is not the backup. Reinstall, then restore from the phrase. Device lost, stolen, or broken Yes Restore from the phrase on another device. Your coins were never on the old one. Extension removed or profile wiped Yes Reinstalling gives you an empty wallet. Restore from the phrase. Someone else saw the phrase Access is fine, secrecy is not Move everything to a wallet made from a new phrase, immediately. See If your wallet is compromised . Phrase lost and you cannot unlock No There is no path. See below. 

 The one with no way back
 If your recovery phrase is gone and you can no longer unlock the wallet, nobody can recover it. Not
Universe, not the browser vendor, not a support agent, not a recovery service. Anyone offering to do
it is arranging a second theft. There is no exception to this and there never will be.

 
 
## The situation people miss
 Section titled “The situation people miss” 

 Phrase lost, but the wallet still unlocks. This is urgent and it is survivable, and people sit on
it for months because nothing appears to be wrong.

 Do one of these today:

 

- Open Settings , then Export recovery phrase , and write it down properly. See
 Back up your recovery phrase . 

- Or move everything to a wallet whose phrase you do have. 

 The window closes the moment anything happens to that browser profile.

 
## Restoring, step by step
 Section titled “Restoring, step by step” 

 

- Install the extension from the real store listing. See Install . 

- Choose to import a wallet. 

- Enter the phrase, in order, plus the BIP-39 passphrase if you used one. 

- Select the address type you used before. If the balance looks wrong, this is almost always why. See
 Address types . 

- Confirm a known address of yours appears. 

- Set your password, auto-lock, and any settings you want back. 

 
## Related
 Section titled “Related” 

 

- Back up your recovery phrase 

- Import an existing wallet 

- Locking and passwords 

 Edit page Last updated: Nov 11, 2026 

 Previous Connection permissions Next Chains and networks 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/service/keyring, frontend/ui/pages/Settings/ExportMnemonicsScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
