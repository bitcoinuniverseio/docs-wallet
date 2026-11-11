# If your wallet is compromised | Universe Wallet

What to do first, in order, when you think your phrase was seen, a signature went wrong, or coins moved without you.

- Universe Wallet 
- Safety 
 
# If your wallet is compromised

 This page is written to be read quickly, by someone who is not calm. Start at the situation that
matches yours.

 Before anything else
 Do not enter your recovery phrase into any site, tool, or person offering to help. Every recovery
service is a second theft. There is no legitimate one, anywhere, for any wallet.

 
 
## Your recovery phrase may have been seen
 Section titled “Your recovery phrase may have been seen” 

 This is the most serious case, because access cannot be taken back.

 A phrase cannot be made secret again. Changing your password does nothing. Locking the wallet does
nothing. Uninstalling does nothing. The only fix is to move everything to keys that person has never
seen.

 

- Create a brand new wallet, from a new phrase. On a device you believe is clean. Write the new
phrase down on paper. 

- Move your plain currency first. It is the easiest to sweep and the most likely to be taken. 

- Move your assets next , using the flow built for each asset type. If those flows are not
available in your build, you cannot move assets from inside this wallet, and you should still move
the currency. See Why an action is unavailable . 

- Do not send anything back to the old wallet , ever, including change from an unrelated
transaction. 

- Assume anything left behind will be taken. Prioritise by value, not by convenience. 

 If your holdings are large and the exposure is recent, moving currency in a single high-fee
transaction is usually worth it. An attacker who is watching will race you.

 
## You approved something and now regret it
 Section titled “You approved something and now regret it” 

 

- Open Connected sites and disconnect the site. This
stops further requests. It does not undo what you already signed. 

- Check Activity for what actually happened. 

- Work out what the signature was. A payment is done. A message signature moved nothing. A
partial signature may still be outstanding and completable by someone else. See
 What a signature authorizes . 

- If a partial signature is outstanding , the only certain revocation is to spend the committed
coin yourself, into a transaction you control, so the offer can no longer be completed. 

 
## Coins moved without you
 Section titled “Coins moved without you” 

 

- Check whether it was really unauthorized. A change output returning to your own address looks
like an outgoing transaction to a stranger. Check whether the destination is one of yours. 

- If it genuinely was not you, your keys are compromised. Follow the phrase-exposed procedure
above immediately. Do not investigate first. 

- Record the transaction ids before you do anything else. They are the only evidence, and they
are public. 

 
## You installed something that was not the real wallet
 Section titled “You installed something that was not the real wallet” 

 

- Remove it. 

- If you entered your phrase into it, treat the phrase as fully exposed and follow the first
procedure above. 

- If you never entered a phrase into it, no key material was ever there and you are fine. 

 
## What nobody can do for you
 Section titled “What nobody can do for you” 

 

- Reverse a confirmed transaction. 

- Freeze funds at another address. 

- Recover a lost phrase. 

- Identify who took the coins in a way that gets them back. 

 The second wave
 People who lose funds publicly are targeted immediately by recovery scams. If you post about a loss,
expect messages from accounts impersonating support, offering blockchain forensics, or claiming to
know a validator who can reverse it. All of them are the same scam. Post the transaction id if you
want, and never post an address you still use, and never speak to anyone who contacts you first.

 
 
## Afterwards
 Section titled “Afterwards” 

 

- Review Security model and decide what you would do
differently. 

- Consider hardware signing for long-term holdings. 

- Keep experimenting money in a separate wallet from savings. 

 
## Reporting
 Section titled “Reporting” 

 If you believe the loss came from a flaw in the product rather than from an exposed phrase, report it
to legal@bitcoinuniverse.io . See Support and reporting .

 Edit page Last updated: Nov 11, 2026 

 Previous Phishing and impostors Next Privacy 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/STORE-LISTING.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
