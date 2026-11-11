# Send funds safely | Universe Wallet

You know how a safe send flows, and whether your build can send at all.

# Send funds safely

 ← All journeys 

# Send funds safely
 About 12 minutes Irreversible if wrong Wallet 1.7.5.8 · unpublished 
 Outcome: You know how a safe send flows, and whether your build can send at all.
 Before you start: Funds to send · A verified recipient address
 Completion looks like: Either the send completed with a transaction id, or your build showed the unavailable state because its release authorizes no sending.
 If something goes wrong: Before approval, a send is fully reversible: close the screen. After broadcast, nothing can pull a transaction back.
 
 
## All steps
 
- 
### Check that this build can send
 You are trying to Know the send availability for your release. You should see Builds whose release authorizes no sending show a plain unavailable panel: 'This build cannot send'. You do Open the send screen and read what it actually offers. Before you continue, check An unavailable state is the wallet protecting you. It is not a bug and not a network outage. What can go wrong Nothing to fear here: an unauthorized build cannot send, cannot be talked into sending, and loses nothing. Reversible? Yes. Not available here: This source tree authorizes no sending operation. The journey stops at the unavailable state for this release; the remaining steps describe the authorized flow for when a release ships it.
 
- 
### Compose the payment
 You are trying to Address, amount, fee. You should see The send form with a fee selector. You do Paste the address, set the amount, choose a fee. Before you continue, check Paste-back the address. Compare fee rate to the wallet's recommendation. What can go wrong A fee far above recommendation is a signal to stop and reread every field. Reversible? Yes. 
- 
### Read the review screen like a contract
 You are trying to Approve exactly what you decided. You should see The transaction review: recipient, amount, fee, change. You do Read every output. The change output must return to your wallet. Before you continue, check Every output accounted for: payment + change + fee = total. What can go wrong Approving a screen you did not read is how every send scam works. No exception. Reversible? No. Read twice. 
- 
### Approve and track
 You are trying to Broadcast and watch for the transaction id. You should see A confirmation, then the transaction id in activity. You do Approve. Open activity to watch confirmations. Before you continue, check The txid in your activity is the receipt. Confirmations mean settlement. What can go wrong After broadcast there is no undo. A stuck transaction is bumped or dropped by its fee, not by support. Reversible? No. Read twice. 

 Something wrong on this page? Open a prefilled issue in the documentation repository. What travels: the page path, the release this site describes, and your own words. Nothing about your wallet, transactions, or this browser is included or stored by this site.
 Page not helpful Stale screenshot Version mismatch Unsafe or unclear wording Broken journey 

 
 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 
- Bitcoin Universe documentation portal 
- Report a documentation error
