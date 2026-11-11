# Known limitations | Universe Wallet

Every limit of Universe Wallet 1.7.5.8 that could be established from source, including the ones that are inconvenient to admit.

- Universe Wallet 
- Reference 
 
# Known limitations

 An undocumented limitation is treated as a bug in the documentation. If you find one missing, report
it through support .

 
## Release position
 Section titled “Release position” 

 

- The published build is 1.0.13, from April 2025. This documentation describes the
1.7.5.8 source tree, which has not been submitted or published. See
 Which version you are running . 

- No protocol operation is authorized in the committed baseline. 
0 of 42. Authorization is attached at release
time from evidence, and the baseline carries none on purpose. 

- Ordinary Bitcoin sending is behind a release gate , exactly like a protocol operation. Whether
it works in your build was decided by that build. 

 
## Transactions
 Section titled “Transactions” 

 

- There is no fee bump, no speed up, and no child-pays-for-parent. You can mark a transaction
replaceable at creation, and the wallet gives you no way to build the replacement. A payment sent at
too low a rate can only be waited out or replaced using separate software. 

- There is no standalone coin control screen. Manual coin selection exists inside the PSBT
approval flow, where the request allows it. It is not offered on the ordinary send screen. 

- The transaction inspector does not decode PSBTs. It looks up an existing transaction by id. A
PSBT is reviewed on its approval screen. 

 
## Signing
 Section titled “Signing” 

 

- You cannot compose and sign your own message. Message signing appears only as an approval, in
response to a request from a connected site. 

- Raw data signing is off by default and requires a typed confirmation to enable, by design. 

 
## Keys and devices
 Section titled “Keys and devices” 

 

- Ledger and Trezor cannot be connected. They appear in the hardware list, disabled, marked coming
soon. Keystone is the one working integration. 

- The hardware wallet feature is marked experimental in the product. Verify addresses on the
device and start small. 

- Watch-only import is behind developer mode , and takes an extended public key by QR. There is no
flow for watching a single pasted address. 

- New wallets are 12 words. Longer phrases from other wallets import fine. 

 
## Networks and protocols
 Section titled “Networks and protocols” 

 

- Babylon and Cosmos are not selectable. The registry carries a Babylon entry and the source tree
carries Babylon screens, whose design obligation is recorded as not intended, meaning only the
unavailable state ships. 

- Firefox is not published. Build targets exist in the source tree. No listing exists. 

- Safari and mobile browsers are not supported , and cannot be, because browser extensions do not
run there. 

 
## Data and display
 Section titled “Data and display” 

 

- Asset data depends on indexers , which read the chain and decide what a transaction meant. They
can lag behind confirmations, and a protocol the wallet does not index cannot be classified or
protected. 

- Fiat display depends on a current Universe price source. When no current price is available,
amounts show without a fiat figure rather than with a stale or third-party number. 

- The language picker offers four languages , English, Chinese, Japanese, and Spanish, while seven
locale files ship inside the artifact. 

 
## Custody and settings
 Section titled “Custody and settings” 

 

- Settings do not travel with the phrase. Contacts, labels, locked coins, limits, and connected
sites are device-local. After a restore, re-create them. 

- A wallet cannot make chain data private. Addresses and transactions are public by nature. See
 Privacy . 

- Protection is a Universe Wallet behaviour, not a property of your keys. Import the same phrase
into another wallet and every coin becomes ordinary money again. 

 
## Things this documentation could not verify
 Section titled “Things this documentation could not verify” 

 Stated here rather than described elsewhere, because an unverifiable claim in a wallet manual is a
liability.

 

- No screenshots of the product exist in this documentation. The product’s own capture harness
currently runs the wallet offline, so every screen it captures settles into an empty or error state.
Rather than present a mock as a real capture, this site uses hand-authored diagrams and describes
interfaces in words. 

- The behaviour of the published 1.0.13 build could not be verified. Its source is not the tree
this documentation was written against. Where this site and your wallet disagree, your wallet is
correct. 

 
## Related
 Section titled “Related” 

 

- Supported features 

- Troubleshooting 

 Edit page Last updated: Nov 11, 2026 

 Previous Supported features Next Capability evidence 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/ROUTE-INVENTORY.json, docs/PUBLIC-CAPABILITY-SUMMARY.json, docs/STORE-LISTING.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
