# Send bitcoin | Universe Wallet

Make an outgoing payment, understand the replaceable flag, and know what the wallet does not offer if the transaction gets stuck.

- Universe Wallet 
- Everyday tasks 
 
# Send bitcoin

 Intended reader: someone making a payment out of the wallet.
 Goal: the right amount reaching the right address, with no asset spent by accident.
 Prerequisites: available balance, the recipient address, an unlocked wallet.
 Chain and network: shown at the top of the wallet. Check it.
 Safety: irreversible once confirmed. There is no fee-bump flow to rescue a mistake.

 Sending is behind a release gate
 The send and broadcast screens sit behind the bitcoin/send and bitcoin/broadcast gates. Whether
they are usable in your build was decided at release time. If the screen states the operation is not
available in this build, that is authoritative. See
 Why an action is unavailable .

 
 
## Steps
 Section titled “Steps” 

 

- Open Send . 

- Confirm the account and network at the top. 

- Enter the recipient address, or pick one from your address book. 

- Enter the amount. The wallet spends from the available pool only, never from protected coins. 

- Choose a fee rate. See Choose a fee . 

- Optionally mark the transaction replaceable . Read the section below before you rely on it. 

- Read the review screen in full. See Review a transaction . 

- Approve, or reject. 

 
## The replaceable flag
 Section titled “The replaceable flag” 

 Universe Wallet lets you mark a transaction as replaceable when you create it, and the flag is off
by default . The review screen states which way it is set.

 Marking a transaction replaceable does not give you a way to replace it
 Universe Wallet 1.7.5.8 has no fee bump, no speed up, and no child-pays-for-parent flow . The flag
records that the network may accept a replacement; it does not add a control in this wallet for
building one. If your payment is stuck, your options are to wait, or to construct a replacement using
separate software that supports it. Do not send at a low rate on the assumption that you can raise it
later.

 
 The flag also has a privacy and counterparty effect: some recipients treat a replaceable unconfirmed
transaction as not yet received, and will wait for a confirmation before crediting you.

 
## Batch sending
 Section titled “Batch sending” 

 A batch send screen exists, paying several recipients in one transaction. It sits behind the same
 bitcoin/send gate as an ordinary payment, so its availability depends on your build. Batching is
cheaper than separate payments because the fee follows total size rather than the number of
recipients.

 
## Expected result
 Section titled “Expected result” 

 The transaction appears in Activity as pending, with the fee you chose, then gains confirmations.
Your available balance falls by amount plus fee, and a change output returns to an address you own.

 
## How to verify
 Section titled “How to verify” 

 

- The recipient confirms arrival. 

- The fee in your activity matches the fee you approved. 

- Every asset you held is still listed. 

 
## Common failures
 Section titled “Common failures” 

 What you see What it means What to do Insufficient funds while the total looks sufficient Protected coins cannot fund a plain payment See Protected outputs Fee looks unreasonably large Many small inputs are being consolidated, so the transaction is big Review the input list. Consider sending less, or a different coin selection. No change output on the review The remainder is being paid as fee Reject unless you meant it Stuck pending for hours The rate was below what blocks are currently clearing Wait. See the replaceable section above. Screen says not available in this build The release did not authorize the operation Nothing you can change locally 

 
## Recovery path
 Section titled “Recovery path” 

 Before approval: reject. It is free and complete.
After confirmation: none exists.

 
## Related
 Section titled “Related” 

 

- Send for the first time 

- Coin control 

- Inputs, outputs, fees, change 

 Edit page Last updated: Nov 11, 2026 

 Previous Receive Next Choose a fee 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Wallet/TxCreateScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Chain bitcoin 
 Lifecycle Not released 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
