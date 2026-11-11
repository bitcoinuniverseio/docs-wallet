# The protocol registry | Universe Wallet

Every protocol the wallet knows about, the chains it runs on, the operations the product intends, and what this release actually authorizes.

- Universe Wallet 
- Assets and protocols 
 
# The protocol registry

 This table is generated from the wallet’s own capability summary. It is not written by hand and it is
not a wish list.

 Read the two operation columns separately
 Intended operations is what the product is built to do for that protocol. Authorized here is
what this release actually permits. In 1.7.5.8 the second column reads none for
every row, because the committed baseline authorizes nothing. See
 What this release authorizes .

 
 
## What the operation names mean
 Section titled “What the operation names mean” 

 Operation Meaning read The wallet can display balances or holdings for the protocol explore The wallet can browse the protocol’s data deploy Create a new token or collection mint Create new units of an existing token etch Define a new rune inscribe Write new data to the chain transfer Move an existing holding to another address marketplace Take part in that protocol’s trading flow send Move the chain’s own currency sign Produce a signature for the protocol’s transaction shape broadcast Submit the signed transaction to the network 

 A protocol with only read and explore is one you can look at and not trade. That is a deliberate
state, not an incomplete one.

 
## Every protocol
 Section titled “Every protocol” 

 Every protocol in the Universe Wallet 1.7.5.8 registry, with the operations the product intends and the operations this release authorizes. Protocol Chains Intended operations Authorized here State Alkanes alkanes bitcoin broadcast, explore, mint, read, sign none Not in this release ARC-20 arc-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release Atomicals atomicals bitcoin broadcast, mint, read, sign, transfer none Not in this release Babylon babylon cosmos explore, read none Not in this release Bitcoin bitcoin bitcoin broadcast, read, send, sign none Not in this release Bitmap bitmap bitcoin broadcast, explore, mint, read, sign, transfer none Not in this release BLOCK-20 block-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release BlockDrop blockdrop bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release BRC-110 brc-110 bitcoin none declared none Not in this release BRC-20 brc-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release CAT-20 cat-20 fractal broadcast, explore, read, sign, transfer none Not in this release CAT-721 cat-721 fractal broadcast, explore, read, sign, transfer none Not in this release ChainBloom chainbloom bitcoin explore, read none Not in this release DMT dmt bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release Doge TAP doge-tap dogecoin broadcast, explore, mint, read none Not in this release Dogecoin dogecoin dogecoin broadcast, read, send, sign none Not in this release Dogecoin marketplace dogecoin-marketplace dogecoin broadcast, explore, marketplace, read, sign none Not in this release Doginals doginals dogecoin broadcast, explore, inscribe, read, sign, transfer none Not in this release DRC-20 drc-20 dogecoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release DROPS drops bitcoin explore, read none Not in this release DUST-20 dust-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release Fractal Bitcoin fractal fractal explore, read none Not in this release Mezcal mezcal bitcoin broadcast, etch, explore, mint, read, sign none Not in this release OP Inscriptions op_inscriptions bitcoin broadcast, explore, inscribe, read, sign none Not in this release OP Names op_names bitcoin broadcast, explore, inscribe, read, sign, transfer none Not in this release OP_RETURN op_return bitcoin broadcast, deploy, explore, inscribe, mint, read, sign, transfer none Not in this release OP-20 op-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release OP-DROP op-drop bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release Ordinals ordinals bitcoin broadcast, inscribe, read, sign, transfer none Not in this release Patina patina bitcoin explore, read none Not in this release Runes runes bitcoin broadcast, etch, explore, mint, read, sign, transfer none Not in this release SRC-101 src-101 bitcoin explore, read none Not in this release SRC-20 src-20 bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release Stamps stamps bitcoin broadcast, explore, inscribe, read, sign none Not in this release TAP tap bitcoin broadcast, deploy, explore, mint, read, sign, transfer none Not in this release UNAT unat bitcoin broadcast, explore, mint, read, sign, transfer none Not in this release Witness Circles witness-circles bitcoin explore, read none Not in this release Zcash zcash zcash broadcast, payment.send, read, send, sign none Not in this release Zerdinals zerdinals zcash broadcast, explore, inscribe, market-buy, market-list, market-settle, read, sign, transfer none Not in this release ZRC-20 (Zecscriptions) zrc-20-zecscriptions zcash broadcast, deploy, explore, mint, read, sign, transfer none Not in this release ZRC-20 (Zord) zrc-20-zord zcash broadcast, deploy, explore, mint, read, sign, transfer none Not in this release ZRunes zrunes zcash broadcast, etch, explore, mint, read, sign, transfer none Not in this release 

 
## Notes on individual entries
 Section titled “Notes on individual entries” 

 

- BRC-110 declares no intended operations and is recorded as intentionally out of scope. It is in
the registry so that the list is complete, not because it is planned. 

- Babylon appears on a Cosmos network and is not selectable in the network picker . Its screens
carry a design obligation recorded as not intended, meaning only the unavailable state ships. Treat
it as unavailable. 

- Fractal Bitcoin appears both as a chain in the picker and as a protocol row with read and
 explore . 

- Aliases matter when you read other documentation. ordinals covers inscriptions, rare sats, media,
text, and names. zerdinals and zrunes are the Zcash entries. 

 
## Related
 Section titled “Related” 

 

- What this release authorizes 

- Why an action is unavailable 

- Chains and networks 

 Edit page Last updated: Nov 11, 2026 

 Previous What this release authorizes Next Why an action is unavailable 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/PUBLIC-CAPABILITY-SUMMARY.json 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Not released 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
