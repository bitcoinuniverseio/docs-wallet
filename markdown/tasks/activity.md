# Read your activity | Universe Wallet

What pending really means, how many confirmations to wait for, and what to do about a transaction that will not confirm.

- Universe Wallet 
- Everyday tasks 
 
# Read your activity

 Intended reader: anyone waiting on a transaction, or checking what happened.
 Goal: correctly reading the state of your own money.
 Prerequisites: an unlocked wallet.

 
## The states
 Section titled “The states” 

 State Meaning Pending Broadcast, sitting in the mempool, not in a block. It can still be dropped. Confirmed Included in a block. Each new block adds a confirmation. Failed A failure was reported. Check the recorded evidence to distinguish a rejected request from an unknown outcome. 

 A timeout, interrupted page or error message alone does not establish that no funds moved or no fee
was paid. For a marketplace purchase, keep the existing execution or request reference and return to
that purchase to check its recorded status. Do not start a replacement purchase or clear wallet
storage to resolve an uncertain outcome. See
 Zcash market listings .

 
## How many confirmations
 Section titled “How many confirmations” 

 There is no universal answer, only a risk judgement.

 

- One confirmation is enough for a small payment between people who trust each other. 

- Three confirmations is a common threshold for ordinary amounts. 

- Six confirmations is the traditional benchmark for something you would mind losing. 

 An unconfirmed transaction is not a payment. If someone tells you they have sent funds and your wallet
shows pending, you have a promise, not money.

 
## When something will not confirm
 Section titled “When something will not confirm” 

 The fee rate was below what blocks are currently clearing.

 This wallet has no way to speed up a stuck transaction
 There is no fee bump, no speed up, and no child-pays-for-parent flow in Universe Wallet 1.7.5.8.
If a transaction is stuck, your options are: wait for the mempool to quieten, in which case it may
confirm eventually; or, if it was marked replaceable when you created it, build a replacement using
separate software that supports replacement. A transaction that is never mined is eventually dropped
by nodes and the coins become spendable again, but there is no fixed timetable for that.

 
 Marking a transaction replaceable at creation does not give you a control in this wallet for replacing
it later. That is why choosing the fee carefully the first time
matters more here than in wallets that offer a bump.

 
## Reading an entry
 Section titled “Reading an entry” 

 Each entry shows the amount, the direction, the fee, the counterparty address, and the transaction id.
The transaction id is the thing you can hand to anyone: it is public, it is verifiable independently,
and it does not reveal anything about your wallet beyond what the chain already shows.

 
## Where asset movements appear
 Section titled “Where asset movements appear” 

 Asset transfers appear alongside payments, subject to the wallet being able to read them. Asset data
comes from indexers, which read the chain and decide what a transaction meant. Indexers can lag behind
confirmations, so a confirmed transaction can briefly show a payment without its asset effect.

 If the wallet cannot read a protocol at all, the payment still appears and the asset effect does not.
See What this release authorizes .

 
## Common failures
 Section titled “Common failures” 

 What you see What it means What to do Pending for hours Fee below current clearing rate Wait. See the warning above. A transaction you do not recognise Either a change output you misread, or a real problem Check whether the destination is your own address. If not, go to If your wallet is compromised Confirmed but the asset has not moved Indexer lag, or an unsupported protocol Wait, then check Troubleshooting Activity is empty after a restore Wrong address type or derivation path See Address types 

 
## Related
 Section titled “Related” 

 

- Choose a fee 

- Inputs, outputs, fees, change 

 Edit page Last updated: Nov 11, 2026 

 Previous Switch chain and network Next Watch-only wallets 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Wallet/HistoryScreen/index.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-17 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
