# Create a wallet | Universe Wallet

Generate a new 12-word wallet, choose a password, pick an address type, and finish the backup check before any money is involved.

- Universe Wallet 
- Start here 
 
# Create a wallet

 Intended reader: someone setting up their first Universe Wallet.
 Goal: a funded-ready wallet whose recovery phrase is written down on paper.
 Prerequisites: the extension installed. Pen and paper. Ten quiet minutes.
 Chain and network: all chains. Defaults to Bitcoin mainnet.
 Safety: the phrase you are about to see is the wallet. Nobody is keeping a copy.

 Do this where nobody can see your screen
 Not on a shared machine, not on a call, not while screen recording, not in a coffee shop with your
back to the room. A phrase seen once is a phrase gone forever.

 
 
## Steps
 Section titled “Steps” 

 

- Open the extension and choose to create a new wallet. 

- Set a password. This encrypts the vault on this device. It is not recoverable and it is not
your backup. Use something long that you will still know in a year. 

- Read the recovery phrase. The wallet generates a 12-word BIP-39 phrase. Write the words on
paper, in order, numbered. Do not photograph it. Do not type it anywhere. 

- Pass the confirmation check. The wallet asks you to put selected words back in place. This
exists so that a phrase you never actually wrote down cannot silently become the only copy. 

- Choose an address type. Native SegWit is the default and is right for most people. If you are
going to hold inscriptions, read
 Payment and asset addresses first, because Taproot is where
artifacts conventionally live. 

- Finish. The wallet opens on an empty account. 

 
## Expected result
 Section titled “Expected result” 

 

- A wallet with one account, no balance, and an address you can receive to. 

- A paper record of 12 words, in order, stored somewhere you would still find after a house move. 

 
## How to verify
 Section titled “How to verify” 

 Before you put real money in, prove the backup works:

 

- Note your first receiving address. 

- Lock the wallet, or use a second browser profile. 

- Restore from the phrase you wrote down. 

- Confirm the same first address appears. 

 If a different address appears, either a word is wrong, the order is wrong, or the address type
differs. Fix that now, while the wallet is empty. See
 Backup and recovery .

 
## Common failures
 Section titled “Common failures” 

 

 What happens What it means What to do The confirmation check rejects your words The written copy does not match Start over rather than guessing. An empty wallet costs nothing to redo. You wrote the words but not the order BIP-39 order is part of the secret Redo the creation. Order matters. A restore shows a different address Wrong address type, not a wrong phrase, in most cases Switch address type and compare. See Address types . You closed the window before writing anything down Nothing is lost yet, because nothing is funded Delete the wallet and create a new one. 

 
## Recovery path
 Section titled “Recovery path” 

 While the wallet is empty, every mistake is free. That is the only time this is true, so use it. Once
funds arrive, the phrase on paper is the only path back.

 
## Related
 Section titled “Related” 

 

- Back up your recovery phrase 

- Backup and recovery 

- Locking and passwords 

 Edit page Last updated: Nov 11, 2026 

 Previous Install Next Import an existing wallet 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Account/CreateHDWalletScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
