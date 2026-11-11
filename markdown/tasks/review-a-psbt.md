# Review a PSBT | Universe Wallet

How to read a partially signed transaction someone else built, which sighash flags change what you are agreeing to, and when to refuse outright.

- Universe Wallet 
- Everyday tasks 
 
# Review a PSBT

 Intended reader: anyone approving a signature request that came from a site rather than from the
send screen.
 Goal: knowing what the finished transaction can become, not just what it looks like now.
 Prerequisites: a pending PSBT approval.
 Safety: a PSBT is a transaction that someone else wrote. Everything on it was chosen by them.

 
## What a PSBT is
 Section titled “What a PSBT is” 

 A partially signed Bitcoin transaction is a draft that can carry some signatures and be completed
later. Marketplaces and applications use them because a trade needs inputs from two people who are
never online at the same moment.

 The important consequence: you are signing something you did not construct . The inputs, the
outputs, the fee, and the flags were all chosen by whoever sent it.

 
## What the wallet shows you
 Section titled “What the wallet shows you” 

 What you are about to sign Origin app.example Your input 7c9b…:0 (protected, inscription) Leaves your wallet 1 inscription Comes back to you 0.04000000 BTC Signature scope SIGHASH_SINGLE | ANYONECANPAY Fee Paid by the other party 

 The screen lists every input and output, marks which inputs are yours, marks which of your inputs are
protected, and computes the net effect on your wallet. A manual input selector is available inside
this flow when the request allows you to choose which of your coins fund it.

 
## The line that decides everything
 Section titled “The line that decides everything” 

 Signature scope. This is the sighash setting, and it determines what your signature commits to.

 Scope You are agreeing to SIGHASH_ALL The whole transaction, exactly as shown. Nothing can change without invalidating your signature. SIGHASH_SINGLE | ANYONECANPAY Only your input and one matching output. Everyone else can still change their part. SIGHASH_NONE Your input, and no output at all. Whoever completes it decides where the money goes. 

 A partial signature is an open offer, and it does not expire
 If the scope is not the whole transaction, anyone holding your signed fragment can complete it, on
their own terms, at any time, for as long as that coin stays unspent. Removing a listing from a
marketplace does not revoke it. The only real cancellation is to spend the coin yourself into a
transaction you control.

 
 
## Steps
 Section titled “Steps” 

 

- Read the origin at the top. Confirm it is the site you are actually using. 

- Read what leaves and what comes back . Compare against the price you were quoted. 

- Read the signature scope . If it is not the whole transaction, decide whether you are willing to
leave an open offer standing. 

- Check whether any of your protected coins are being spent, and whether that is what you meant. 

- Check the fee and who pays it. 

- Check for anything marked UNKNOWN . 

- Approve, or reject. 

 
## Refuse outright when
 Section titled “Refuse outright when” 

 

- The scope is SIGHASH_NONE . There is almost no legitimate reason for a wallet to be asked for that. 

- The amount coming back does not match the price you agreed. 

- A protected coin is being spent and you did not start an asset sale. 

- The origin is not the site you are on. 

- The wallet could not decode part of the request. 

 
## Expected result
 Section titled “Expected result” 

 The source candidate checks that selected signing inputs belong to the current account and that the
returned approval still matches the reviewed transaction. Changing accounts or networks, locking the
wallet, or revoking the requesting site can invalidate an unexecuted approval. If that happens,
return to the current request and review it again; do not broaden the selected inputs to bypass a
refusal. These checks do not establish that every hardware or website integration is available.

 Approving returns your signature to the requesting site. It does not necessarily broadcast anything:
the site may hold your signature until a counterparty completes the transaction.

 
## How to verify
 Section titled “How to verify” 

 Check your activity. A PSBT you signed may not appear as a transaction until it is completed and
broadcast by the other party. That gap is normal, and it is also why a partial signature deserves more
thought than a payment: there may be no immediate evidence of what you agreed to.

 
## What the transaction inspector is not
 Section titled “What the transaction inspector is not” 

 Universe Wallet has a transaction inspector that looks up a transaction by its id. It is a lookup
tool for transactions that already exist. It does not decode or review a PSBT. The approval screen
is the place where a PSBT is reviewed.

 
## Related
 Section titled “Related” 

 

- What a signature authorizes 

- Coin control 

- Protected outputs 

 Edit page Last updated: Nov 11, 2026 

 Previous Review a transaction Next Sign a message 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/shared/utils/psbt-safety.ts, frontend/ui/pages/Approval/components/SignPsbt.tsx, backend/background/controller/provider/product-provider-boundary.ts 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-06 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
