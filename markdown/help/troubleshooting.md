# Troubleshooting | Universe Wallet

The failures people actually hit, what each one means about your funds, and what to do about it.

- Universe Wallet 
- Help 
 
# Troubleshooting

 The reassuring part first
 Almost nothing in this list means your funds are at risk. Your coins are on the chain, not in the
extension, and your keys come back from your recovery phrase. The exceptions are called out
explicitly.

 
 
## The wallet will not open, or the popup is blank
 Section titled “The wallet will not open, or the popup is blank” 

 Usually a stalled extension service worker.

 

- Close the popup and reopen it from your pinned toolbar icon. 

- Open the wallet in a full tab or the side panel instead. 

- Reload the extension from the browser’s extension page. 

- Restart the browser. 

 Your funds are fine. This is a browser process problem, not a wallet problem.

 
## Balance shows zero after a restore
 Section titled “Balance shows zero after a restore” 

 Almost always the address type or derivation path, not the phrase.

 

- Try each address type: Native SegWit, Taproot, Nested SegWit, Legacy. See
 Address types . 

- If you imported from another wallet, use its preset. See
 Import an existing wallet . 

- If you used a BIP-39 passphrase, enter it. Without it you have a different wallet entirely. 

- Check an address you know is yours appears somewhere in the restored wallet. 

 
## Available balance is lower than the total
 Section titled “Available balance is lower than the total” 

 Working as intended. Some coins are protected and cannot fund a plain payment. Open the locked coins
screen to see which, and why. See Protected outputs .

 If more is protected than usual, an indexer may be lagging or unreachable, and coins that are normally
clear are being held back because unknown is treated as unsafe.

 
## A screen says the operation is not available in this build
 Section titled “A screen says the operation is not available in this build” 

 Not an outage and not a setting. Your build does not carry evidence for that operation. Nothing local
changes it. See Why an action is unavailable .

 
## A transaction has been pending for hours
 Section titled “A transaction has been pending for hours” 

 The fee rate was below what blocks are currently clearing.

 There is no fee bump in this wallet
 Universe Wallet 1.7.5.8 has no fee bump, no speed up, and no child-pays-for-parent. Your options are
to wait, or, if you marked the transaction replaceable when you created it, to build a replacement
using separate software. A transaction that is never mined is eventually dropped by nodes and the
coins become spendable again, with no fixed timetable.

 
 
## Assets do not appear, but the balance does
 Section titled “Assets do not appear, but the balance does” 

 Asset data comes from indexers, which read the chain and decide what a transaction meant. They can lag
behind confirmations.

 

- Pull down on the home screen to force a refresh. 

- Check whether the protocol is one your build can read at all. See
 What this release authorizes . 

- Look for a wallet API unreachable notice, which appears only after a health check failed and
retries every minute. 

 
## An image will not load
 Section titled “An image will not load” 

 A tile reading media unavailable means every source for that item failed. Other tiles keep loading.
Originals stay exact on chain. See Media and large portfolios .

 
## A connected site does not work
 Section titled “A connected site does not work” 

 

- Check it appears under Connected sites . If the site claims
you are connected and the wallet does not list it, the page is faking that state. Leave. 

- Check you are on the network the connection was granted for. A connection covers one address on one
network. 

- Disconnect and reconnect. 

- Reload the page. 

 
## The approval window did not appear
 Section titled “The approval window did not appear” 

 The extension service worker may be asleep, or the window opened behind your browser.

 

- Check for another browser window. 

- Open the extension from your toolbar, then retry the action on the site. 

 
## An approval says Request replaced
 Section titled “An approval says Request replaced” 

 The request changed after you looked at it, so the wallet refused rather than signing. This is the
protection working. Do not retry blindly: refresh the site’s state first, then start the action
again, and read the new request carefully.

 
## You forgot your password
 Section titled “You forgot your password” 

 Not recoverable, and not fatal. Reinstall the extension and restore from your recovery phrase. See
 Backup and recovery .

 
## Coins moved and you did not authorize it
 Section titled “Coins moved and you did not authorize it” 

 Stop reading this page. Go to
 If your wallet is compromised . Speed matters more than
diagnosis.

 
## Still stuck
 Section titled “Still stuck” 

 Support and reporting . Nobody there will ever ask for your recovery
phrase.

 Edit page Last updated: Nov 11, 2026 

 Previous Machine-readable docs and MCP Next Frequently asked questions 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/ROUTE-INVENTORY.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
