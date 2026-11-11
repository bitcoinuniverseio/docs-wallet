# Inputs, outputs, fees, change | Universe Wallet

What a Bitcoin transaction is actually made of, why the fee is not a field you fill in, and why a missing change output is the most expensive thing you can fail to notice.

- Universe Wallet 
- How it works 
 
# Inputs, outputs, fees, change

 You do not have a balance. You have a set of coins, each a fixed amount, each spendable only in full.
Every payment consumes some of them entirely and creates new ones. Once you see it this way, most of
the surprising behaviour in any Bitcoin wallet stops being surprising.

 
 The fee is not entered anywhere. It is the difference between what goes in and what comes out. You
influence it by choosing a rate in satoshis per virtual byte, and the wallet computes the amount
from the size of the transaction it built.
 

 
## The four terms
 Section titled “The four terms” 

 Input. A coin you already own, being spent. It is consumed whole. A transaction can have many.

 Output. A new coin being created. One goes to the person you are paying. Usually one comes back to
you.

 Change. The output that comes back to you. It is a real payment, to a real address of yours, and
it is where the remainder of your consumed coins ends up. It is not a leftover in an account
somewhere.

 Fee. Whatever the inputs exceed the outputs by. Nobody writes it into the transaction. Whoever
mines the block claims it.

 
## The consequences worth knowing
 Section titled “The consequences worth knowing” 

 
### Your available balance can be lower than your total
 Section titled “Your available balance can be lower than your total” 

 Because some coins are held back as protected, and because a coin cannot be split without spending it.
See Protected outputs .

 
### A large payment does not cost a large fee
 Section titled “A large payment does not cost a large fee” 

 Fees follow size in virtual bytes. A transaction with many inputs is large and therefore expensive,
regardless of the amounts involved. Paying from twenty small coins costs much more than paying from
one large one.

 
### A missing change output means you gave the remainder away
 Section titled “A missing change output means you gave the remainder away” 

 If the review screen shows inputs of 0.0345 BTC, one output of 0.02 BTC, and no change line, the other
0.0145 BTC is the fee. This is the shape of both a bug and an attack. Reject anything you cannot
account for. See Review a transaction .

 
### Dust
 Section titled “Dust” 

 An output too small to be worth spending later is called dust, and the network will not relay outputs
below a threshold. Creating a 200 satoshi change output is not useful: it will cost more than that to
spend it. Wallets round it into the fee instead, which is another reason a change line can be absent.

 
## Where Universe Wallet shows you this
 Section titled “Where Universe Wallet shows you this” 

 The review screen lists every input and every output, marks which inputs are protected, states the fee
once, and shows the resulting net change to your wallet. See
 Review a transaction for how to read it in order.

 
## Related
 Section titled “Related” 

 

- Choose a fee 

- Coin control 

- Glossary 

 Edit page Last updated: Nov 11, 2026 

 Previous Address types Next Protected outputs 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/shared/utils/psbt-utils.ts 
 Applicable release Universe Wallet 1.7.5.8 
 Chain bitcoin 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
