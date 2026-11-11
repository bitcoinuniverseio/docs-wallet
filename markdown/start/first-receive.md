# Receive for the first time | Universe Wallet

Get an address, check it in more than one place, and use a small test amount before anything that matters.

- Universe Wallet 
- Start here 
 
# Receive for the first time

 Intended reader: someone receiving into Universe Wallet for the first time.
 Goal: funds arriving at an address you control, confirmed on chain.
 Prerequisites: a wallet whose recovery phrase is already written down.
 Chain and network: any supported chain. Check the network before you share an address.
 Safety: an address sent to the wrong chain or network is money gone. Verify twice.

 
## Steps
 Section titled “Steps” 

 

- Open the wallet and confirm the account and network shown at the top are the ones you mean. See
 Chains and networks . 

- Open Receive . 

- Copy the address, or show the QR code. 

- Send a small test amount first, from wherever the funds are coming from. 

- Wait for it to appear, then send the rest. 

 
## Verify the address before you use it
 Section titled “Verify the address before you use it” 

 Address confusion is the failure mode here, and it is silent.

 

- Check the first four and last four characters against what the sender sees, out loud if
possible. Clipboard-replacement malware changes the middle. 

- Check the prefix matches the network. A mainnet Bitcoin address starts bc1q , bc1p , 3 , or
 1 . Test network addresses look different. Sending mainnet coins to a testnet address, or the
reverse, does not bounce back. 

- Check the chain. A Bitcoin address is not a Dogecoin address. Nothing will warn the sender. 

 
## Expected result
 Section titled “Expected result” 

 The amount appears in your activity as pending, then confirms. Your balance goes up by the amount
sent, and the sender pays the fee.

 
## How to verify
 Section titled “How to verify” 

 

- The transaction appears under Activity with an increasing confirmation count. 

- The amount matches exactly. If it is lower, the sender paid the fee out of the amount, which is
their choice, not an error in your wallet. 

 
## Common failures
 Section titled “Common failures” 

 

 What you see What it means What to do Nothing arrives, but the sender has a transaction id The transaction exists and is unconfirmed, or went to a different address Look up the transaction id. Check which address it actually paid. Funds arrive but show as unavailable The coin was classified as asset-bearing, or is not yet confirmed See Protected outputs . The balance updates but assets do not Asset data comes from indexers and can lag behind the chain Wait, then see Troubleshooting . You sent to the wrong network The coins went to an address on a chain this wallet is not watching If you hold the keys for that chain in this phrase, you may be able to reach them. If not, they are gone. 

 
## Recovery path
 Section titled “Recovery path” 

 Receiving cannot lose funds that are already yours. The only irreversible mistake at this stage is
publishing an address that is not actually yours, which is why the verification step above exists.

 
## Related
 Section titled “Related” 

 

- Receive , including payment requests with an amount 

- Payment and asset addresses 

 Edit page Last updated: Nov 11, 2026 

 Previous Back up your recovery phrase Next Send for the first time 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Wallet/ReceiveScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
