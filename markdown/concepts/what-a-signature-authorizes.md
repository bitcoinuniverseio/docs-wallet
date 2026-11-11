# What a signature authorizes | Universe Wallet

Four kinds of approval, the exact boundary of each, and the one shape of signature that lets a stranger finish the transaction without asking you again.

- Universe Wallet 
- How it works 
 
# What a signature authorizes

 If you read one page here, read this one. Most losses in self-custody are not broken cryptography.
They are someone approving a request whose scope they misread.

 
 A signature is a scope , not a button. The question is never “do I trust this site” but
“what exactly does this signature let anyone do, forever”.
 

 
## 1. Connecting a site
 Section titled “1. Connecting a site” 

 Authorizes: the site to see one address on one network, and to ask you for signatures later.

 Does not authorize: any movement of funds. Ever. A connection is not a payment approval, and
connecting to a hostile site does not by itself cost you anything.

 Every connection expires on an idle window. See
 Connection permissions .

 
## 2. Signing a message
 Section titled “2. Signing a message” 

 Authorizes: a proof that you control the address. No fee is paid, nothing is broadcast, and no
coin can move as a result.

 Does not authorize: any spend.

 A message with no on-chain effect can still be a promise
 Signing text is how sites verify address ownership, and it is also how some off-chain agreements are
made. Read the text. If it is unreadable, or it is raw data rather than a sentence, treat that as a
reason to refuse, not a reason to hurry.

 
 Raw data signing, where the content is not human-readable text, is off by default in Universe Wallet
and requires a typed confirmation to enable. That default exists because a blob you cannot read is
indistinguishable from a transaction you did not mean to authorize.

 
## 3. Signing a whole transaction
 Section titled “3. Signing a whole transaction” 

 Authorizes: exactly the listed inputs becoming exactly the listed outputs, at exactly the stated
fee.

 Change one input, one output, one amount, or the fee, and the signature stops being valid. This is the
well-behaved case: what you approved is what can happen, and nothing else.

 Does not authorize: anything after that transaction. A second payment needs a second approval.

 Once broadcast and confirmed, it cannot be reversed by you, by Universe, by the recipient, or by a
miner.

 
## 4. Signing part of a transaction
 Section titled “4. Signing part of a transaction” 

 This is the one that catches people.

 A signature can commit to only one input and one output, leaving the rest of the transaction open for
anyone to fill in. In Bitcoin terms, this is SIGHASH_SINGLE combined with ANYONECANPAY .

 Authorizes: anyone holding that signed fragment to complete the transaction, on their own terms,
at any time, for as long as your coin remains unspent.

 This is how a fixed-price sale offer works: you sign “my inscription leaves, this payment comes to
me”, and a buyer later supplies their own inputs and fees to complete it. That is the intended use,
and it is genuinely useful.

 Cancelling a listing is advisory until the coin moves
 Removing an offer from a marketplace removes it from that marketplace’s list. It does not revoke the
signature. Anyone who kept a copy can still complete it while the coin is unspent. The only real
cancellation is to spend the coin yourself, into a transaction you control, so the offer can no longer
be completed.

 
 
## The questions to ask before approving anything
 Section titled “The questions to ask before approving anything” 

 

- What can this move? Read the impact lines, not the site’s description. 

- What is left open? If the request does not commit to every input and output, someone else gets
to decide the rest. 

- Is anything marked unknown? A fact the wallet could not read is shown as unknown. See
 Confidence marks . 

- Would I be fine if this were completed by the worst possible person, a year from now? For a
partial signature, that is the actual question. 

 Rejecting is free, repeatable, and costs you nothing but the time to ask again.

 
## Related
 Section titled “Related” 

 

- Review a transaction 

- Review a PSBT 

- Connection permissions 

 Edit page Last updated: Nov 11, 2026 

 Previous Protected outputs Next Connection permissions 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Approval/components 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
