# Protected outputs | Universe Wallet

Why part of your balance refuses to spend, what puts a coin into that state, and why a coin the wallet could not check is held back rather than released.

- Universe Wallet 
- How it works 
 
# Protected outputs

 On Bitcoin, an inscription lives inside an ordinary coin. There is no separate container for it. A
wallet that treats every coin as plain money can hand your collectible to a miner as change, and that
is the single most common way inscriptions are lost.

 Universe Wallet classifies every coin before it can be selected. Coins that carry something are held
back from ordinary payments.

 
 Protected value still counts in your total balance. It does not count as available .
That gap between the two numbers is the feature working, not a fault.
 

 
## What puts a coin into the protected state
 Section titled “What puts a coin into the protected state” 

 A coin is shown as Protected when it carries any of the following:

 

- an inscription, 

- an indexed protocol balance, 

- a rare-satoshi candidate, 

- a lock you applied yourself. 

 And one more, which is the important one:

 Unknown is treated as unsafe
 If the wallet cannot complete the check, because an indexer is unreachable or a lookup timed out, the
coin stays protected. It is not released on the assumption that it is probably fine. A wallet that
guesses in your favour when it cannot see is a wallet that eventually guesses wrong with something
irreplaceable.

 
 
## What that means in practice
 Section titled “What that means in practice” 

 You see Why Total balance higher than available balance Some coins are protected. The difference is exactly the protected amount. A payment says there are not enough funds The available pool is smaller than the amount plus fee, even though the total is larger. More is protected than usual today An indexer may be lagging or unreachable, so coins that are normally clear are being held back. A protected coin holds a very small amount, like 546 satoshis That is normal. Asset-bearing outputs are usually near the dust limit, because the value is what is written on them, not what they hold. 

 
## Spending a protected coin on purpose
 Section titled “Spending a protected coin on purpose” 

 You can. It is deliberately not on the default path.

 Moving an artifact uses the flow built for that asset, not the plain send screen, and it asks you to
confirm by name before the coin can be selected. Those flows sit behind protocol release gates, so
whether they are available in your build depends on that build. See
 What this release authorizes .

 If you set the lock yourself, you can remove it yourself. Locks you set are device settings, and they
do not travel with your recovery phrase.

 
## Where to see the list
 Section titled “Where to see the list” 

 The Locked coins screen lists the coins currently being held back and why. It has no protocol
gate, so it is present regardless of what your build authorizes. The Coin health screen shows the
overall shape of your coin set, including how much is protected.

 
## What this does not protect you from
 Section titled “What this does not protect you from” 

 

- Signing a transaction that someone else built. If you approve a PSBT that spends a protected
coin, it is spent. Classification informs the review screen; it does not veto your approval. See
 Review a PSBT . 

- Assets the wallet cannot recognise. Protection depends on knowing an asset is there. A protocol
the wallet does not index cannot be classified, and a coin carrying it can look plain. 

- Another wallet using the same phrase. Protection is a Universe Wallet behaviour. Import the same
phrase into a wallet without it and every coin becomes ordinary money again. 

 
## Related
 Section titled “Related” 

 

- Coin control 

- Inputs, outputs, fees, change 

- What a digital artifact is 

 Edit page Last updated: Nov 11, 2026 

 Previous Inputs, outputs, fees, change Next What a signature authorizes 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path README.md, docs/STORE-LISTING.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
