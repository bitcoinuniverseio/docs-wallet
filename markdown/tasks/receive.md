# Receive | Universe Wallet

Get an address, create a payment request with an amount and a note, and understand what appears while a payment is still unconfirmed.

- Universe Wallet 
- Everyday tasks 
 
# Receive

 Intended reader: anyone being paid.
 Goal: funds arriving at an address you control, on the network you meant.
 Prerequisites: an unlocked wallet with the intended account and network selected.
 Safety: the risk here is publishing the wrong address, not losing what you already have.

 
## Steps
 Section titled “Steps” 

 

- Confirm the account and network shown at the top of the wallet. 

- Open Receive . 

- Copy the address, or show the QR code for someone to scan. 

- Optionally set an amount and a note. The wallet encodes those into the QR code and into a
copyable link, so the sender’s wallet can pre-fill them. 

- Share it. 

 
## Verify before sharing
 Section titled “Verify before sharing” 

 

- Compare the first four and last four characters of the address against what the recipient sees.
Clipboard-replacement malware changes the middle and leaves the ends plausible. 

- Check the prefix matches the network . See
 Payment and asset addresses . 

- Check the chain . A Bitcoin address is not a Dogecoin address and nothing will stop a sender
trying. 

 
## Address reuse
 Section titled “Address reuse” 

 Reusing one address works and links every payment to it publicly. Using a fresh address per payment
is better for privacy and makes no difference to safety. See Privacy .

 
## Which address to publish
 Section titled “Which address to publish” 

 

 You are receiving Use Plain bitcoin Your default receiving address, Native SegWit unless you changed it An inscription or ordinal Your Taproot address, unless the sender specifies otherwise From a service that rejects bc1 Your Nested SegWit address, starting with 3 

 
## Expected result
 Section titled “Expected result” 

 The payment appears under Activity as pending, then confirms. Your balance rises by the amount
sent. The sender pays the fee unless they chose to take it out of the amount.

 
## Common failures
 Section titled “Common failures” 

 

 What you see What it means What to do Nothing arrives, sender has a transaction id It went somewhere, possibly not to you Look up the id and check which address it paid It arrives but the balance is unavailable Unconfirmed, or classified as asset-bearing See Protected outputs Balance updates, assets do not Asset data comes from indexers and can lag Wait, then see Troubleshooting Amount is less than agreed The sender took the fee out of the amount Not a wallet problem. Ask the sender. 

 
## Recovery path
 Section titled “Recovery path” 

 Nothing about receiving can lose funds you already hold. If you published an address that was not
yours, the funds went to whoever owns it, and there is no recall.

 
## Related
 Section titled “Related” 

 

- Receive for the first time 

- Read your activity 

 Edit page Last updated: Nov 11, 2026 

 Previous Confidence marks Next Send bitcoin 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Wallet/ReceiveScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
