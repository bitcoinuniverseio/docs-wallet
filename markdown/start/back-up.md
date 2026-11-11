# Back up your recovery phrase | Universe Wallet

How to record the phrase so it survives fire, theft, moving house, and your own memory, and how to prove the backup actually works.

- Universe Wallet 
- Start here 
 
# Back up your recovery phrase

 Intended reader: anyone whose wallet holds, or will hold, anything they would mind losing.
 Goal: a physical record of the phrase that you can find in five years.
 Prerequisites: the wallet, your password, pen and paper, a private room.
 Safety: this is the highest-risk routine action in the whole product. Everything else can be
retried.

 
## The rule
 Section titled “The rule” 

 Your recovery phrase is the wallet. Not a hint, not a reset code. Whoever has the words has the coins.

 
 What the phrase carries: every account, every network, every address type, on any device and
in any BIP-39 compatible wallet. What it does not carry: your password, your connected
sites, your labels, contacts, frozen coins, and spending limits. Those are device settings and
have to be set up again after a restore.
 

 
## Where to write it
 Section titled “Where to write it” 

 Do Do not Pen on paper, or stamped metal Photograph it Two copies, in two separate places Store it in cloud notes, email, or chat Numbered, in order Type it into any website, ever Somewhere a house fire or a burglary would not reach both copies Store it in a password manager you do not control the sync of Somewhere someone you trust could find it if you could not Split it across services and hope 

 Order is part of the secret. Twelve correct words in the wrong order is not your wallet.

 
## Steps
 Section titled “Steps” 

 

- Open Settings , then Export recovery phrase . 

- Enter your password. 

- Write the words on paper, numbered, in order. 

- Close the screen before you do anything else. 

- Put the paper where you decided it goes, now, not later. 

 
## How to verify the backup works
 Section titled “How to verify the backup works” 

 A backup you have never tested is a hope, not a backup.

 

- Note the first receiving address of your wallet. 

- In a separate browser profile, install the extension and restore from the paper copy alone. Do not
look at the screen version. 

- Confirm the same first address appears. 

- Remove that test wallet from the second profile. 

 If the address matches, your paper copy is correct and complete. If it does not, fix it while you can.

 
## Expected result
 Section titled “Expected result” 

 You can reconstruct the wallet from paper alone, with no device, no password, and no help.

 
## Common failures
 Section titled “Common failures” 

 What happens What it means The restored wallet shows a different address Usually a different address type, not a wrong phrase. Compare all four. See Address types . A word is illegible on the paper Rewrite the whole phrase from the wallet now, while you still can unlock it. You used a BIP-39 passphrase and did not record it The phrase alone is not enough. Record the passphrase separately, in a different place. 

 
## Recovery path
 Section titled “Recovery path” 

 While you can still unlock the wallet, every backup problem is fixable: open the export screen and
write it again. Once you cannot unlock it and the paper is wrong, there is no path. That asymmetry is
the whole reason to do this today.

 
## Related
 Section titled “Related” 

 

- Backup and recovery 

- If your wallet is compromised 

 Edit page Last updated: Nov 11, 2026 

 Previous Import an existing wallet Next Receive for the first time 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Settings/ExportMnemonicsScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
