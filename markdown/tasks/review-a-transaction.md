# Review a transaction | Universe Wallet

How to read the approval screen in the order it is built, the four lines that matter most, and the ones that should make you reject.

- Universe Wallet 
- Everyday tasks 
 
# Review a transaction

 Intended reader: anyone about to approve anything.
 Goal: understanding what you are authorizing before you authorize it.
 Prerequisites: a pending approval on screen.
 Safety: this is the last point at which the outcome is still up to you.

 The approval screen is stacked in a fixed order, and the order is deliberate. Read it from the top.

 
 Blocking problems come first, then what actually happens to your money, then the overall status,
then non-blocking warnings, then the full detail. Reject sits beside Approve at the same size.
 

 
## The four lines that matter most
 Section titled “The four lines that matter most” 

 Even in a hurry, read these four.

 What you are about to sign Leaves your wallet 0.03450000 BTC Comes back to you 0.01446152 BTC Network fee 0.00003848 BTC at 18.5 sat/vB Assets touched None 

 

- What leaves. Not what you typed. What the transaction actually spends. 

- What comes back. Your change. If this is missing or much smaller than you expected, the
difference went to the fee. 

- The fee. Stated once, in one place, as an amount and a rate. 

- Assets touched. If this is not “none” on a payment you intended to be plain money, stop. 

 
## Reading it in full
 Section titled “Reading it in full” 

 
### Blocking
 Section titled “Blocking” 

 A check that failed hard. Approve stays disabled and you cannot click through it. This is not advice;
it is a refusal.

 
### Impact
 Section titled “Impact” 

 What leaves, what returns, the net change, and any assets touched. Every line carries a confidence
mark of EXACT , ESTIMATED , or
 UNKNOWN . See
 Confidence marks .

 
### Status
 Section titled “Status” 

 Ready, Review, or Blocked. It can never read Ready while any fact on the screen is unknown.

 
### Warnings
 Section titled “Warnings” 

 Things worth knowing that do not block: address reputation notes, decoded risk rows, advisories. Each
risk row is labelled Warning or Critical in words, not only by colour.

 
### Details
 Section titled “Details” 

 Network and account, the destination and whether it is external to your wallet, the fee, every input
and output, which inputs are protected, and the raw transaction so you can inspect it elsewhere.

 
## When to reject
 Section titled “When to reject” 

 Reject, without hesitating, if any of these is true.

 

- The change output is missing and you cannot account for the remainder. 

- The destination is not the address you expect, character for character at both ends. 

- An amount is larger than you intended, in any line. 

- Anything is marked unknown. 

- The origin shown is not the site you think you are on. 

- A protected coin is being spent and you did not deliberately start an asset transfer. 

- You do not understand what the transaction does. 

 Rejecting costs nothing
 No fee is paid. Nothing is broadcast. Nothing is recorded on chain. You can always ask the site to
try again. The only cost of rejecting is a few seconds; the cost of approving wrongly is permanent.

 
 
## Expected result
 Section titled “Expected result” 

 Approving broadcasts the transaction and moves you to a result screen with a transaction id. Rejecting
closes the request and tells the requesting site you declined.

 
## How to verify afterwards
 Section titled “How to verify afterwards” 

 

- The activity entry shows the same amount and the same fee you saw on the review. 

- Your balance dropped by amount plus fee, and nothing else moved. 

- Any asset you hold is still listed. 

 
## Related
 Section titled “Related” 

 

- What a signature authorizes 

- Review a PSBT 

- Inputs, outputs, fees, change 

 Edit page Last updated: Nov 11, 2026 

 Previous Choose a fee Next Review a PSBT 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Approval/components 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
