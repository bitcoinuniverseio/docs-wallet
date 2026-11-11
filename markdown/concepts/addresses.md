# Payment and asset addresses | Universe Wallet

Why people talk about a payment address and an asset address, why Bitcoin has no such distinction, and what actually decides where your artifacts live.

- Universe Wallet 
- How it works 
 
# Payment and asset addresses

 One recovery phrase produces several Bitcoin addresses, in different formats, all yours at the same
time. People call one of them the payment address and another the asset address. That shorthand is
useful, and it is also not how Bitcoin works. Both halves of that matter.

 
 All four lanes come from the same words. Universe Wallet defaults to Native SegWit for
payments and shows Taproot as the lane where inscriptions and most protocol assets are
conventionally held. The distinction is a convention among wallets and marketplaces, not a rule
the network enforces.
 

 
## What is actually true
 Section titled “What is actually true” 

 An inscription, a rune balance, or a token balance is attached to a specific unspent output , not
to an address. The address is just the lock on that output.

 That has three consequences worth internalising:

 

- Any address type can hold an artifact. Nothing stops an inscription from sitting on a Native
SegWit output. Marketplaces and indexers conventionally expect Taproot, so a non-standard placement
can be harder to trade, but it is not invalid. 

- Spending the output moves the artifact. If a payment happens to select the coin an inscription
sits on, the inscription goes wherever that coin goes. This is the accident Universe Wallet exists
to prevent, and it is covered in Protected outputs . 

- You cannot make an address safe. There is no address setting that protects an artifact. The
protection lives in coin selection, not in the address. 

 
## Why the shorthand still helps
 Section titled “Why the shorthand still helps” 

 Keeping artifacts on one address type and everyday money on another has a practical benefit: it
reduces the number of coins that a routine payment could reach in the first place. It is a tidiness
habit, not a security boundary.

 If you use one address for everything, Universe Wallet still classifies every coin before selecting
it. The habit helps; the classification is what actually protects you.

 
## Which address to give out
 Section titled “Which address to give out” 

 Situation Give them Someone is paying you in bitcoin Your default receiving address. Native SegWit unless you changed it. A marketplace is sending you an inscription or an ordinal Your Taproot address, unless the marketplace asks for something specific. A service says it cannot pay a bc1 address Your Nested SegWit address, which starts with 3 . A service only accepts addresses starting with 1 Your Legacy address. Expect to pay more to spend it later. 

 
## Related
 Section titled “Related” 

 

- Address types , including derivation paths 

- Protected outputs 

- Receive 

 Edit page Last updated: Nov 11, 2026 

 Previous Emergency handbook Next Address types 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/shared/constant/index.ts 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
